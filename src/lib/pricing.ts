import type { Mode } from "@/lib/checkout";

export type PriceKey =
    | "consultIntake90"
    | "reset4Week"
    | "concierge12Week"
    | "membershipEssential"
    | "membershipStudio"
    | "membershipPatron"
    | "experienceSignature"
    | "experienceSalon"
    | "experienceVoyage"
    | "experienceLuncheon";

const priceFromEnv = (key: string, fallback: string) => process.env[key] || fallback;

export type PriceCatalogEntry = { id: string; mode: Mode };

export const priceCatalog: Record<PriceKey, PriceCatalogEntry> = {
    consultIntake90: {
        id: priceFromEnv("NEXT_PUBLIC_PRICE_CONSULT_90", "price_CONSULT_90"),
        mode: "payment",
    },
    reset4Week: {
        id: priceFromEnv("NEXT_PUBLIC_PRICE_RESET_4W", "price_RESET_4W"),
        mode: "payment",
    },
    concierge12Week: {
        id: priceFromEnv("NEXT_PUBLIC_PRICE_CONCIERGE_12W", "price_CONCIERGE_12W"),
        mode: "payment",
    },
    membershipEssential: {
        id: priceFromEnv("NEXT_PUBLIC_PRICE_MEMBER_ESSENTIAL", "price_MEMBER_ESSENTIAL"),
        mode: "subscription",
    },
    membershipStudio: {
        id: priceFromEnv("NEXT_PUBLIC_PRICE_MEMBER_STUDIO", "price_MEMBER_STUDIO"),
        mode: "subscription",
    },
    membershipPatron: {
        id: priceFromEnv("NEXT_PUBLIC_PRICE_MEMBER_PATRON", "price_MEMBER_PATRON"),
        mode: "subscription",
    },
    experienceSignature: {
        id: priceFromEnv("NEXT_PUBLIC_PRICE_SIGNATURE_DINNER", "price_SIGNATURE_DINNER"),
        mode: "payment",
    },
    experienceSalon: {
        id: priceFromEnv("NEXT_PUBLIC_PRICE_SALON_SUPPER", "price_SALON_SUPPER"),
        mode: "payment",
    },
    experienceVoyage: {
        id: priceFromEnv("NEXT_PUBLIC_PRICE_VOYAGE_WEEKEND", "price_VOYAGE_WEEKEND"),
        mode: "payment",
    },
    experienceLuncheon: {
        id: priceFromEnv("NEXT_PUBLIC_PRICE_DAY_LUNCHEON", "price_DAY_LUNCHEON"),
        mode: "payment",
    },
};

export type TierCta =
    | { type: "checkout"; label: string; priceKey: PriceKey; mode?: Mode; note?: string }
    | { type: "link"; label: string; href: string; note?: string };

export type MembershipTier = {
    id: string;
    name: string;
    price: string;
    summary: string;
    detail: string;
    paragraphs: string[];
    checkout: { label: string; priceKey: PriceKey };
};

export const membershipTiers: MembershipTier[] = [
    {
        id: "membership-essential",
        name: "Essential",
        price: "€650 / month",
        paragraphs: [
            "Quarterly pharmacist reviews and culinary rewrites keep the household aligned without overwhelming staff.",
            "Seasonal menu books, grocery matrices, and mise standards accompany two hosted dinners each year plus a seven-day priority window and direct messaging during business hours.",
        ],
        summary: "Who it’s for",
        detail:
            "Busy founders and professionals who want continuity, elegant hosted dinners each season, and systems that hold when the week turns loud.",
        checkout: {
            label: "join essential",
            priceKey: "membershipEssential",
        },
    },
    {
        id: "membership-studio",
        name: "Studio",
        price: "€1,350 / month",
        paragraphs: [
            "Monthly pharmacist check-ins and menu refinements come with pantry audits and an expanded culinary library for the household team.",
            "Up to eighteen hosted dinners each year, a fourteen-day priority window, and rapid responses via encrypted messaging keep the program agile.",
        ],
        summary: "Signature value",
        detail:
            "A standing cadence and meaningful hospitality—dinners stay on the calendar, menus evolve with you, and the household runs smoother each quarter.",
        checkout: {
            label: "join studio",
            priceKey: "membershipStudio",
        },
    },
    {
        id: "membership-patron",
        name: "Patron",
        price: "€3,500 / month",
        paragraphs: [
            "Weekly pharmacist and chef touchpoints deliver rapid refinements, executive-level menu books, and unlimited revisions without friction.",
            "Up to fifty hosted dinners a year, thirty-day first holds, and a six-hour on-call line ensure every schedule pivot remains seamless and discreet.",
        ],
        summary: "For high-output seasons",
        detail:
            "When the calendar is relentless we maintain standards, manage momentum, and keep joy in the room—your routine and tables become performance assets.",
        checkout: {
            label: "join patron",
            priceKey: "membershipPatron",
        },
    },
];

export type ConsultPackage = {
    id: string;
    name: string;
    price: string;
    paragraphs: string[];
    summary: string;
    detail: string;
    checkout: { label: string; priceKey: PriceKey };
};

