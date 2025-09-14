import { describe, it, expect, vi } from 'vitest';
import { POST } from '../src/app/api/checkout/route';
import { NextRequest } from 'next/server';

describe('checkout API', () => {
  it('rejects invalid price', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test';
    process.env.PRICE_CONSULT_REMOTE = 'price_123';

    const req = new NextRequest('http://localhost/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ priceId: 'bad', mode: 'payment' })
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('creates session for valid price', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test';
    process.env.PRICE_CONSULT_REMOTE = 'price_123';

    const req = new NextRequest('http://localhost/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ priceId: 'price_123', mode: 'payment' })
    });

    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        new Response(JSON.stringify({ url: 'https://stripe.test' }), { status: 200 }) as Response
      );
    const res = await POST(req);
    fetchMock.mockRestore();

    expect(res.status).toBe(200);
    const data = (await res.json()) as { url?: string };
    expect(data.url).toBe('https://stripe.test');
  });
});
