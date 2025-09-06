import type { Metadata } from 'next';
import Book from '@/components/Book';
import { site } from '@/lib/site';

export const metadata: Metadata = {
    title: 'Book',
    description:
        'Reserve a private, plant-based tasting menu with Table d’Adrian on the Côte d’Azur. Quiet luxury, seasonal ritual.',
    alternates: { canonical: `${site.url}/book` },
};

export default function BookPage() {
    // Minimal RestaurantReservation JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Restaurant',
        name: site.name,
        url: `${site.url}/book`,
        potentialAction: {
            '@type': 'ReserveAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://cal.com/adrian-stefan/event',
                actionApplication: { '@type': 'WebApplication', name: 'Cal.com' },
            },
            result: { '@type': 'Reservation', name: 'Private tasting menu reservation' },
        },
    };

    return (
        <>
            <Book />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    );
}
