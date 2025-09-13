import {NextRequest, NextResponse} from "next/server";

export const runtime = "edge"; // enables Cloudflare-style env bindings if present

export type Review = {
    id: string;
    name: string;
    email?: string;
    text: string;
    rating: number; // 1..5
    createdAt: number; // epoch ms
};

const LIST_KEY = "review:list";
const ITEM_PREFIX = "review:";

// Local dev fallback in-memory store
const mem: Review[] = [];
const memIds: string[] = [];

function id() {
    try {
        return crypto.randomUUID();
    } catch {
        return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    }
}

function sanitizeText(v: string, max = 1000) {
    const s = String(v ?? "").replace(/<[^>]*>/g, "").trim();
    return s.slice(0, max);
}
function sanitizeName(v: string) {
    const s = String(v ?? "").replace(/<[^>]*>/g, "").trim();
    return s.slice(0, 80);
}
function sanitizeEmail(v: string) {
    const s = String(v ?? "").trim();
    if (!s) return undefined;
    // very light check
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s) ? s.slice(0, 120) : undefined;
}

function average(items: Review[]) {
    if (!items.length) return 0;
    return +(items.reduce((a, r) => a + (Number(r.rating) || 0), 0) / items.length).toFixed(2);
}

async function getKV() {
    // Cloudflare Pages / Functions expose `env` with bindings; Workers expose them directly.
    const g: any = globalThis as any;
    const env = g?.env || g;
     // KV binding name you provided
    return env?.REVIEWS;
}

async function listFromKv(kv: any, limit = 50) {
    // list of IDs is stored under LIST_KEY as JSON array
    const ids = ((await kv.get(LIST_KEY, "json")) as string[] | null) ?? [];
    const recent = ids.slice(-limit);
    const rows = await Promise.all(recent.map((rid) => kv.get(ITEM_PREFIX + rid, "json")));
    const items = (rows.filter(Boolean) as Review[]).reverse(); // newest first
    return { items, count: ids.length, avg: average(items) };
}

function listFromMem(limit = 50) {
    const items = mem.slice(-limit).reverse();
    return { items, count: mem.length, avg: average(items) };
}

async function verifyTurnstile(token: string | undefined, ip: string | null) {
    // Only verify when TURNSTILE_SECRET is provided
    const secret =
        (process.env.TURNSTILE_SECRET as string | undefined) ||
        ((globalThis as any)?.env?.TURNSTILE_SECRET as string | undefined);

    if (!secret || !token) return { success: true }; // treat as ok when not configured

    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token);
    if (ip) body.set("remoteip", ip);

    const res = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        { method: "POST", body }
    );
    return (await res.json().catch(() => ({ success: false }))) as { success: boolean };
}

// ---------- GET ----------
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 24)));
        const wantStatsOnly = searchParams.has("stats");

        const kv = await getKV();
        const payload = kv ? await listFromKv(kv, limit) : listFromMem(limit);

        return NextResponse.json(
            wantStatsOnly
                ? { count: payload.count, avg: payload.avg }
                : { items: payload.items, count: payload.count, avg: payload.avg },
            { headers: { "Cache-Control": "no-store" } }
        );
    } catch (e) {
        return NextResponse.json({ items: [], count: 0, avg: 0 }, { status: 200 });
    }
}

// ---------- POST ----------
export async function POST(req: NextRequest) {
    try {
        const ip =
            req.headers.get("cf-connecting-ip") ||
            req.headers.get("x-real-ip") ||
            req.headers.get("x-forwarded-for");

        const body = (await req.json().catch(() => ({}))) as {
            name?: string;
            email?: string;
            text?: string;
            rating?: number;
            token?: string; // Turnstile token (optional)
        };

        const name = sanitizeName(body.name ?? "");
        const email = sanitizeEmail(body.email ?? "");
        const text = sanitizeText(body.text ?? "", 800);
        const rating = Math.max(1, Math.min(5, Number(body.rating ?? 0)));

        if (!text || !rating || !name) {
            return NextResponse.json(
                { ok: false, error: "missing text/name or rating" },
                { status: 400 }
            );
        }

        const turnstile = await verifyTurnstile(body.token, ip);
        if (!turnstile.success) {
            return NextResponse.json({ ok: false, error: "captcha_failed" }, { status: 403 });
        }

        const review: Review = {
            id: id(),
            name,
            email,
            text,
            rating,
            createdAt: Date.now(),
        };

        const kv = await getKV();
        if (kv) {
            const ids = ((await kv.get(LIST_KEY, "json")) as string[] | null) ?? [];
            ids.push(review.id);
            await Promise.all([
                kv.put(ITEM_PREFIX + review.id, JSON.stringify(review)),
                kv.put(LIST_KEY, JSON.stringify(ids)),
            ]);
        } else {
            // dev fallback
            mem.push(review);
            memIds.push(review.id);
        }

        return NextResponse.json({ ok: true, review });
    } catch (e) {
        return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
    }
}
