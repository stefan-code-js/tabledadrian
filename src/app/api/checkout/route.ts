export const runtime = 'nodejs';

import { NextRequest } from 'next/server';

type Mode = 'payment' | 'subscription';

const ALLOWED_PRICE_IDS = new Set(
    [
        process.env.PRICE_CONSULT_REMOTE,
        process.env.PRICE_CONSULT_INPERSON,
        process.env.PRICE_MEMBERSHIP_SEASONAL,
        process.env.PRICE_MEMBERSHIP_VILLA,
        process.env.PRICE_MEMBERSHIP_YACHT,
    ].filter(Boolean) as string[]
);

function params(data: Record<string, string>) {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(data)) p.append(k, v);
    return p;
}

export async function POST(req: NextRequest) {
    try {
        const { priceId, mode }: { priceId: string; mode: Mode } = await req.json();

        if (!process.env.STRIPE_SECRET_KEY) {
            return new Response(JSON.stringify({ error: 'Stripe key not configured' }), { status: 500 });
        }
        if (!priceId || !ALLOWED_PRICE_IDS.has(priceId)) {
            return new Response(JSON.stringify({ error: 'Unknown price' }), { status: 400 });
        }
        if (mode !== 'payment' && mode !== 'subscription') {
            return new Response(JSON.stringify({ error: 'Invalid mode' }), { status: 400 });
        }

        const origin = process.env.PUBLIC_BASE_URL || req.nextUrl.origin;
        const body = params({
            mode,
            'line_items[0][price]': priceId,
            'line_items[0][quantity]': '1',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}`,
            automatic_tax: 'enabled',
        });

        const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
        });

        if (!r.ok) return new Response(JSON.stringify({ error: await r.text() }), { status: 400 });

        const session = (await r.json()) as { url?: string };
        return new Response(JSON.stringify({ url: session.url }), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ error: 'Bad request' }), { status: 400 });
    }
}
