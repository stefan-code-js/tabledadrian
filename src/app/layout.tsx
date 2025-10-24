// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import React from "react";
import SiteHeader from "@/components/SiteHeader";
import AppMotionRoot from "@/components/AppMotionRoot";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { accentFont, bodyFont, displayFont } from "@/lib/fonts";
import { buildPageMetadata, buildOrganizationJsonLd, buildLocalBusinessJsonLd } from "@/lib/metadata";
import { CookieConsent } from "@/components/CookieConsent";
import ConsentAwareAnalytics from "@/components/ConsentAwareAnalytics";
import LuxurySessionProvider from "@/components/SessionProvider";
import LiveConciergeChat from "@/components/LiveConciergeChat";
import Script from "next/script";
import AnalyticsProvider from "@/providers/AnalyticsProvider";
import Web3Providers from "@/providers/Web3Providers";

export const runtime = "nodejs";

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
    return (
        <html lang={site.locale}>
            <body className={`${bodyFont.variable} ${displayFont.variable} ${accentFont.variable} theme-linen`}>
                <LuxurySessionProvider>
                    <LiveConciergeChat />
                    <CookieConsent>
                        <AnalyticsProvider>
                            <Web3Providers>
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
                                <ConsentAwareAnalytics />
                                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
                                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
                            </Web3Providers>
                        </AnalyticsProvider>
                    </CookieConsent>
                </LuxurySessionProvider>
                <Script
                    id="cookie-consent-init"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                        `,
                    }}
                />
            </body>
        </html>
    );
}
