import { describe, it, expect } from 'vitest';
import { formatCurrency } from '../src/lib/utils';

describe('formatCurrency', () => {
    it('formats numbers as EUR', () => {
        expect(formatCurrency(10)).toBe('€10.00');
    });
});
