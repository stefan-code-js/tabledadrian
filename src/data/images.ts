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
        src: "/gallery/0D1EA119-6D65-43D8-8FA2-2FCB20ADCFBE.jpg",
        alt: "Golden morning light casting long shadows across a private dining table.",
        aspectRatio: "3 / 2",
    },
    heroHome: {
        src: "/gallery/IMG_3856.JPG",
        alt: "Table d’Adrian crest floating above a candlelit dining room.",
        aspectRatio: "16 / 9",
        priority: true,
    },
    heroAbout: {
        src: "/gallery/B8FBB31E-B185-4FD6-B6AD-C694DE95E5D8.jpg",
        alt: "Chefs coordinating at the pass inside a stainless kitchen.",
        aspectRatio: "16 / 9",
    },
    heroExperiences: {
        src: "/gallery/D40AFFC1-3D32-49CF-9FC3-0D7DCD661645.jpg",
        alt: "Lobster course finished at the table beside a chilled wine pairing.",
        aspectRatio: "21 / 16",
    },
    heroServices: {
        src: "/gallery/975422A7-4688-46A3-B590-BD389A70A75B.jpg",
        alt: "Chef pouring herb velouté into a composed garden course.",
        aspectRatio: "3 / 2",
    },
    heroMembership: {
        src: "/placeholder/hero-membership.svg",
        alt: "Salon dining room prepared for a private chef membership soirée with clinical wellness notes at each setting.",
        aspectRatio: "4 / 3",
    },
    heroConsult: {
        src: "/gallery/A10D18FD-4036-474F-B1F3-73430DE9F744.jpg",
        alt: "Artichoke hearts and Amalfi lemon prepared for strategy tasting.",
        aspectRatio: "3 / 2",
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
        src: "/gallery/975422A7-4688-46A3-B590-BD389A70A75B.jpg",
        alt: "Chef finishing a verdant garden course with herb velouté.",
        caption: "Garden herb velouté, brassica blooms, pickled radish",
        width: 1600,
        height: 1067,
    },
    homeGalleryTwo: {
        src: "/gallery/D40AFFC1-3D32-49CF-9FC3-0D7DCD661645.jpg",
        alt: "Signature crustacean course served beside chilled white wine.",
        caption: "Butter-poached lobster, saffron bisque, Riesling pairing",
        width: 1600,
        height: 1067,
    },
    homeGalleryThree: {
        src: "/gallery/0D1EA119-6D65-43D8-8FA2-2FCB20ADCFBE.jpg",
        alt: "Sun-washed terrace table with seasonal arrangements.",
        caption: "Sunlit aperitif terrace, rosemary smoke, Riviera citrus",
        width: 1600,
        height: 1067,
    },
    homeGalleryFour: {
        src: "/gallery/B8FBB31E-B185-4FD6-B6AD-C694DE95E5D8.jpg",
        alt: "Chef brigade working the pass for evening service.",
        caption: "Coordinated service pass, precision plating, brigade briefings",
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
