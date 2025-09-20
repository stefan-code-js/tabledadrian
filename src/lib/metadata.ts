import type { Metadata } from "next";
import type { PageContent, Tier } from "@/data/siteContent";
import { site } from "@/lib/site";

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

type OfferJsonLd = {
    "@type": "Offer";
    name: string;
    description: string;
    priceCurrency: string;
    price: number;
    availability: string;
    url: string;
};

function parsePrice(value: string): number | undefined {
    const match = value.match(/[\d.,]+/g);
    if (!match) return undefined;
    const joined = match.join("");
    if (!joined) return undefined;
    const lastDot = joined.lastIndexOf(".");
    let normalized: string;
    if (lastDot > -1) {
        const integer = joined.slice(0, lastDot).replace(/[.,]/g, "");
        const fractional = joined.slice(lastDot + 1);
        normalized = `${integer}.${fractional}`;
    } else {
        normalized = joined.replace(/[.,]/g, "");
    }
    const amount = Number(normalized);
    if (!Number.isFinite(amount) || amount <= 0) {
        return undefined;
    }
    return amount;
}

function tierToOffer(page: PageContent, tier: Tier): OfferJsonLd | null {
    const price = tier.price ? parsePrice(tier.price) : undefined;
    if (price === undefined) return null;
    const description = tier.description || tier.paragraphs.join(" ");
    const url = tier.cta.type === "link" ? absoluteUrl(tier.cta.href) : absoluteUrl(page.path);
    return {
        "@type": "Offer",
        name: tier.title,
        description,
        priceCurrency: "EUR",
        price,
        availability: "https://schema.org/InStock",
        url,
    };
}

function toTitleCase(slug: string): string {
    return slug
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

export function createBreadcrumbJsonLd(page: PageContent): Record<string, unknown> {
    const base = site.url.replace(/\/$/, "");
    const segments = page.path.split("/").filter(Boolean);
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
        const name = isLast ? page.meta.title ?? page.hero.title : toTitleCase(segment);
        items.push({
            "@type": "ListItem",
            position,
            name,
            item: url,
        });
    });

    if (items.length === 1) {
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items,
        };
    }

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items,
    };
}

function buildProductOffers(page: PageContent): OfferJsonLd[] {
    return page.pricing.tiers
        .map((tier) => tierToOffer(page, tier))
        .filter((value): value is OfferJsonLd => value !== null);
}

export function createProductJsonLd(page: PageContent): Record<string, unknown> | null {
    const offers = buildProductOffers(page);
    if (offers.length === 0) return null;

    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: page.hero.title,
        description: page.hero.description,
        brand: {
            "@type": "Brand",
            name: site.name,
        },
        offers,
    };
}

export function createPageMetadata(page: PageContent): Metadata {
    const canonicalPath = page.meta.canonical ?? page.path;
    const canonical = absoluteUrl(canonicalPath);
    const image = page.meta.image ?? "/og.jpg";
    const keywords = page.meta.keywords ?? site.keywords;

    return {
        title: page.meta.title,
        description: page.meta.description,
        keywords,
        alternates: { canonical },
        openGraph: {
            title: page.meta.title,
            description: page.meta.description,
            url: canonical,
            siteName: site.name,
            type: "website",
            locale: site.locale,
            images: [image],
        },
        twitter: {
            card: "summary_large_image",
            title: page.meta.title,
            description: page.meta.description,
            images: [image],
        },
    };
}
