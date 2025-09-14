export const runtime = 'edge';

import { NextRequest } from 'next/server';
import { createCheckoutSession, CheckoutMode } from '@/lib/stripe';

const ALLOWED_PRICE_IDS = new Set(
    [
        process.env.PRICE_CONSULT_REMOTE,
        process.env.PRICE_CONSULT_INPERSON,
        process.env.PRICE_MEMBERSHIP_SEASONAL,
        process.env.PRICE_MEMBERSHIP_VILLA,
        process.env.PRICE_MEMBERSHIP_YACHT,
    ].filter(Boolean) as string[]
);

export async function POST(req: NextRequest) {
    try {
        const { priceId, mode }: { priceId: string; mode: CheckoutMode } = await req.json();

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
        const session = await createCheckoutSession({ priceId, mode, origin });
        return new Response(JSON.stringify({ url: session.url }), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ error: 'Bad request' }), { status: 400 });
    }
}
