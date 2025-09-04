/**
 * Stripe Checkout creation endpoint. Creates a subscription session for the selected
 * membership tier and returns the Checkout URL. Runs on the edge. Ensure
 * STRIPE_SECRET_KEY and price IDs (STRIPE_PRICE_SALON, etc.) are set in env.
 */
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { tier, email, referral } = await req.json();
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return new Response(JSON.stringify({ ok: false, message: 'Stripe not configured' }), { status: 500 });
    }
    const price = tier === 'tasting' ? process.env.STRIPE_PRICE_TASTING : tier === 'patron' ? process.env.STRIPE_PRICE_PATRON : process.env.STRIPE_PRICE_SALON;
    if (!price) {
      return new Response(JSON.stringify({ ok: false, message: 'Invalid tier' }), { status: 400 });
    }
    const site = process.env.SITE_URL || 'https://www.tabledadrian.com';
    const params = new URLSearchParams({
      mode: 'subscription',
      'line_items[0][price]': String(price),
      'line_items[0][quantity]': '1',
      success_url: `${site}/success`,
      cancel_url: `${site}/#membership`,
    });
    // Attach a client_reference_id so you can identify the referral code in Stripe dashboard
    if (referral) params.append('client_reference_id', referral);
    if (email) params.append('customer_email', email);
    const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    if (!resp.ok) {
      const errText = await resp.text();
      return new Response(JSON.stringify({ ok: false, message: errText }), { status: 500 });
    }
    const data = await resp.json();
    return new Response(JSON.stringify({ ok: true, url: data.url }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}