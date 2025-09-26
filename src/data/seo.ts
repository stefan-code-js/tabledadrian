export type SeoEntry = {
    path: string;
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    changeFrequency?: "daily" | "weekly" | "monthly" | "yearly";
    priority?: number;
    indexable?: boolean;
};

const entries: SeoEntry[] = [
    {
        path: "/",
        title: "Table d'Adrian | Private dining on the Riviera",
        description:
            "Private chef table for villas, yachts, and salons across Antibes, Cannes, and Monaco. Seasonal tasting menus and service choreography led by Adrian and Antonia.",
        keywords: ["private chef riviera", "table d'adrian", "cote d'azur dining", "tasting menu antibes"],
        priority: 1,
        changeFrequency: "monthly",
    },
    {
        path: "/about",
        title: "About | Table d'Adrian",
        description:
            "Meet the team shaping Table d'Adrian: Michelin-trained kitchen, pharmacist-led wellness, and stewards who carry the doctrine between residences.",
        changeFrequency: "monthly",
        priority: 0.9,
    },
    {
        path: "/experiences",
        title: "Experiences & Menus | Table d'Adrian",
        description:
            "Signature tastings, salon suppers, and voyage weekends engineered for Riviera villas, yachts, and retreats with documented service choreography.",
        changeFrequency: "monthly",
        priority: 0.85,
    },
    {
        path: "/services",
        title: "Services | Table d'Adrian",
        description:
            "Concierge documentation, crew training, and traveling menu libraries so every household operates at the Table d'Adrian standard without constant oversight.",
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        path: "/consult",
        title: "Consultations | Table d'Adrian",
        description:
            "Schedule a strategy session with Adrian and Antonia to audit provisioning, wellness directives, and staffing cadence before building your program.",
        changeFrequency: "monthly",
        priority: 0.75,
    },
    {
        path: "/membership",
        title: "Membership | Table d'Adrian",
        description:
            "Seasonal membership that carries your table standards across villas and voyages with on-call crew, cellar pairing ladders, and documentation updates.",
        changeFrequency: "monthly",
        priority: 0.75,
    },
    {
        path: "/pricing-calculator",
        title: "Pricing Calculator | Table d'Adrian",
        description:
            "Estimate investment for private dinners or ongoing concierge service. Adjust guests, enhancements, and deposits before booking or checkout.",
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        path: "/contact",
        title: "Contact & Booking | Table d'Adrian",
        description:
            "Share your date, guest cadence, and intentions. We confirm availability, pricing, and the next choreography for your private chef experience within the day.",
        changeFrequency: "weekly",
        priority: 0.95,
    },
    {
        path: "/gallery",
        title: "Gallery | Table d'Adrian",
        description:
            "Scenes from recent villas, yachts, and salons: ceramics, plating, and the atmospheres documented after each chapter.",
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        path: "/press",
        title: "Press & Testimonials | Table d'Adrian",
        description:
            "Selected editorials and testimonials from patrons, crews, and partners describing the Table d'Adrian methodology across Europe.",
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        path: "/reviews",
        title: "Reviews | Table d'Adrian",
        description: "Transparent notes from guests, households, and partners across the Riviera.",
        changeFrequency: "monthly",
        priority: 0.72,
    },
    {
        path: "/book",
        title: "Book a Table | Table d'Adrian",
        description:
            "Secure your private table. Submit date, guest profile, and venue so the team can reserve crew, sourcing lanes, and documentation.",
        changeFrequency: "monthly",
        priority: 0.65,
    },
    {
        path: "/menu",
        title: "Seasonal Menu Notes | Table d'Adrian",
        description:
            "Seasonal inspirations, pantry inventories, and tasting arcs that inform the current Table d'Adrian menus.",
        changeFrequency: "monthly",
        priority: 0.6,
    },
    {
        path: "/team",
        title: "Team | Table d'Adrian",
        description:
            "Adrian, Antonia, stewards, and captains who carry the Table d'Adrian service doctrine between residences.",
        changeFrequency: "monthly",
        priority: 0.55,
    },
    {
        path: "/success",
        title: "Booking Confirmed | Table d'Adrian",
        description: "Confirmation and next steps after reserving your private table.",
        indexable: false,
        changeFrequency: "yearly",
        priority: 0.1,
    },
    {
        path: "/cancel",
        title: "Cancel Booking | Table d'Adrian",
        description: "Manage or cancel an existing Table d'Adrian booking.",
        indexable: false,
        changeFrequency: "yearly",
        priority: 0.1,
    },
    {
        path: "/remove",
        title: "Update Preferences | Table d'Adrian",
        description: "Adjust communications or remove your data from the Table d'Adrian records.",
        indexable: false,
        changeFrequency: "yearly",
        priority: 0.1,
    },
    {
        path: "/admin/leads",
        title: "Lead Console | Table d'Adrian",
        description: "Internal console for reviewing inbound booking submissions.",
        indexable: false,
        changeFrequency: "monthly",
        priority: 0.05,
    },
];

function normalizePath(path: string): string {
    if (!path) return "/";
    if (path.startsWith("http")) return path;
    return path.startsWith("/") ? path : `/${path}`;
}

const entryMap = new Map(entries.map((entry) => [normalizePath(entry.path), entry]));

export const seoEntries = entries;

export function getSeoEntry(path: string): SeoEntry | undefined {
    return entryMap.get(normalizePath(path));
}
