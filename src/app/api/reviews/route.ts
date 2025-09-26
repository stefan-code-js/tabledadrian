import { resolveCfEnv, getClientIp } from "@/lib/cloudflare";
import { z } from "zod";

export const runtime = "edge";

type Env = {
    REVIEWS?: KVNamespace;
    CF_TURNSTILE_SECRET?: string;
    TURNSTILE_SECRET?: string;
    TURNSTILE_SECRET_KEY?: string;
};

type RouteContext = { params: Promise<Record<string, string>> } & { env?: Env };

type Review = {
    id: string;
    name: string;
    email?: string;
    text: string;
    rating: number;
    createdAt: number;
    ip?: string;
};

type PublicReview = Omit<Review, "ip">;

type Out = {
    items?: PublicReview[];
    count?: number;
    avg?: number;
    ok?: boolean;
    error?: string;
    review?: PublicReview;
    stats?: { count: number; avg: number };
    debug?: boolean;
};

type RateLimitResult = { allowed: boolean; debug: boolean };

const reviewSchema = z.object({
    name: z.string().trim().min(2).max(60),
    email: z.string().email().optional(),
    text: z.string().trim().min(8).max(1600),
    rating: z.coerce.number().int().min(1).max(5),
    cfToken: z.string().optional(),
});

const HEADERS = {
    "Cache-Control": "no-store",
};

const FALLBACK_STORE: { items: Review[]; count: number; sum: number } = { items: [], count: 0, sum: 0 };

function getReviewsKv(env: Env): KVNamespace | undefined {
    return env.REVIEWS ?? ((globalThis as any).REVIEWS as KVNamespace | undefined);
}

function resolveTurnstileSecret(env: Env): string | undefined {
    return (
        env.CF_TURNSTILE_SECRET ||
        env.TURNSTILE_SECRET ||
        env.TURNSTILE_SECRET_KEY ||
        (typeof process !== "undefined" ? process.env.CF_TURNSTILE_SECRET : undefined) ||
        (typeof process !== "undefined" ? process.env.TURNSTILE_SECRET : undefined) ||
        (typeof process !== "undefined" ? process.env.TURNSTILE_SECRET_KEY : undefined)
    );
}

async function verifyTurnstile(env: Env, token?: string): Promise<boolean> {
    const secret = resolveTurnstileSecret(env);
    if (!secret) {
        return true;
    }
    if (!token) {
        return false;
    }

    try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            body: new URLSearchParams({ secret, response: token }),
        });
        const data = (await response.json()) as { success?: boolean };
        return Boolean(data.success);
    } catch {
        return false;
    }
}

async function applyRateLimit(kv: KVNamespace | undefined, ip: string): Promise<RateLimitResult> {
    if (!kv) {
        return { allowed: true, debug: true };
    }

    const key = `reviews:rate:${ip}`;
    try {
        const currentRaw = await kv.get(key);
        const current = Number(currentRaw ?? "0");
        const safeCurrent = Number.isFinite(current) ? current : 0;
        if (safeCurrent >= 10) {
            return { allowed: false, debug: false };
        }
        await kv.put(key, String(safeCurrent + 1), { expirationTtl: 600 });
        return { allowed: true, debug: false };
    } catch {
        return { allowed: true, debug: true };
    }
}

function corsHeaders(req: Request): Headers {
    const h = new Headers({ "content-type": "application/json; charset=utf-8" });
    const origin = req.headers.get("origin");
    if (origin) {
        h.set("access-control-allow-origin", origin);
        h.set("vary", "origin");
    }
    return h;
}

function respond(body: Out, init: ResponseInit = {}): Response {
    const headers = new Headers(init.headers);
    headers.set("Cache-Control", HEADERS["Cache-Control"]);
    return new Response(JSON.stringify(body), {
        ...init,
        headers,
    });
}

function toPublic(review: Review): PublicReview {
    const { ip: _ip, ...rest } = review;
    return rest;
}

async function listReviewsFromKv(kv: KVNamespace, limit: number): Promise<PublicReview[]> {
    const keys = await kv.list({ prefix: "r:" });
    const ids = keys.keys
        .map((k) => k.name)
        .sort((a, b) => (a < b ? 1 : -1))
        .slice(0, limit);

    const items = (await Promise.all(ids.map((id) => kv.get(id, "json") as Promise<Review | null>))).filter(
        Boolean,
    ) as Review[];

    return items.map(toPublic);
}

function fallbackReviews(limit: number): PublicReview[] {
    return [...FALLBACK_STORE.items]
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, limit)
        .map(toPublic);
}

