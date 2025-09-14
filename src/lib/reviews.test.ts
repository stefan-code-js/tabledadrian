import test from 'node:test';
import assert from 'node:assert/strict';
import { validateReviewInput } from './reviews';

test('accepts valid payload', () => {
    const res = validateReviewInput({
        name: 'Jane',
        email: 'jane@example.com',
        rating: 5,
        message: 'Wonderful',
        token: 'tok',
    });
    assert.deepEqual(res, {
        ok: true,
        data: {
            name: 'Jane',
            email: 'jane@example.com',
            rating: 5,
            message: 'Wonderful',
            token: 'tok',
        },
    });
});

test('rejects invalid payload', () => {
    const res = validateReviewInput({ rating: 0, message: '', token: '' });
    assert.equal(res.ok, false);
});
