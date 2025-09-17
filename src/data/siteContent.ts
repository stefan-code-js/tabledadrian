import type { TierCta } from "@/lib/pricing";

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
                    paragraphs: [
                        "Menus open with aroma and move through texture before settling into calm sweetness. Riviera produce, clarified broths, and long reductions let the room exhale without ever feeling heavy.",
                        "Ceramics, glass, and linen are tuned to each venue so the seasonal arc feels inevitable even when the evening stretches late into conversation.",
                    ],
                },
                {
                    title: "Clinical intelligence",
                    paragraphs: [
                        "Antonia, PharmD, designs kitchen and lifestyle routines that protect energy, cognition, and measurable stability without overcomplicating daily life.",
                        "Clear documentation for CGM interpretation, lipid goals, and sensitivities becomes a brief your physician and staff can act on with confidence.",
                    ],
                },
                {
                    title: "Quiet hospitality",
                    paragraphs: [
                        "Service is choreographed to disappear so conversation can lead; timing, pacing, and tone stay measured even when a guest surprises the table.",
                        "Compact crews, thoughtful lighting, and discreet soundscapes translate into standards we document so they hold when you travel.",
                    ],
                },
            ],
        },
        included: {
            title: "What every engagement includes",
            intro: "Every booking arrives with meticulous documentation, coordination with household teams, and clear next steps for continuity across properties.",
            paragraphs: [
                "Intake sessions with Antonia and Adrian translate your priorities into nutritional guidance, logistics, and a working hospitality plan the household team can trust.",
                "We deliver menu books with mise charts, plating notes, and wine companions, then brief the crew on-site before service and reset the space afterward.",
                "Post-event we refine standards, update provisioning lists, and extend priority access to Adrian’s seasonal experiences so momentum never stalls.",
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
                    price: "By bespoke proposal",
                    description: "12-course progression for villas and private salons.",
                    paragraphs: [
                        "A 12-course progression written for villas and private salons, balancing Riviera produce with clarifying broths so the evening feels composed rather than theatrical.",
                        "We coordinate wine and stemware, document the pantry reset, and leave service notes so your team can repeat the standard with ease.",
                    ],
                    cta: { type: "link", label: "plan your tasting", href: "/experiences" },
                },
                {
                    id: "voyage",
                    title: "Voyage Weekend",
                    price: "Proposal after intake",
                    description: "Chef + pharmacist weekend residency for yachts and retreats.",
                    paragraphs: [
                        "A weekend residency aboard yachts or private retreats with provisioning, crew training, and pharmacist oversight baked into the plan.",
                        "Coverage spans breakfast through late-service rituals, all aligned with your physician so nothing feels improvised mid-voyage.",
                    ],
                    cta: { type: "checkout", label: "reserve weekend", priceKey: "experienceVoyage" },
                },
                {
                    id: "concierge",
                    title: "Concierge Quarter",
                    price: "Retainer by proposal",
                    description: "12-week continuity with Antonia & Adrian.",
                    paragraphs: [
                        "A 12-week retainer with weekly adjustments, priority booking, and the hosted dinners embedded in your calendar before the quarter begins.",
                        "We build kitchen systems, coach staff, and document the cadence so standards stay intact between visits.",
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
                    paragraphs: [
                        "Antonia (PharmD) directs wellness architecture while Adrian engineers every service detail.",
                        "Clinical translation without jargon. Chef-driven menu design and crew training. One point of accountability.",
                    ],
                },
                {
                    title: "Documented standards",
                    paragraphs: [
                        "Every engagement results in a living operations book your team can execute without us present.",
                        "Mise charts, prep lists, and pantry logic. Beverage, scent, and linen direction. Updates after each season.",
                    ],
                },
                {
                    title: "Discreet execution",
                    paragraphs: [
                        "Quiet, NDAs-ready service with trusted crew from villas, yachts, and European salons.",
                        "Staff vetted for multilingual discretion. Trusted partners for rentals and florals. Logistics handled end to end.",
                    ],
                },
            ],
        },
        included: {
            title: "Pedigree & recognition",
            intro: "Our work spans Michelin kitchens, clinical research, and households that demand both wellness and wonder.",
            paragraphs: [
                "EHL hospitality formation & Riviera residencies. Former clinical lead for metabolic programs. Featured in Financial Times, Monocle, Condé Nast Traveler. Consultants to leading wellness retreats. Trusted by family offices across the Côte d’Azur.",
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
                    price: "Schedule to begin",
                    paragraphs: [
                        "90-minute session with Antonia & Adrian.",
                        "Medical & culinary history review. Kitchen audit + mise recommendations. Actionable one-page next steps.",
                    ],
                    cta: { type: "checkout", label: "reserve intake", priceKey: "consultIntake90" },
                },
                {
                    id: "reset",
                    title: "4-Week Reset",
                    price: "Scope confirmed post-intake",
                    paragraphs: [
                        "Concise program to rebuild rhythms.",
                        "Weekly pharmacist and chef touchpoints. Menu and supplementation alignment. Documentation for staff implementation.",
                    ],
                    cta: { type: "checkout", label: "begin reset", priceKey: "reset4Week" },
                },
                {
                    id: "membership",
                    title: "Annual Membership",
                    price: "See membership tiers",
                    paragraphs: [
                        "Ongoing leadership with hosted dinners embedded.",
                        "Quarterly or monthly reviews. Seasonal menu library & grocery standards. Priority access and on-call refinements.",
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
        },
        hero: {
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
                    paragraphs: [
                        "Seasonal mapping of producers, fishermen, and artisans to express the Riviera and beyond.",
                        "Weekly scouting of growers and boats. In-house ferment and aging program. Menus that travel well for yachts.",
                    ],
                },
                {
                    title: "Atmospheric control",
                    paragraphs: [
                        "Light, scent, and pacing tuned for each room and guest cadence.",
                        "Custom playlists & diffused aroma. Stemware, linens, and florals curated. Crew choreography documented.",
                    ],
                },
                {
                    title: "Wellness alignment",
                    paragraphs: [
                        "Menu arcs respect CGM data, lipid goals, and personal sensitivities without losing delight.",
                        "Macro + micro adjustments per guest. Optional fasting or botanical tracks. Clear macros for trainers and doctors.",
                    ],
                },
            ],
        },
        included: {
            title: "Deliverables",
            paragraphs: [
                "Multi-course tasting or service arc. Wine pairing guidance and somm coordination. Crew briefing, mise charts, and service timeline. Pantry restock + zero-waste plan. Photo & notes recap post-event.",
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
                    price: "Proposal after consult",
                    paragraphs: [
                        "12–14 course progression. Curated pairings & playlist. Crew of 3 (chef + two service).",
                    ],
                    cta: { type: "checkout", label: "reserve dinner", priceKey: "experienceSignature" },
                },
                {
                    id: "salon-supper",
                    title: "Salon Supper",
                    price: "Hosted on proposal",
                    paragraphs: [
                        "8-course conversational format. Interactive plating moments. Perfume-inspired aperitifs.",
                    ],
                    cta: { type: "checkout", label: "book salon", priceKey: "experienceSalon" },
                },
                {
                    id: "day-luncheon",
                    title: "Day Luncheon",
                    price: "Quoted per occasion",
                    paragraphs: [
                        "Midday produce-driven service. Cold-pressed elixirs & infusions. Household mise reset.",
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
            title: "Products & Services · Table d’Adrian",
            description:
                "Toolkits, menu libraries, and on-call leadership crafted so villas, households, and yachts can operate at Table d’Adrian’s standard.",
            canonical: "/products",
        },
        hero: {
            title: "Products & Services",
            description: "Toolkits, menu libraries, and on-call leadership crafted so your household or yacht crew can operate at our standard.",
            primaryCta: { label: "request catalogue", href: "/contact" },
            secondaryCta: { label: "schedule consult", href: "/consult" },
        },
        quickNav: [
            { label: "value", target: "values" },
            { label: "what’s inside", target: "included" },
            { label: "process", target: "process" },
            { label: "packages", target: "pricing" },
            { label: "testimonials", target: "testimonials" },
            { label: "order", target: "cta" },
        ],
        values: {
            title: "Systems we deliver",
            cards: [
                {
                    title: "Menu libraries",
                    paragraphs: [
                        "Seasonal tasting menus with prep sequencing and sourcing notes for each dish.",
                        "Printable mise charts. Wine & non-alcoholic pairings. Chef’s notes for plating.",
                    ],
                },
                {
                    title: "Crew training",
                    paragraphs: [
                        "We develop the playbook, train your team, and certify execution standards.",
                        "Hands-on training blocks. Checklists and service scripts. Quarterly refreshers.",
                    ],
                },
                {
                    title: "Wellness protocols",
                    paragraphs: [
                        "Pharmacist-authored guides aligning meals with lab data and energy targets.",
                        "Supplement review. Biometric dashboards. Communication plan with physicians.",
                    ],
                },
            ],
        },
        included: {
            title: "Every product includes",
            paragraphs: [
                "Kickoff intake. Custom documentation library. Virtual office hours for 30 days. Update cycle aligned to seasons. Direct line for urgent adjustments.",
            ],
        },
        process: {
            title: "Delivery cadence",
            steps: [
                { title: "Scope", detail: "Choose modules you need. We align on outcomes and measurement." },
                { title: "Build", detail: "We create the assets, run tests, and prepare training." },
                { title: "Transfer", detail: "Your team receives live walkthroughs and recordings." },
                { title: "Support", detail: "We monitor implementation and tune for 30 days." },
            ],
        },
        pricing: {
            title: "Packages",
            tiers: [
                {
                    id: "library",
                    title: "Seasonal Library",
                    price: "Shared after discovery",
                    paragraphs: [
                        "3 seasonal menus. Shopping and prep standards. Virtual training session.",
                    ],
                    cta: { type: "link", label: "request library", href: "/contact" },
                },
                {
                    id: "crew",
                    title: "Crew Intensive",
                    price: "Quoted for your team",
                    paragraphs: [
                        "On-site two-day training. Performance evaluation. Service choreography playbook.",
                    ],
                    cta: { type: "link", label: "schedule intensive", href: "/contact" },
                },
                {
                    id: "protocol",
                    title: "Wellness Protocol",
                    price: "Retainer set post-intake",
                    paragraphs: [
                        "Pharmacist-led intake. Lab-aligned menu plan. Bi-weekly adjustments.",
                    ],
                    cta: { type: "checkout", label: "secure protocol", priceKey: "reset4Week" },
                },
            ],
        },
        testimonials: {
            title: "Operator feedback",
            items: [
                { quote: "The crew intensive paid for itself in one charter.", name: "Yacht purser", role: "Cannes" },
                { quote: "Documentation that our estate manager can actually use.", name: "Villa household lead", role: "Antibes" },
                { quote: "Medical team finally aligned with the kitchen.", name: "Family office", role: "Monaco" },
            ],
        },
        finalCta: {
            title: "Request the catalogue",
            description: "Tell us which modules you need. We’ll deliver scope, timeline, and checkout link in one reply.",
            primary: { label: "request products", href: "/contact" },
            secondary: { label: "book consult", href: "/consult" },
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
                "Share your date, guest cadence, and intentions. We confirm availability, pricing, and next steps for private chef experiences within 24 hours.",
            canonical: "/contact",
        },
        hero: {
            title: "Contact & Booking",
            description: "Share your date, guest cadence, and intentions. We reply with availability, pricing, and clear next steps within 24 hours.",
            primaryCta: { label: "submit inquiry", href: "#contact-form" },
            secondaryCta: { label: "call concierge", href: "tel:+33781463724" },
        },
        quickNav: [
            { label: "value", target: "values" },
            { label: "what’s included", target: "included" },
            { label: "process", target: "process" },
            { label: "options", target: "pricing" },
            { label: "testimonials", target: "testimonials" },
            { label: "inquiry", target: "cta" },
        ],
        values: {
            title: "Why booking here matters",
            cards: [
                {
                    title: "Rapid response",
                    paragraphs: [
                        "Direct line to Antonia & Adrian for scheduling and scope decisions.",
                        "Replies within 24 hours. Calendar holds while you review. Signal/WhatsApp for confirmed clients.",
                    ],
                },
                {
                    title: "Clarity",
                    paragraphs: [
                        "We send transparent pricing, timeline, and crew requirements in one packet.",
                        "Detailed budget ranges. Travel & rental requirements. Contingency planning.",
                    ],
                },
                {
                    title: "Security",
                    paragraphs: [
                        "Spam screening, NDAs on request, and encrypted handling of sensitive details.",
                        "Optional NDA prior to intake. Encrypted intake document. Honeypot & Turnstile protections.",
                    ],
                },
            ],
        },
        included: {
            title: "When you inquire",
            intro: "Every legitimate request receives a bespoke briefing PDF with confirmed pricing and holds.",
            paragraphs: [
                "Availability window with soft holds. Menu direction + beverage notes. Crew plan and rental checklist. Investment summary with payment links. Point of contact for day-of.",
            ],
        },
        process: {
            title: "Booking flow",
            steps: [
                { title: "Submit", detail: "Complete the inquiry form with event basics and any dietary notes." },
                { title: "Review", detail: "We confirm availability, send pricing, and hold your date for 5 days." },
                { title: "Confirm", detail: "Checkout link issued for deposit or full payment depending on scope." },
                { title: "Prepare", detail: "We run intake, coordinate vendors, and deliver pre-event documentation." },
            ],
        },
        pricing: {
            title: "Booking options",
            tiers: [
                {
                    id: "intro-call",
                    title: "Concierge Call",
                    price: "complimentary",
                    paragraphs: [
                        "15-minute alignment. Scope assessment. Calendar hold guidance.",
                    ],
                    cta: { type: "link", label: "schedule call", href: "https://cal.com/adrian-stefan" },
                },
                {
                    id: "deposit",
                    title: "Event Deposit",
                    price: "Secured with proposal",
                    paragraphs: [
                        "Reserve your date. Locks crew & travel. Applied to final balance.",
                    ],
                    cta: { type: "checkout", label: "secure deposit", priceKey: "experienceSignature" },
                },
                {
                    id: "retainer",
                    title: "Concierge Retainer",
                    price: "By seasonal agreement",
                    paragraphs: [
                        "Priority line. Rolling calendar holds. Quarterly planning session.",
                    ],
                    cta: { type: "checkout", label: "activate retainer", priceKey: "experienceVoyage" },
                },
            ],
        },
        testimonials: {
            title: "Booking feedback",
            items: [
                { quote: "Fast, precise, and human — they held our date while legal reviewed.", name: "General counsel", role: "Monaco" },
                { quote: "The intake packet made approvals effortless.", name: "Estate manager", role: "Cannes" },
                { quote: "Security was handled discreetly and professionally.", name: "Chief of staff", role: "Antibes" },
            ],
        },
        finalCta: {
            title: "Send your inquiry",
            description: "We respond personally. Share details below and expect a full briefing within 24 hours.",
            primary: { label: "open form", href: "#contact-form" },
            secondary: { label: "email directly", href: "mailto:adrian@tabledadrian.com" },
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
        },
        hero: {
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
                    paragraphs: [
                        "Porcelain, raw stone, and handblown glass selected per venue.",
                        "Custom ceramics and glassware. Seasonal florals and linens. Textures that invite touch.",
                    ],
                },
                {
                    title: "Motion",
                    paragraphs: [
                        "Service choreography captured mid-flight — quiet, deliberate, exact.",
                        "Crew in sync with pacing. Soundscapes and lighting cues. No wasted steps.",
                    ],
                },
                {
                    title: "Guests",
                    paragraphs: [
                        "Moments of focus, laughter, and ease preserved discreetly.",
                        "Consent-first documentation. Private gallery delivery. Editors on staff for press kits.",
                    ],
                },
            ],
        },
        included: {
            title: "When you book photography",
            paragraphs: [
                "Dedicated photographer with hospitality training. Secure delivery within 48 hours. Gallery formatted for print and web. Usage rights for personal and press. Optional motion capture.",
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
                    price: "Delivered per brief",
                    paragraphs: [
                        "Up to 60 edited images. Private gallery. 48-hour delivery.",
                    ],
                    cta: { type: "link", label: "add to booking", href: "/contact" },
                },
                {
                    id: "press",
                    title: "Press Kit",
                    price: "Proposal-based engagement",
                    paragraphs: [
                        "Narrative photo essay. Interview notes. Print-ready assets.",
                    ],
                    cta: { type: "link", label: "request press kit", href: "/press" },
                },
                {
                    id: "motion",
                    title: "Motion Capsule",
                    price: "Commission on request",
                    paragraphs: [
                        "45-second hero film. Vertical + horizontal cuts. Color grade + sound design.",
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
        },
        hero: {
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
                    paragraphs: [
                        "We turn requests quickly with fact-checked materials and visuals.",
                        "Same-day responses. Verified biographies. Usage-cleared imagery.",
                    ],
                },
                {
                    title: "Global-ready",
                    paragraphs: [
                        "English, French, and Romanian press teams with on-the-ground contacts.",
                        "Interview coordination. Location recommendations. Broadcast support.",
                    ],
                },
                {
                    title: "Story depth",
                    paragraphs: [
                        "Access to research, sourcing, and behind-the-scenes craft.",
                        "Clinical references. Producer dossiers. Menu archives.",
                    ],
                },
            ],
        },
        included: {
            title: "Press kit contents",
            paragraphs: [
                "Biography & chronology. Quote library. High-res photo & video. Menu excerpts. Contact sheet.",
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
                    price: "Hosted by arrangement",
                    paragraphs: [
                        "4-course tasting. Interview window. Photo permissions.",
                    ],
                    cta: { type: "link", label: "request luncheon", href: "/contact" },
                },
                {
                    id: "shoot-day",
                    title: "Shoot Day",
                    price: "Production quoted on brief",
                    paragraphs: [
                        "Styled plates. Prop & lighting support. Crew coordination.",
                    ],
                    cta: { type: "link", label: "book shoot", href: "/contact" },
                },
                {
                    id: "launch-dinner",
                    title: "Launch Dinner",
                    price: "Proposal provided on request",
                    paragraphs: [
                        "10-guest salon. Paired beverages. Media liaison on site.",
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
        },
        hero: {
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
                    paragraphs: [
                        "Every note is public — no hidden endorsements.",
                        "Edge-stored, instantly loadable. No edits without consent. Shared with crew for refinement.",
                    ],
                },
                {
                    title: "Verification",
                    paragraphs: [
                        "Optional email verification + Turnstile keeps spam away.",
                        "Honeypot & Turnstile. Manual moderation on anomalies. Edge caching for resilience.",
                    ],
                },
                {
                    title: "Action",
                    paragraphs: [
                        "Feedback loops back into menus, service scripts, and pantry logic.",
                        "Monthly review sync. Documented adjustments. Shared wins with crew.",
                    ],
                },
            ],
        },
        included: {
            title: "Verification steps",
            paragraphs: [
                "Turnstile challenge to reduce bots. Email optional but helps verification. Internal audit for flagged language. All comments archived on Cloudflare KV. Transparent response policy.",
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
                    paragraphs: [
                        "2-minute form. Optional email. Public within minutes.",
                    ],
                    cta: { type: "link", label: "write a review", href: "#write" },
                },
                {
                    id: "spotlight",
                    title: "Spotlight Response",
                    price: "Gift curated after review",
                    paragraphs: [
                        "Tailored thank-you gift. Crew debrief. Documented adjustments.",
                    ],
                    cta: { type: "link", label: "request spotlight", href: "/contact" },
                },
                {
                    id: "audit",
                    title: "Experience Audit",
                    price: "Proposal for returning guests",
                    paragraphs: [
                        "In-depth review analysis. Operational recommendations. Action plan call.",
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
        },
        hero: {
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
                    paragraphs: [
                        "Leads scored for readiness with flags for VIP, press, or rush.",
                        "Auto-score based on budget & timing. Highlights repeats. Spam quietly discarded.",
                    ],
                },
                {
                    title: "Speed",
                    paragraphs: [
                        "Live updates from the booking form without refresh.",
                        "Edge-stored submissions. Chronological ordering. Timestamped for follow-up.",
                    ],
                },
                {
                    title: "Context",
                    paragraphs: [
                        "Message, menu preference, and staff notes in one place.",
                        "Dietary highlights. Event type tags. Contact history.",
                    ],
                },
            ],
        },
        included: {
            title: "Data captured",
            paragraphs: [
                "Name & email. Event date & location. Guests & budget. Primary goal. Notes from concierge.",
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
                    paragraphs: [
                        "Budget confirmed. Date within 30 days. Existing relationship.",
                    ],
                    cta: { type: "link", label: "contact now", href: "mailto:adrian@tabledadrian.com" },
                },
                {
                    id: "warm",
                    title: "Warm",
                    price: "reply same day",
                    paragraphs: [
                        "Budget pending. Flexible timing. New relationship.",
                    ],
                    cta: { type: "link", label: "send briefing", href: "/contact" },
                },
                {
                    id: "nurture",
                    title: "Nurture",
                    price: "reply within 48h",
                    paragraphs: [
                        "Long lead. Exploratory. Press or partner.",
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
        },
        hero: {
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
                    paragraphs: [
                        "Get a transparent estimate before we speak.",
                        "Adjust guests in real time. Add enhancements. See deposit requirements.",
                    ],
                },
                {
                    title: "Speed",
                    paragraphs: [
                        "Instant checkout links for standard experiences.",
                        "Stripe-powered deposit. Shareable summary. Saves time for approvals.",
                    ],
                },
                {
                    title: "Guidance",
                    paragraphs: [
                        "Recommends best next step based on your inputs.",
                        "Contact vs. checkout. Upgrade prompts. Pre-filled inquiry link.",
                    ],
                },
            ],
        },
        included: {
            title: "Calculator outputs",
            paragraphs: [
                "Estimated total investment. Suggested experience tier. Deposit requirement. Link to booking or checkout. Summary you can email.",
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
                    paragraphs: [
                        "Includes 12 guests. €180 per additional guest. Deposit €1,000.",
                    ],
                    cta: { type: "checkout", label: "pay deposit", priceKey: "experienceSignature" },
                },
                {
                    id: "salon",
                    title: "Salon Supper",
                    price: "baseline €3,800",
                    paragraphs: [
                        "Includes 16 guests. €220 per additional guest. Deposit €1,500.",
                    ],
                    cta: { type: "checkout", label: "pay deposit", priceKey: "experienceSalon" },
                },
                {
                    id: "concierge",
                    title: "Concierge Quarter",
                    price: "€7,500",
                    paragraphs: [
                        "Covers 12-week program. Optional hosted dinners. Deposit €2,500.",
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
        src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fm=webp&w=1600&h=1066&fit=crop&q=85",
        alt: "porcelain bowl of clarified consommé with citrus oil",
        caption: "Clarified langoustine broth, citrus oil, hand-thrown porcelain",
    },
    {
        src: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?fm=webp&w=1600&h=1066&fit=crop&q=85",
        alt: "garden herbs resting over cultured cream",
        caption: "Garden herbs, cultured cream, smoked salt",
    },
    {
        src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?fm=webp&w=1600&h=1066&fit=crop&q=85",
        alt: "glazed root vegetable over embers",
        caption: "Glazed young carrot, ember oil, kombu glaze",
    },
    {
        src: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?fm=webp&w=1600&h=1066&fit=crop&q=85",
        alt: "stone plate with sea-inspired course",
        caption: "Sea stone, razor clam, preserved lemon",
    },
    {
        src: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?fm=webp&w=1600&h=1066&fit=crop&q=85",
        alt: "handblown glass coupe with reductions",
        caption: "Handblown glass, cold-brewed hibiscus, slow reductions",
    },
    {
        src: "https://images.unsplash.com/photo-1529042410759-befb1204b468?fm=webp&w=1600&h=1066&fit=crop&q=85",
        alt: "cocoa husk dessert with citrus peel",
        caption: "Cocoa husk, citrus peel, aged honey",
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

export const footerLinks: NavLink[] = navLinks;
