import { describe, it, expect, vi } from 'vitest';
import { createCheckoutSession } from '../src/lib/checkout';
import { getOrder } from '../src/lib/orders';

describe('createCheckoutSession', () => {
    it('records order and returns url', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ id: 'sess_1', url: 'https://stripe.test' }),
        });
        const session = await createCheckoutSession('price_test', 'payment', fetchMock as any, 'https://test', 'sk');
        expect(session.url).toBe('https://stripe.test');
        expect(getOrder('sess_1')).toBeTruthy();
    });
});
