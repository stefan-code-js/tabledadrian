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
            title: "Table d'Adrian · Private chef Cote d'Azur",
            description:
                "Ingredient-led tasting menus with pharmacist-designed wellness systems for villas, yachts, and salons along Antibes, Cannes, and Monaco.",
            canonical: "/",
            keywords: [
                "table d'adrian",
                "private chef riviera",
                "cote d'azur private dining",
                "tasting menu antibes",
                "luxury private chef",
            ],
        },
        hero: {
            title: "Table d'Adrian",
            description:
                "Ingredient-led tasting menus, pharmacist-designed wellness systems, and hospitality that moves quietly. Villas, yachts, and salons along Antibes, Cannes, Monaco. Every engagement is built around a written narrative so your guests understand the intention before the first pour.",
            primaryCta: { label: "request a booking", href: "/book" },
        },
        quickNav: [
            { label: "value", target: "values" },
            { label: "what's included", target: "included" },
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
                        "Menus open with aroma and move through texture before settling into calm sweetness. Riviera produce, clarified broths, and long reductions let the room exhale without ever feeling heavy. Courses arrive with an intentional rhythm so conversation can deepen between pours.",
                        "Ceramics, glass, and linen are tuned to each venue so the seasonal arc feels inevitable even when the evening stretches late into conversation. Every tactile decision is documented so future gatherings can recreate the exact sensation without guesswork.",
                    ],
                },
                {
                    title: "Clinical intelligence",
                    paragraphs: [
                        "Antonia, PharmD, designs kitchen and lifestyle routines that protect energy, cognition, and measurable stability without overcomplicating daily life. Intake conversations surface context from biomarkers to emotional cadence so plans land with empathy.",
                        "Clear documentation for CGM interpretation, lipid goals, and sensitivities becomes a brief your physician and staff can act on with confidence. We follow up with revisions as your data evolves so the program always feels current.",
                    ],
                },
                {
                    title: "Quiet hospitality",
                    paragraphs: [
                        "Service is choreographed to disappear so conversation can lead; timing, pacing, and tone stay measured even when a guest surprises the table. Our team rehearses each floor plan to eliminate friction once guests arrive.",
                        "Compact crews, thoughtful lighting, and discreet soundscapes translate into standards we document so they hold when you travel. The result is an atmosphere that feels inevitable rather than staged.",
                    ],
                },
            ],
        },
        included: {
            title: "What every engagement includes",
            intro: "Every booking arrives with meticulous documentation, coordination with household teams, and clear next steps for continuity across properties. We align calendars, inventory, and service preferences before the first mise en place list is drafted.",
            paragraphs: [
                "Intake sessions with Antonia and Adrian translate your priorities into nutritional guidance, logistics, and a working hospitality plan the household team can trust. We document every standard in shared workspaces so nothing lives in someone's memory alone.",
                "We deliver menu books with mise charts, plating notes, and wine companions, then brief the crew on-site before service and reset the space afterward. Your staff receives advance run-of-show timelines so they always know what happens next.",
                "Post-event we refine standards, update provisioning lists, and extend priority access to Adrian's seasonal experiences so momentum never stalls. Continued guidance keeps your household, yacht, or salon aligned even when teams rotate.",
            ],
        },
        process: {
            title: "How it unfolds",
            steps: [
                {
                    title: "Inquiry",
                    detail: "Share date, venue, and intentions. We reply within 24 hours with suggested call times, preliminary menu thoughts, and any immediate questions about guest flow.",
                },
                {
                    title: "Intake",
                    detail: "Pharmacist and chef-led conversation to understand health priorities, provisioning, and guest cadence. We review medical considerations, cellar notes, and existing staff strengths so the plan respects your reality.",
                },
                {
                    title: "Design",
                    detail: "Menu, staffing, rentals, and beverage pairings documented, approved, and rehearsed with your team. Timelines, vendor briefs, and staging diagrams are shared for comment before anything is finalized.",
                },
                {
                    title: "Service",
                    detail: "Quiet choreography the night of; follow-up documentation and pantry adjustments the next day. We close the loop with actionable notes so every engagement strengthens the next.",
                },
            ],
        },
        pricing: {
            title: "Seasonal experiences",
            tiers: [
                {
                    id: "signature",
                    title: "Signature Tasting",
                    description: "12-course progression for villas and private salons.",
                    paragraphs: [
                        "A 12-course progression written for villas and private salons, balancing Riviera produce with clarifying broths so the evening feels composed rather than theatrical.",
                        "We coordinate wine and stemware, document the pantry reset, and leave service notes so your team can repeat the standard with ease.",
                    ],
                    cta: { type: "link", label: "request your tasting", href: "/book" },
                },
                {
                    id: "voyage",
                    title: "Voyage Weekend",
                    description: "Chef + pharmacist weekend residency for yachts and retreats.",
                    paragraphs: [
                        "A weekend residency aboard yachts or private retreats with provisioning, crew training, and pharmacist oversight baked into the plan.",
                        "Coverage spans breakfast through late-service rituals, all aligned with your physician so nothing feels improvised mid-voyage.",
                    ],
                    cta: { type: "link", label: "reserve weekend", href: "/book" },
                },
                {
                    id: "concierge",
                    title: "Concierge Quarter",
                    description: "12-week continuity with Antonia & Adrian.",
                    paragraphs: [
                        "A 12-week retainer with weekly adjustments, priority booking, and the hosted dinners embedded in your calendar before the quarter begins.",
                        "We build kitchen systems, coach staff, and document the cadence so standards stay intact between visits.",
                    ],
                    cta: { type: "link", label: "start concierge", href: "/membership" },
                },
            ],
        },
        testimonials: {
            title: "Guest notes",
            items: [
                {
                    quote: "Precision that reads like poetry. Aroma leads; texture stays.",
                    name: "Villa host",
                    role: "Cap d'Antibes",
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
            description: "Share your date and intentions. We'll return with a precise plan and hold the calendar while you review.",
            primary: { label: "start booking", href: "/book" },
            secondary: { label: "see membership", href: "/membership" },
        },
    },
    about: {
        id: "about",
        slug: "about",
        path: "/about",
        navLabel: "about",
        meta: {
            title: "About · Table d'Adrian",
            description:
                "Table d'Adrian is a private chef table on the Cote d'Azur led by Adrian and Antonia (PharmD). Ingredient-driven hospitality anchored in clinical intelligence and sourcing pedigree.",
            canonical: "/about",
            keywords: [
                "private chef Cote d'Azur",
                "luxury private dining",
                "tasting menu",
                "longevity cuisine",
                "villa chef Antibes Cannes Monaco",
                "pharmacist chef wellness",
            ],
        },
        hero: {
            title: "Antonia & Adrian",
            description:
                "Clinical pharmacist meets private chef. We bridge longevity-minded systems with hospitality that feels artful and composed. Behind every dinner is a dossier of sourcing notes, medical considerations, and service scripts that we maintain long after the guests depart.",
            primaryCta: { label: "request a booking", href: "/book" },
            secondaryCta: { label: "explore membership", href: "/membership" },
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
                        "Antonia (PharmD) directs wellness architecture while Adrian engineers every service detail. Clients experience a single, thoughtful voice guiding both health strategy and hospitality.",
                        "Clinical translation without jargon. Chef-driven menu design and crew training. One point of accountability. We document decisions in language your staff and physicians actually use.",
                    ],
                },
                {
                    title: "Documented standards",
                    paragraphs: [
                        "Every engagement results in a living operations book your team can execute without us present. We annotate each version so improvements compound over seasons.",
                        "Mise charts, prep lists, and pantry logic. Beverage, scent, and linen direction. Updates after each season. The book evolves as your household evolves, never sitting on a shelf untouched.",
                    ],
                },
                {
                    title: "Discreet execution",
                    paragraphs: [
                        "Quiet, NDAs-ready service with trusted crew from villas, yachts, and European salons. Guests feel guided but never observed, even during complex service cues.",
                        "Staff vetted for multilingual discretion. Trusted partners for rentals and florals. Logistics handled end to end. Our notes include fallback plans for sudden weather or guest additions.",
                    ],
                },
            ],
        },
        included: {
            title: "Pedigree & recognition",
            intro: "Our work spans Michelin kitchens, clinical research, and households that demand both wellness and wonder. We bring the same precision to private residences that we honed in brigades and clinical programs.",
            paragraphs: [
                "EHL hospitality formation & Riviera residencies. Former clinical lead for metabolic programs. Featured in Financial Times, Monocle, Conde Nast Traveler. Consultants to leading wellness retreats. Trusted by family offices across the Cote d'Azur. Our partners return season after season because the documentation we deliver lets their teams perform at our standard.",
            ],
        },
        process: {
            title: "Career timeline",
            steps: [
                {
                    title: "Foundations",
                    detail: "Classical training in Bucharest & Lausanne; pharmacology residency in Lyon. The rigour of both worlds informs every system we build today.",
                },
                {
                    title: "Michelin tenure",
                    detail: "Service and R&D inside three-star brigades between Paris and Monaco. Precision under pressure became habit, not aspiration.",
                },
                {
                    title: "Private practice",
                    detail: "Household consults, yacht seasons, and metabolic reset programs. We learned to translate excellence into environments without formal brigades.",
                },
                {
                    title: "Today",
                    detail: "Table d'Adrian: integrated culinary and wellness leadership for private clients. We continue to refine the craft with every dossier we hand over.",
                },
            ],
        },
        pricing: {
            title: "Engagement formats",
            tiers: [
                {
                    id: "intake",
                    title: "Foundational Intake",
                    paragraphs: [
                        "90-minute session with Antonia & Adrian.",
                        "Medical & culinary history review. Kitchen audit + mise recommendations. Actionable one-page next steps.",
                    ],
                    cta: { type: "link", label: "reserve intake", href: "/book" },
                },
                {
                    id: "reset",
                    title: "4-Week Reset",
                    paragraphs: [
                        "Concise program to rebuild rhythms.",
                        "Weekly pharmacist and chef touchpoints. Menu and supplementation alignment. Documentation for staff implementation.",
                    ],
                    cta: { type: "link", label: "begin reset", href: "/book" },
                },
                {
                    id: "membership",
                    title: "Annual Membership",
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
                { quote: "The Riviera's quiet standard for longevity-minded dining.", name: "FT Weekend", role: "How To Spend It" },
                { quote: "They make elite hospitality livable for households.", name: "Conde Nast", role: "Traveler" },
            ],
        },
        finalCta: {
            title: "Bring us into your season",
            description: "Intake spots are limited each month. Reserve yours and we'll align on objectives before holding dates.",
            primary: { label: "request a booking", href: "/book" },
            secondary: { label: "explore membership", href: "/membership" },
        },
    },
    experiences: {
        id: "experiences",
        slug: "experiences",
        path: "/experiences",
        navLabel: "experiences",
        meta: {
            title: "Experiences & Menus · Table d'Adrian",
            description:
                "Signature tastings, salon suppers, and voyage weekends engineered for villas, yachts, and retreats along the Cote d'Azur.",
            canonical: "/experiences",
        },
        hero: {
            title: "Experiences & Menus",
            description:
                "Signature tastings, salon suppers, and voyage weekends engineered around your guests, pantry, and properties. We script the arc of the evening so the environment, the menu, and the music feel like one seamless story.",
            primaryCta: { label: "design your menu", href: "/book" },
            secondaryCta: { label: "explore membership", href: "/membership" },
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
                        "Seasonal mapping of producers, fishermen, and artisans to express the Riviera and beyond. We catalog provenance notes so guests can follow the journey of each ingredient.",
                        "Weekly scouting of growers and boats. In-house ferment and aging program. Menus that travel well for yachts. Shelf-stable components are engineered in advance for voyages.",
                    ],
                },
                {
                    title: "Atmospheric control",
                    paragraphs: [
                        "Light, scent, and pacing tuned for each room and guest cadence. Guests move through the night without ever sensing a transition.",
                        "Custom playlists & diffused aroma. Stemware, linens, and florals curated. Crew choreography documented. We provide lighting cues and audio levels for your team to replicate later.",
                    ],
                },
                {
                    title: "Wellness alignment",
                    paragraphs: [
                        "Menu arcs respect CGM data, lipid goals, and personal sensitivities without losing delight. Every decision is recorded so your medical team can review it afterward.",
                        "Macro + micro adjustments per guest. Optional fasting or botanical tracks. Clear macros for trainers and doctors. We leave behind prep notes so household chefs can maintain momentum.",
                    ],
                },
            ],
        },
        included: {
            title: "Deliverables",
            paragraphs: [
                "Multi-course tasting or service arc. Wine pairing guidance and somm coordination. Crew briefing, mise charts, and service timeline. Pantry restock + zero-waste plan. Photo & notes recap post-event. We also include day-after nourishment plans and vendor contacts for continuity.",
            ],
        },
        process: {
            title: "Timeline",
            steps: [
                {
                    title: "Blueprint",
                    detail: "We align on date, venue, guest cadence, and dietary pathways. The schedule includes contingency prompts for weather and guest count shifts.",
                },
                {
                    title: "Production",
                    detail: "Ingredient sourcing, fermentation, and pre-service tastings in our atelier. We share prep footage and notes so you can feel the story forming in real time.",
                },
                {
                    title: "On-site",
                    detail: "Setup, service, and quiet reset executed by Adrian, Antonia, and crew. Your household team receives briefings at each stage so everyone stays ahead of the guests.",
                },
                {
                    title: "Archive",
                    detail: "Delivery of menu book, adjustments, and pantry standards for your team. We schedule a debrief to capture what worked and what needs to evolve.",
                },
            ],
        },
        pricing: {
            title: "Experience tiers",
            tiers: [
                {
                    id: "signature-dinner",
                    title: "Signature Dinner",
                    paragraphs: [
                        "12–14 course progression. Curated pairings & playlist. Crew of 3 (chef + two service).",
                    ],
                    cta: { type: "link", label: "reserve dinner", href: "/book" },
                },
                {
                    id: "salon-supper",
                    title: "Salon Supper",
                    paragraphs: [
                        "8-course conversational format. Interactive plating moments. Perfume-inspired aperitifs.",
                    ],
                    cta: { type: "link", label: "book salon", href: "/book" },
                },
                {
                    id: "day-luncheon",
                    title: "Day Luncheon",
                    paragraphs: [
                        "Midday produce-driven service. Cold-pressed elixirs & infusions. Household mise reset.",
                    ],
                    cta: { type: "link", label: "schedule luncheon", href: "/book" },
                },
            ],
            note: "All tiers include travel across Antibes, Cannes, Monaco. Extended travel quoted separately.",
        },
        testimonials: {
            title: "Recent hosts",
            items: [
                { quote: "Menus that remember every guest's constraints without signaling it.", name: "Villa director", role: "Antibes" },
                { quote: "The salon supper turned clients into friends.", name: "Family office", role: "Cannes" },
                { quote: "Provisioning checklist that saved our crew days.", name: "Yacht captain", role: "Monaco" },
            ],
        },
        finalCta: {
            title: "Craft your next experience",
            description: "Tell us the moment you're hosting. We'll respond with a tailored arc within a day.",
            primary: { label: "start design", href: "/book" },
            secondary: { label: "explore membership", href: "/membership" },
        },
    },
    products: {
        id: "products",
        slug: "products",
        path: "/products",
        navLabel: "products & services",
        meta: {
            title: "Products & Services · Table d'Adrian",
            description:
                "Toolkits, menu libraries, and on-call leadership crafted so villas, households, and yachts can operate at Table d'Adrian's standard.",
            canonical: "/products",
        },
        hero: {
            title: "Products & Services",
            description:
                "Toolkits, menu libraries, and on-call leadership crafted so your household or yacht crew can operate at our standard. Each asset is designed to live with your team long after our initial handover.",
            primaryCta: { label: "request catalogue", href: "/book" },
            secondaryCta: { label: "explore membership", href: "/membership" },
        },
        quickNav: [
            { label: "value", target: "values" },
            { label: "what's inside", target: "included" },
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
                        "Seasonal tasting menus with prep sequencing and sourcing notes for each dish. Ingredients are mapped to local suppliers with substitutions when seasons shift.",
                        "Printable mise charts. Wine & non-alcoholic pairings. Chef's notes for plating. We include service stories so staff can speak about each course with confidence.",
                    ],
                },
                {
                    title: "Crew training",
                    paragraphs: [
                        "We develop the playbook, train your team, and certify execution standards. Every drill is recorded so new hires can onboard quickly.",
                        "Hands-on training blocks. Checklists and service scripts. Quarterly refreshers. Managers receive evaluation rubrics to maintain consistency.",
                    ],
                },
                {
                    title: "Wellness protocols",
                    paragraphs: [
                        "Pharmacist-authored guides aligning meals with lab data and energy targets. We translate complex science into actionable kitchen routines.",
                        "Supplement review. Biometric dashboards. Communication plan with physicians. Adjustments are scheduled so protocols grow with your data.",
                    ],
                },
            ],
        },
        included: {
            title: "Every product includes",
            paragraphs: [
                "Kickoff intake. Custom documentation library. Virtual office hours for 30 days. Update cycle aligned to seasons. Direct line for urgent adjustments. We also provide video walkthroughs and translation support when teams span languages.",
            ],
        },
        process: {
            title: "Delivery cadence",
            steps: [
                {
                    title: "Scope",
                    detail: "Choose modules you need. We align on outcomes and measurement, then map stakeholders who will own each step after handover.",
                },
                {
                    title: "Build",
                    detail: "We create the assets, run tests, and prepare training. Drafts are shared for comment so the final kit reflects your environment.",
                },
                {
                    title: "Transfer",
                    detail: "Your team receives live walkthroughs and recordings. We leave behind facilitator notes to support future refreshers.",
                },
                {
                    title: "Support",
                    detail: "We monitor implementation and tune for 30 days. You'll receive change logs and recommendations for ongoing maintenance.",
                },
            ],
        },
        pricing: {
            title: "Packages",
            tiers: [
                {
                    id: "library",
                    title: "Seasonal Library",
                    paragraphs: [
                        "3 seasonal menus. Shopping and prep standards. Virtual training session.",
                    ],
                    cta: { type: "link", label: "request library", href: "/book" },
                },
                {
                    id: "crew",
                    title: "Crew Intensive",
                    paragraphs: [
                        "On-site two-day training. Performance evaluation. Service choreography playbook.",
                    ],
                    cta: { type: "link", label: "schedule intensive", href: "/book" },
                },
                {
                    id: "protocol",
                    title: "Wellness Protocol",
                    paragraphs: [
                        "Pharmacist-led intake. Lab-aligned menu plan. Bi-weekly adjustments.",
                    ],
                    cta: { type: "link", label: "secure protocol", href: "/book" },
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
            description: "Tell us which modules you need. We'll deliver scope, timeline, and checkout link in one reply.",
            primary: { label: "request products", href: "/book" },
            secondary: { label: "explore membership", href: "/membership" },
        },
    },
    contact: {
        id: "contact",
        slug: "contact",
        path: "/contact",
        navLabel: "contact / booking",
        meta: {
            title: "Contact & Booking · Table d'Adrian",
            description:
                "Share your date, guest cadence, and intentions. We confirm availability, pricing, and next steps for private chef experiences within 24 hours.",
            canonical: "/contact",
        },
        hero: {
            title: "Contact & Booking",
            description:
                "Share your date, guest cadence, and intentions. We reply with availability, pricing, and clear next steps within 24 hours. The briefing includes suggested call times and any preparatory materials to keep momentum high.",
            primaryCta: { label: "submit inquiry", href: "#contact-form" },
            secondaryCta: { label: "call concierge", href: "tel:+33781463724" },
        },
        quickNav: [
            { label: "value", target: "values" },
            { label: "what's included", target: "included" },
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
                        "Direct line to Antonia & Adrian for scheduling and scope decisions. You will always speak with leadership, never a call centre.",
                        "Replies within 24 hours. Calendar holds while you review. Signal/WhatsApp for confirmed clients. We share real-time updates if multiple dates are in play.",
                    ],
                },
                {
                    title: "Clarity",
                    paragraphs: [
                        "We send transparent pricing, timeline, and crew requirements in one packet. Nothing is hidden or split across emails.",
                        "Detailed budget ranges. Travel & rental requirements. Contingency planning. You receive decision trees that clarify next actions.",
                    ],
                },
                {
                    title: "Security",
                    paragraphs: [
                        "Spam screening, NDAs on request, and encrypted handling of sensitive details. We treat privacy as part of the hospitality experience.",
                        "Optional NDA prior to intake. Encrypted intake document. Honeypot & Turnstile protections. Sensitive documents are shared through secure portals, never attachments.",
                    ],
                },
            ],
        },
        included: {
            title: "When you inquire",
            intro: "Every legitimate request receives a bespoke briefing PDF with confirmed pricing and holds.",
            paragraphs: [
                "Availability window with soft holds. Menu direction + beverage notes. Crew plan and rental checklist. Investment summary with payment links. Point of contact for day-of. We outline deadlines for approvals so every stakeholder knows when to weigh in.",
            ],
        },
        process: {
            title: "Booking flow",
            steps: [
                {
                    title: "Submit",
                    detail: "Complete the inquiry form with event basics and any dietary notes. We monitor submissions live so urgent requests receive immediate attention.",
                },
                {
                    title: "Review",
                    detail: "We confirm availability, send pricing, and hold your date for 5 days. If your legal or finance teams need more time we extend holds with transparent updates.",
                },
                {
                    title: "Confirm",
                    detail: "Checkout link issued for deposit or full payment depending on scope. You receive receipts and next steps instantly after payment clears.",
                },
                {
                    title: "Prepare",
                    detail: "We run intake, coordinate vendors, and deliver pre-event documentation. Expect weekly check-ins leading up to service so you're never wondering what's happening.",
                },
            ],
        },
        pricing: {
            title: "Booking options",
            tiers: [
                {
                    id: "intro-call",
                    title: "Concierge Call",
                    paragraphs: [
                        "15-minute alignment. Scope assessment. Calendar hold guidance.",
                    ],
                    cta: { type: "link", label: "schedule call", href: "/book#booking-calendar" },
                },
                {
                    id: "deposit",
                    title: "Event Deposit",
                    paragraphs: [
                        "Reserve your date. Locks crew & travel. Applied to final balance.",
                    ],
                    cta: { type: "link", label: "secure deposit", href: "/book" },
                },
                {
                    id: "retainer",
                    title: "Concierge Retainer",
                    paragraphs: [
                        "Priority line. Rolling calendar holds. Quarterly planning session.",
                    ],
                    cta: { type: "link", label: "activate retainer", href: "/membership" },
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
            title: "Gallery · Table d'Adrian",
            description:
                "Recent tables, ceramics, and atmospheres from villas, yachts, and salons across the Cote d'Azur.",
            canonical: "/gallery",
        },
        hero: {
            title: "Gallery",
            description:
                "A look at recent tables: ceramics, courses, and atmospheres curated for villas, yachts, and salons. Each image links back to a full service story archived for returning clients.",
            primaryCta: { label: "book this feeling", href: "/book" },
            secondaryCta: { label: "explore membership", href: "/membership" },
        },
        quickNav: [
            { label: "value", target: "values" },
            { label: "what's included", target: "included" },
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
                        "Porcelain, raw stone, and handblown glass selected per venue. Materials are logged with sourcing notes so you can request them again.",
                        "Custom ceramics and glassware. Seasonal florals and linens. Textures that invite touch. We maintain backups for every item to avoid disruption.",
                    ],
                },
                {
                    title: "Motion",
                    paragraphs: [
                        "Service choreography captured mid-flight — quiet, deliberate, exact. Even in still photography you sense the tempo we maintain.",
                        "Crew in sync with pacing. Soundscapes and lighting cues. No wasted steps. Our choreography maps are shared with your household team after events.",
                    ],
                },
                {
                    title: "Guests",
                    paragraphs: [
                        "Moments of focus, laughter, and ease preserved discreetly. We brief photographers on etiquette before arrival.",
                        "Consent-first documentation. Private gallery delivery. Editors on staff for press kits. We provide a versioned gallery for households and PR teams.",
                    ],
                },
            ],
        },
        included: {
            title: "When you book photography",
            paragraphs: [
                "Dedicated photographer with hospitality training. Secure delivery within 48 hours. Gallery formatted for print and web. Usage rights for personal and press. Optional motion capture. We also include caption templates for communications teams.",
            ],
        },
        process: {
            title: "How to explore",
            steps: [
                {
                    title: "Open",
                    detail: "Select any image to enter the lightbox. High-resolution files load progressively so mobile guests never wait.",
                },
                {
                    title: "Navigate",
                    detail: "Use arrow keys, swipe, or on-screen controls. Keyboard instructions remain visible for accessibility.",
                },
                {
                    title: "Details",
                    detail: "Captions share sourcing and design context. You can copy notes directly into run-of-show documents.",
                },
                {
                    title: "Close",
                    detail: "Escape key or close button returns you to the grid. Your scroll position is remembered so you never lose your place.",
                },
            ],
        },
        pricing: {
            title: "Visual add-ons",
            tiers: [
                {
                    id: "documentary",
                    title: "Documentary Set",
                    paragraphs: [
                        "Up to 60 edited images. Private gallery. 48-hour delivery.",
                    ],
                    cta: { type: "link", label: "add to booking", href: "/book" },
                },
                {
                    id: "press",
                    title: "Press Kit",
                    paragraphs: [
                        "Narrative photo essay. Interview notes. Print-ready assets.",
                    ],
                    cta: { type: "link", label: "request press kit", href: "/book" },
                },
                {
                    id: "motion",
                    title: "Motion Capsule",
                    paragraphs: [
                        "45-second hero film. Vertical + horizontal cuts. Color grade + sound design.",
                    ],
                    cta: { type: "link", label: "reserve film crew", href: "/book" },
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
            description: "Book your date and we'll capture the textures, light, and people you care about most.",
            primary: { label: "start booking", href: "/book" },
            secondary: { label: "explore membership", href: "/membership" },
        },
    },
    press: {
        id: "press",
        slug: "press",
        path: "/press",
        navLabel: "press & testimonials",
        meta: {
            title: "Press & Testimonials · Table d'Adrian",
            description:
                "Selected features, editorials, and partners speaking about Table d'Adrian's work across Europe.",
            canonical: "/press",
        },
        hero: {
            title: "Press & Testimonials",
            description:
                "Selected features, editorials, and partners speaking about Table d'Adrian's work across Europe. We prepare materials so editors and producers can step straight into the story.",
            primaryCta: { label: "request interview", href: "/book" },
            secondaryCta: { label: "explore membership", href: "/membership" },
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
                        "We turn requests quickly with fact-checked materials and visuals. Every asset is timestamped for easy attribution.",
                        "Same-day responses. Verified biographies. Usage-cleared imagery. We coordinate translation when publications need multilingual quotes.",
                    ],
                },
                {
                    title: "Global-ready",
                    paragraphs: [
                        "English, French, and Romanian press teams with on-the-ground contacts. We adjust tone for each market while preserving the core narrative.",
                        "Interview coordination. Location recommendations. Broadcast support. Technical riders are provided in advance for audio and video crews.",
                    ],
                },
                {
                    title: "Story depth",
                    paragraphs: [
                        "Access to research, sourcing, and behind-the-scenes craft. We share context that lets journalists frame the work accurately.",
                        "Clinical references. Producer dossiers. Menu archives. Each packet includes suggested questions and follow-up angles.",
                    ],
                },
            ],
        },
        included: {
            title: "Press kit contents",
            paragraphs: [
                "Biography & chronology. Quote library. High-res photo & video. Menu excerpts. Contact sheet. We also provide pronunciation guides and accreditation details to reduce back-and-forth.",
            ],
        },
        process: {
            title: "Working with us",
            steps: [
                {
                    title: "Pitch",
                    detail: "Send topic, angle, and deadline. We answer within hours with availability and any initial clarifications.",
                },
                {
                    title: "Access",
                    detail: "We confirm availability, gather supporting research, and brief Adrian & Antonia. You receive context documents tailored to your audience.",
                },
                {
                    title: "Production",
                    detail: "Interviews, shoots, and fact-checking handled swiftly. Our team remains on standby for additional insight while you edit.",
                },
                {
                    title: "Follow-up",
                    detail: "Post-publication assets shared, plus optional dinners for launch. We amplify features responsibly and coordinate with your distribution team.",
                },
            ],
        },
        pricing: {
            title: "Press experiences",
            tiers: [
                {
                    id: "editor-lunch",
                    title: "Editor Luncheon",
                    paragraphs: [
                        "4-course tasting. Interview window. Photo permissions.",
                    ],
                    cta: { type: "link", label: "request luncheon", href: "/book" },
                },
                {
                    id: "shoot-day",
                    title: "Shoot Day",
                    paragraphs: [
                        "Styled plates. Prop & lighting support. Crew coordination.",
                    ],
                    cta: { type: "link", label: "book shoot", href: "/book" },
                },
                {
                    id: "launch-dinner",
                    title: "Launch Dinner",
                    paragraphs: [
                        "10-guest salon. Paired beverages. Media liaison on site.",
                    ],
                    cta: { type: "link", label: "host launch", href: "/book" },
                },
            ],
        },
        testimonials: {
            title: "Selected quotes",
            items: [
                { quote: "Fragrance-forward hospitality with clinical clarity.", name: "Financial Times", role: "HTSI" },
                { quote: "Every plate a quiet piece of theatre.", name: "Monocle", role: "Radio" },
                { quote: "The Riviera's most considered private table.", name: "Conde Nast", role: "Traveler" },
            ],
        },
        finalCta: {
            title: "Request press access",
            description: "We love collaborating with thoughtful storytellers. Let's align on your deadline and needs.",
            primary: { label: "email press", href: "mailto:press@tabledadrian.com" },
            secondary: { label: "book editor dinner", href: "/book" },
        },
    },
    reviews: {
        id: "reviews",
        slug: "reviews",
        path: "/reviews",
        navLabel: "reviews",
        meta: {
            title: "Reviews · Table d'Adrian",
            description: "Transparent notes from guests, households, and partners across the Riviera.",
            canonical: "/reviews",
        },
        hero: {
            title: "Reviews",
            description:
                "Transparent notes from guests, households, and partners across the Riviera. Every comment is archived and attributed so you can trace the journey of our relationship.",
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
                        "Every note is public — no hidden endorsements. You see what we see when we review performance internally.",
                        "Edge-stored, instantly loadable. No edits without consent. Shared with crew for refinement. We track trends over time to measure growth.",
                    ],
                },
                {
                    title: "Verification",
                    paragraphs: [
                        "Optional email verification + Turnstile keeps spam away. Legitimate guests can post quickly without friction.",
                        "Honeypot & Turnstile. Manual moderation on anomalies. Edge caching for resilience. Suspicious entries trigger human review before anything goes live.",
                    ],
                },
                {
                    title: "Action",
                    paragraphs: [
                        "Feedback loops back into menus, service scripts, and pantry logic. You can see how we implement each suggestion in future menus.",
                        "Monthly review sync. Documented adjustments. Shared wins with crew. We celebrate improvements publicly with the team so standards rise together.",
                    ],
                },
            ],
        },
        included: {
            title: "Verification steps",
            paragraphs: [
                "Turnstile challenge to reduce bots. Email optional but helps verification. Internal audit for flagged language. All comments archived on Cloudflare KV. Transparent response policy. You'll always know when we respond and how we act on feedback.",
            ],
        },
        process: {
            title: "How reviews flow",
            steps: [
                {
                    title: "Submit",
                    detail: "Guests add a rating and note. The form remembers preferences for returning households to reduce friction.",
                },
                {
                    title: "Verify",
                    detail: "Turnstile + manual review ensure authenticity. Suspicious language triggers human review before publication.",
                },
                {
                    title: "Publish",
                    detail: "Approved notes appear immediately. We timestamp responses so accountability is visible.",
                },
                {
                    title: "Respond",
                    detail: "We follow up privately if requested. Action items are logged so improvements become part of the next service.",
                },
            ],
        },
        pricing: {
            title: "Ways to engage",
            tiers: [
                {
                    id: "share",
                    title: "Share Feedback",
                    paragraphs: [
                        "2-minute form. Optional email. Public within minutes.",
                    ],
                    cta: { type: "link", label: "write a review", href: "#write" },
                },
                {
                    id: "spotlight",
                    title: "Spotlight Response",
                    paragraphs: [
                        "Tailored thank-you gift. Crew debrief. Documented adjustments.",
                    ],
                    cta: { type: "link", label: "request spotlight", href: "/book" },
                },
                {
                    id: "audit",
                    title: "Experience Audit",
                    paragraphs: [
                        "In-depth review analysis. Operational recommendations. Action plan call.",
                    ],
                    cta: { type: "link", label: "request audit", href: "/book" },
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
            secondary: { label: "contact concierge", href: "/book" },
        },
    },
    adminLeads: {
        id: "adminLeads",
        slug: "admin-leads",
        path: "/admin/leads",
        navLabel: "admin leads",
        meta: {
            title: "Admin Leads · Table d'Adrian",
            description: "Internal console to review booking submissions captured across the site.",
            canonical: "/admin/leads",
        },
        hero: {
            title: "Lead Console",
            description:
                "A read-only view of incoming bookings and inquiries captured through Table d'Adrian. Stay ahead of demand without refreshing spreadsheets or inboxes.",
            primaryCta: { label: "review latest", href: "#leads" },
            secondaryCta: { label: "export guidance", href: "/book" },
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
                        "Leads scored for readiness with flags for VIP, press, or rush. Priority signals bubble to the top instantly.",
                        "Auto-score based on budget & timing. Highlights repeats. Spam quietly discarded. You can adjust weights when strategy shifts.",
                    ],
                },
                {
                    title: "Speed",
                    paragraphs: [
                        "Live updates from the booking form without refresh. You can triage from a tablet on the move.",
                        "Edge-stored submissions. Chronological ordering. Timestamped for follow-up. The log highlights when holds are about to expire.",
                    ],
                },
                {
                    title: "Context",
                    paragraphs: [
                        "Message, menu preference, and staff notes in one place. No need to cross-reference with docs.",
                        "Dietary highlights. Event type tags. Contact history. You'll see who last touched the lead and what comes next.",
                    ],
                },
            ],
        },
        included: {
            title: "Data captured",
            paragraphs: [
                "Name & email. Event date & location. Guests & budget. Primary goal. Notes from concierge. We also capture source channel to inform marketing spend.",
            ],
        },
        process: {
            title: "Handling guidance",
            steps: [
                {
                    title: "Review",
                    detail: "Check new entries twice daily. Alerts flag urgent submissions so leadership can intervene when travel windows are tight.",
                },
                {
                    title: "Respond",
                    detail: "Send briefing PDF within 24 hours. Templates populate client details automatically to save time.",
                },
                {
                    title: "Log",
                    detail: "Mark CRM and assign crew. Notes sync with our membership dashboard for continuity.",
                },
                {
                    title: "Archive",
                    detail: "Export monthly for compliance. Data retention policies are surfaced alongside exports for quick reference.",
                },
            ],
        },
        pricing: {
            title: "Lead status tiers",
            tiers: [
                {
                    id: "hot",
                    title: "Hot",
                    paragraphs: [
                        "Budget confirmed. Date within 30 days. Existing relationship. Escalate to Adrian immediately for tailored outreach.",
                    ],
                    cta: { type: "link", label: "contact now", href: "mailto:adrian@tabledadrian.com" },
                },
                {
                    id: "warm",
                    title: "Warm",
                    paragraphs: [
                        "Budget pending. Flexible timing. New relationship. Share nurture sequence and hold calendar for five days.",
                    ],
                    cta: { type: "link", label: "send briefing", href: "/book" },
                },
                {
                    id: "nurture",
                    title: "Nurture",
                    paragraphs: [
                        "Long lead. Exploratory. Press or partner. Schedule periodic touchpoints and log sentiment after each call.",
                    ],
                    cta: { type: "link", label: "schedule follow-up", href: "/book" },
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
            title: "Pricing Calculator · Table d'Adrian",
            description: "Estimate investment for your gathering or program. Adjust guests and enhancements, then choose booking or checkout.",
            canonical: "/pricing-calculator",
        },
        hero: {
            title: "Pricing Calculator",
            description:
                "Estimate investment for your gathering or program. Adjust guests and enhancements, then route to booking or checkout. The calculator mirrors our internal scoping logic so you see what we see when preparing proposals.",
            primaryCta: { label: "start calculator", href: "#calculator" },
            secondaryCta: { label: "talk with concierge", href: "/book" },
        },
        quickNav: [
            { label: "value", target: "values" },
            { label: "what's included", target: "included" },
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
                        "Get a transparent estimate before we speak. Numbers update instantly as you explore scenarios.",
                        "Adjust guests in real time. Add enhancements. See deposit requirements. Export summaries for your team with one click.",
                    ],
                },
                {
                    title: "Speed",
                    paragraphs: [
                        "Instant checkout links for standard experiences. Conditional logic steers you toward the correct tier.",
                        "Stripe-powered deposit. Shareable summary. Saves time for approvals. Finance teams receive an itemized PDF automatically.",
                    ],
                },
                {
                    title: "Guidance",
                    paragraphs: [
                        "Recommends best next step based on your inputs. Nudges point to membership when cadence suggests it.",
                        "Contact vs. checkout. Upgrade prompts. Pre-filled inquiry link. Links open pre-addressed emails for quick action.",
                    ],
                },
            ],
        },
        included: {
            title: "Calculator outputs",
            paragraphs: [
                "Estimated total investment. Suggested experience tier. Deposit requirement. Link to booking or checkout. Summary you can email. Each result includes assumptions and notes so stakeholders understand the logic.",
            ],
        },
        process: {
            title: "How to use",
            steps: [
                {
                    title: "Select",
                    detail: "Choose the experience or program you're planning. Tooltips describe when each option fits best.",
                },
                {
                    title: "Adjust",
                    detail: "Set guest count and optional enhancements. We surface thresholds that impact staffing or rentals.",
                },
                {
                    title: "Review",
                    detail: "See investment range and recommended next step. Notes explain what's included and which items can flex.",
                },
                {
                    title: "Act",
                    detail: "Go straight to checkout or send a detailed inquiry. Outcomes include contact details for the concierge team.",
                },
            ],
        },
        pricing: {
            title: "Calculator presets",
            tiers: [
                {
                    id: "signature",
                    title: "Signature Dinner",
                    paragraphs: [
                        "Preset tuned for intimate villas and salons with up to a dozen guests. The calculator surfaces staffing shifts and deposit guidance as you adjust variables.",
                    ],
                    cta: { type: "link", label: "calculate dinner", href: "#pricing-calculator-calculator" },
                },
                {
                    id: "salon",
                    title: "Salon Supper",
                    paragraphs: [
                        "Designed for conversational evenings and salons with expanded guest lists. Use the calculator to understand staffing thresholds and how upgrades influence totals.",
                    ],
                    cta: { type: "link", label: "plan salon", href: "#pricing-calculator-calculator" },
                },
                {
                    id: "concierge",
                    title: "Concierge Quarter",
                    paragraphs: [
                        "Built for multi-week concierge programs with Antonia and Adrian. The calculator outlines investment phases, deposits, and optional dinners as you explore scenarios.",
                    ],
                    cta: { type: "link", label: "model concierge", href: "#pricing-calculator-calculator" },
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
            primary: { label: "submit inquiry", href: "/book" },
            secondary: { label: "pay deposit", href: "#calculator" },
        },
    },
};

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
            "Book private dining, ongoing membership, or targeted consulting. Every route begins with a detailed discovery call.",
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
