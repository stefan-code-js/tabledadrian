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
        src: "/gallery/IMG_3520.JPG",
        alt: "Private dining salon glowing with candlelight and crystal.",
        width: 3213,
        height: 5712,
    },
    heroHome: {
        src: "/gallery/A10D18FD-4036-474F-B1F3-73430DE9F744.jpg",
        alt: "Chef Adrian finishing a plated course on a marble pass.",
        width: 6000,
        height: 4000,
        priority: true,
    },
    heroAbout: {
        src: "/gallery/0D1EA119-6D65-43D8-8FA2-2FCB20ADCFBE.jpg",
        alt: "Terrace dining table set with cut crystal and linens before service.",
        width: 5603,
        height: 3735,
    },
    heroExperiences: {
        src: "/gallery/4D5C8C1F-FA19-43BA-A303-705DDA9205C6.jpg",
        alt: "Brigade plating tasting menu courses in the atelier kitchen.",
        width: 6240,
        height: 4160,
    },
    heroServices: {
        src: "/gallery/3427FC7B-B743-4C4B-942E-0528F1AD6CE1.jpg",
        alt: "Candlelit private dining room prepared for an evening chapter.",
        width: 4061,
        height: 4095,
    },
    heroMembership: {
        src: "/gallery/B8FBB31E-B185-4FD6-B6AD-C694DE95E5D8.jpg",
        alt: "Guests gathered around a softly lit private dining table.",
        width: 5413,
        height: 3609,
    },
    heroConsult: {
        src: "/gallery/D40AFFC1-3D32-49CF-9FC3-0D7DCD661645.jpg",
        alt: "Intake notes and plating plans spread across the pass.",
        width: 6720,
        height: 4480,
    },
    heroPricing: {
        src: "/gallery/IMG_3477(1).JPG",
        alt: "Line of plated courses staged beside wine pairings.",
        width: 5712,
        height: 4284,
    },
    heroGallery: {
        src: "/gallery/975422A7-4688-46A3-B590-BD389A70A75B.jpg",
        alt: "Butter-poached lobster plated with saffron bisque and herbs.",
        width: 4023,
        height: 2665,
    },
    heroPress: {
        src: "/gallery/IMG_4404_jpg.jpg",
        alt: "Vintage stationery, tasting menus, and fountain pen ready for press.",
        width: 2748,
        height: 2716,
    },
    heroReviews: {
        src: "/gallery/IMG_1830.JPG",
        alt: "Guests raising a toast at a candlelit salon table.",
        width: 4283,
        height: 5712,
    },
    heroContact: {
        src: "/gallery/IMG_3536.JPG",
        alt: "Fountain pen resting on handwritten correspondence and envelopes.",
        width: 3213,
        height: 5712,
    },
    heroAdminLeads: {
        src: "/gallery/IMG_3090.JPG",
        alt: "Operations binder, laptop, and scheduling notes during lead review.",
        width: 3213,
        height: 5712,
    },
    sectionHomeValues: {
        src: "/gallery/IMG_1481.JPG",
        alt: "Chef torching seasonal produce during mise en place.",
        width: 3024,
        height: 4032,
    },
    sectionHomeIncluded: {
        src: "/gallery/IMG_1619.JPG",
        alt: "Service brigade arranging linens and glassware before guests arrive.",
        width: 4284,
        height: 5712,
    },
    sectionHomeTestimonials: {
        src: "/gallery/IMG_1830.JPG",
        alt: "Guests sharing dessert courses beneath candlelight.",
        width: 4283,
        height: 5712,
    },
    portraitAdrian: {
        src: "/gallery/IMG_0936.JPG",
        alt: "Chef Adrian finishing a plated course inside the atelier kitchen.",
        width: 3024,
        height: 4032,
    },
    portraitAntonia: {
        src: "/gallery/IMG_1245.JPG",
        alt: "Antonia reviewing clinical wellness notes beside the service pass.",
        width: 4284,
        height: 5712,
    },
    homeGalleryOne: {
        src: "/gallery/0D1EA119-6D65-43D8-8FA2-2FCB20ADCFBE.jpg",
        alt: "Sunlit aperitif table dressed with crystal and citrus.",
        caption: "Aperitif terrace with citrus infusions and cut crystal",
        width: 5603,
        height: 3735,
    },
    homeGalleryTwo: {
        src: "/gallery/975422A7-4688-46A3-B590-BD389A70A75B.jpg",
        alt: "Garden herb veloute finished with edible flowers and citrus.",
        caption: "Garden herb veloute, brassica blooms, pickled radish",
        width: 4023,
        height: 2665,
    },
    homeGalleryThree: {
        src: "/gallery/B8FBB31E-B185-4FD6-B6AD-C694DE95E5D8.jpg",
        alt: "Evening brigade briefing under warm pass lights.",
        caption: "Coordinated service pass, precision plating, brigade briefings",
        width: 5413,
        height: 3609,
    },
    homeGalleryFour: {
        src: "/gallery/D40AFFC1-3D32-49CF-9FC3-0D7DCD661645.jpg",
        alt: "Butter-poached lobster plated with saffron bisque.",
        caption: "Butter-poached lobster, saffron bisque, Riesling pairing",
        width: 6720,
        height: 4480,
    },
    homeGalleryFive: {
        src: "/gallery/A10D18FD-4036-474F-B1F3-73430DE9F744.jpg",
        alt: "Chef Adrian finishing an amuse-bouche with citrus and herbs.",
        caption: "Chef Adrian finishing amuse-bouche with Riviera citrus",
        width: 6000,
        height: 4000,
    },
    homeGallerySix: {
        src: "/gallery/3427FC7B-B743-4C4B-942E-0528F1AD6CE1.jpg",
        alt: "Candlelit dining room with layered glassware and florals.",
        caption: "Salon arranged for evening chapter with layered linens",
        width: 4061,
        height: 4095,
    },
    portraitClaire: {
        src: "/gallery/IMG_1252.JPG",
        alt: "Claire arranging stemware and vintages before guests are seated.",
        width: 4284,
        height: 5712,
    },
    portraitJulien: {
        src: "/gallery/IMG_1307.JPG",
        alt: "Julien tempering chocolate and composing dessert garnishes.",
        width: 4284,
        height: 5712,
    },
    luxurySequenceOne: {
        src: "/gallery/IMG_1483.JPG",
        alt: "Pantry mise en place with copper pans, fresh produce, and spice notes.",
        width: 3024,
        height: 4032,
    },
    luxurySequenceTwo: {
        src: "/gallery/IMG_1621.JPG",
        alt: "Service brigade rehearsing synchronized plate placement.",
        width: 4284,
        height: 5712,
    },
    luxurySequenceThree: {
        src: "/gallery/IMG_1638.JPG",
        alt: "Ledger of timing cues and guest preferences recorded after service.",
        width: 4141,
        height: 5521,
    },
    valueFocus: {
        src: "/gallery/IMG_3520.JPG",
        alt: "Guests gathered around a candlelit salon table mid-toast.",
        width: 3213,
        height: 5712,
    },
    valuePrecision: {
        src: "/gallery/IMG_3536.JPG",
        alt: "Correspondence and plating notes arranged beside a fountain pen.",
        width: 3213,
        height: 5712,
    },
    valueDocumentation: {
        src: "/gallery/IMG_3477(1).JPG",
        alt: "Line of plated courses staged with wine pairings at the pass.",
        width: 5712,
        height: 4284,
    },
    galleryPressStudy: {
        src: "/gallery/IMG_4133.JPEG",
        alt: "Flatlay of press clippings, stationery, and service notes.",
        width: 2268,
        height: 4032,
    },
    gallerySalonStill: {
        src: "/gallery/IMG_5924(1).JPG",
        alt: "Salon vignette with layered linens and candlelight.",
        width: 3024,
        height: 4032,
    },
    galleryLedgerDetail: {
        src: "/gallery/IMG_1859.PNG",
        alt: "Detail of a tasting ledger with seasonal menu annotations.",
        width: 1206,
        height: 1775,
    },
    galleryFlorals: {
        src: "/gallery/ee51ba39-3273-456d-ab36-17c1b36b49c2.jpg",
        alt: "Delicate florals styled beside aperitif coupes.",
        width: 1200,
        height: 1600,
    },
    galleryCourseFinish: {
        src: "/gallery/IMG_1778.JPG",
        alt: "Chef finishing a tasting course with precise tweezers.",
        width: 4284,
        height: 5712,
    },
    galleryTablescape: {
        src: "/gallery/IMG_1891.JPG",
        alt: "Tablescape set with crystal, silver, and candlelight before guests arrive.",
        width: 4284,
        height: 5712,
    },
    galleryLogistics: {
        src: "/gallery/IMG_3451(1).JPG",
        alt: "Logistics ledger and laptop documenting an event timeline.",
        width: 3213,
        height: 5712,
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


