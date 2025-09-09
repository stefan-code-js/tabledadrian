import type { Metadata } from 'next';
import About from '@/components/About';
import { site } from '@/lib/site';

export const metadata: Metadata = {
    title: 'About',
    description:
        'Table d’Adrian — Michelin-level, ingredient-driven cuisine on the Côte d’Azur. Nature-rooted storytelling across seasonal tasting menus.',
    alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
    return <About />;
}
