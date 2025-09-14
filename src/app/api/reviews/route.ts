/* Edge + Cloudflare KV + optional Turnstile */
export const runtime = "edge";

import { z } from "zod";

export type Review = {
    id: string;
    name: string;
    email?: string;
    text: string;
    rating: number; // 1..5
    createdAt: number; // epoch ms
};

type Out = {
    items?: Review[];
    count?: number;
    avg?: number;
    ok?: boolean;
    error?: string;
    review?: Review;
};

const KV = (globalThis as { REVIEWS?: KVNamespace }).REVIEWS;

// Dev fallback if KV binding is missing locally
const mem: { items: Review[]; count: number; sum: number } = { items: [], count: 0, sum: 0 };

function sanitizeName(s: unknown) {
    const v = String(s ?? "").trim();
    return v.slice(0, 60);
}
function sanitizeEmail(s: unknown) {
    const v = String(s ?? "").trim();
    return v ? v.slice(0, 120) : undefined;
}
function sanitizeText(s: unknown) {
    const v = String(s ?? "").trim();
    return v.slice(0, 1600);
}
function clampRating(n: unknown) {
    const x = Math.max(1, Math.min(5, Number(n || 0) | 0));
    return x;
}

const ReviewInput = z.object({
    name: z.string().min(1).max(60),
    email: z.string().email().max(120).optional(),
    text: z.string().min(1).max(1600),
    rating: z.number().int().min(1).max(5),
    cfToken: z.string().optional(),
});

async function verifyTurnstile(token?: string): Promise<boolean> {
    const secret = process.env.CF_TURNSTILE_SECRET;
    if (!secret) return true; // optional
    if (!token) return false;

    const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await resp.json()) as { success?: boolean };
    return !!data.success;
}

export async function GET(req: Request): Promise<Response> {
    const { searchParams } = new URL(req.url);

    // Stats fast-path
    if (searchParams.get("stats")) {
        if (KV) {
            const [c, s] = await Promise.all([
                KV.get("stats:count"),
                KV.get("stats:sum"),
            ]);
            const count = Number(c || "0");
            const sum = Number(s || "0");
            const avg = count ? sum / count : 0;
            return Response.json({ count, avg } satisfies Out, { headers: corsHeaders(req) });
        }
        const avg = mem.count ? mem.sum / mem.count : 0;
        return Response.json({ count: mem.count, avg } satisfies Out, { headers: corsHeaders(req) });
    }

    const limit = Math.max(1, Math.min(50, Number(searchParams.get("limit") || 24)));
    if (KV) {
        // list latest reviews (keys with prefix r:)
        const keys = await KV.list({ prefix: "r:" });
        // newest first by id timestamp
        const ids = keys.keys
            .map((k) => k.name)
            .sort((a, b) => (a < b ? 1 : -1))
            .slice(0, limit);

        const items = (await Promise.all(
            ids.map((id) => KV.get(id, "json") as Promise<Review | null>)
        )).filter(Boolean) as Review[];

        return Response.json({ items } satisfies Out, { headers: corsHeaders(req) });
    }

    // dev fallback
    const items = [...mem.items].sort((a, b) => b.createdAt - a.createdAt).slice(0, limit);
    return Response.json({ items } satisfies Out, { headers: corsHeaders(req) });
}

export async function POST(req: Request): Promise<Response> {
    try {
        const json = await req.json().catch(() => null);
        const parsed = ReviewInput.safeParse(json);
        if (!parsed.success) {
            return Response.json({ ok: false, error: "invalid_fields" } satisfies Out, {
                status: 400,
                headers: corsHeaders(req),
            });
        }

        const data = parsed.data;
        const okTurnstile = await verifyTurnstile(data.cfToken);
        if (!okTurnstile) {
            return Response.json({ ok: false, error: "turnstile_failed" } satisfies Out, {
                status: 400,
                headers: corsHeaders(req),
            });
        }

        const name = sanitizeName(data.name);
        const email = sanitizeEmail(data.email);
        const text = sanitizeText(data.text);
        const rating = clampRating(data.rating);

        const createdAt = Date.now();
        const id = `r:${createdAt}-${Math.random().toString(36).slice(2, 7)}`;
        const review: Review = { id, name, email, text, rating, createdAt };

        if (KV) {
            await KV.put(id, JSON.stringify(review), { expirationTtl: 60 * 60 * 24 * 365 * 10 }); // ~10y
            // simple counters
            const [c, s] = await Promise.all([KV.get("stats:count"), KV.get("stats:sum")]);
            const count = Number(c || "0") + 1;
            const sum = Number(s || "0") + rating;
            await Promise.all([
                KV.put("stats:count", String(count)),
                KV.put("stats:sum", String(sum)),
            ]);
        } else {
            mem.items.push(review);
            mem.count += 1;
            mem.sum += rating;
        }

        return Response.json({ ok: true, review } satisfies Out, { headers: corsHeaders(req) });
    } catch {
        return Response.json({ ok: false, error: "bad_json" } satisfies Out, {
            status: 400,
            headers: corsHeaders(req),
        });
    }
}

// Tiny CORS utility so the client can call from same origin (and still fine in preview)
function corsHeaders(req: Request): Headers {
    const h = new Headers({ "content-type": "application/json; charset=utf-8" });
    const origin = req.headers.get("origin");
    if (origin) {
        h.set("access-control-allow-origin", origin);
        h.set("vary", "origin");
    }
    return h;
}
