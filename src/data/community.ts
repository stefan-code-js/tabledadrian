export type CommunityEvent = {
    id: string;
    title: string;
    summary: string;
    location: string;
    region: "Monaco" | "Dubai" | "New York" | "London" | "Global";
    startDate: string;
    endDate?: string;
    requiresCollectible: boolean;
    tags: string[];
    image: string;
};

export const communityEvents: CommunityEvent[] = [
    {
        id: "monaco-midnight-salon",
        title: "Midnight Atelier Salon",
        summary: "An eight-course degustation at a private villa overlooking the Côte d'Azur with live perfumery pairings.",
        location: "Cap d'Ail, Monaco",
        region: "Monaco",
        startDate: "2025-11-12T21:00:00+01:00",
        endDate: "2025-11-13T02:00:00+01:00",
        requiresCollectible: true,
        tags: ["salon", "wellness", "collectible-only"],
        image: "/gallery/IMG_3520.webp",
    },
    {
        id: "dubai-yacht-residency",
        title: "Dubai Yacht Residency",
        summary: "Three-day immersive residency with circadian cuisine, breathwork on deck, and sunrise elixir rituals.",
        location: "Jumeirah Marina, Dubai",
        region: "Dubai",
        startDate: "2026-01-18T10:00:00+04:00",
        endDate: "2026-01-21T14:00:00+04:00",
        requiresCollectible: true,
        tags: ["residency", "wellness", "vip"],
        image: "/gallery/IMG_3451(1).webp",
    },
    {
        id: "new-york-conclave",
        title: "New York Conclave",
        summary: "Invite-only forum at the Morgan Library with mixers, culinary futures panel, and atelier tasting suites.",
        location: "Midtown, New York City",
        region: "New York",
        startDate: "2025-12-08T18:30:00-05:00",
        requiresCollectible: false,
        tags: ["forum", "panel", "networking"],
        image: "/gallery/IMG_1830.webp",
    },
    {
        id: "london-atelier-clinic",
        title: "London Atelier Clinic",
        summary: "Half-day clinic blending neurogastronomy with precision nutrition at Claridge's ArtSpace.",
        location: "Mayfair, London",
        region: "London",
        startDate: "2025-11-28T10:00:00+00:00",
        requiresCollectible: false,
        tags: ["education", "wellness"],
        image: "/gallery/IMG_1891.webp",
    },
    {
        id: "global-digital-vault",
        title: "Digital Vault Drop: Solstice Menu",
        summary: "Streaming masterclass and recipe vault expansion focusing on winter immunity elixirs.",
        location: "Virtual",
        region: "Global",
        startDate: "2025-12-21T17:00:00Z",
        requiresCollectible: true,
        tags: ["virtual", "collectible-only"],
        image: "/gallery/ee51ba39-3273-456d-ab36-17c1b36b49c2.webp",
    },
];

export type MemberStory = {
    id: string;
    title: string;
    excerpt: string;
    member: string;
    role: string;
};

export const memberStories: MemberStory[] = [
    {
        id: "sovereign-yacht",
        title: "Sovereign Yacht Collective",
        excerpt:
            "We entrusted Table d'Adrian with our transatlantic passage. Each port brought a new ritual—breathwork at sunrise, adaptogenic tonics at dusk.",
        member: "La Société Souveraine",
        role: "Superyacht consortium",
    },
    {
        id: "luminary-atelier",
        title: "Luminary Atelier Residency",
        excerpt:
            "Their team reframed hospitality as legacy-building. Our guests still quote the midnight cacao ceremony months later.",
        member: "Maison Étoile",
        role: "Private art foundation",
    },
    {
        id: "summit-wellness",
        title: "Summit Wellness Summit",
        excerpt:
            "A symposium spanning neuroscience, gastronomy, and technology—Table d'Adrian orchestrated each sensory chapter flawlessly.",
        member: "The Atlas Collective",
        role: "UHNW family office",
    },
];
