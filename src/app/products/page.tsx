import type { Metadata } from 'next';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import TrustSection from '@/components/TrustSection';
import { site } from '@/lib/site';

export const metadata: Metadata = {
    title: 'Products & Services',
    description: 'Current offerings from Table d\u2019Adrian',
    alternates: { canonical: '/products' },
    openGraph: {
        title: 'Products & Services',
        description: 'Current offerings from Table d\u2019Adrian',
        url: `${site.url}/products`,
    },
    twitter: {
        title: 'Products & Services',
        description: 'Current offerings from Table d\u2019Adrian',
    },
};

export default function ProductsPage() {
    const jsonLd = products.map((p) => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        description: p.description,
        offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            price: p.price,
            availability: 'https://schema.org/InStock',
            url: `${site.url}/products#${p.id}`,
        },
    }));

    return (
        <>
            <section className="section">
                <div className="container container--narrow">
                    <h1 className="title center-text">Products & Services</h1>
                    <div className="grid gap-8 mt-8">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </section>
            <TrustSection />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    );
}
