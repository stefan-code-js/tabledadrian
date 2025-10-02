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
    name: "Table d'Adrian",
    shortName: "Table d'Adrian",
    url: "https://tabledadrian.com",
    locale: "en",
    description:
        "Luxury private chef and bespoke dining services by Chef Adrian. Michelin-caliber culinary experiences for private events, in-home dining, yachts, and more, available worldwide.",
    email: "adrian@tabledadrian.com",
    telephone: "",
    address: {
        street: "",
        locality: "Antibes",
        region: "Provence-Alpes-Côte d’Azur",
        postalCode: "",
        country: "FR",
    },
    socials: {
        instagram: "https://instagram.com/tabledadrian",
        linkedin: "https://www.linkedin.com/in/adrian-stefan-badea-82456131b",
    },
    accreditationUrl: "https://eu.badgr.com/public/badges/soyVM0MMRr2r33z69W8oNQ",
    serviceArea: ["Monaco", "French Riviera", "New York", "Miami", "Dubai", "Abu Dhabi", "London", "Courchevel", "Geneva", "Worldwide"],
    offerings: ["Signature Tasting", "Performance Dinner", "Salon Supper", "Bespoke Events", "Yacht & Villa Dining"],
    cuisines: ["Contemporary European", "Modern Mediterranean", "Global Cuisine", "Tasting menu"],
    dietaryNotes:
        "Omnivore-friendly; vegetarian, vegan, and gluten-free menus are available on request.",
    keywords: [
        "private chef",
        "personal chef",
        "luxury dining",
        "bespoke events",
        "in-home chef",
        "chef for hire",
        "gastronomic experiences",
        "private chef Monaco",
        "private chef New York",
        "private chef Miami",
        "private chef Dubai",
        "yacht chef",
        "villa chef",
        "table d'adrian",
    ],
};
