import React from "react";
import HeroCinematic from "@/components/editorial/HeroCinematic";
import SectionLead from "@/components/editorial/SectionLead";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import PullQuote from "@/components/PullQuote";
import FactRow from "@/components/FactRow";
import ImageMosaic from "@/components/ImageMosaic";
import TestimonialCarousel, { type Testimonial } from "@/components/TestimonialCarousel";
import CTABand from "@/components/CTABand";
import { images } from "@/data/images";
import { sitePages } from "@/data/siteContent";
import { createPageMetadata } from "@/lib/metadata";

const page = sitePages.home;

export const metadata = createPageMetadata(page);

const HERO_KEYWORDS = ["private table", "membership", "consult", "chef's table", "Cote d'Azur"] as const;

const EXPERIENCE_SECTIONS = [
    {
        slug: "provenance",
        kicker: "Chapter one",
        title: "Provenance ledgers",
        summary:
            "Every residence begins with ledger work: pantry audit, cellar intent, linen inventory, and staff cadence.",
        detail:
            "Those notes become a service narrative shared with florists, fishmongers, and sommeliers so the evening lands with the ease of a long-held ritual.",
        image: images.sectionHomeValues,
        align: "left" as const,
    },
    {
        slug: "service",
        kicker: "Chapter two",
        title: "Service in quiet motion",
        summary:
            "Each pour, course, and room reset is choreographed; the host only notices the serenity left in the wake.",
        detail:
            "Membership clients receive the same crew of chefs, captains, and stewards wherever they convene: villa, yacht, or alpine chalet, without renegotiating standards.",
        image: images.sectionHomeIncluded,
        align: "right" as const,
    },
    {
        slug: "memory",
        kicker: "Chapter three",
        title: "Ledger of memory",
        summary:
            "Digestifs conclude with documentation: temperatures, varietals, seating preferences, and hosts' after-notes.",
        detail:
            "The archive travels with you; the next invitation reads like a reply to the previous evening rather than a restart.",
        image: images.sectionHomeTestimonials,
        align: "left" as const,
    },
] as const;

const FACTS = [
    { label: "Lead time", value: "14 days for Cote d'Azur residences" },
    { label: "Service window", value: "Sunset through the final digestif" },
    { label: "Guest scope", value: "Four to twenty-four, chef's table intimacy" },
    { label: "Continuity", value: "Membership or seasonal consult" },
];

const TESTIMONIALS: Testimonial[] = [
    {
        quote:
            "The evening felt choreographed yet unforced; our board believed we had done it for years. Their deck log keeps every note intact between cities.",
        name: "Isabelle D.",
        role: "Monaco residence manager",
    },
    {
        quote:
            "Membership erased all friction in the galley. Provisioning briefs, wellness notes, and cellar pairings arrive as one narrative.",
        name: "Captain Laurent B.",
    },
    {
        quote: "It is the only private chef service where even the stillness feels intentional.",
        name: "James M.",
        role: "Salon host",
    },
] as const;

const MOSAIC = [
    images.homeGalleryOne,
    images.homeGalleryTwo,
    images.homeGalleryThree,
    images.homeGalleryFour,
];

export default function HomePage() {
    return (
        <main className="page page-home">
            <HeroCinematic
                kicker="Private table / Cote d'Azur"
                analyticsId="home-hero"
                title="An evening written in quiet chapters"
                summary={
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="Private dining on the Cote d'Azur, composed by Adrian and Antonia, moves through seasonal courses, disciplined service, and membership consults that travel with you."
                            keywords={HERO_KEYWORDS}
                            variant="bronze"
                        />
                    </KineticParagraph>
                }
                image={images.heroHome}
                primaryAction={{ label: "Reserve a private table", href: "/contact" }}
                secondaryAction={{ label: "Begin membership consult", href: "/consult" }}
            />

            <div className="layout-measure section-stack">
                {EXPERIENCE_SECTIONS.map((section, index) => (
                    <SectionLead
                        key={section.slug}
                        kicker={section.kicker}
                        title={<KineticHeading as="h2">{section.title}</KineticHeading>}
                        summary={
                            <KineticParagraph>
                                <KeywordHighlighter
                                    text={section.summary}
                                    keywords={HERO_KEYWORDS}
                                    variant={index % 2 === 0 ? "forest" : "bronze"}
                                />
                            </KineticParagraph>
                        }
                        details={
                            <KineticParagraph>
                                <KeywordHighlighter
                                    text={section.detail}
                                    keywords={HERO_KEYWORDS}
                                    variant={index % 2 === 0 ? "bronze" : "forest"}
                                />
                            </KineticParagraph>
                        }
                        image={section.image}
                        align={section.align}
                    />
                ))}

                <PullQuote
                    quote="A cinematic dinner where every gesture is deliberate, every service cue rehearsed, every guest allowed to belong."
                    attribution="Adrian Badea"
                    role="Chef-Patron"
                />

                <FactRow facts={FACTS} />

                <ImageMosaic images={MOSAIC} />

                <TestimonialCarousel testimonials={TESTIMONIALS} />

                <CTABand
                    analyticsId="home-cta"
                    title="Reserve your chapter"
                    description="Share date, guest profile, and venue. We respond within the day with provisioning briefs, service choreography, and the dramatis personae of your evening."
                    primary={{ label: "Reserve a private table", href: "/contact" }}
                    secondary={{ label: "Speak with the chef", href: "/consult" }}
                />
            </div>
        </main>
    );
}




