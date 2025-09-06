import type { Metadata } from 'next';
import Menus from '@/components/Menus';
import { site } from '@/lib/site';

export const metadata: Metadata = {
    title: 'Menu',
    description:
        'Three fixed, plant-based offerings by Table d’Adrian — Signature Tasting, Performance Dinner, and Salon Supper.',
    alternates: { canonical: `${site.url}/menu` },
};

export default function MenuPage() {
    return <Menus />;
}
