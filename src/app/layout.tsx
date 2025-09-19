// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';
import { serif, sans } from '@/lib/fonts';
import React from 'react';
import Script from 'next/script'; // ← Turnstile loader

export const metadata: Metadata = {
    // no metadataBase → avoids IDE UMD warning on `new URL(...)`
    title: {
        default: site.name,
        template: `%s · ${site.shortName}`,
    },
    description: site.description,
    keywords: site.keywords,
    alternates: { canonical: site.url },
    openGraph: {
        type: 'website',
        url: site.url,
        title: site.name,
        description: site.description,
        siteName: site.name,
        images: ['/og.jpg'],
        locale: site.locale,
    },
    twitter: {
        card: 'summary_large_image',
        title: site.name,
        description: site.description,
        images: ['/og.jpg'],
    },
    icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
    robots: { index: true, follow: true },
};

export const viewport: Viewport = {
    themeColor: '#f8f6f1',
    colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Restaurant',
        name: site.name,
        url: site.url,
        description: site.description,
        telephone: site.telephone || undefined,
        address: {
            '@type': 'PostalAddress',
            streetAddress: site.address.street,
            addressLocality: site.address.locality,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country,
        },
        servesCuisine: site.cuisines,
        areaServed: site.serviceArea.map((city: string) => ({ '@type': 'City', name: city })),
        sameAs: [site.socials.instagram, site.socials.linkedin].filter(Boolean),
    };

    return (
        <html lang={site.locale}>
            <head />
            <body className={`${serif.variable} ${sans.variable}`}>
                <NavBar />

                {/* Keep focusable main for a11y; skip link can be re-added later */}
                <main id="content" tabIndex={-1}>
                    {children}
                </main>

                <Footer />

                {/* Cloudflare Turnstile (loads once app-wide) */}
                <Script
                    src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                    strategy="afterInteractive"
                    defer
                />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </body>
        </html>
    );
}
