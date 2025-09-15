import { addOrder } from './orders';

export type Mode = 'payment' | 'subscription';

export async function createCheckoutSession(
    priceId: string,
    mode: Mode,
    fetchImpl: typeof fetch = fetch,
    origin = process.env.PUBLIC_BASE_URL || ''
): Promise<{ id: string; url?: string }> {
    const body = new URLSearchParams({
        mode,
        'line_items[0][price]': priceId,
        'line_items[0][quantity]': '1',
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cancel`,
        automatic_tax: 'enabled',
    });

    const r = await fetchImpl('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    });
    if (!r.ok) throw new Error(await r.text());
    const session = (await r.json()) as { id: string; url?: string };
    addOrder({ sessionId: session.id, priceId, mode });
    return session;
}
