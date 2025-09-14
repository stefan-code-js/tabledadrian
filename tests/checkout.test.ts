import { strict as assert } from 'node:assert';
import { POST } from '../src/app/api/checkout/route';
import { NextRequest } from 'next/server';

export async function test_invalid_price() {
  process.env.STRIPE_SECRET_KEY = 'sk_test';
  process.env.PRICE_CONSULT_REMOTE = 'price_123';

  const req = new NextRequest('http://localhost/api/checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId: 'bad', mode: 'payment' })
  });
  const res = await POST(req);
  assert.equal(res.status, 400);
}

export async function test_success_checkout() {
  process.env.STRIPE_SECRET_KEY = 'sk_test';
  process.env.PRICE_CONSULT_REMOTE = 'price_123';

  const req = new NextRequest('http://localhost/api/checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId: 'price_123', mode: 'payment' })
  });

  const originalFetch = global.fetch;
  global.fetch = async () =>
    new Response(JSON.stringify({ url: 'https://stripe.test' }), { status: 200 }) as Response;
  const res = await POST(req);
  global.fetch = originalFetch;

  assert.equal(res.status, 200);
  const data = (await res.json()) as { url?: string };
  assert.equal(data.url, 'https://stripe.test');
}
