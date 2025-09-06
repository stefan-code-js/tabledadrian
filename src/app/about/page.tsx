import type { Metadata } from 'next';
import About from '@/components/About';
import { site } from '@/lib/site';

export const metadata: Metadata = {
    title: 'About',
    description:
        'Table d’Adrian is a plant-based fine dining atelier on the Côte d’Azur — ritual, aroma, and texture crafted into story.',
    alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
    return <About />;
}
