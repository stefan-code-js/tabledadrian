// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import React from "react";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import AppMotionRoot from "@/components/AppMotionRoot";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { serif, sans } from "@/lib/fonts";

export const runtime = "edge";

export const metadata: Metadata = {
    title: {
        default: `${site.name} | Private dining on the Riviera`,
        template: `%s | ${site.shortName}`,
    },
    description: site.description,
    keywords: site.keywords,
    applicationName: site.shortName,
    alternates: { canonical: site.url },
    openGraph: {
        type: "website",
        url: site.url,
        title: site.name,
        description: site.description,
        siteName: site.name,
        locale: site.locale,
        images: ["/og.jpg"],
    },
    twitter: {
        card: "summary_large_image",
        title: site.name,
        description: site.description,
        images: ["/og.jpg"],
    },
    robots: { index: true, follow: true },
    icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
    authors: [{ name: site.name, url: site.url }],
};

export const viewport: Viewport = {
    themeColor: "#f7f3ed",
    colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    const cfToken = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;
    const cfBeacon = cfToken ? JSON.stringify({ token: cfToken, spa: true }) : undefined;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        name: site.name,
        url: site.url,
        description: site.description,
        email: site.email,
        telephone: site.telephone || undefined,
        address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: site.address.locality,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country,
        },
        servesCuisine: site.cuisines,
        areaServed: site.serviceArea.map((city) => ({ "@type": "City", name: city })),
        sameAs: [site.socials.instagram, site.socials.linkedin].filter(Boolean),
    };

    return (
        <html lang={site.locale}>
            <body className={`${sans.variable} ${serif.variable} theme-linen`}>
                <a className="skip-link" href="#main">Skip to content</a>
                <SiteHeader />
                <main id="main" role="main">
                    <AppMotionRoot>{children}</AppMotionRoot>
                </main>
                <Footer />
                <Script
                    src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                    strategy="afterInteractive"
                    defer
                />
                {plausibleDomain ? (
                    <Script
                        id="plausible-analytics"
                        src="https://plausible.io/js/script.js"
                        data-domain={plausibleDomain}
                        strategy="afterInteractive"
                        defer
                    />
                ) : null}
                {cfBeacon ? (
                    <Script
                        id="cloudflare-analytics"
                        src="https://static.cloudflareinsights.com/beacon.min.js"
                        strategy="afterInteractive"
                        data-cf-beacon={cfBeacon}
                    />
                ) : null}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </body>
        </html>
    );
}
