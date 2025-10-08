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

        src: "/gallery/A10D18FD-4036-474F-B1F3-73430DE9F744.jpg",

        alt: "Chef Adrian finishing an amuse-bouche with citrus and herbs.",

        caption: "Chef Adrian finishing amuse-bouche with Riviera citrus",

        width: 6000,

        height: 4000,

    },

    {

        src: "/gallery/975422A7-4688-46A3-B590-BD389A70A75B.jpg",

        alt: "Garden herb veloute finished with edible flowers and citrus.",

        caption: "Garden herb veloute, brassica blooms, pickled radish",

        width: 4023,

        height: 2665,

    },

    {

        src: "/gallery/D40AFFC1-3D32-49CF-9FC3-0D7DCD661645.jpg",

        alt: "Butter-poached lobster plated with saffron bisque.",

        caption: "Butter-poached lobster, saffron bisque, Riesling pairing",

        width: 6720,

        height: 4480,

    },

    {

        src: "/gallery/B8FBB31E-B185-4FD6-B6AD-C694DE95E5D8.jpg",

        alt: "Evening brigade briefing under warm pass lights.",

        caption: "Coordinated service pass, precision plating, brigade briefings",

        width: 5413,

        height: 3609,

    },

    {

        src: "/gallery/0D1EA119-6D65-43D8-8FA2-2FCB20ADCFBE.jpg",

        alt: "Sunlit aperitif table dressed with crystal and citrus.",

        caption: "Aperitif terrace with citrus infusions and cut crystal",

        width: 5603,

        height: 3735,

    },

    {

        src: "/gallery/3427FC7B-B743-4C4B-942E-0528F1AD6CE1.jpg",

        alt: "Candlelit dining room with layered glassware and florals.",

        caption: "Salon arranged for evening chapter with layered linens",

        width: 4061,

        height: 4095,

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


