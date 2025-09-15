import { describe, it, expect } from 'vitest';
import { products } from '../src/data/products';

describe('products data', () => {
    it('has required fields', () => {
        for (const p of products) {
            expect(typeof p.id).toBe('string');
            expect(typeof p.name).toBe('string');
            expect(typeof p.price).toBe('number');
            expect(typeof p.priceId).toBe('string');
        }
    });
});
