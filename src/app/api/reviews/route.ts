export const runtime = 'edge';

export async function POST(req: Request) {
    const body = await req.json().catch(() => null);
    if (!body) return new Response(JSON.stringify({ error: 'invalid JSON' }), { status: 400 });

    // Honeypot (already in your form)
    if (typeof body.company === 'string' && body.company.trim() !== '') {
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // OPTIONAL Turnstile
    const USE_TURNSTILE = !!process.env.TURNSTILE_SECRET; // set in CF env if you want it
    if (USE_TURNSTILE) {
        const token = body['cf-turnstile-response'] || body.turnstileToken || '';
        if (!token) {
            return new Response(JSON.stringify({ error: 'missing turnstile token' }), { status: 400 });
        }
        const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret: process.env.TURNSTILE_SECRET as string,
                response: token,
                // optional: remoteip: (req.headers.get('cf-connecting-ip') ?? '')
            }),
        }).then(r => r.json()).catch(() => null);

        if (!verify?.success) {
            return new Response(JSON.stringify({ error: 'turnstile failed' }), { status: 400 });
        }
    }

    // Basic validation
    const name = (body.name ?? '').toString().slice(0, 80);
    const text = (body.text ?? '').toString().trim().slice(0, 600);
    const rating = Math.max(1, Math.min(5, Number(body.rating) || 0));

    if (!text || !rating) {
        return new Response(JSON.stringify({ error: 'missing text or rating' }), { status: 400 });
    }

    // (Optional) soft rate-limit by IP (best-effort; not persistent across isolates)
    const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown';
    // implement a tiny in-memory Map if you want; safe to skip for now

    // Persist to your storage here (D1/KV/Supabase/etc.)
    // For now you can no-op and just return ok:
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
