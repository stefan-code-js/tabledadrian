import { describe, it, expect } from 'vitest';
import { POST } from '../src/app/api/reviews/route';

describe('reviews API', () => {
  it('accepts valid review', async () => {
    const req = new Request('http://localhost/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ name: 'A', text: 'B', rating: 5 })
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = (await res.json()) as Record<string, unknown>;
    expect(json.ok).toBe(true);
    expect(json.review).toBeTruthy();
  });

  it('rejects invalid review', async () => {
    const req = new Request('http://localhost/api/reviews', {
      method: 'POST',
      body: '{}'
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
