// src/lib/site.ts

export type SiteConfig = {
    name: string;
    shortName: string;
    url: string;
    locale: string;
    description: string;
    email: string;
    telephone: string;
    address: {
        street: string;
        locality: string;
        region: string;
        postalCode: string;
        country: string;
    };
    socials: {
        instagram?: string;
        linkedin?: string;
    };
    accreditationUrl?: string;
    serviceArea: string[];
    offerings: string[];
    cuisines: string[];
    dietaryNotes: string;
    keywords: string[];
};

export const site: SiteConfig = {
    name: "Table d’Adrian",
    shortName: "Table d’Adrian",
    url: "https://www.tabledadrian.com",
    locale: "en",
    description:
        "Michelin-trained private chef — ingredient-driven haute cuisine on the Côte d’Azur. Seasonal vegetables, seafood, and select meats.",
    email: "adrian@tabledadrian.com",
    telephone: "+33 7 81 46 37 24",
    address: {
        street: "",
        locality: "Antibes",
        region: "Provence-Alpes-Côte d’Azur",
        postalCode: "",
        country: "FR",
    },
    socials: {
        instagram: "https://instagram.com/tabledadrian",
        linkedin:  "https://www.linkedin.com/in/adrian-stefan-badea-82456131b",
    },
    accreditationUrl:
        "https://eu.badgr.com/public/badges/soyVM0MMRr2r33z69W8oNQ",
    serviceArea: ["Antibes", "Cannes", "Monaco"],
    offerings: ["Signature Tasting", "Performance Dinner", "Salon Supper"],
    cuisines: ["Contemporary European", "Modern Mediterranean", "Seafood", "Tasting menu"],
    dietaryNotes:
        "Omnivore-friendly; vegetarian/vegan/gluten-free menus available on request.",
    keywords: [
        "table d’adrian",
        "private chef côte d’azur",
        "fine dining tasting menu",
        "seafood tasting menu",
        "luxury private dining antibes",
        "michelin-trained chef riviera",
    ],
};
