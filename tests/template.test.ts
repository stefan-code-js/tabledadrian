import React from 'react';
import { describe, it, expect } from 'vitest';
import HomePage from '../src/app/page';
import { PageHero } from '../src/components/StructuredPage';

describe('structured page rendering', () => {
    it('returns an editorial article with the hero component', () => {
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
