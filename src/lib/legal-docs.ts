export type LegalMapEntry = {
    file: string;
    title: string;
    description: string;
    path: string;
};

export const LEGAL_DOCUMENTS = {
    terms: {
        file: "terms.md",
        title: "Terms & Conditions",
        description: "The contract governing luxury culinary, event, and digital experiences with Table d'Adrian.",
        path: "/terms",
    },
    privacy: {
        file: "privacy.md",
        title: "Privacy Policy",
        description: "How Table d'Adrian collects, safeguards, and honors personal data for discerning guests.",
        path: "/privacy",
    },
    "privacy-requests": {
        file: "privacy-requests.md",
        title: "Data Request Center",
        description: "Submit DSAR requests for access, rectification, erasure, portability, or objection rights.",
        path: "/privacy/requests",
    },
    cookies: {
        file: "cookies.md",
        title: "Cookie Policy",
        description: "Details on cookie categories, durations, and how to refine consent for analytics and marketing.",
        path: "/cookies",
    },
    "crypto-tc": {
        file: "crypto-tc.md",
        title: "Crypto Terms",
        description: "Utility-focused terms for crypto payments and digital concierge privileges.",
        path: "/crypto-tc",
    },
    refunds: {
        file: "refunds.md",
        title: "Refunds & Cancellations",
        description: "Refund commitments, deposit rules, and digital good policies for every bespoke engagement.",
        path: "/refunds",
    },
    "community-charter": {
        file: "community-charter.md",
        title: "Community Charter",
        description: "Etiquette and moderation standards for the Table d'Adrian community gatherings.",
        path: "/community/charter",
    },
    accessibility: {
        file: "accessibility.md",
        title: "Accessibility Statement",
        description: "Commitments to WCAG 2.1 AA, inclusive experiences, and contact options for accommodations.",
        path: "/accessibility",
    },
    dpa: {
        file: "dpa.md",
        title: "Data Processing Addendum",
        description: "Controller-processor roles, Standard Contractual Clauses, and security safeguards.",
        path: "/dpa",
    },
    imprint: {
        file: "imprint.md",
        title: "Imprint",
        description: "Registered business identity, legal address, and compliance contact information.",
        path: "/imprint",
    },
} as const satisfies Record<string, LegalMapEntry>;

export type LegalDocumentId = keyof typeof LEGAL_DOCUMENTS;

export function getLegalNavigation(): Array<{ href: string; label: string }> {
    return Object.values(LEGAL_DOCUMENTS).map((entry) => ({
        href: entry.path,
        label: entry.title,
    }));
}
