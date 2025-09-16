import type { TierCta } from "@/data/siteContent";

const EURO_FORMATTER = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
});

export const formatEuro = (value: number) => EURO_FORMATTER.format(value);

export type PricingEnhancement = {
    id: string;
    label: string;
    amount: number;
    description: string;
};

export type CalculatorOption = {
    id: string;
    name: string;
    description: string;
    base: number;
    includedGuests?: number;
    perGuest: number;
    deposit: number;
    enhancements: PricingEnhancement[];
    cta: TierCta;
};

export type MembershipTierId = "essential" | "studio" | "patron";

export type MembershipPricing = {
    id: MembershipTierId;
    name: string;
    monthly: number;
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
        id: "luncheon",
        name: "Day Luncheon",
        description: "Produce-led daytime service with elixirs",
        base: 1450,
        includedGuests: 10,
        perGuest: 120,
        deposit: 600,
        enhancements: [
            { id: "botanicals", label: "Botanical infusions", amount: 240, description: "Seasonal cold-pressed elixirs" },
            { id: "atelier", label: "Atelier dessert cart", amount: 320, description: "Table-side patisserie moments" },
        ],
        cta: { type: "checkout", label: "schedule luncheon", priceKey: "experienceLuncheon" },
    },
    {
        id: "concierge",
        name: "Concierge Quarter",
        description: "12-week continuity with hosted dinners",
        base: 7500,
        perGuest: 0,
        deposit: 2500,
        enhancements: [
            { id: "dinners", label: "Additional hosted dinners", amount: 1200, description: "Per additional dinner" },
            { id: "labs", label: "Lab coordination", amount: 650, description: "Pharmacist-managed lab cadence" },
        ],
        cta: { type: "checkout", label: "secure concierge", priceKey: "concierge12Week" },
    },
];

export const membershipPricing: MembershipPricing[] = [
    { id: "essential", name: "Essential", monthly: 650 },
    { id: "studio", name: "Studio", monthly: 1350 },
    { id: "patron", name: "Patron", monthly: 3500 },
];

export function getCalculatorOption(id: string): CalculatorOption {
    return pricingCalculatorOptions.find((opt) => opt.id === id) ?? pricingCalculatorOptions[0];
}

export function getMembershipPricing(id: MembershipTierId): MembershipPricing {
    return membershipPricing.find((tier) => tier.id === id) ?? membershipPricing[0];
}

export type PricingEstimate = {
    guestCount: number;
    additionalGuests: number;
    baseTotal: number;
    enhancementsTotal: number;
    total: number;
    deposit: number;
};

export function estimatePricing(option: CalculatorOption, guests: number, addonIds: string[] = []): PricingEstimate {
    const baseGuests = option.includedGuests ?? 0;
    const guestCount = Math.max(guests, baseGuests || guests || 1);
    const additionalGuests = baseGuests ? Math.max(0, guestCount - baseGuests) : guestCount;

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
