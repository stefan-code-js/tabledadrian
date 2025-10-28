export type PassportStage = {
    id: string;
    stage: "Guest" | "Member" | "Collector" | "Concierge";
    title: string;
    summary: string;
    actions: { label: string; href: string }[];
};

export type PassportTier = {
    id: string;
    title: string;
    qualifier: string;
    description: string;
    perks: string[];
    cta: { label: string; href: string };
};

export type PassportChannel = {
    id: string;
    label: string;
    detail: string;
    href?: string;
    emphasis?: "primary" | "default";
};

export const passportStages: PassportStage[] = [
    {
        id: "discover",
        stage: "Guest",
        title: "Discover the atelier",
        summary:
            "Immerse in editorial stories, cinematic galleries, and tasting dispatches to understand the ethos of Table d'Adrian.",
        actions: [
            { label: "Explore community", href: "/community" },
            { label: "Request invitation", href: "/auth/register" },
        ],
    },
    {
        id: "engage",
        stage: "Member",
        title: "Engage with the circle",
        summary:
            "Join salon briefings, contribute to forum threads, and align your calendar with upcoming residencies worldwide.",
        actions: [
            { label: "Enter the forum", href: "/forum" },
            { label: "Reserve concierge", href: "/contact" },
        ],
    },
    {
        id: "collect",
        stage: "Collector",
        title: "Collect the key",
        summary:
            "Mint the Alchemy collectible to unlock gated vaults, premium scheduling, and invitation-only gatherings.",
        actions: [
            { label: "Mint a key", href: "/alchemy-collectibles" },
            { label: "View supply", href: "/alchemy-collectibles#supply" },
        ],
    },
    {
        id: "concierge",
        stage: "Concierge",
        title: "Command bespoke service",
        summary:
            "Work directly with Adrian's concierge to script residencies, yacht passages, and artistic collaborations for your cohort.",
        actions: [
            { label: "Brief the concierge", href: "/members" },
            { label: "Schedule consultation", href: "/consult" },
        ],
    },
];

export const passportTiers: PassportTier[] = [
    {
        id: "guest",
        title: "Guest",
        qualifier: "Open access",
        description:
            "Editorial dispatches, previews of member stories, and invitations to public tables keep guests connected to the atelier's cadence.",
        perks: [
            "Quarterly newsletter with seasonal rituals",
            "Access to cinematic galleries and editorial essays",
            "Priority alerts for open-invite salons",
        ],
        cta: { label: "Join the newsletter", href: "/newsletter" },
    },
    {
        id: "member",
        title: "Member",
        qualifier: "Invitation",
        description:
            "Registered members collaborate with concierge liaisons, preview menus, and access the digital vault's rotating chapters.",
        perks: [
            "Forum SSO with gated discussion rooms",
            "Concierge questionnaires and planning dossiers",
            "Vault teasers and recipe previews",
        ],
        cta: { label: "Request access", href: "/auth/register" },
    },
    {
        id: "collector",
        title: "Collector",
        qualifier: "Alchemy key",
        description:
            "Collectors unlock global residencies, rapid concierge response, and on-chain proofs of attendance for archival access.",
        perks: [
            "5-minute concierge response pledge",
            "Claimable POAPs and collectible vault drops",
            "Invitations to Riviera, Dubai, London, and NYC salons",
        ],
        cta: { label: "Mint your key", href: "/alchemy-collectibles" },
    },
];

export const passportChannels: PassportChannel[] = [
    {
        id: "concierge-email",
        label: "Concierge desk",
        detail: "concierge@tabledadrian.com",
        href: "mailto:concierge@tabledadrian.com",
        emphasis: "primary",
    },
    {
        id: "direct-line",
        label: "Residency line",
        detail: "+33 4 93 00 00 00",
    },
    {
        id: "scheduler",
        label: "Schedule a briefing",
        detail: "Liaise with Adrian's scheduler for a discreet consultation.",
        href: "/contact",
    },
    {
        id: "forum-salon",
        label: "Forum salon",
        detail: "Announce your arrival and align itineraries with peers.",
        href: "/forum",
    },
];
