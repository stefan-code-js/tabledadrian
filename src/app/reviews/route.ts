import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Rating = 1 | 2 | 3 | 4 | 5;

interface ReviewPayload {
    name: string;
    email?: string;
    rating: Rating;
    comment?: string;
    token?: string; // cf-turnstile-response
}

interface Stats {
    count: number;
    sum: number;
    avg: number;
}

interface KVNamespaceLite {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
}

/* ---------------- helpers ---------------- */

function isEmail(v: string): boolean {
    return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

async function readBody(req: Request): Promise<Record<string, string> | null> {
    const ct = (req.headers.get('content-type') || '').toLowerCase();
    if (ct.includes('application/json')) {
        try {
            const j = await req.json();
            if (j && typeof j === 'object') {
                const out: Record<string, string> = {};
                for (const [k, v] of Object.entries(j as Record<string, unknown>)) {
                    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
                        out[k] = String(v);
                    }
                }
                return out;
            }
        } catch { /* fall through */ }
    }
    try {
        const fd = await req.formData();
        const out: Record<string, string> = {};
        fd.forEach((v, k) => { if (typeof v === 'string') out[k] = v; });
        return out;
    } catch { /* ignore */ }
    return null;
}

function toPayload(src: Record<string, string>): ReviewPayload {
    const name = (src.name || src.fullName || src['your-name'] || '').trim();
    const email = (src.email || src['your-email'] || '').trim();
    const score = Number(src.rating ?? src.stars ?? src.score ?? 0);
    const comment = (src.comment || src.message || '').trim();
    const token = src['cf-turnstile-response'] || src.token || undefined;

    if (!name || !(score >= 1 && score <= 5)) {
        throw new Error('Missing name or rating (1..5)');
    }

    return { name, email, rating: Math.round(score) as Rating, comment, token };
}

async function verifyTurnstile(token?: string, ip?: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) return true;         // not configured → don’t block
    if (!token) return false;

    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set('remoteip', ip);

    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const j = (await r.json().catch(() => ({ success: false }))) as { success?: boolean };
    return j.success === true;
}

function esc(s: string): string {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

async function maybeEmail(p: ReviewPayload): Promise<void> {
    const key = process.env.RESEND_API_KEY;
    if (!key) return;
    const to = process.env.CONTACT_TO || 'adrian@tabledadrian.com';
    const html = `
    <h2>New review — ${p.rating}★</h2>
    <p><strong>Name:</strong> ${esc(p.name)}${p.email ? ` &lt;${esc(p.email)}&gt;` : ''}</p>
    ${p.comment ? `<p>${esc(p.comment)}</p>` : ''}
  `;
    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            from: 'Table d’Adrian <no-reply@tabledadrian.com>',
            to: [to],
            subject: `New review — ${p.rating}★`,
            html
        })
    }).catch(() => { /* don’t block on email failure */ });
}

/* ---------------- POST /api/reviews ---------------- */

export async function POST(req: Request) {
    try {
        const ip = req.headers.get('cf-connecting-ip') ?? req.headers.get('x-forwarded-for') ?? undefined;
        const raw = await readBody(req);
        if (!raw) return NextResponse.json({ ok: false, error: 'Invalid JSON or FormData' }, { status: 400 });

        const payload = toPayload(raw);
        if (!isEmail(payload.email || '')) {
            return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
        }

        const ok = await verifyTurnstile(payload.token, ip);
        if (!ok) return NextResponse.json({ ok: false, error: 'Turnstile verification failed' }, { status: 400 });

        await maybeEmail(payload);

        const { env } = getRequestContext();
        const kv = (env as unknown as { REVIEWS?: KVNamespaceLite }).REVIEWS;
        if (kv) {
            const key = 'stats';
            const curRaw = await kv.get(key);
            const cur: Stats = curRaw ? JSON.parse(curRaw) as Stats : { count: 0, sum: 0, avg: 0 };
            const next: Stats = {
                count: cur.count + 1,
                sum: cur.sum + payload.rating,
                avg: Math.round(((cur.sum + payload.rating) / (cur.count + 1)) * 10) / 10
            };
            await kv.put(key, JSON.stringify(next), { expirationTtl: 60 * 60 * 24 * 365 });
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        const msg = e instanceof Error ? e.message : 'Unexpected error';
        return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }
}
