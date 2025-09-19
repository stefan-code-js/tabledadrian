export const runtime = 'edge';

import { NextRequest } from 'next/server';
import { createCheckoutSession } from '@/lib/checkout';
import { priceCatalog } from '@/lib/pricing';

type Mode = 'payment' | 'subscription';

const ALLOWED_PRICE_IDS = new Set(Object.values(priceCatalog).map((entry) => entry.id));

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

        const session = await createCheckoutSession(
            priceId,
            mode,
            fetch,
            req.nextUrl.origin,
            process.env.STRIPE_SECRET_KEY
        );
        return new Response(JSON.stringify({ url: session.url }), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ error: 'Bad request' }), { status: 400 });
    }
}
