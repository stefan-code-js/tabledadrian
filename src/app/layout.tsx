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
import { buildPageMetadata, buildOrganizationJsonLd, buildLocalBusinessJsonLd } from "@/lib/metadata";

export const runtime = "edge";

export const metadata: Metadata = buildPageMetadata({
    title: `${site.name} | Private dining on the Riviera`,
    description: site.description,
    path: "/",
    keywords: site.keywords,
    image: "/og.jpg",
});

export const viewport: Viewport = {
    themeColor: "#f7f3ed",
    colorScheme: "light",
};

const organizationJsonLd = buildOrganizationJsonLd();
const localBusinessJsonLd = buildLocalBusinessJsonLd();

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    const cfToken = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;
    const cfBeacon = cfToken ? JSON.stringify({ token: cfToken, spa: true }) : undefined;

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
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
            </body>
        </html>
    );
}
