const DEFAULT_BLUR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PtX6XwAAAABJRU5ErkJggg==";

type ImageDefinition = {
    src: string;
    alt: string;
    caption?: string;
    credit?: string;
    aspectRatio?: string;
    width?: number;
    height?: number;
    blurDataURL?: string;
    priority?: boolean;
};

const IMAGE_DEFINITIONS = {
    heroDefault: {
        src: "/placeholder/hero-default.svg",
        alt: "Soft daylight across a linen-covered table set with ceramics and herbs.",
        aspectRatio: "21 / 16",
    },
    heroHome: {
        src: "/placeholder/hero-home.svg",
        alt: "Editorial still of an ivory-clad table in warm coastal light.",
        aspectRatio: "3 / 4",
        priority: true,
    },
    heroAbout: {
        src: "/placeholder/hero-about.svg",
        alt: "Chef plating a composed course under soft light.",
        aspectRatio: "3 / 4",
    },
    heroExperiences: {
        src: "/placeholder/hero-experiences.svg",
        alt: "Evening coastline beyond a candlelit terrace.",
        aspectRatio: "21 / 16",
    },
    heroServices: {
        src: "/placeholder/hero-products.svg",
        alt: "Curated pantry with crystal and linen set for service.",
        aspectRatio: "4 / 3",
    },
    heroMembership: {
        src: "/placeholder/hero-membership.svg",
        alt: "Salon dining room prepared for a private chef membership soirée with clinical wellness notes at each setting.",
        aspectRatio: "4 / 3",
    },
    heroConsult: {
        src: "/placeholder/hero-consult.svg",
        alt: "Consultation desk with provenance notes and citrus.",
        aspectRatio: "4 / 3",
    },
    heroPricing: {
        src: "/placeholder/hero-pricing-calculator.svg",
        alt: "Editorial still of ledger, fountain pen, and seasonal outline.",
        aspectRatio: "5 / 4",
    },
    heroGallery: {
        src: "/placeholder/hero-gallery.svg",
        alt: "Cinematic composite of service moments.",
        aspectRatio: "21 / 16",
    },
    heroPress: {
        src: "/placeholder/hero-press.svg",
        alt: "Stacks of newsprint beside porcelain cup.",
        aspectRatio: "3 / 4",
    },
    heroReviews: {
        src: "/placeholder/hero-reviews.svg",
        alt: "Guests gathered at a candlelit table.",
        aspectRatio: "3 / 4",
    },
    heroContact: {
        src: "/placeholder/hero-contact.svg",
        alt: "Correspondence desk awaiting booking details.",
        aspectRatio: "3 / 4",
    },
    heroAdminLeads: {
        src: "/placeholder/hero-admin-leads.svg",
        alt: "Handwritten notes beside a porcelain cup on a marble surface.",
        aspectRatio: "3 / 4",
    },
    sectionHomeValues: {
        src: "/placeholder/section-home-values.svg",
        alt: "Seasonal produce prepared for service mise en place.",
        aspectRatio: "4 / 5",
    },
    sectionHomeIncluded: {
        src: "/placeholder/section-home-included.svg",
        alt: "Service choreography captured mid-motion.",
        aspectRatio: "3 / 4",
    },
    sectionHomeTestimonials: {
        src: "/placeholder/section-home-testimonials.svg",
        alt: "Salon finale with digestifs under candlelight.",
        aspectRatio: "3 / 4",
    },
    portraitAdrian: {
        src: "/placeholder/portrait-adrian.svg",
        alt: "Portrait of Chef Adrian in pressed whites.",
        aspectRatio: "4 / 5",
    },
    portraitAntonia: {
        src: "/placeholder/portrait-antonia.svg",
        alt: "Portrait of Antonia overseeing wellness protocols.",
        aspectRatio: "4 / 5",
    },
    homeGalleryOne: {
        src: "/placeholder/gallery-01.svg",
        alt: "Linen-draped private table with candlelight.",
        caption: "Clarified langoustine broth, citrus oil, hand-thrown porcelain",
        width: 1600,
        height: 1067,
    },
    homeGalleryTwo: {
        src: "/placeholder/gallery-02.svg",
        alt: "Seasonal herbs prepared for service mise.",
        caption: "Garden herbs, cultured cream, smoked salt",
        width: 1600,
        height: 1067,
    },
    homeGalleryThree: {
        src: "/placeholder/gallery-03.svg",
        alt: "Cellar shelves curated for the evening pairings.",
        caption: "Glazed young carrot, ember oil, kombu glaze",
        width: 1600,
        height: 1067,
    },
    homeGalleryFour: {
        src: "/placeholder/gallery-04.svg",
        alt: "Salon finale with digestifs and petits fours.",
        caption: "Sea stone, razor clam, preserved lemon",
        width: 1600,
        height: 1067,
    },
    homeGalleryFive: {
        src: "/placeholder/gallery-05.svg",
        alt: "Handblown glass coupe with reductions",
        caption: "Handblown glass, cold-brewed hibiscus, slow reductions",
        width: 1600,
        height: 1067,
    },
    homeGallerySix: {
        src: "/placeholder/gallery-06.svg",
        alt: "Cocoa husk dessert with citrus peel",
        caption: "Cocoa husk, citrus peel, aged honey",
        width: 1600,
        height: 1067,
    },
} as const satisfies Record<string, ImageDefinition>;

export type ImageSlug = keyof typeof IMAGE_DEFINITIONS;

export type ImageAsset = ImageDefinition & {
    slug: ImageSlug;
    width: number;
    height: number;
    blurDataURL: string;
    placeholder: "blur" | "empty";
};

function parseAspectRatio(value?: string): [number, number] {
    if (!value) {
        return [1, 1];
    }
    const parts = value.split("/").map((part) => Number(part.trim()));
    if (parts.length !== 2 || parts.some((part) => !Number.isFinite(part) || part <= 0)) {
        return [1, 1];
    }
    return [parts[0], parts[1]];
}

function deriveDimensions(definition: ImageDefinition): { width: number; height: number } {
    if (definition.width && definition.height) {
        return { width: definition.width, height: definition.height };
    }
    const [ratioWidth, ratioHeight] = parseAspectRatio(definition.aspectRatio);
    if (ratioWidth >= ratioHeight) {
        const width = 1600;
        const height = Math.max(1, Math.round((ratioHeight / ratioWidth) * width));
        return { width, height };
    }
    const height = 1600;
    const width = Math.max(1, Math.round((ratioWidth / ratioHeight) * height));
    return { width, height };
}

function resolveImage(slug: ImageSlug, definition: ImageDefinition): ImageAsset {
    const { width, height } = deriveDimensions(definition);
    const blurDataURL = definition.blurDataURL ?? DEFAULT_BLUR;
    const placeholder: "blur" | "empty" = blurDataURL ? "blur" : "empty";

    return {
        slug,
        ...definition,
        width,
        height,
        blurDataURL,
        placeholder,
    };
}

export const images: Record<ImageSlug, ImageAsset> = Object.fromEntries(
    Object.entries(IMAGE_DEFINITIONS).map(([slug, definition]) => [slug, resolveImage(slug as ImageSlug, definition)])
) as Record<ImageSlug, ImageAsset>;

export function getImage(slug: ImageSlug): ImageAsset {
    const asset = images[slug];
    if (!asset) {
        throw new Error(`Unknown image slug: ${slug}`);
    }
    return asset;
}

export const imageList: ImageAsset[] = Object.values(images);
