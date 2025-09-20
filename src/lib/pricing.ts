import type { Mode } from "@/lib/checkout";

type Currency = "EUR";

type Cadence = "monthly" | "quarterly" | "season" | "one-time";

export type Money = {
    amount: number;
    currency: Currency;
    cadence?: Cadence;
};

export type RangeUnit = "guest" | "week" | "dinner" | "day" | "hour";

export type Range = {
    min: number;
    max?: number;
    unit: RangeUnit;
};

const EURO_FORMATTER = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
});

const cadenceSuffix: Record<Cadence, string> = {
    monthly: "per month",
    quarterly: "per quarter",
    season: "per season",
    "one-time": "one-time",
};

export function formatMoney(money: Money, { includeCadence = true }: { includeCadence?: boolean } = {}): string {
    const base = EURO_FORMATTER.format(money.amount);
    if (!includeCadence || !money.cadence) {
        return base;
    }
    const suffix = cadenceSuffix[money.cadence];
    if (money.cadence === "one-time") {
        return `${base} ${suffix}`;
    }
    return `${base} / ${suffix}`;
}

function formatNumber(value: number): string {
    return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

const unitLabels: Record<RangeUnit, { singular: string; plural: string }> = {
    guest: { singular: "guest", plural: "guests" },
    week: { singular: "week", plural: "weeks" },
    dinner: { singular: "dinner", plural: "dinners" },
    day: { singular: "day", plural: "days" },
    hour: { singular: "hour", plural: "hours" },
};

export function formatRange(range: Range): string {
    const { min, max, unit } = range;
    const labels = unitLabels[unit];
    const numericPart = max && max !== min ? `${formatNumber(min)}–${formatNumber(max)}` : formatNumber(min);
    if (!labels) {
        return numericPart;
    }
    const noun = max && max !== min ? labels.plural : Number(min) === 1 ? labels.singular : labels.plural;
    return `${numericPart} ${noun}`;
}

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
    investment: Money;
    guestRange: Range;
    hostedDinners: Range;
    priorityWindowDays: number;
    narrative: string[];
    followUp: string[];
    checkout: { label: string; priceKey: PriceKey };
};

export const membershipTiers: MembershipTier[] = [
    {
        id: "membership-essential",
        name: "Essential",
        investment: { amount: 650, currency: "EUR", cadence: "monthly" },
        guestRange: { min: 4, max: 12, unit: "guest" },
        hostedDinners: { min: 2, unit: "dinner" },
        priorityWindowDays: 7,
        narrative: [
            "Quarterly pharmacist reviews, culinary rewrites, and mise documentation keep the household aligned without overwhelming staff.",
            "Seasonal menu books, grocery matrices, and two hosted dinners each year maintain ceremony even in demanding weeks.",
        ],
        followUp: [
            "Business-hour concierge with seven-day first holds ensures the table is ready when you are.",
        ],
        checkout: {
            label: "Join Essential",
            priceKey: "membershipEssential",
        },
    },
    {
        id: "membership-studio",
        name: "Studio",
        investment: { amount: 1350, currency: "EUR", cadence: "monthly" },
        guestRange: { min: 6, max: 18, unit: "guest" },
        hostedDinners: { min: 18, unit: "dinner" },
        priorityWindowDays: 14,
        narrative: [
            "Monthly pharmacist and chef touchpoints deliver rapid refinements, pantry audits, and an expanded culinary library for the household team.",
            "Hosted dinners land into a fourteen-day priority window so the calendar stays generous without losing precision.",
        ],
        followUp: [
            "Encrypted rapid-response messaging keeps momentum between services, even when travel shifts the script.",
        ],
        checkout: {
            label: "Join Studio",
            priceKey: "membershipStudio",
        },
    },
    {
        id: "membership-patron",
        name: "Patron",
        investment: { amount: 3500, currency: "EUR", cadence: "monthly" },
        guestRange: { min: 8, max: 24, unit: "guest" },
        hostedDinners: { min: 50, unit: "dinner" },
        priorityWindowDays: 30,
        narrative: [
            "Weekly pharmacist and chef touchpoints produce executive-level menu books, unlimited revisions, and discreet coaching for household or yacht crews.",
            "Every gathering receives first holds up to thirty days out with a six-hour on-call line for last-minute pivots.",
        ],
        followUp: [
            "For relentless calendars where the private table is part theatre, part wellness protocol, we keep delight continuous.",
        ],
        checkout: {
            label: "Join Patron",
            priceKey: "membershipPatron",
        },
    },
];

export type ConsultPackage = {
    id: string;
    name: string;
    investment: Money;
    duration: Range;
    guestRange?: Range;
    narrative: string[];
    followUp: string[];
    checkout: { label: string; priceKey: PriceKey };
};

