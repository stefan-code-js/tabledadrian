import HeroCinematic from "@/components/editorial/HeroCinematic";
import SectionLead from "@/components/editorial/SectionLead";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import PullQuote from "@/components/PullQuote";
import FactRow from "@/components/FactRow";
import ImageMosaic from "@/components/ImageMosaic";
import CTABand from "@/components/CTABand";
import { images } from "@/data/images";
import type { PageContent } from "@/data/siteContent";
import { buildMetadataForPath, createBreadcrumbJsonLd } from "@/lib/metadata";

export const metadata = buildMetadataForPath("/services", {
    title: "Services | Table d'Adrian",
    description:
        "Concierge documentation, crew training, and traveling menu libraries so every household operates at the Table d'Adrian standard.",
});

const KEYWORDS = ["concierge", "consult", "crew", "documentation", "continuity"] as const;

const SERVICE_LINES = [
    {
        slug: "concierge",
        kicker: "Concierge command",
        title: "Residences choreographed",
        summary:
            "We lead intake across stewards, private assistants, and household chefs so every villa or salon behaves like your Côte d’Azur flagship.",
        detail:
            "From briefing florists to codifying wardrobe cues, our team stages the evening, rehearses the hand-offs, and leaves a playbook that sustains old-world ease without constant oversight.",
        image: images.sectionHomeValues,
        align: "left" as const,
    },
    {
        slug: "crew",
        kicker: "Crew intensive",
        title: "Yacht & travel continuity",
        summary:
            "Captains, pursers, and galley leads receive a traveling doctrine: mise charts, cellar pairing ladders, and moment-by-moment choreography for each port.",
        detail:
            "We drill service in quiet motion - tray carries, temperature logs, language for each course - then document the entire performance so new crew inherit the exacting cadence without question.",
        image: images.sectionHomeIncluded,
        align: "right" as const,
    },
    {
        slug: "wellness",
        kicker: "Clinical dovetail",
        title: "Wellness protocol integration",
        summary:
            "Antonia (PharmD) reconciles physician directives with kitchen reality, turning lab data into plated rituals that feel like indulgence, not restriction.",
        detail:
            "Supplements, lab cadence, and sleep hygiene fold into menu cycles. Chefs receive substitution matrices, while the household keeps an elegant ledger rather than a medical dossier.",
        image: images.sectionHomeTestimonials,
        align: "left" as const,
    },
] as const;

const FACTS = [
    { label: "Engagement", value: "Four-week minimum for concierge or crew" },
    { label: "Coverage", value: "Côte d’Azur, Riviera hinterland, Mediterranean charter" },
    { label: "Deliverables", value: "Documentation suite, live drills, recording archive" },
    { label: "Support", value: "30-day direct line for refinement and emergencies" },
];

const MOSAIC = [images.homeGalleryOne, images.homeGalleryThree, images.homeGalleryTwo, images.homeGalleryFour];

export default function ServicesPage() {
    const breadcrumbSource = {
        path: "/services",
        hero: {
            title: "Services",
            description: "Concierge documentation, crew training, and traveling menu libraries.",
            primaryCta: { label: "Request dossier", href: "/contact" },
        },
        meta: {
            title: metadata.title as string,
            description: metadata.description as string,
        },
    } satisfies Pick<PageContent, "path" | "hero" | "meta">;

    const breadcrumbs = createBreadcrumbJsonLd(breadcrumbSource);

    return (
        <main className="page page-services">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <HeroCinematic
                kicker="Concierge & documentation"
                analyticsId="services-hero"
                title="Old-world service, documented"
                summary={
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="We design and rehearse the service doctrine for your residences, yachts, and traveling salons - then leave behind the ledgers, training cycles, and cinematic standard that keeps every guest at ease."
                            keywords={KEYWORDS}
                            variant="bronze"
                        />
                    </KineticParagraph>
                }
                image={images.heroServices}
                primaryAction={{ label: "Request services dossier", href: "/contact" }}
                secondaryAction={{ label: "Speak with the chef", href: "/consult" }}
            />

            <div className="layout-measure section-stack">
                {SERVICE_LINES.map((line, index) => (
                    <SectionLead
                        key={line.slug}
                        kicker={line.kicker}
                        title={<KineticHeading as="h2">{line.title}</KineticHeading>}
                        summary={
                            <KineticParagraph>
                                <KeywordHighlighter
                                    text={line.summary}
                                    keywords={KEYWORDS}
                                    variant={index % 2 === 0 ? "forest" : "bronze"}
                                />
                            </KineticParagraph>
                        }
                        details={
                            <KineticParagraph>
                                <KeywordHighlighter
                                    text={line.detail}
                                    keywords={KEYWORDS}
                                    variant={index % 2 === 0 ? "bronze" : "forest"}
                                />
                            </KineticParagraph>
                        }
                        image={line.image}
                        align={line.align}
                    />
                ))}

                <PullQuote
                    quote="Service only feels effortless when the documentation is ruthless. We leave nothing to chance - then we leave you with a playbook that remembers."
                    attribution="Adrian Badea"
                    role="Chef-Patron"
                />

                <FactRow facts={FACTS} />

                <ImageMosaic images={MOSAIC} />

                <CTABand
                    analyticsId="services-cta"
                    title="Request your services dossier"
                    description="Tell us the residences, vessels, or events you need orchestrated. We respond within a day with scope, cadence, and next choreography."
                    primary={{ label: "Request dossier", href: "/contact" }}
                    secondary={{ label: "Schedule consult", href: "/consult" }}
                />
            </div>
        </main>
    );
}

