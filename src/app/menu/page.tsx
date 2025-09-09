import type { Metadata } from 'next';
import Menus from '@/components/Menus';
import { site } from '@/lib/site';

export const metadata: Metadata = {
    title: 'Menu',
    description:
        'Signature Tasting, Performance Dinner, and Salon Supper — seasonal, ingredient-driven tasting menus by Table d’Adrian.',
    alternates: { canonical: `${site.url}/menu` },
};

export default function MenuPage() {
    return <Menus />;
}
