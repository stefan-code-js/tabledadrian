"use server";

import { cache } from "react";
import { createClient, type SanityClient } from "@sanity/client";
import groq from "groq";

import { images, type ImageAsset, type ImageSlug, FALLBACK_BLUR_DATA_URL } from "@/data/images";

const sanityProjectId = process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? null;
const sanityDataset = process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? null;
const sanityApiVersion = process.env.SANITY_API_VERSION ?? "2023-10-01";
const sanityToken =
    process.env.SANITY_API_TOKEN ?? process.env.SANITY_TOKEN ?? process.env.NEXT_PUBLIC_SANITY_TOKEN ?? null;

let cachedClient: SanityClient | null = null;

function getSanityClient(): SanityClient | null {
    if (!sanityProjectId || !sanityDataset || !sanityApiVersion) {
        return null;
    }

    if (!cachedClient) {
        cachedClient = createClient({
            projectId: sanityProjectId,
            dataset: sanityDataset,
            apiVersion: sanityApiVersion,
            useCdn: !sanityToken,
            token: sanityToken ?? undefined,
            perspective: "published",
        });
    }

    return cachedClient;
}

const FALLBACK_GALLERY_SLUGS: readonly ImageSlug[] = [
    "homeGalleryOne",
    "homeGalleryTwo",
    "homeGalleryThree",
    "homeGalleryFour",
    "homeGalleryFive",
    "homeGallerySix",
];

const FALLBACK_GALLERY_ASSETS: ImageAsset[] = FALLBACK_GALLERY_SLUGS.map((slug) => images[slug]);

type GalleryDocument = {
    _id?: string;
    slug?: { current?: string } | string;
    title?: string;
    caption?: string;
    credit?: string;
    alt?: string;
    image?: {
        alt?: string;
        caption?: string;
        credit?: string;
        asset?: {
            url?: string;
            metadata?: {
                dimensions?: { width?: number; height?: number };
                lqip?: string;
            };
        };
    };
};

const galleryQuery = groq`*[_type == "galleryImage" && defined(image.asset)] | order(coalesce(orderRank, order, _createdAt) asc) {
    _id,
    title,
    caption,
    credit,
    alt,
    slug,
    image {
        alt,
        caption,
        credit,
        asset-> {
            url,
            metadata {
                dimensions,
                lqip
            }
        }
    }
}`;

function coerceSlug(doc: GalleryDocument, index: number): string {
    if (typeof doc.slug === "string" && doc.slug.trim()) {
        return doc.slug.trim();
    }
    if (doc.slug && typeof doc.slug === "object" && typeof doc.slug.current === "string" && doc.slug.current.trim()) {
        return doc.slug.current.trim();
    }
    if (doc._id && doc._id.trim()) {
        return doc._id.trim();
    }
    return `gallery-${index}`;
}

function coerceText(...values: Array<string | undefined>): string {
    for (const value of values) {
        if (typeof value === "string" && value.trim()) {
            return value.trim();
        }
    }
    return "Gallery image";
}

function coerceDimension(value: unknown, fallback: number): number {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
        return Math.round(value);
    }
    return fallback;
}

function mapDocumentToImageAsset(doc: GalleryDocument, index: number): ImageAsset | null {
    const url = doc.image?.asset?.url;
    if (typeof url !== "string" || url.length === 0) {
        return null;
    }

    const width = coerceDimension(doc.image?.asset?.metadata?.dimensions?.width, 1600);
    const height = coerceDimension(doc.image?.asset?.metadata?.dimensions?.height, 1600);
    const blurDataURL =
        typeof doc.image?.asset?.metadata?.lqip === "string" && doc.image.asset.metadata.lqip.trim()
            ? doc.image.asset.metadata.lqip
            : FALLBACK_BLUR_DATA_URL;

    const placeholder = blurDataURL ? "blur" : "empty";

    return {
        slug: coerceSlug(doc, index),
        src: url,
        alt: coerceText(doc.image?.alt, doc.alt, doc.title),
        caption: doc.image?.caption ?? doc.caption ?? undefined,
        credit: doc.image?.credit ?? doc.credit ?? undefined,
        width,
        height,
        blurDataURL,
        placeholder,
    } satisfies ImageAsset;
}

export const fetchLuxuryGalleryImages = cache(async (): Promise<ImageAsset[]> => {
    const client = getSanityClient();
    if (!client) {
        return FALLBACK_GALLERY_ASSETS;
    }

    try {
        const documents = await client.fetch<GalleryDocument[]>(galleryQuery);
        const assets = documents
            .map((doc, index) => mapDocumentToImageAsset(doc, index))
            .filter((value): value is ImageAsset => Boolean(value));

        if (assets.length === 0) {
            return FALLBACK_GALLERY_ASSETS;
        }

        return assets;
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("Failed to load Sanity gallery", error);
        }
        return FALLBACK_GALLERY_ASSETS;
    }
});