function safeNumber(value: string | null | undefined): number {
    const parsed = Number(value ?? "0");
    return Number.isFinite(parsed) ? parsed : 0;
}

export async function GET(req: Request, context: RouteContext): Promise<Response> {
    const env: Env = resolveCfEnv<Env>(context.env) ?? {};
    const kv = getReviewsKv(env);
    const { searchParams } = new URL(req.url);

    try {
        if (searchParams.get("stats")) {
            if (kv) {
                const [countRaw, sumRaw] = await Promise.all([
                    kv.get("stats:count") as Promise<string | null | undefined>,
                    kv.get("stats:sum") as Promise<string | null | undefined>
                ]);
                const count = safeNumber(countRaw);
                const sum = safeNumber(sumRaw);
                const avg = count ? sum / count : 0;
                return respond({ count, avg }, { headers: corsHeaders(req) });
            }
            const avg = FALLBACK_STORE.count ? FALLBACK_STORE.sum / FALLBACK_STORE.count : 0;
            return respond({ count: FALLBACK_STORE.count, avg }, { headers: corsHeaders(req) });
        }

        const limit = Math.max(1, Math.min(50, Number(searchParams.get("limit") || 24)));
        if (kv) {
            const items = await listReviewsFromKv(kv, limit);
            return respond({ items }, { headers: corsHeaders(req) });
        }

        const items = fallbackReviews(limit);
        return respond({ items }, { headers: corsHeaders(req) });
    } catch {
        if (searchParams.get("stats")) {
            return respond({ count: 0, avg: 0 }, { headers: corsHeaders(req) });
        }
        return respond({ items: [] }, { headers: corsHeaders(req) });
    }
}

export async function POST(req: Request, context: RouteContext): Promise<Response> {
    const env: Env = resolveCfEnv<Env>(context.env) ?? {};
    const kv = getReviewsKv(env);
    const ip = getClientIp(req);

    try {
        const body = await req.json();
        const parsed = reviewSchema.safeParse(body);
        if (!parsed.success) {
            return respond({ ok: false, error: parsed.error.issues[0]?.message ?? "invalid_payload" }, {
                status: 400,
                headers: corsHeaders(req),
            });
        }

        const rate = await applyRateLimit(kv, ip);
        if (!rate.allowed) {
            return respond({ ok: false, error: "rate_limited" }, { status: 429, headers: corsHeaders(req) });
        }
        let debug = rate.debug;

        const okTurnstile = await verifyTurnstile(env, parsed.data.cfToken);
        if (!okTurnstile) {
            return respond({ ok: false, error: "turnstile_failed" }, { status: 400, headers: corsHeaders(req) });
        }

        const createdAt = Date.now();
        const id = `r:${createdAt}-${Math.random().toString(36).slice(2, 7)}`;
        const review: Review = {
            id,
            name: parsed.data.name,
            email: parsed.data.email,
            text: parsed.data.text,
            rating: parsed.data.rating,
            createdAt,
            ip: ip === "unknown" ? undefined : ip,
        };

        let nextCount: number;
        let nextSum: number;

        if (kv) {
            await kv.put(id, JSON.stringify(review), { expirationTtl: 60 * 60 * 24 * 365 * 5 });
            const [countRaw, sumRaw] = await Promise.all([
                kv.get("stats:count") as Promise<string | null | undefined>,
                kv.get("stats:sum") as Promise<string | null | undefined>
            ]);
            const currentCount = safeNumber(countRaw);
            const currentSum = safeNumber(sumRaw);
            nextCount = currentCount + 1;
            nextSum = currentSum + review.rating;
            await Promise.all([
                kv.put("stats:count", String(nextCount)),
                kv.put("stats:sum", String(nextSum)),
            ]);
        } else {
            FALLBACK_STORE.items.push(review);
            FALLBACK_STORE.count += 1;
            FALLBACK_STORE.sum += review.rating;
            nextCount = FALLBACK_STORE.count;
            nextSum = FALLBACK_STORE.sum;
            debug = true;
        }

        const avg = nextCount ? nextSum / nextCount : 0;

        const payload: Out = {
            ok: true,
            review: toPublic(review),
            count: nextCount,
            avg,
            stats: { count: nextCount, avg },
        };

        if (debug) {
            payload.debug = true;
        }

        return respond(payload, { headers: corsHeaders(req) });
    } catch {
        return respond({ ok: false, error: "bad_json" }, { status: 400, headers: corsHeaders(req) });
    }
}
