import { describe, it, expect, vi } from 'vitest';

vi.mock('@/components/immersive/LuxuryHeroExperience', () => ({
    __esModule: true,
    default: () => null,
}));

describe('structured page rendering', () => {
    it('returns an editorial article with the hero component', async () => {
        const { default: HomePage } = await import('../src/app/page');
        const { PageHero } = await import('../src/components/StructuredPage');
        const element = HomePage() as any;
        expect(element).toBeTruthy();
        expect(element.type).toBe('article');
        const children = Array.isArray(element.props.children)
            ? element.props.children
            : [element.props.children];
        const hero = children.find((child: any) => child?.type === PageHero);
        expect(hero).toBeTruthy();
    });
});
