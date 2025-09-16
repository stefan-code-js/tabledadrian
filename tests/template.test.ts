import { describe, it, expect } from 'vitest';
import HomePage from '../src/app/page';
import { PageHero } from '../src/components/StructuredPage';

describe('structured page rendering', () => {
    it('returns a section with the hero component', () => {
        const element = HomePage() as any;
        expect(element).toBeTruthy();
        expect(element.type).toBe('section');
        const container = element.props.children;
        expect(container.type).toBe('div');
        const children = Array.isArray(container.props.children)
            ? container.props.children
            : [container.props.children];
        const hero = children.find((child: any) => child?.type === PageHero);
        expect(hero).toBeTruthy();
    });
});
