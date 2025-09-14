export type CheckoutMode = 'payment' | 'subscription';

export async function createCheckoutSession(opts: {
  priceId: string;
  mode: CheckoutMode;
  origin: string;
}): Promise<{ url?: string }> {
  const body = new URLSearchParams({
    mode: opts.mode,
    'line_items[0][price]': opts.priceId,
    'line_items[0][quantity]': '1',
    success_url: `${opts.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${opts.origin}`,
    automatic_tax: 'enabled',
  });

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return (await res.json()) as { url?: string };
}
