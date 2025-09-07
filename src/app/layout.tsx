// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { serif, sans } from "@/lib/fonts";
import { site } from "@/lib/site";
import React from "react";

export const viewport: Viewport = {
    themeColor: "#f8f6f1",
    colorScheme: "light",
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    title: {
        default: site.name,
        template: `%s · ${site.shortName}`,
    },
    description: site.description,
    keywords: site.keywords,
    alternates: { canonical: site.url },
    openGraph: {
        type: "website",
        url: site.url,
        title: site.name,
        siteName: site.shortName,
        description: site.description,
        locale: "en_US",
        images: [
            {
                url: `${site.url}/og.jpg`,
                width: 1200,
                height: 630,
                alt: site.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: site.name,
        description: site.description,
        images: [`${site.url}/og.jpg`],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
            { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
        other: [{ rel: "manifest", url: "/site.webmanifest" }]
    },
    applicationName: site.shortName,
    category: "Food & Drink"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        name: site.name,
        url: site.url,
        description: site.description,
        email: site.email,
        telephone: site.telephone,
        address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: site.address.locality,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country
        },
        areaServed: site.serviceArea?.map(city => ({ "@type": "City", name: city })),
        priceRange: "€€€",
        servesCuisine: site.cuisines,
        sameAs: [site.socials.instagram]
    } as const;

    return (
        <html
            lang={site.locale}
            className={`${serif.variable} ${sans.variable}`}
            style={{ scrollBehavior: "smooth" }}
        >
        <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        </body>
        </html>
    );
}
