import { strict as assert } from 'node:assert';
import { POST } from '../src/app/api/reviews/route';

async function read(res: Response) {
  const data = await res.json();
  return data as Record<string, unknown>;
}

// valid review should succeed
export async function test_valid_review() {
  const req = new Request('http://localhost/api/reviews', {
    method: 'POST',
    body: JSON.stringify({ name: 'A', text: 'B', rating: 5 })
  });
  const res = await POST(req);
  assert.equal(res.status, 200);
  const json = await read(res);
  assert.equal(json.ok, true);
  assert.ok(json.review);
}

// missing fields should fail
export async function test_invalid_review() {
  const req = new Request('http://localhost/api/reviews', { method: 'POST', body: '{}' });
  const res = await POST(req);
  assert.equal(res.status, 400);
}
