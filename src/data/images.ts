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
        src: "/gallery/0D1EA119-6D65-43D8-8FA2-2FCB20ADCFBE.jpg",
        alt: "Sunlit membership table staged for an intimate service.",
        aspectRatio: "3 / 2",
    },
    heroConsult: {
        src: "/gallery/A10D18FD-4036-474F-B1F3-73430DE9F744.jpg",
        alt: "Artichoke hearts and Amalfi lemon prepared for strategy tasting.",
        aspectRatio: "3 / 2",
    },
    heroPricing: {
        src: "/gallery/A10D18FD-4036-474F-B1F3-73430DE9F744.jpg",
        alt: "Preserved produce staged for planning the next season’s ledger.",
        aspectRatio: "4 / 3",
    },
    heroGallery: {
        src: "/gallery/D40AFFC1-3D32-49CF-9FC3-0D7DCD661645.jpg",
        alt: "Signature course with Riesling pairings in dappled afternoon light.",
        aspectRatio: "21 / 16",
    },
    heroPress: {
        src: "/gallery/B8FBB31E-B185-4FD6-B6AD-C694DE95E5D8.jpg",
        alt: "Press evening in the kitchen as plates move across the pass.",
        aspectRatio: "16 / 9",
    },
    heroReviews: {
        src: "/gallery/D40AFFC1-3D32-49CF-9FC3-0D7DCD661645.jpg",
        alt: "Guests savoring a lobster course paired with white Burgundy.",
        aspectRatio: "3 / 2",
    },
    heroContact: {
        src: "/gallery/975422A7-4688-46A3-B590-BD389A70A75B.jpg",
        alt: "Hands finishing a composed course before service emails go out.",
        aspectRatio: "3 / 2",
    },
    heroAdminLeads: {
        src: "/gallery/B8FBB31E-B185-4FD6-B6AD-C694DE95E5D8.jpg",
        alt: "Operations team overseeing the pass during a busy service.",
        aspectRatio: "16 / 9",
    },
    sectionHomeValues: {
        src: "/gallery/A10D18FD-4036-474F-B1F3-73430DE9F744.jpg",
        alt: "Seasonal artichoke hearts and Amalfi lemon on linen.",
        aspectRatio: "4 / 5",
    },
    sectionHomeIncluded: {
        src: "/gallery/B8FBB31E-B185-4FD6-B6AD-C694DE95E5D8.jpg",
        alt: "Service choreography at the kitchen pass.",
        aspectRatio: "3 / 4",
    },
    sectionHomeTestimonials: {
        src: "/gallery/D40AFFC1-3D32-49CF-9FC3-0D7DCD661645.jpg",
        alt: "Salon finale with a plated lobster course and wine pairing.",
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
        src: "/gallery/A10D18FD-4036-474F-B1F3-73430DE9F744.jpg",
        alt: "Artichoke hearts and Amalfi lemon ready for the mise en place.",
        caption: "Artichoke coeur, preserved lemon, dill pollen",
        width: 1600,
        height: 1067,
    },
    homeGallerySix: {
        src: "/gallery/975422A7-4688-46A3-B590-BD389A70A75B.jpg",
        alt: "Herbaceous course plated with edible blooms.",
        caption: "Wild greens, nasturtium, cultured cream",
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
