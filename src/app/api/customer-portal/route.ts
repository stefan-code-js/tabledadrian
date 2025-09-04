/**
 * Generate a Stripe Customer Portal session. Provide a `customerId` in the body.
 * The session URL allows a member to manage their subscription (update payment
 * details, change plan, cancel). Runs on the edge. Requires STRIPE_SECRET_KEY
 * and SITE_URL in environment variables.
 */
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { customerId, returnUrl } = await req.json();
    if (!customerId) {
      return new Response(JSON.stringify({ ok: false, message: 'customerId required' }), { status: 400 });
    }
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return new Response(JSON.stringify({ ok: false, message: 'Stripe not configured' }), { status: 500 });
    }
    const site = process.env.SITE_URL || 'https://www.tabledadrian.com';
    const params = new URLSearchParams({
      customer: customerId,
      return_url: returnUrl || `${site}/success`,
    });
    const resp = await fetch('https://api.stripe.com/v1/billing_portal/sessions', {
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