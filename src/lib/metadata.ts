import type { Metadata } from "next";
import type { PageContent, Tier } from "@/data/siteContent";
import { site } from "@/lib/site";
import { seoEntries, getSeoEntry, type SeoEntry } from "@/data/seo";

export type OpenGraphImage = {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
};

function normalizePath(path: string): string {
    if (!path) return "/";
    if (path.startsWith("http")) return path;
    return path.startsWith("/") ? path : `/${path}`;
}

export function absoluteUrl(path: string): string {
    const normalized = normalizePath(path);
    if (normalized.startsWith("http")) {
        return normalized;
    }
    const base = site.url.replace(/\/$/, "");
    return `${base}${normalized}`;
}

function sanitize(text: string | undefined, fallback: string): string {
    if (!text) return fallback;
    let buffer = "";
    for (const char of text) {
        const code = char.charCodeAt(0);
        if (code < 32 || code === 127) {
            continue;
        }
        buffer += char;
    }
    const cleaned = buffer.replace(/\s+/g, " ").trim();
    return cleaned || fallback;
}

function resolveOgImage(image: OpenGraphImage | string | undefined) {
    if (!image) {
        return [
            { url: absoluteUrl("/og.jpg"), width: 1200, height: 630, alt: site.description },
        ];
    }
    if (typeof image === "string") {
        return [{ url: absoluteUrl(image) }];
    }
    return [
        {
            url: absoluteUrl(image.url),
            width: image.width,
            height: image.height,
            alt: image.alt,
        },
    ];
}

type PageMetaParams = {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    image?: OpenGraphImage | string;
};

export function buildPageMetadata({ title, description, path, keywords, image }: PageMetaParams): Metadata {
    const canonical = absoluteUrl(path);
    const ogImages = resolveOgImage(image);

    return {
        title,
        description,
        keywords: keywords ?? site.keywords,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: site.name,
            type: "website",
            locale: site.locale,
            images: ogImages,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImages.map((img) => img.url),
        },
    } satisfies Metadata;
}

function fallbackSeoFromPage(page: PageContent): SeoEntry {
    const title = sanitize(page.hero?.title, `${site.name}`);
    const description = sanitize(page.hero?.description, site.description);
    return {
        path: page.path,
        title,
        description,
    };
}

export function createPageMetadata(page: PageContent): Metadata {
    const entry = getSeoEntry(page.path) ?? fallbackSeoFromPage(page);
    return buildPageMetadata({
        title: sanitize(entry.title, site.name),
        description: sanitize(entry.description, site.description),
        path: entry.path,
        keywords: entry.keywords ?? site.keywords,
        image: entry.image,
    });
}

export function createBreadcrumbJsonLd(page: Pick<PageContent, "path" | "hero" | "meta">): Record<string, unknown> {
    const base = site.url.replace(/\/$/, "");
    const entry = getSeoEntry(page.path);
    const segments = normalizePath(page.path).split("/").filter(Boolean);
    const items: Array<Record<string, unknown>> = [
        {
            "@type": "ListItem",
            position: 1,
            name: site.name,
            item: base || site.url,
        },
    ];

    segments.forEach((segment, index) => {
        const position = index + 2;
        const url = `${base}/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const fallbackName = segment.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
        const name = isLast ? sanitize(entry?.title ?? page.hero.title, fallbackName) : fallbackName;
        items.push({
            "@type": "ListItem",
            position,
            name,
            item: url,
        });
    });

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items,
    };
}

function tierToOffer(page: PageContent, tier: Tier) {
    const amount = tier.price?.replace(/[^0-9.,]/g, "");
    if (!amount) return null;
    const hydratedPrice = Number(amount.replace(/,/g, ""));
    if (!Number.isFinite(hydratedPrice) || hydratedPrice <= 0) {
        return null;
    }
    const url = tier.cta.type === "link" ? tier.cta.href : page.path;
    return {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: hydratedPrice,
        name: sanitize(tier.title, tier.id),
        url: absoluteUrl(url),
        availability: "https://schema.org/InStock",
    };
}

export function createProductJsonLd(page: PageContent): Record<string, unknown> | null {
    const offers = page.pricing.tiers
        .map((tier) => tierToOffer(page, tier))
        .filter((value): value is NonNullable<typeof value> => Boolean(value));
    if (!offers.length) return null;

    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: sanitize(page.hero.title, site.name),
        description: sanitize(page.hero.description, site.description),
        brand: {
            "@type": "Brand",
            name: site.name,
        },
        offers,
    };
}

export function buildOrganizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: site.name,
        url: site.url,
        description: site.description,
        email: site.email,
        telephone: site.telephone || undefined,
        sameAs: [site.socials.instagram, site.socials.linkedin].filter(Boolean),
        address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: site.address.locality,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country,
        },
    };
}

export function buildLocalBusinessJsonLd() {
    return {
        ...buildOrganizationJsonLd(),
        "@type": "LocalBusiness",
        priceRange: "€€€",
        servesCuisine: site.cuisines,
        areaServed: site.serviceArea.map((city) => ({ "@type": "City", name: city })),
    };
}

export { seoEntries };


