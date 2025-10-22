export type BadgeDefinition = {
    id: string;
    name: string;
    description: string;
    level: "circle" | "guild" | "constellation";
    criteria: string[];
    image: string;
    perks: string[];
};

export const badgeDefinitions: BadgeDefinition[] = [
    {
        id: "luminary-circle",
        name: "Luminary Circle",
        description: "Awarded to members who host three immersive salons with curated wellness pairings.",
        level: "circle",
        criteria: [
            "Host three Table d'Adrian salons across different cities.",
            "Share guest experience notes with the concierge team.",
        ],
        image: "/media/branding/logo-mark.svg",
        perks: [
            "Private consultation with Chef Adrian every quarter",
            "Priority booking window for new residencies",
        ],
    },
    {
        id: "guild-curator",
        name: "Guild Curator",
        description: "Recognizes patrons who commission bespoke residencies with cross-disciplinary programming.",
        level: "guild",
        criteria: [
            "Commission at least one 5-day residency within a calendar year.",
            "Collaborate on a wellness curriculum with Dr. Antonia.",
        ],
        image: "/media/branding/logo-primary.svg",
        perks: [
            "Custom collectible airdrops synced to wallet",
            "Dedicated culinary archivist to preserve family recipes",
        ],
    },
    {
        id: "constellation-vanguard",
        name: "Constellation Vanguard",
        description: "Celebrates visionaries who co-create new menu chapters and mentor emerging chefs.",
        level: "constellation",
        criteria: [
            "Collaborate on two seasonal menu developments.",
            "Lead a mentorship salon with rising culinary talent.",
        ],
        image: "/media/branding/logo-monogram.svg",
        perks: [
                "Invitation to annual Vanguard summit in Monaco",
                "Name etched on the Atelier constellations ledger",
        ],
    },
];