export const consultPackages: ConsultPackage[] = [
    {
        id: "consult-intake",
        name: "90-minute intake",
        price: "€650",
        paragraphs: [
            "A 90-minute medical and lifestyle review with Antonia, PharmD, and Adrian to gather food history, tolerances, and supplement realities without overwhelm.",
            "You leave with a concise culinary plan, mise and grocery framework, and immediate next steps for staff.",
        ],
        summary: "How it works",
        detail:
            "Video session or on-site with service. You receive a concise plan—kitchen setup, menu rhythm, and measurable next steps to de-stress daily eating.",
        checkout: {
            label: "reserve consult",
            priceKey: "consultIntake90",
        },
    },
    {
        id: "consult-reset",
        name: "4-week reset",
        price: "€2,400",
        paragraphs: [
            "Weekly check-ins with Antonia and Adrian follow the intake, pairing medical insight with chef-driven mise so the reset is felt immediately.",
            "Breakfast, lunch, and dinner frameworks the crew can repeat sit beside a pragmatic CGM coaching option that never drifts into anxiety.",
        ],
        summary: "What you receive",
        detail:
            "A living kit with shopping lists, mise charts, and seasonal menus aligned to lab trends and how you feel. The goal is fluency, not restriction.",
        checkout: {
            label: "start 4-week reset",
            priceKey: "reset4Week",
        },
    },
    {
        id: "consult-concierge",
        name: "12-week concierge",
        price: "€7,500",
        paragraphs: [
            "Physician coordination, lab cadence, and villa or yacht provisioning are handled alongside discreet crew training so the system clicks from day one.",
            "On-call adjustments across travel and hosting plus a seasonal menu book tailored to each property keep the lifestyle steady even when you move.",
        ],
        summary: "Scope & logistics",
        detail:
            "Bespoke season management with discreet coordination across physicians, captains, and staff. We set standards, coach teams, and keep the system steady as your calendar moves.",
        checkout: {
            label: "begin concierge",
            priceKey: "concierge12Week",
        },
    },
];

export type CalculatorEnhancement = { id: string; label: string; amount: number; description: string };

export type CalculatorOption = {
    id: string;
    name: string;
    description: string;
    base: number;
    includedGuests?: number;
    perGuest: number;
    deposit?: number;
    enhancements: CalculatorEnhancement[];
    cta: TierCta;
};

export const pricingCalculatorOptions: CalculatorOption[] = [
    {
        id: "signature",
        name: "Signature Dinner",
        description: "12-course tasting with Adrian & crew on site",
        base: 2200,
        includedGuests: 12,
        perGuest: 180,
        deposit: 1000,
        enhancements: [
            { id: "wine", label: "Sommelier wine pairing", amount: 480, description: "Curated wines + stemware" },
            { id: "photography", label: "Documentary photography", amount: 480, description: "60 edited images" },
        ],
        cta: { type: "checkout", label: "pay deposit", priceKey: "experienceSignature" },
    },
    {
        id: "salon",
        name: "Salon Supper",
        description: "Conversation-led supper with aperitif ritual",
        base: 3800,
        includedGuests: 16,
        perGuest: 220,
        deposit: 1500,
        enhancements: [
            { id: "perfume", label: "Custom perfume pairing", amount: 320, description: "Aroma-led aperitifs" },
            { id: "press", label: "Press-ready photo set", amount: 850, description: "Editorial coverage" },
        ],
        cta: { type: "checkout", label: "reserve salon", priceKey: "experienceSalon" },
    },
    {
        id: "concierge",
        name: "Concierge Quarter",
        description: "12-week continuity with hosted dinners",
        base: 7500,
        includedGuests: 0,
        perGuest: 0,
        deposit: 2500,
        enhancements: [
            { id: "dinners", label: "Additional hosted dinners", amount: 1200, description: "Per additional dinner" },
            { id: "labs", label: "Lab coordination", amount: 650, description: "Pharmacist-managed lab cadence" },
        ],
        cta: { type: "checkout", label: "secure concierge", priceKey: "concierge12Week" },
    },
];

export type PricingEstimate = {
    guestCount: number;
    additionalGuests: number;
    baseTotal: number;
    enhancementsTotal: number;
    total: number;
    deposit: number;
};

export function getCalculatorOption(id: string): CalculatorOption {
    return pricingCalculatorOptions.find((opt) => opt.id === id) ?? pricingCalculatorOptions[0];
}

export function estimatePricing(option: CalculatorOption, guests: number, addonIds: string[] = []): PricingEstimate {
    const minimumGuests = Math.max(guests, option.includedGuests || guests || 0);
    const guestCount = option.includedGuests ? Math.max(option.includedGuests, minimumGuests) : Math.max(1, minimumGuests);
    const additionalGuests = option.includedGuests ? Math.max(0, guestCount - option.includedGuests) : guestCount;

    const baseTotal = option.base + additionalGuests * option.perGuest;
    const enhancementsTotal = option.enhancements
        .filter((enh) => addonIds.includes(enh.id))
        .reduce((sum, enh) => sum + enh.amount, 0);

    const total = baseTotal + enhancementsTotal;
    const deposit = option.deposit ?? Math.round(total * 0.3);

    return {
        guestCount,
        additionalGuests,
        baseTotal,
        enhancementsTotal,
        total,
        deposit,
    };
}
