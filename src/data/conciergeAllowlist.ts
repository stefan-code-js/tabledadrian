export type ConciergeWalletAllowlistRecord = {
    address: string;
    tier?: string | null;
    note?: string | null;
};

export type ConciergeEmailAllowlistRecord = {
    email: string;
    tier?: string | null;
    note?: string | null;
};

export const conciergeWalletAllowlist: ConciergeWalletAllowlistRecord[] = [
    {
        address: "0x1f8ca9df0b86403aa3de2f52f6aefaa25c497097",
        tier: "VIP",
        note: "Noir Constellation founding member",
    },
    {
        address: "0x98b8d5f5c0a01a112233445566778899aabbccdd",
        tier: "Allowlist",
        note: "Winter Solstice residency cohort",
    },
    {
        address: "0x5cff9b347af1d9ed1bb6a9b4fbfe2f2a07e1d9b2",
        tier: "Waitlist",
        note: "Concierge evaluation in progress",
    },
];

export const conciergeEmailAllowlist: ConciergeEmailAllowlistRecord[] = [
    {
        email: "luminaries@tabledadrian.com",
        tier: "VIP",
        note: "Core atelier leadership",
    },
    {
        email: "allaccess@noirconstellation.xyz",
        tier: "Allowlist",
        note: "Residency charter members",
    },
    {
        email: "prospects@alchemistsociety.io",
        tier: "Waitlist",
        note: "Awaiting concierge onboarding",
    },
];
