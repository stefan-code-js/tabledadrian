import { pricingCalculatorOptions } from "@/data/siteContent";
import type { CalculatorOption } from "@/data/siteContent";

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
