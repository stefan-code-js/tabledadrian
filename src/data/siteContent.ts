import type { TierCta } from "@/lib/pricing";
import sitePagesJson from "./sitePages.json";

export type SectionKey =
    | "values"
    | "included"
    | "process"
    | "pricing"
    | "testimonials"
    | "cta"
    | "gallery"
    | "press"
    | "reviews"
    | "leads";

export type QuickNavItem = { label: string; target: SectionKey | string };

export type ValueCard = {
    title: string;
    paragraphs: string[];
};

export type IncludedSection = {
    title: string;
    intro?: string;
    paragraphs: string[];
};

export type ProcessStep = {
    title: string;
    detail: string;
};

export type ProcessSection = {
    title: string;
    steps: ProcessStep[];
};

export type Tier = {
    id: string;
    title: string;
    price?: string;
    description?: string;
    paragraphs: string[];
    details?: { summary: string; body: string };
    cta: TierCta;
};

export type PricingSection = {
    title: string;
    tiers: Tier[];
    note?: string;
};

export type Testimonial = {
    quote: string;
    name: string;
    role?: string;
};

export type TestimonialsSection = {
    title: string;
    items: Testimonial[];
};

export type FinalCta = {
    title: string;
    description: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
};

export type Hero = {
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
};

export type PageId =
    | "home"
    | "about"
    | "experiences"
    | "products"
    | "contact"
    | "gallery"
    | "press"
    | "reviews"
    | "adminLeads"
    | "pricingCalculator";

export type PageMeta = {
    title: string;
    description: string;
    canonical?: string;
    keywords?: string[];
    image?: string;
};

export type PageContent = {
    id: PageId;
    slug: string;
    path: string;
    navLabel: string;
    meta: PageMeta;
    hero: Hero;
    quickNav: QuickNavItem[];
    values: { title: string; cards: ValueCard[] };
    included: IncludedSection;
    process: ProcessSection;
    pricing: PricingSection;
    testimonials: TestimonialsSection;
    finalCta: FinalCta;
};

export const sitePages: Record<PageId, PageContent> = sitePagesJson as Record<PageId, PageContent>;

export type GalleryImage = {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
};

export const galleryImages: GalleryImage[] = [
    {
        src: "/placeholder/gallery-01.svg",
        alt: "porcelain bowl of clarified consomme with citrus oil",
        caption: "Clarified langoustine broth, citrus oil, hand-thrown porcelain",
        width: 1600,
        height: 1067,
    },
    {
        src: "/placeholder/gallery-02.svg",
        alt: "garden herbs resting over cultured cream",
        caption: "Garden herbs, cultured cream, smoked salt",
        width: 1600,
        height: 1067,
    },
    {
        src: "/placeholder/gallery-03.svg",
        alt: "glazed root vegetable over embers",
        caption: "Glazed young carrot, ember oil, kombu glaze",
        width: 1600,
        height: 1067,
    },
    {
        src: "/placeholder/gallery-04.svg",
        alt: "stone plate with sea-inspired course",
        caption: "Sea stone, razor clam, preserved lemon",
        width: 1600,
        height: 1067,
    },
    {
        src: "/placeholder/gallery-05.svg",
        alt: "handblown glass coupe with reductions",
        caption: "Handblown glass, cold-brewed hibiscus, slow reductions",
        width: 1600,
        height: 1067,
    },
    {
        src: "/placeholder/gallery-06.svg",
        alt: "cocoa husk dessert with citrus peel",
        caption: "Cocoa husk, citrus peel, aged honey",
        width: 1600,
        height: 1067,
    },
];

export type NavLink = { href: string; label: string };

export type NavGroup = {
    label: string;
    href: string;
    description: string;
    links: NavLink[];
};

export const navGroups: NavGroup[] = [
    {
        label: "table",
        href: sitePages.home.path,
        description:
            "Explore the table's voice, the team that carries it, and the reception our patrons and press share after each season.",
        links: [
            { href: sitePages.about.path, label: "about" },
            { href: "/team", label: "team" },
            { href: sitePages.press.path, label: "press" },
            { href: sitePages.reviews.path, label: "reviews" },
        ],
    },
    {
        label: "services",
        href: sitePages.experiences.path,
        description:
            "Book private dining, continuing membership support, or targeted consulting. Every route begins with a detailed discovery call.",
        links: [
            { href: "/book", label: "book" },
            { href: "/membership", label: "membership" },
            { href: "/consult", label: "consult" },
            { href: sitePages.pricingCalculator.path, label: "calculator" },
        ],
    },
    {
        label: "resources",
        href: sitePages.products.path,
        description:
            "Read pantry guides, view the gallery, and follow our documentation that keeps households and crews operating smoothly.",
        links: [
            { href: sitePages.products.path, label: "pantry" },
            { href: sitePages.gallery.path, label: "gallery" },
            { href: sitePages.contact.path, label: "contact" },
            { href: "/success", label: "booking follow-up" },
        ],
    },
    {
        label: "operations",
        href: sitePages.adminLeads.path,
        description:
            "Manage upcoming leads, confirm payment states, and coordinate cancellations with the same documentation guests receive.",
        links: [
            { href: sitePages.adminLeads.path, label: "lead inbox" },
            { href: "/cancel", label: "cancellation" },
            { href: sitePages.contact.path, label: "support" },
        ],
    },
];

export const navLinks: NavLink[] = navGroups.flatMap((group) => [
    { href: group.href, label: group.label },
    ...group.links,
]);

export const footerLinks: NavLink[] = navLinks;
