import type { Mode } from "@/lib/checkout";

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

export const priceCatalog: Record<PriceKey, { id: string; mode: Mode }> = {
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
    description: string;
    bullets: string[];
};

export type IncludedSection = {
    title: string;
    description?: string;
    bullets: string[];
};

export type ProcessStep = {
    title: string;
    detail: string;
};

export type ProcessSection = {
    title: string;
    steps: ProcessStep[];
};

export type TierCta =
    | { type: "checkout"; label: string; priceKey: PriceKey; mode?: Mode; note?: string }
    | { type: "link"; label: string; href: string; note?: string };

export type Tier = {
    id: string;
    title: string;
    price: string;
    description?: string;
    bullets: string[];
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
    kicker: string;
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

export const sitePages: Record<PageId, PageContent> = {
    home: {
        id: "home",
        slug: "home",
        path: "/",
        navLabel: "home",
        meta: {
            title: "Table d’Adrian · Private chef Côte d’Azur",
            description:
                "Ingredient-led tasting menus with pharmacist-designed wellness systems for villas, yachts, and salons along Antibes, Cannes, and Monaco.",
            canonical: "/",
            keywords: [
                "table d’adrian",
                "private chef riviera",
                "côte d’azur private dining",
                "tasting menu antibes",
                "luxury private chef",
            ],
        },
        hero: {
            kicker: "côte d’azur · private table",
            title: "Table d’Adrian",
            description:
                "Ingredient-led tasting menus, pharmacist-designed wellness systems, and hospitality that moves quietly. Villas, yachts, and salons along Antibes, Cannes, Monaco.",
            primaryCta: { label: "request a booking", href: "/contact" },
        },
        quickNav: [
            { label: "value", target: "values" },
            { label: "what’s included", target: "included" },
            { label: "process", target: "process" },
            { label: "pricing", target: "pricing" },
            { label: "testimonials", target: "testimonials" },
            { label: "book", target: "cta" },
        ],
        values: {
            title: "Where we focus",
            cards: [
                {
                    title: "Fragrance-led cuisine",
                    description: "Menus that open with aroma, move through texture, and finish with calm sweetness.",
                    bullets: [
                        "Riviera produce, clarified broths, and slow reductions",
                        "Ceramics, glass, and linen tuned to the room",
                        "Seasonal arcs that feel effortless",
                    ],
                },
                {
                    title: "Clinical intelligence",
                    description: "Antonia (PharmD) builds routines that protect energy, cognition, and lab stability.",
                    bullets: [
                        "Clear guidance for CGM, lipids, and sensitivities",
                        "Documentation your physician and staff can act on",
                        "Sensible supplementation without excess",
                    ],
                },
                {
                    title: "Quiet hospitality",
                    description: "Service that disappears. Timing, pacing, and choreography that let conversation lead.",
                    bullets: [
                        "Compact crews trained for hush",
                        "Lighting, scent, and soundscapes curated to your space",
                        "Documentation so standards hold when you travel",
                    ],
                },
            ],
        },
        included: {
            title: "What every engagement includes",
            description: "Each booking receives documentation, coordination with household teams, and clear next steps for continuity.",
            bullets: [
                "Dedicated intake with Antonia & Adrian",
                "Menu book with mise charts, plating notes, and wine companions",
                "On-site crew briefing + reset",
                "Post-event refinement & updated standards",
                "Priority access to Adrian’s seasonal experiences",
            ],
        },
        process: {
            title: "How it unfolds",
            steps: [
                { title: "Inquiry", detail: "Share date, venue, and intentions. We reply within 24 hours." },
                {
                    title: "Intake",
                    detail: "Pharmacist and chef-led conversation to understand health priorities, provisioning, and guest cadence.",
                },
                {
                    title: "Design",
                    detail: "Menu, staffing, rentals, and beverage pairings documented, approved, and rehearsed with your team.",
                },
                {
                    title: "Service",
                    detail: "Quiet choreography the night of; follow-up documentation and pantry adjustments the next day.",
                },
            ],
        },
        pricing: {
            title: "Seasonal experiences",
            tiers: [
                {
                    id: "signature",
                    title: "Signature Tasting",
                    price: "from €2,200",
                    description: "12-course progression for villas and private salons.",
                    bullets: [
                        "Ingredient-led arc for up to 12 guests",
                        "Wine coordination + stemware standards",
                        "Household documentation + pantry reset",
                    ],
                    cta: { type: "link", label: "plan your tasting", href: "/experiences" },
                },
                {
                    id: "voyage",
                    title: "Voyage Weekend",
                    price: "€6,500 flat",
                    description: "Chef + pharmacist weekend residency for yachts and retreats.",
                    bullets: [
                        "Provisioning and crew training",
                        "Breakfast to late-service coverage",
                        "Clinical alignment with your physician",
                    ],
                    cta: { type: "checkout", label: "reserve weekend", priceKey: "experienceVoyage" },
                },
                {
                    id: "concierge",
                    title: "Concierge Quarter",
                    price: "€7,500",
                    description: "12-week continuity with Antonia & Adrian.",
                    bullets: [
                        "Weekly adjustments and priority booking",
                        "Kitchen systems and staff coaching",
                        "Hosted dinners embedded in the plan",
                    ],
                    cta: { type: "checkout", label: "start concierge", priceKey: "concierge12Week" },
                },
            ],
        },
        testimonials: {
            title: "Guest notes",
            items: [
                {
                    quote: "Precision that reads like poetry. Aroma leads; texture stays.",
                    name: "Villa host",
                    role: "Cap d’Antibes",
                },
                {
                    quote: "Service that disappears. Plates that arrive like small rituals.",
                    name: "Charter principal",
                    role: "Cannes",
                },
                {
                    quote: "They made our household standard better than the restaurants we travel for.",
                    name: "Family office",
                    role: "Monaco",
                },
            ],
        },
        finalCta: {
            title: "Ready to set your table",
            description: "Share your date and intentions. We’ll return with a precise plan and hold the calendar while you review.",
            primary: { label: "start booking", href: "/contact" },
            secondary: { label: "see membership", href: "/membership" },
        },
    },
    about: {
        id: "about",
        slug: "about",
        path: "/about",
        navLabel: "about",
        meta: {
            title: "About · Table d’Adrian",
            description:
                "Table d’Adrian is a private chef table on the Côte d’Azur led by Adrian and Antonia (PharmD). Ingredient-driven hospitality anchored in clinical intelligence and sourcing pedigree.",
            canonical: "/about",
            keywords: [
                "private chef Côte d’Azur",
                "luxury private dining",
                "tasting menu",
                "longevity cuisine",
                "villa chef Antibes Cannes Monaco",
                "pharmacist chef wellness",
            ],
        },
        hero: {
            kicker: "story · pedigree",
            title: "Antonia & Adrian",
            description: "Clinical pharmacist meets private chef. We bridge longevity-minded systems with hospitality that feels artful and composed.",
            primaryCta: { label: "view credentials", href: "/press" },
            secondaryCta: { label: "book an intake", href: "/consult" },
        },
        quickNav: [
            { label: "values", target: "values" },
            { label: "pedigree", target: "included" },
            { label: "timeline", target: "process" },
            { label: "engagements", target: "pricing" },
            { label: "testimonials", target: "testimonials" },
            { label: "start", target: "cta" },
        ],
        values: {
            title: "Why clients stay",
            cards: [
                {
                    title: "Dual leadership",
                    description: "Antonia (PharmD) directs wellness architecture while Adrian engineers every service detail.",
                    bullets: [
                        "Clinical translation without jargon",
                        "Chef-driven menu design and crew training",
                        "One point of accountability",
                    ],
                },
                {
                    title: "Documented standards",
                    description: "Every engagement results in a living operations book your team can execute without us present.",
                    bullets: [
                        "Mise charts, prep lists, and pantry logic",
                        "Beverage, scent, and linen direction",
                        "Updates after each season",
                    ],
                },
                {
                    title: "Discreet execution",
                    description: "Quiet, NDAs-ready service with trusted crew from villas, yachts, and European salons.",
                    bullets: [
                        "Staff vetted for multilingual discretion",
                        "Trusted partners for rentals and florals",
                        "Logistics handled end to end",
                    ],
                },
            ],
        },
        included: {
            title: "Pedigree & recognition",
            description: "Our work spans Michelin kitchens, clinical research, and households that demand both wellness and wonder.",
            bullets: [
                "EHL hospitality formation & Riviera residencies",
                "Former clinical lead for metabolic programs",
                "Featured in Financial Times, Monocle, Condé Nast Traveler",
                "Consultants to leading wellness retreats",
                "Trusted by family offices across the Côte d’Azur",
            ],
        },
        process: {
            title: "Career timeline",
            steps: [
                { title: "Foundations", detail: "Classical training in Bucharest & Lausanne; pharmacology residency in Lyon." },
                { title: "Michelin tenure", detail: "Service and R&D inside three-star brigades between Paris and Monaco." },
                { title: "Private practice", detail: "Household consults, yacht seasons, and metabolic reset programs." },
                { title: "Today", detail: "Table d’Adrian: integrated culinary and wellness leadership for private clients." },
            ],
        },
        pricing: {
            title: "Engagement formats",
            tiers: [
                {
                    id: "intake",
                    title: "Foundational Intake",
                    price: "€650",
                    description: "90-minute session with Antonia & Adrian.",
                    bullets: [
                        "Medical & culinary history review",
                        "Kitchen audit + mise recommendations",
                        "Actionable one-page next steps",
                    ],
                    cta: { type: "checkout", label: "reserve intake", priceKey: "consultIntake90" },
                },
                {
                    id: "reset",
                    title: "4-Week Reset",
                    price: "€2,400",
                    description: "Concise program to rebuild rhythms.",
                    bullets: [
                        "Weekly pharmacist and chef touchpoints",
                        "Menu and supplementation alignment",
                        "Documentation for staff implementation",
                    ],
                    cta: { type: "checkout", label: "begin reset", priceKey: "reset4Week" },
                },
                {
                    id: "membership",
                    title: "Annual Membership",
                    price: "from €650 / month",
                    description: "Ongoing leadership with hosted dinners embedded.",
                    bullets: [
                        "Quarterly or monthly reviews",
                        "Seasonal menu library & grocery standards",
                        "Priority access and on-call refinements",
                    ],
                    cta: { type: "link", label: "view plans", href: "/membership" },
                },
            ],
        },
        testimonials: {
            title: "Recognition",
            items: [
                { quote: "They hold space for performance and joy at the same time.", name: "Monocle", role: "Culture" },
                { quote: "The Riviera’s quiet standard for longevity-minded dining.", name: "FT Weekend", role: "How To Spend It" },
                { quote: "They make elite hospitality livable for households.", name: "Condé Nast", role: "Traveler" },
            ],
        },
        finalCta: {
            title: "Bring us into your season",
            description: "Intake spots are limited each month. Reserve yours and we’ll align on objectives before holding dates.",
            primary: { label: "reserve intake", href: "/consult" },
            secondary: { label: "see press kit", href: "/press" },
        },
    },
    experiences: {
        id: "experiences",
        slug: "experiences",
        path: "/experiences",
        navLabel: "experiences",
        meta: {
            title: "Experiences & Menus · Table d’Adrian",
            description:
                "Signature tastings, salon suppers, and voyage weekends engineered for villas, yachts, and retreats along the Côte d’Azur.",
            canonical: "/experiences",
            keywords: [
                "private dining experiences",
                "côte d’azur tasting menu",
                "yacht private chef",
                "salon supper riviera",
                "luxury culinary journey",
            ],
        },
        hero: {
            kicker: "menus · residencies",
            title: "Experiences & Menus",
            description: "Signature tastings, salon suppers, and voyage weekends engineered around your guests, pantry, and properties.",
            primaryCta: { label: "design your menu", href: "/contact" },
            secondaryCta: { label: "download sample arc", href: "/products" },
        },
        quickNav: [
            { label: "value", target: "values" },
            { label: "includes", target: "included" },
            { label: "timeline", target: "process" },
            { label: "tiers", target: "pricing" },
            { label: "testimonials", target: "testimonials" },
            { label: "book", target: "cta" },
        ],
        values: {
            title: "Experience design",
            cards: [
                {
                    title: "Ingredient cartography",
                    description: "Seasonal mapping of producers, fishermen, and artisans to express the Riviera and beyond.",
                    bullets: [
                        "Weekly scouting of growers and boats",
                        "In-house ferment and aging program",
                        "Menus that travel well for yachts",
                    ],
                },
                {
                    title: "Atmospheric control",
                    description: "Light, scent, and pacing tuned for each room and guest cadence.",
                    bullets: [
                        "Custom playlists & diffused aroma",
                        "Stemware, linens, and florals curated",
                        "Crew choreography documented",
                    ],
                },
                {
                    title: "Wellness alignment",
                    description: "Menu arcs respect CGM data, lipid goals, and personal sensitivities without losing delight.",
                    bullets: [
                        "Macro + micro adjustments per guest",
                        "Optional fasting or botanical tracks",
                        "Clear macros for trainers and doctors",
                    ],
                },
            ],
        },
        included: {
            title: "Deliverables",
            bullets: [
                "Multi-course tasting or service arc",
                "Wine pairing guidance and somm coordination",
                "Crew briefing, mise charts, and service timeline",
                "Pantry restock + zero-waste plan",
                "Photo & notes recap post-event",
            ],
        },
        process: {
            title: "Timeline",
            steps: [
                { title: "Blueprint", detail: "We align on date, venue, guest cadence, and dietary pathways." },
                { title: "Production", detail: "Ingredient sourcing, fermentation, and pre-service tastings in our atelier." },
                { title: "On-site", detail: "Setup, service, and quiet reset executed by Adrian, Antonia, and crew." },
                { title: "Archive", detail: "Delivery of menu book, adjustments, and pantry standards for your team." },
            ],
        },
        pricing: {
            title: "Experience tiers",
            tiers: [
                {
                    id: "signature-dinner",
                    title: "Signature Dinner",
                    price: "from €2,200",
                    bullets: [
                        "12–14 course progression",
                        "Curated pairings & playlist",
                        "Crew of 3 (chef + two service)",
                    ],
                    cta: { type: "checkout", label: "reserve dinner", priceKey: "experienceSignature" },
                },
                {
                    id: "salon-supper",
                    title: "Salon Supper",
                    price: "€3,800",
                    bullets: [
                        "8-course conversational format",
                        "Interactive plating moments",
                        "Perfume-inspired aperitifs",
                    ],
                    cta: { type: "checkout", label: "book salon", priceKey: "experienceSalon" },
                },
                {
                    id: "day-luncheon",
                    title: "Day Luncheon",
                    price: "€1,450",
                    bullets: [
                        "Midday produce-driven service",
                        "Cold-pressed elixirs & infusions",
                        "Household mise reset",
                    ],
                    cta: { type: "checkout", label: "schedule luncheon", priceKey: "experienceLuncheon" },
                },
            ],
            note: "All tiers include travel across Antibes, Cannes, Monaco. Extended travel quoted separately.",
        },
        testimonials: {
            title: "Recent hosts",
            items: [
                { quote: "Menus that remember every guest’s constraints without signaling it.", name: "Villa director", role: "Antibes" },
                { quote: "The salon supper turned clients into friends.", name: "Family office", role: "Cannes" },
                { quote: "Provisioning checklist that saved our crew days.", name: "Yacht captain", role: "Monaco" },
            ],
        },
        finalCta: {
            title: "Craft your next experience",
            description: "Tell us the moment you’re hosting. We’ll respond with a tailored arc within a day.",
            primary: { label: "start design", href: "/contact" },
            secondary: { label: "download sample menu", href: "/products" },
        },
    },


    products: {
        id: "products",
        slug: "products",
        path: "/products",
        navLabel: "products & services",
        meta: {
            title: "Operational Studio · Table d’Adrian",
            description:
                "Operational blueprints, beverage rituals, and longevity protocols built so villas, yachts, and households operate at Table d’Adrian’s standard even when we are away.",
            canonical: "/products",
            keywords: [
                "private chef systems",
                "culinary operations manual",
                "luxury hospitality consulting",
                "longevity dining program",
                "yacht crew training",
            ],
        },
        hero: {
            kicker: "systems · intelligence",
            title: "Operational Studio",
            description:
                "Operational blueprints, beverage rituals, and longevity protocols built so your household or yacht crew can execute with our calm precision.",
            primaryCta: { label: "request dossier", href: "/contact" },
            secondaryCta: { label: "schedule strategic consult", href: "/consult" },
        },
        quickNav: [
            { label: "pillars", target: "values" },
            { label: "deliverables", target: "included" },
            { label: "roadmap", target: "process" },
            { label: "modules", target: "pricing" },
            { label: "proof", target: "testimonials" },
            { label: "initiate", target: "cta" },
        ],
        values: {
            title: "Pillars of our studio",
            cards: [
                {
                    title: "Culinary architecture",
                    description:
                        "Seasonal menu maps, plating manuals, and procurement pathways that let crews recreate our experiences precisely.",
                    bullets: [
                        "Course-by-course mise en place diagrams",
                        "Sourcing alternates for every climate",
                        "Equipment and plating choreography",
                    ],
                },
                {
                    title: "Hospitality intelligence",
                    description:
                        "Training blocks, service analytics, and feedback rituals that keep standards elevated without constant oversight.",
                    bullets: [
                        "Crew intensives with measurable benchmarks",
                        "Service scripts translated for multilingual teams",
                        "Post-service reporting dashboards",
                    ],
                },
                {
                    title: "Clinical continuity",
                    description:
                        "Pharmacist-authored nutrition and supplementation frameworks aligned with physician directives and biometric data.",
                    bullets: [
                        "Lab-informed menu adjustments",
                        "Supplement and medication matrix",
                        "Quarterly reviews with medical teams",
                    ],
                },
            ],
        },
        included: {
            title: "What every engagement delivers",
            bullets: [
                "Executive intake with Antonia & Adrian",
                "Bespoke digital + print operations manual",
                "Recorded training sessions with Q&A",
                "Vendor and provisioning index tailored to your region",
                "Sixty-day refinement window with on-call support",
            ],
        },
        process: {
            title: "Studio roadmap",
            steps: [
                {
                    title: "Diagnostic",
                    detail:
                        "Audit existing menus, crew capability, and clinical priorities to set objectives and success metrics.",
                },
                {
                    title: "Design",
                    detail:
                        "Architect the playbooks, culinary libraries, and health protocols; review drafts with your leadership team.",
                },
                {
                    title: "Immersion",
                    detail:
                        "Deliver on-site or virtual trainings, certify crew readiness, and stage rehearsals in your space.",
                },
                {
                    title: "Sustain",
                    detail:
                        "Monitor implementation, deliver refinements, and schedule future reviews so the system stays alive.",
                },
            ],
        },
        pricing: {
            title: "Studio modules",
            tiers: [
                {
                    id: "blueprint",
                    title: "Foundation Blueprint",
                    price: "€2,200",
                    bullets: [
                        "Signature menu trilogy with mise charts",
                        "Service standards and guest journey maps",
                        "Two virtual coaching sessions",
                    ],
                    cta: { type: "link", label: "start blueprint", href: "/contact" },
                },
                {
                    id: "residency",
                    title: "Crew Residency",
                    price: "from €4,800",
                    bullets: [
                        "Two-day on-site intensive",
                        "Performance scoring and feedback loops",
                        "Follow-up micro-trainings for new staff",
                    ],
                    cta: { type: "link", label: "plan residency", href: "/contact" },
                },
                {
                    id: "longevity",
                    title: "Longevity Protocol",
                    price: "€2,400",
                    bullets: [
                        "Pharmacist-led intake and lab review",
                        "Menu rotations aligned to biometric targets",
                        "Bi-weekly refinements for four weeks",
                    ],
                    cta: { type: "checkout", label: "secure protocol", priceKey: "reset4Week" },
                },
            ],
        },
        testimonials: {
            title: "Operator proof",
            items: [
                {
                    quote: "Our yacht crew executed at restaurant speed after two days with their residency.",
                    name: "Charter manager",
                    role: "Monaco",
                },
                {
                    quote: "The blueprint removed every unknown from onboarding a new private chef.",
                    name: "Estate director",
                    role: "Cap d’Antibes",
                },
                {
                    quote: "Antonia translated bloodwork into menus our medical team can endorse.",
                    name: "Performance physician",
                    role: "London",
                },
            ],
        },
        finalCta: {
            title: "Commission your dossier",
            description:
                "Brief us on your kitchens and objectives. We assemble the complete operational package within 48 hours.",
            primary: { label: "request products", href: "/contact" },
            secondary: { label: "book strategic consult", href: "/consult" },
        },
    },
    contact: {
        id: "contact",
        slug: "contact",
        path: "/contact",
        navLabel: "contact / booking",
        meta: {
            title: "Contact & Booking · Table d’Adrian",
            description:
                "Share your intentions, venue, and guests. The founders respond with availability, pricing, and a detailed briefing within one day.",
            canonical: "/contact",
            keywords: [
                "book private chef cote d azur",
                "luxury dining inquiry",
                "private chef contact riviera",
                "concierge tasting menu booking",
                "table d adrian availability",
            ],
        },
        hero: {
            kicker: "bookings · concierge",
            title: "Contact & Booking",
            description:
                "Share your date, guest cadence, and intentions. We respond personally with availability, pricing, and the clearest path forward within 24 hours.",
            primaryCta: { label: "submit inquiry", href: "#contact-form" },
            secondaryCta: { label: "call concierge", href: "tel:+33781463724" },
        },
        quickNav: [
            { label: "why us", target: "values" },
            { label: "your briefing", target: "included" },
            { label: "timeline", target: "process" },
            { label: "investment", target: "pricing" },
            { label: "voices", target: "testimonials" },
            { label: "inquire", target: "cta" },
        ],
        values: {
            title: "What the concierge guarantees",
            cards: [
                {
                    title: "Founder attention",
                    description:
                        "Every note reaches Antonia and Adrian directly—no handoffs, no canned replies.",
                    bullets: [
                        "Bilingual correspondence (EN · FR)",
                        "Weekend coverage for urgent requests",
                        "Signal or WhatsApp once confirmed",
                    ],
                },
                {
                    title: "Transparent planning",
                    description:
                        "Budgets, staffing, and timing are itemised so principals, advisors, and crew can approve quickly.",
                    bullets: [
                        "Scenario planning for guest counts",
                        "Logistics matrix for rentals and vendors",
                        "Line-item budget and payment schedule",
                    ],
                },
                {
                    title: "Secure discretion",
                    description:
                        "Encrypted intake, optional NDAs, and manual moderation keep sensitive details private.",
                    bullets: [
                        "Turnstile + honeypot spam guard",
                        "Optional NDA before sharing specifics",
                        "Private vault for medical context",
                    ],
                },
            ],
        },
        included: {
            title: "Your briefing includes",
            description:
                "Every qualified inquiry receives a tailored briefing packet you can circulate to decision makers.",
            bullets: [
                "Date confirmation and calendar holds",
                "Experience outline with tasting directions",
                "Staffing plan with attire and duties",
                "Proposed investment with Stripe links",
                "Key contacts for pre-event coordination",
            ],
        },
        process: {
            title: "How booking unfolds",
            steps: [
                {
                    title: "Share",
                    detail:
                        "Submit the inquiry form or call with essentials—venue, cadence, guests, and any clinical notes.",
                },
                {
                    title: "Align",
                    detail:
                        "Review the bespoke briefing, adjust scope, and select enhancements or experiences.",
                },
                {
                    title: "Confirm",
                    detail:
                        "Lock your date with our secure Stripe link or concierge retainer; paperwork handled digitally.",
                },
                {
                    title: "Orchestrate",
                    detail:
                        "We coordinate vendors, rehearse with crew, and deliver the final run of show before arrival.",
                },
            ],
        },
        pricing: {
            title: "Booking pathways",
            tiers: [
                {
                    id: "preview",
                    title: "Calendar Preview",
                    price: "complimentary",
                    bullets: [
                        "15-minute concierge alignment",
                        "Preliminary availability check",
                        "Recommendation on next steps",
                    ],
                    cta: { type: "link", label: "schedule preview", href: "https://cal.com/adrian-stefan" },
                },
                {
                    id: "retainer",
                    title: "Reservation Retainer",
                    price: "€1,000",
                    bullets: [
                        "Locks your preferred date",
                        "Applies to final balance",
                        "Enables vendor coordination",
                    ],
                    cta: { type: "checkout", label: "place retainer", priceKey: "experienceSignature" },
                },
                {
                    id: "full-hold",
                    title: "Concierge Hold",
                    price: "€2,500",
                    bullets: [
                        "Priority access to founders",
                        "Rolling calendar monitoring",
                        "Dedicated planning channel",
                    ],
                    cta: { type: "checkout", label: "activate hold", priceKey: "experienceVoyage" },
                },
            ],
        },
        testimonials: {
            title: "Voices from the line",
            items: [
                {
                    quote: "We had a complete briefing packet in hours—finance approved it without edits.",
                    name: "Family office lead",
                    role: "Cannes",
                },
                {
                    quote: "They managed NDA, allergies, and security without us repeating ourselves once.",
                    name: "Chief of staff",
                    role: "Monaco",
                },
                {
                    quote: "The concierge held two backup dates while we aligned jet schedules.",
                    name: "Principal assistant",
                    role: "London",
                },
            ],
        },
        finalCta: {
            title: "Open your booking dialogue",
            description:
                "Send your intentions and any constraints. We will reply within a day with availability, pricing, and next steps tailored to you.",
            primary: { label: "start inquiry", href: "#contact-form" },
            secondary: { label: "email the founders", href: "mailto:adrian@tabledadrian.com" },
        },
    },
    gallery: {
        id: "gallery",
        slug: "gallery",
        path: "/gallery",
        navLabel: "gallery",
        meta: {
            title: "Gallery · Table d’Adrian",
            description:
                "Recent tables, ceramics, and atmospheres from villas, yachts, and salons across the Côte d’Azur.",
            canonical: "/gallery",
            keywords: [
                "private chef gallery",
                "côte d’azur dining photography",
                "luxury tablescapes",
                "yacht dinner visuals",
                "table d’adrian images",
            ],
        },
        hero: {
            kicker: "texture · light",
            title: "Gallery",
            description: "A look at recent tables: ceramics, courses, and atmospheres curated for villas, yachts, and salons.",
            primaryCta: { label: "book this feeling", href: "/contact" },
            secondaryCta: { label: "view experiences", href: "/experiences" },
        },
        quickNav: [
            { label: "value", target: "values" },
            { label: "what’s included", target: "included" },
            { label: "process", target: "process" },
            { label: "gallery", target: "gallery" },
            { label: "packages", target: "pricing" },
            { label: "testimonials", target: "testimonials" },
            { label: "inquire", target: "cta" },
        ],
        values: {
            title: "Visual language",
            cards: [
                {
                    title: "Materiality",
                    description: "Porcelain, raw stone, and handblown glass selected per venue.",
                    bullets: [
                        "Custom ceramics and glassware",
                        "Seasonal florals and linens",
                        "Textures that invite touch",
                    ],
                },
                {
                    title: "Motion",
                    description: "Service choreography captured mid-flight — quiet, deliberate, exact.",
                    bullets: [
                        "Crew in sync with pacing",
                        "Soundscapes and lighting cues",
                        "No wasted steps",
                    ],
                },
                {
                    title: "Guests",
                    description: "Moments of focus, laughter, and ease preserved discreetly.",
                    bullets: [
                        "Consent-first documentation",
                        "Private gallery delivery",
                        "Editors on staff for press kits",
                    ],
                },
            ],
        },
        included: {
            title: "When you book photography",
            bullets: [
                "Dedicated photographer with hospitality training",
                "Secure delivery within 48 hours",
                "Gallery formatted for print and web",
                "Usage rights for personal and press",
                "Optional motion capture",
            ],
        },
        process: {
            title: "How to explore",
            steps: [
                { title: "Open", detail: "Select any image to enter the lightbox." },
                { title: "Navigate", detail: "Use arrow keys, swipe, or on-screen controls." },
                { title: "Details", detail: "Captions share sourcing and design context." },
                { title: "Close", detail: "Escape key or close button returns you to the grid." },
            ],
        },
        pricing: {
            title: "Visual add-ons",
            tiers: [
                {
                    id: "documentary",
                    title: "Documentary Set",
                    price: "€480",
                    bullets: [
                        "Up to 60 edited images",
                        "Private gallery",
                        "48-hour delivery",
                    ],
                    cta: { type: "link", label: "add to booking", href: "/contact" },
                },
                {
                    id: "press",
                    title: "Press Kit",
                    price: "€850",
                    bullets: [
                        "Narrative photo essay",
                        "Interview notes",
                        "Print-ready assets",
                    ],
                    cta: { type: "link", label: "request press kit", href: "/press" },
                },
                {
                    id: "motion",
                    title: "Motion Capsule",
                    price: "€1,200",
                    bullets: [
                        "45-second hero film",
                        "Vertical + horizontal cuts",
                        "Color grade + sound design",
                    ],
                    cta: { type: "link", label: "reserve film crew", href: "/contact" },
                },
            ],
        },
        testimonials: {
            title: "On the visuals",
            items: [
                { quote: "Images that smell like the room — impossible and yet.", name: "Creative director", role: "Paris" },
                { quote: "Press kit went live within hours; editors loved it.", name: "Hospitality PR", role: "London" },
                { quote: "Our family relives the night through these frames.", name: "Villa host", role: "Antibes" },
            ],
        },
        finalCta: {
            title: "Curate your own gallery",
            description: "Book your date and we’ll capture the textures, light, and people you care about most.",
            primary: { label: "start booking", href: "/contact" },
            secondary: { label: "download sample set", href: "/press" },
        },
    },
    press: {
        id: "press",
        slug: "press",
        path: "/press",
        navLabel: "press & testimonials",
        meta: {
            title: "Press & Testimonials · Table d’Adrian",
            description:
                "Selected features, editorials, and partners speaking about Table d’Adrian’s work across Europe.",
            canonical: "/press",
            keywords: [
                "table d’adrian press",
                "luxury dining testimonials",
                "private chef media",
                "chef adrian coverage",
                "côte d’azur culinary accolades",
            ],
        },
        hero: {
            kicker: "coverage · editors",
            title: "Press & Testimonials",
            description: "Selected features, editorials, and partners speaking about Table d’Adrian’s work across Europe.",
            primaryCta: { label: "download press kit", href: "/press/kit.pdf" },
            secondaryCta: { label: "schedule interview", href: "/contact" },
        },
        quickNav: [
            { label: "value", target: "values" },
            { label: "what editors receive", target: "included" },
            { label: "process", target: "process" },
            { label: "packages", target: "pricing" },
            { label: "quotes", target: "testimonials" },
            { label: "connect", target: "cta" },
        ],
        values: {
            title: "Editorial collaboration",
            cards: [
                {
                    title: "Responsive",
                    description: "We turn requests quickly with fact-checked materials and visuals.",
                    bullets: [
                        "Same-day responses",
                        "Verified biographies",
                        "Usage-cleared imagery",
                    ],
                },
                {
                    title: "Global-ready",
                    description: "English, French, and Romanian press teams with on-the-ground contacts.",
                    bullets: [
                        "Interview coordination",
                        "Location recommendations",
                        "Broadcast support",
                    ],
                },
                {
                    title: "Story depth",
                    description: "Access to research, sourcing, and behind-the-scenes craft.",
                    bullets: [
                        "Clinical references",
                        "Producer dossiers",
                        "Menu archives",
                    ],
                },
            ],
        },
        included: {
            title: "Press kit contents",
            bullets: [
                "Biography & chronology",
                "Quote library",
                "High-res photo & video",
                "Menu excerpts",
                "Contact sheet",
            ],
        },
        process: {
            title: "Working with us",
            steps: [
                { title: "Pitch", detail: "Send topic, angle, and deadline." },
                { title: "Access", detail: "We confirm availability, gather supporting research, and brief Adrian & Antonia." },
                { title: "Production", detail: "Interviews, shoots, and fact-checking handled swiftly." },
                { title: "Follow-up", detail: "Post-publication assets shared, plus optional dinners for launch." },
            ],
        },
        pricing: {
            title: "Press experiences",
            tiers: [
                {
                    id: "editor-lunch",
                    title: "Editor Luncheon",
                    price: "€1,200",
                    bullets: [
                        "4-course tasting",
                        "Interview window",
                        "Photo permissions",
                    ],
                    cta: { type: "link", label: "request luncheon", href: "/contact" },
                },
                {
                    id: "shoot-day",
                    title: "Shoot Day",
                    price: "€2,800",
                    bullets: [
                        "Styled plates",
                        "Prop & lighting support",
                        "Crew coordination",
                    ],
                    cta: { type: "link", label: "book shoot", href: "/contact" },
                },
                {
                    id: "launch-dinner",
                    title: "Launch Dinner",
                    price: "€4,500",
                    bullets: [
                        "10-guest salon",
                        "Paired beverages",
                        "Media liaison on site",
                    ],
                    cta: { type: "link", label: "host launch", href: "/contact" },
                },
            ],
        },
        testimonials: {
            title: "Selected quotes",
            items: [
                { quote: "Fragrance-forward hospitality with clinical clarity.", name: "Financial Times", role: "HTSI" },
                { quote: "Every plate a quiet piece of theatre.", name: "Monocle", role: "Radio" },
                { quote: "The Riviera’s most considered private table.", name: "Condé Nast", role: "Traveler" },
            ],
        },
        finalCta: {
            title: "Request press access",
            description: "We love collaborating with thoughtful storytellers. Let’s align on your deadline and needs.",
            primary: { label: "email press", href: "mailto:press@tabledadrian.com" },
            secondary: { label: "book editor dinner", href: "/contact" },
        },
    },
    reviews: {
        id: "reviews",
        slug: "reviews",
        path: "/reviews",
        navLabel: "reviews",
        meta: {
            title: "Reviews · Table d’Adrian",
            description: "Transparent notes from guests, households, and partners across the Riviera.",
            canonical: "/reviews",
            keywords: [
                "table d’adrian reviews",
                "private chef testimonials",
                "luxury dining feedback",
                "côte d’azur chef ratings",
                "guest experiences riviera",
            ],
        },
        hero: {
            kicker: "public · verified",
            title: "Reviews",
            description: "Transparent notes from guests, households, and partners across the Riviera.",
            primaryCta: { label: "read latest", href: "#reviews" },
            secondaryCta: { label: "leave a note", href: "#write" },
        },
        quickNav: [
            { label: "value", target: "values" },
            { label: "verification", target: "included" },
            { label: "how it works", target: "process" },
            { label: "tiers", target: "pricing" },
            { label: "testimonials", target: "testimonials" },
            { label: "share", target: "cta" },
        ],
        values: {
            title: "Why reviews matter",
            cards: [
                {
                    title: "Visibility",
                    description: "Every note is public — no hidden endorsements.",
                    bullets: [
                        "Edge-stored, instantly loadable",
                        "No edits without consent",
                        "Shared with crew for refinement",
                    ],
                },
                {
                    title: "Verification",
                    description: "Optional email verification + Turnstile keeps spam away.",
                    bullets: [
                        "Honeypot & Turnstile",
                        "Manual moderation on anomalies",
                        "Edge caching for resilience",
                    ],
                },
                {
                    title: "Action",
                    description: "Feedback loops back into menus, service scripts, and pantry logic.",
                    bullets: [
                        "Monthly review sync",
                        "Documented adjustments",
                        "Shared wins with crew",
                    ],
                },
            ],
        },
        included: {
            title: "Verification steps",
            bullets: [
                "Turnstile challenge to reduce bots",
                "Email optional but helps verification",
                "Internal audit for flagged language",
                "All comments archived on Cloudflare KV",
                "Transparent response policy",
            ],
        },
        process: {
            title: "How reviews flow",
            steps: [
                { title: "Submit", detail: "Guests add a rating and note." },
                { title: "Verify", detail: "Turnstile + manual review ensure authenticity." },
                { title: "Publish", detail: "Approved notes appear immediately." },
                { title: "Respond", detail: "We follow up privately if requested." },
            ],
        },
        pricing: {
            title: "Ways to engage",
            tiers: [
                {
                    id: "share",
                    title: "Share Feedback",
                    price: "complimentary",
                    bullets: [
                        "2-minute form",
                        "Optional email",
                        "Public within minutes",
                    ],
                    cta: { type: "link", label: "write a review", href: "#write" },
                },
                {
                    id: "spotlight",
                    title: "Spotlight Response",
                    price: "€180",
                    bullets: [
                        "Tailored thank-you gift",
                        "Crew debrief",
                        "Documented adjustments",
                    ],
                    cta: { type: "link", label: "request spotlight", href: "/contact" },
                },
                {
                    id: "audit",
                    title: "Experience Audit",
                    price: "€450",
                    bullets: [
                        "In-depth review analysis",
                        "Operational recommendations",
                        "Action plan call",
                    ],
                    cta: { type: "link", label: "book audit", href: "/consult" },
                },
            ],
        },
        testimonials: {
            title: "Highlights",
            items: [
                { quote: "They thanked every guest individually afterwards.", name: "Salon host", role: "Nice" },
                { quote: "Adjustments showed up in the very next dinner.", name: "Yacht captain", role: "Monaco" },
                { quote: "Publishing our note felt collaborative, not performative.", name: "Villa guest", role: "Cannes" },
            ],
        },
        finalCta: {
            title: "Add your voice",
            description: "Use the form below to publish your note. We appreciate every insight.",
            primary: { label: "open form", href: "#write" },
            secondary: { label: "contact concierge", href: "/contact" },
        },
    },
    adminLeads: {
        id: "adminLeads",
        slug: "admin-leads",
        path: "/admin/leads",
        navLabel: "admin leads",
        meta: {
            title: "Admin Leads · Table d’Adrian",
            description: "Internal console to review booking submissions captured across the site.",
            canonical: "/admin/leads",
            keywords: [
                "table d’adrian admin",
                "private chef crm",
                "booking lead console",
                "concierge operations dashboard",
                "luxury dining inquiries",
            ],
        },
        hero: {
            kicker: "internal · read only",
            title: "Lead Console",
            description: "A read-only view of incoming bookings and inquiries captured through Table d’Adrian.",
            primaryCta: { label: "review latest", href: "#leads" },
            secondaryCta: { label: "export guidance", href: "/contact" },
        },
        quickNav: [
            { label: "signals", target: "values" },
            { label: "data fields", target: "included" },
            { label: "handling", target: "process" },
            { label: "tiers", target: "pricing" },
            { label: "feedback", target: "testimonials" },
            { label: "leads", target: "leads" },
            { label: "actions", target: "cta" },
        ],
        values: {
            title: "What you see",
            cards: [
                {
                    title: "Signal strength",
                    description: "Leads scored for readiness with flags for VIP, press, or rush.",
                    bullets: [
                        "Auto-score based on budget & timing",
                        "Highlights repeats",
                        "Spam quietly discarded",
                    ],
                },
                {
                    title: "Speed",
                    description: "Live updates from the booking form without refresh.",
                    bullets: [
                        "Edge-stored submissions",
                        "Chronological ordering",
                        "Timestamped for follow-up",
                    ],
                },
                {
                    title: "Context",
                    description: "Message, menu preference, and staff notes in one place.",
                    bullets: [
                        "Dietary highlights",
                        "Event type tags",
                        "Contact history",
                    ],
                },
            ],
        },
        included: {
            title: "Data captured",
            bullets: [
                "Name & email",
                "Event date & location",
                "Guests & budget",
                "Primary goal",
                "Notes from concierge",
            ],
        },
        process: {
            title: "Handling guidance",
            steps: [
                { title: "Review", detail: "Check new entries twice daily." },
                { title: "Respond", detail: "Send briefing PDF within 24 hours." },
                { title: "Log", detail: "Mark CRM and assign crew." },
                { title: "Archive", detail: "Export monthly for compliance." },
            ],
        },
        pricing: {
            title: "Lead status tiers",
            tiers: [
                {
                    id: "hot",
                    title: "Hot",
                    price: "reply in 2h",
                    bullets: [
                        "Budget confirmed",
                        "Date within 30 days",
                        "Existing relationship",
                    ],
                    cta: { type: "link", label: "contact now", href: "mailto:adrian@tabledadrian.com" },
                },
                {
                    id: "warm",
                    title: "Warm",
                    price: "reply same day",
                    bullets: [
                        "Budget pending",
                        "Flexible timing",
                        "New relationship",
                    ],
                    cta: { type: "link", label: "send briefing", href: "/contact" },
                },
                {
                    id: "nurture",
                    title: "Nurture",
                    price: "reply within 48h",
                    bullets: [
                        "Long lead",
                        "Exploratory",
                        "Press or partner",
                    ],
                    cta: { type: "link", label: "add to cadence", href: "/press" },
                },
            ],
        },
        testimonials: {
            title: "Team notes",
            items: [
                { quote: "We never miss a VIP since the signal score shipped.", name: "Adrian", role: "Chef" },
                { quote: "Spam guard dropped noise by 90%.", name: "Antonia", role: "PharmD" },
                { quote: "Export integrates perfectly with the CRM.", name: "Operations", role: "Lead" },
            ],
        },
        finalCta: {
            title: "Operational next steps",
            description: "Use the lead list below for call-backs, then update the CRM to keep everyone aligned.",
            primary: { label: "open CRM", href: "https://notion.so" },
            secondary: { label: "download csv", href: "mailto:ops@tabledadrian.com" },
        },
    },
    pricingCalculator: {
        id: "pricingCalculator",
        slug: "pricing-calculator",
        path: "/pricing-calculator",
        navLabel: "pricing calculator",
        meta: {
            title: "Pricing Calculator · Table d’Adrian",
            description: "Estimate investment for your gathering or program. Adjust guests and enhancements, then choose booking or checkout.",
            canonical: "/pricing-calculator",
            keywords: [
                "private chef pricing",
                "event cost calculator",
                "côte d’azur dining estimate",
                "luxury catering calculator",
                "table d’adrian pricing",
            ],
        },
        hero: {
            kicker: "plan · invest",
            title: "Pricing Calculator",
            description: "Estimate investment for your gathering or program. Adjust guests and enhancements, then route to booking or checkout.",
            primaryCta: { label: "start calculator", href: "#calculator" },
            secondaryCta: { label: "talk with concierge", href: "/contact" },
        },
        quickNav: [
            { label: "value", target: "values" },
            { label: "what’s included", target: "included" },
            { label: "steps", target: "process" },
            { label: "calculator", target: "calculator" },
            { label: "tiers", target: "pricing" },
            { label: "proof", target: "testimonials" },
            { label: "book", target: "cta" },
        ],
        values: {
            title: "Why use it",
            cards: [
                {
                    title: "Clarity",
                    description: "Get a transparent estimate before we speak.",
                    bullets: [
                        "Adjust guests in real time",
                        "Add enhancements",
                        "See deposit requirements",
                    ],
                },
                {
                    title: "Speed",
                    description: "Instant checkout links for standard experiences.",
                    bullets: [
                        "Stripe-powered deposit",
                        "Shareable summary",
                        "Saves time for approvals",
                    ],
                },
                {
                    title: "Guidance",
                    description: "Recommends best next step based on your inputs.",
                    bullets: [
                        "Contact vs. checkout",
                        "Upgrade prompts",
                        "Pre-filled inquiry link",
                    ],
                },
            ],
        },
        included: {
            title: "Calculator outputs",
            bullets: [
                "Estimated total investment",
                "Suggested experience tier",
                "Deposit requirement",
                "Link to booking or checkout",
                "Summary you can email",
            ],
        },
        process: {
            title: "How to use",
            steps: [
                { title: "Select", detail: "Choose the experience or program you’re planning." },
                { title: "Adjust", detail: "Set guest count and optional enhancements." },
                { title: "Review", detail: "See investment range and recommended next step." },
                { title: "Act", detail: "Go straight to checkout or send a detailed inquiry." },
            ],
        },
        pricing: {
            title: "Calculator presets",
            tiers: [
                {
                    id: "signature",
                    title: "Signature Dinner",
                    price: "baseline €2,200",
                    bullets: [
                        "Includes 12 guests",
                        "€180 per additional guest",
                        "Deposit €1,000",
                    ],
                    cta: { type: "checkout", label: "pay deposit", priceKey: "experienceSignature" },
                },
                {
                    id: "salon",
                    title: "Salon Supper",
                    price: "baseline €3,800",
                    bullets: [
                        "Includes 16 guests",
                        "€220 per additional guest",
                        "Deposit €1,500",
                    ],
                    cta: { type: "checkout", label: "pay deposit", priceKey: "experienceSalon" },
                },
                {
                    id: "concierge",
                    title: "Concierge Quarter",
                    price: "€7,500",
                    bullets: [
                        "Covers 12-week program",
                        "Optional hosted dinners",
                        "Deposit €2,500",
                    ],
                    cta: { type: "checkout", label: "secure concierge", priceKey: "concierge12Week" },
                },
            ],
        },
        testimonials: {
            title: "Client feedback",
            items: [
                { quote: "Finance approved the spend in a single email thanks to the calculator.", name: "Operations", role: "Monaco" },
                { quote: "Loved seeing how upgrades affected total in seconds.", name: "Event lead", role: "Cannes" },
                { quote: "We confirmed deposit before the first call.", name: "Family office", role: "Antibes" },
            ],
        },
        finalCta: {
            title: "Lock in your plan",
            description: "After estimating, submit your inquiry so we can hold the date and begin preparations.",
            primary: { label: "submit inquiry", href: "/contact" },
            secondary: { label: "pay deposit", href: "#calculator" },
        },
    },
};

export type GalleryImage = {
    src: string;
    alt: string;
    caption: string;
};

export const galleryImages: GalleryImage[] = [
    {
        src: "/images/plate-01.jpg",
        alt: "porcelain bowl of clarified consommé with citrus oil",
        caption: "Clarified langoustine broth, citrus oil, hand-thrown porcelain",
    },
    {
        src: "/images/plate-02.jpg",
        alt: "garden herbs resting over cultured cream",
        caption: "Garden herbs, cultured cream, smoked salt",
    },
    {
        src: "/images/plate-03.jpg",
        alt: "glazed root vegetable over embers",
        caption: "Glazed young carrot, ember oil, kombu glaze",
    },
    {
        src: "/images/plate-04.jpg",
        alt: "stone plate with sea-inspired course",
        caption: "Sea stone, razor clam, preserved lemon",
    },
    {
        src: "/images/plate-05.jpg",
        alt: "handblown glass coupe with reductions",
        caption: "Handblown glass, cold-brewed hibiscus, slow reductions",
    },
    {
        src: "/images/plate-06.jpg",
        alt: "cocoa husk dessert with citrus peel",
        caption: "Cocoa husk, citrus peel, aged honey",
    },
];

export type CalculatorEnhancement = {
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
    includedGuests: number;
    perGuest: number;
    deposit: number;
    enhancements: CalculatorEnhancement[];
    cta: TierCta;
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
        id: "concierge",
        name: "Concierge Quarter",
        description: "12-week continuity with hosted dinners",
        base: 7500,
        includedGuests: 0,
        perGuest: 0,
        deposit: 2500,
        enhancements: [
            { id: "dinners", label: "Additional hosted dinners", amount: 1200, description: "Per additional dinner" },
            { id: "labs", label: "Lab coordination", amount: 650, description: "Pharmacist-managed lab cadence" },
        ],
        cta: { type: "checkout", label: "secure concierge", priceKey: "concierge12Week" },
    },
];

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
    { href: sitePages.home.path, label: sitePages.home.navLabel },
    { href: sitePages.about.path, label: sitePages.about.navLabel },
    { href: sitePages.experiences.path, label: sitePages.experiences.navLabel },
    { href: sitePages.products.path, label: sitePages.products.navLabel },
    { href: sitePages.contact.path, label: sitePages.contact.navLabel },
    { href: sitePages.gallery.path, label: sitePages.gallery.navLabel },
    { href: sitePages.press.path, label: sitePages.press.navLabel },
    { href: sitePages.reviews.path, label: sitePages.reviews.navLabel },
    { href: sitePages.pricingCalculator.path, label: sitePages.pricingCalculator.navLabel },
    { href: sitePages.adminLeads.path, label: sitePages.adminLeads.navLabel },
    { href: "/membership", label: "membership" },
    { href: "/consult", label: "consult" },
];

