const DEFAULT_BLUR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PtX6XwAAAABJRU5ErkJggg==";

export const FALLBACK_BLUR_DATA_URL = DEFAULT_BLUR;

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
        src: "/gallery/atelier-salon-01.jpg",
        alt: "Private dining salon glowing with candlelight and crystal.",
        width: 2048,
        height: 1366,
    },
    heroHome: {
        src: "/gallery/A10D18FD-4036-474F-B1F3-73430DE9F744.webp",
        alt: "Chef Adrian finishing a plated course on a marble pass.",
        width: 6000,
        height: 4000,
        priority: true,
    },
    heroAbout: {
        src: "/gallery/0D1EA119-6D65-43D8-8FA2-2FCB20ADCFBE.webp",
        alt: "Terrace dining table set with cut crystal and linens before service.",
        width: 5603,
        height: 3735,
    },
    heroExperiences: {
        src: "/gallery/4D5C8C1F-FA19-43BA-A303-705DDA9205C6.webp",
        alt: "Brigade plating tasting menu courses in the atelier kitchen.",
        width: 6240,
        height: 4160,
    },
    heroServices: {
        src: "/gallery/atelier-salon-02.jpg",
        alt: "Candlelit private dining room prepared for an evening chapter.",
        width: 1366,
        height: 2048,
    },
    heroMembership: {
        src: "/gallery/B8FBB31E-B185-4FD6-B6AD-C694DE95E5D8.webp",
        alt: "Guests gathered around a softly lit private dining table.",
        width: 5413,
        height: 3609,
    },
    heroConsult: {
        src: "/gallery/D40AFFC1-3D32-49CF-9FC3-0D7DCD661645.webp",
        alt: "Intake notes and plating plans spread across the pass.",
        width: 6720,
        height: 4480,
    },
    heroPricing: {
        src: "/gallery/atelier-salon-03.jpg",
        alt: "Line of plated courses staged beside wine pairings.",
        width: 1366,
        height: 2048,
    },
    heroGallery: {
        src: "/gallery/975422A7-4688-46A3-B590-BD389A70A75B.webp",
        alt: "Butter-poached lobster plated with saffron bisque and herbs.",
        width: 4023,
        height: 2665,
    },
    heroPress: {
        src: "/gallery/atelier-salon-04.jpg",
        alt: "Vintage stationery, tasting menus, and fountain pen ready for press.",
        width: 1206,
        height: 1136,
    },
    heroReviews: {
        src: "/gallery/atelier-salon-05.jpg",
        alt: "Guests raising a toast at a candlelit salon table.",
        width: 1206,
        height: 1165,
    },
    heroContact: {
        src: "/gallery/atelier-salon-06.jpg",
        alt: "Fountain pen resting on handwritten correspondence and envelopes.",
        width: 1150,
        height: 2048,
    },
    heroAdminLeads: {
        src: "/gallery/atelier-salon-07.jpg",
        alt: "Operations binder, laptop, and scheduling notes during lead review.",
        width: 1206,
        height: 1129,
    },
    sectionHomeValues: {
        src: "/gallery/caleb-stokes-hz4YhG39q2s-unsplash.jpg",
        alt: "Chef torching seasonal produce during mise en place.",
        width: 4032,
        height: 3025,
    },
    sectionHomeIncluded: {
        src: "/gallery/atelier-salon-08.jpg",
        alt: "Service brigade arranging linens and glassware before guests arrive.",
        width: 1366,
        height: 2048,
    },
    sectionHomeTestimonials: {
        src: "/gallery/marc-babin-ecGZWPOvya0-unsplash.jpg",
        alt: "Guests sharing dessert courses beneath candlelight.",
        width: 4368,
        height: 2912,
    },
    portraitAdrian: {
        src: "/gallery/atelier-salon-09.jpg",
        alt: "Chef Adrian finishing a plated course inside the atelier kitchen.",
        width: 1366,
        height: 2048,
    },
    portraitAntonia: {
        src: "/gallery/empreinte-0RmLXMMEJKo-unsplash.jpg",
        alt: "Antonia reviewing clinical wellness notes beside the service pass.",
        width: 3744,
        height: 5616,
    },
    homeGalleryOne: {
        src: "/gallery/0D1EA119-6D65-43D8-8FA2-2FCB20ADCFBE.webp",
        alt: "Sunlit aperitif table dressed with crystal and citrus.",
        caption: "Aperitif terrace with citrus infusions and cut crystal",
        width: 5603,
        height: 3735,
    },
    homeGalleryTwo: {
        src: "/gallery/975422A7-4688-46A3-B590-BD389A70A75B.webp",
        alt: "Garden herb veloute finished with edible flowers and citrus.",
        caption: "Garden herb veloute, brassica blooms, pickled radish",
        width: 4023,
        height: 2665,
    },
    homeGalleryThree: {
        src: "/gallery/B8FBB31E-B185-4FD6-B6AD-C694DE95E5D8.webp",
        alt: "Evening brigade briefing under warm pass lights.",
        caption: "Coordinated service pass, precision plating, brigade briefings",
        width: 5413,
        height: 3609,
    },
    homeGalleryFour: {
        src: "/gallery/D40AFFC1-3D32-49CF-9FC3-0D7DCD661645.webp",
        alt: "Butter-poached lobster plated with saffron bisque.",
        caption: "Butter-poached lobster, saffron bisque, Riesling pairing",
        width: 6720,
        height: 4480,
    },
    homeGalleryFive: {
        src: "/gallery/A10D18FD-4036-474F-B1F3-73430DE9F744.webp",
        alt: "Chef Adrian finishing an amuse-bouche with citrus and herbs.",
        caption: "Chef Adrian finishing amuse-bouche with Riviera citrus",
        width: 6000,
        height: 4000,
    },
    homeGallerySix: {
        src: "/gallery/atelier-salon-02.jpg",
        alt: "Candlelit dining room with layered glassware and florals.",
        caption: "Salon arranged for evening chapter with layered linens",
        width: 1366,
        height: 2048,
    },
    portraitClaire: {
        src: "/gallery/mae-mu-LgnE31R9PGc-unsplash.jpg",
        alt: "Claire arranging stemware and vintages before guests are seated.",
        width: 3648,
        height: 5472,
    },
    portraitJulien: {
        src: "/gallery/marc-babin-ecGZWPOvya0-unsplash.jpg",
        alt: "Julien tempering chocolate and composing dessert garnishes.",
        width: 4368,
        height: 2912,
    },
    luxurySequenceOne: {
        src: "/gallery/atelier-salon-02.jpg",
        alt: "Pantry mise en place with copper pans, fresh produce, and spice notes.",
        width: 1366,
        height: 2048,
    },
    luxurySequenceTwo: {
        src: "/gallery/atelier-salon-08.jpg",
        alt: "Service brigade rehearsing synchronized plate placement.",
        width: 1366,
        height: 2048,
    },
    luxurySequenceThree: {
        src: "/gallery/atelier-salon-04.jpg",
        alt: "Ledger of timing cues and guest preferences recorded after service.",
        width: 1206,
        height: 1136,
    },
    valueFocus: {
        src: "/gallery/atelier-salon-01.jpg",
        alt: "Guests gathered around a candlelit salon table mid-toast.",
        width: 2048,
        height: 1366,
    },
    valuePrecision: {
        src: "/gallery/atelier-salon-06.jpg",
        alt: "Correspondence and plating notes arranged beside a fountain pen.",
        width: 1150,
        height: 2048,
    },
    valueDocumentation: {
        src: "/gallery/atelier-salon-03.jpg",
        alt: "Line of plated courses staged with wine pairings at the pass.",
        width: 1366,
        height: 2048,
    },
    galleryPressStudy: {
        src: "/gallery/atelier-salon-05.jpg",
        alt: "Flatlay of press clippings, stationery, and service notes.",
        width: 1206,
        height: 1165,
    },
    gallerySalonStill: {
        src: "/gallery/atelier-salon-06.jpg",
        alt: "Salon vignette with layered linens and candlelight.",
        width: 1150,
        height: 2048,
    },
    galleryLedgerDetail: {
        src: "/gallery/atelier-salon-07.jpg",
        alt: "Detail of a tasting ledger with seasonal menu annotations.",
        width: 1206,
        height: 1129,
    },
    galleryFlorals: {
        src: "/gallery/atelier-salon-04.jpg",
        alt: "Delicate florals styled beside aperitif coupes.",
        width: 1206,
        height: 1136,
    },
    galleryCourseFinish: {
        src: "/gallery/atelier-salon-02.jpg",
        alt: "Chef finishing a tasting course with precise tweezers.",
        width: 1366,
        height: 2048,
    },
    galleryTablescape: {
        src: "/gallery/atelier-salon-03.jpg",
        alt: "Tablescape set with crystal, silver, and candlelight before guests arrive.",
        width: 1366,
        height: 2048,
    },
    galleryLogistics: {
        src: "/gallery/atelier-salon-04.jpg",
        alt: "Logistics ledger and laptop documenting an event timeline.",
        width: 1206,
        height: 1136,
    },
} as const satisfies Record<string, ImageDefinition>;

export type ImageSlug = keyof typeof IMAGE_DEFINITIONS;

export type ImageAsset = ImageDefinition & {
    slug: string;
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