export const consultPackages: ConsultPackage[] = [
    {
        id: "consult-intake",
        name: "90-minute intake",
        investment: { amount: 650, currency: "EUR", cadence: "one-time" },
        duration: { min: 1.5, unit: "hour" },
        guestRange: { min: 1, max: 6, unit: "guest" },
        narrative: [
            "A focused medical and culinary interview with Antonia (PharmD) and Adrian to capture food history, tolerances, and supplement realities without overwhelm.",
            "You receive a concise culinary plan with mise, grocery standards, and immediate next steps for staff or crew.",
        ],
        followUp: [
            "Video or on-site; perfect when you need direction before a season or charter.",
        ],
        checkout: {
            label: "Reserve consult",
            priceKey: "consultIntake90",
        },
    },
    {
        id: "consult-reset",
        name: "4-week reset",
        investment: { amount: 2400, currency: "EUR", cadence: "season" },
        duration: { min: 4, unit: "week" },
        guestRange: { min: 1, max: 8, unit: "guest" },
        narrative: [
            "Weekly check-ins with Antonia and Adrian follow the intake, pairing medical insight with chef-driven mise so the reset is felt immediately.",
            "Breakfast, lunch, and dinner frameworks the crew can repeat sit beside pragmatic CGM coaching that never becomes anxious.",
        ],
        followUp: [
            "A living kit with shopping lists, mise charts, and seasonal menus aligned to labs and how you feel.",
        ],
        checkout: {
            label: "Start 4-week reset",
            priceKey: "reset4Week",
        },
    },
    {
        id: "consult-concierge",
        name: "12-week concierge",
        investment: { amount: 7500, currency: "EUR", cadence: "season" },
        duration: { min: 12, unit: "week" },
        guestRange: { min: 2, max: 24, unit: "guest" },
        narrative: [
            "Physician coordination, lab cadence, and villa or yacht provisioning are handled alongside discreet crew training so the system clicks from day one.",
            "On-call adjustments across travel and hosting plus seasonal menu books tailored to each property keep the lifestyle steady even when you move.",
        ],
        followUp: [
            "Designed for households that require continuity across multiple residences and charters.",
        ],
        checkout: {
            label: "Begin concierge",
            priceKey: "concierge12Week",
        },
    },
];

export type CalculatorEnhancement = {
    id: string;
    label: string;
    description: string;
    cost: Money;
};

export type CalculatorOption = {
    id: string;
    name: string;
    description: string;
    base: Money;
    includedGuests?: number;
    perGuest?: Money;
    deposit?: Money;
    duration?: Range;
    guestRange?: Range;
    enhancements: CalculatorEnhancement[];
    cta: TierCta;
};

const euro = (amount: number, cadence?: Cadence): Money => ({ amount, currency: "EUR", cadence });

export const pricingCalculatorOptions: CalculatorOption[] = [
    {
        id: "signature",
        name: "Signature Dinner",
        description: "12-course tasting with Adrian & crew on site",
        base: euro(2200, "one-time"),
        includedGuests: 12,
        perGuest: euro(180, "one-time"),
        deposit: euro(1000, "one-time"),
        guestRange: { min: 8, max: 18, unit: "guest" },
        duration: { min: 6, unit: "hour" },
        enhancements: [
            { id: "wine", label: "Sommelier wine pairing", description: "Curated wines + stemware", cost: euro(480, "one-time") },
            { id: "photography", label: "Documentary photography", description: "60 edited images", cost: euro(480, "one-time") },
        ],
        cta: { type: "checkout", label: "Pay deposit", priceKey: "experienceSignature" },
    },
    {
        id: "salon",
        name: "Salon Supper",
        description: "Conversation-led supper with aperitif ritual",
        base: euro(3800, "one-time"),
        includedGuests: 16,
        perGuest: euro(220, "one-time"),
        deposit: euro(1500, "one-time"),
        guestRange: { min: 10, max: 24, unit: "guest" },
        duration: { min: 5, unit: "hour" },
        enhancements: [
            { id: "perfume", label: "Custom perfume pairing", description: "Aroma-led aperitifs", cost: euro(320, "one-time") },
            { id: "press", label: "Press-ready photo set", description: "Editorial coverage", cost: euro(850, "one-time") },
        ],
        cta: { type: "checkout", label: "Reserve salon", priceKey: "experienceSalon" },
    },
    {
        id: "concierge",
        name: "Concierge Quarter",
        description: "12-week continuity with hosted dinners",
        base: euro(7500, "season"),
        deposit: euro(2500, "one-time"),
        duration: { min: 12, unit: "week" },
        guestRange: { min: 4, max: 24, unit: "guest" },
        enhancements: [
            { id: "dinners", label: "Additional hosted dinner", description: "Per additional service", cost: euro(1200, "one-time") },
            { id: "labs", label: "Lab coordination", description: "Pharmacist-managed cadence", cost: euro(650, "one-time") },
        ],
        cta: { type: "checkout", label: "Secure concierge", priceKey: "concierge12Week" },
    },
];

export type PricingEstimate = {
    guestCount: number;
    additionalGuests: number;
    baseTotal: Money;
    enhancementsTotal: Money;
    total: Money;
    deposit: Money;
};

export function getCalculatorOption(id: string): CalculatorOption {
    return pricingCalculatorOptions.find((opt) => opt.id === id) ?? pricingCalculatorOptions[0];
}

export function estimatePricing(option: CalculatorOption, guests: number, addonIds: string[] = []): PricingEstimate {
    const included = option.includedGuests ?? 0;
    const guestCount = Math.max(guests, included || guests || 1);
    const additionalGuests = included ? Math.max(0, guestCount - included) : Math.max(0, guestCount - 1);

    const perGuestAmount = option.perGuest ? option.perGuest.amount : 0;
    const baseTotalAmount = option.base.amount + additionalGuests * perGuestAmount;
    const enhancementsTotalAmount = option.enhancements
        .filter((enh) => addonIds.includes(enh.id))
        .reduce((sum, enh) => sum + enh.cost.amount, 0);

    const totalAmount = baseTotalAmount + enhancementsTotalAmount;
    const depositAmount = option.deposit ? option.deposit.amount : Math.round(totalAmount * 0.3);

    return {
        guestCount,
        additionalGuests,
        baseTotal: euro(baseTotalAmount, option.base.cadence),
        enhancementsTotal: euro(enhancementsTotalAmount, "one-time"),
        total: euro(totalAmount, option.base.cadence),
        deposit: euro(depositAmount, "one-time"),
    };
}
