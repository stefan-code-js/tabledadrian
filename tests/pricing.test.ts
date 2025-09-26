import { describe, it, expect } from 'vitest';
import { estimatePricing, getCalculatorOption } from '../src/lib/pricing';

describe('pricing calculator estimates', () => {
    it('respects included guests and addons', () => {
        const option = getCalculatorOption('signature');
        const estimate = estimatePricing(option, 16, ['wine']);
        expect(estimate.guestCount).toBe(16);
        expect(estimate.additionalGuests).toBe(4);
        expect(estimate.baseTotal.amount).toBe(2920);
        expect(estimate.enhancementsTotal.amount).toBe(480);
        expect(estimate.total.amount).toBe(3400);
        expect(estimate.deposit.amount).toBe(1000);
    });

    it('computes default deposit when not provided', () => {
        const option = getCalculatorOption('concierge');
        const estimate = estimatePricing(option, 2, ['labs']);
        expect(estimate.total).toBeTruthy();
        expect(estimate.deposit).toStrictEqual(option.deposit);
    });
});

