"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import EditorialBlock from "@/components/EditorialBlock";
import PullQuote from "@/components/PullQuote";
import CTABand from "@/components/CTABand";
import ImageMosaic from "@/components/ImageMosaic";
import TestimonialCarousel, { type Testimonial } from "@/components/TestimonialCarousel";
import FactRow, { type Fact } from "@/components/FactRow";
import CardPanel from "@/components/CardPanel";
import { images } from "@/data/images";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

const HERO_HIGHLIGHTS = [
    "private table",
    "seasonal",
    "membership",
    "consult",
] as const;

type LuxurySequence = {
    title: string;
    kicker: string;
    paragraphs: string[];
    image: {
        src: string;
        alt: string;
        aspect?: string;
    };
    align?: "left" | "right";
    cta?: ReactNode;
};

const sequences: LuxurySequence[] = [
    {
        title: "Prepared provenance",
        kicker: "Chapter one",
        paragraphs: [
            "We begin with a concise audit of pantry, cellar, and service cadence so the household aligns before guests arrive.",
            "Vendors receive the same brief, ensuring linens, florals, and produce land without repeats or omissions.",
        ],
        image: {
            src: "/placeholder/section-home-values.svg",
            alt: "Pantry mise details recorded for service.",
            aspect: "4 / 5",
        },
    },
    {
        title: "Quiet choreography",
        kicker: "Chapter two",
        paragraphs: [
            "Rehearsed cues govern pours, service swaps, and room resets so the host only notices how calm the evening feels.",
            "Membership consults carry the same standard across villas, yachts, and city apartments without renegotiating expectations.",
        ],
        image: {
            src: "/placeholder/section-home-included.svg",
            alt: "Crew rehearsing plate placement before guests arrive.",
            aspect: "3 / 4",
        },
        align: "right",
        cta: (
            <Link
                className="text-link"
                href="/membership"
                onClick={() =>
                    trackEvent(ANALYTICS_EVENTS.ctaClick, {
                        location: "home-luxury-sequence",
                        kind: "membership",
                        href: "/membership",
                        label: "Explore membership pathways",
                    })
                }
            >
                Explore membership pathways
            </Link>
        ),
    },
    {
        title: "Ledger that travels",
        kicker: "Chapter three",
        paragraphs: [
            "After dessert we document temperatures, pacing notes, and guest preferences so the next gathering begins at the same polish.",
            "The ledger moves with you, allowing each invitation to continue the previous conversation instead of restarting logistics.",
        ],
        image: {
            src: "/placeholder/section-home-testimonials.svg",
            alt: "Hosts reviewing a concise service ledger.",
            aspect: "4 / 3",
        },
    },
];

const testimonials: Testimonial[] = [
    {
        quote: "They anticipated every cue; our board assumed we had hosted together for years.",
        name: "Isabelle D.",
        role: "Residence director",
    },
    {
        quote: "Provisioning, wellness notes, and cellar pairings arrive as one tidy schedule for the crew.",
        name: "Captain Laurent B.",
    },
    {
        quote: "The calm between courses felt deliberate. Even the silence carried hospitality.",
        name: "James M.",
        role: "Salon host",
    },
];

const mosaicImages = [
    images.homeGalleryOne,
    images.homeGalleryTwo,
    images.homeGalleryThree,
    images.homeGalleryFour,
];

const factRow: Fact[] = [
    { label: "Lead time", value: "14-day notice to hold calendar" },
    { label: "Service window", value: "Sunset through the final digestif" },
    { label: "Guest scope", value: "Four to twenty-four with chef's table pacing" },
    { label: "Continuity", value: "Seasonal consult or annual membership" },
];

export default function HomeLuxury() {
    const heroAsset = images.heroHome;

    const handleHeroClick = (kind: "primary" | "secondary", href: string, label: string) => () => {
        trackEvent(ANALYTICS_EVENTS.heroCta, {
            location: "home-luxury-hero",
            kind,
            href,
            label,
        });
    };

    const handleCardCta = (kind: "primary" | "secondary", href: string, label: string) => () => {
        trackEvent(ANALYTICS_EVENTS.ctaClick, {
            location: "home-luxury-membership",
            kind,
            href,
            label,
        });
    };

    return (
        <article className="home-editorial">
            <section className="home-editorial__hero">
                <div className="home-editorial__media">
                    <Image
                        src={heroAsset.src}
                        alt={heroAsset.alt}
                        fill
                        priority={heroAsset.priority ?? true}
                        sizes="100vw"
                        placeholder={heroAsset.placeholder}
                        blurDataURL={heroAsset.blurDataURL}
                    />
                </div>
                <div className="home-editorial__overlay" />
                <div className="home-editorial__content">
                    <span className="home-editorial__kicker">Private table / coastal residences</span>
                    <KineticHeading as="h1">An evening written in quiet chapters</KineticHeading>
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="Our private table carries seasonal courses, disciplined service, and membership consults that travel wherever you host."
                            keywords={HERO_HIGHLIGHTS}
                            variant="bronze"
                        />
                    </KineticParagraph>
                    <div className="home-editorial__actions">
                        <Link className="btn" href="/contact" onClick={handleHeroClick("primary", "/contact", "Reserve a private table")}>
                            Reserve a private table
                        </Link>
                        <Link className="btn ghost" href="/consult" onClick={handleHeroClick("secondary", "/consult", "Begin membership consult")}>
                            Begin membership consult
                        </Link>
                    </div>
                </div>
            </section>

            {sequences.map((sequence) => (
                <EditorialBlock
                    key={sequence.title}
                    title={sequence.title}
                    kicker={sequence.kicker}
                    copy={sequence.paragraphs.map((text, index) => (
                        <KineticParagraph key={`${sequence.title}-paragraph-${index}`}>
                            <KeywordHighlighter text={text} keywords={HERO_HIGHLIGHTS} variant={index % 2 === 0 ? "forest" : "bronze"} />
                        </KineticParagraph>
                    ))}
                    image={sequence.image}
                    align={sequence.align}
                    cta={sequence.cta}
                />
            ))}

            <PullQuote
                quote="A cinematic dinner where every gesture is deliberate, every cue rehearsed, every guest allowed to belong."
                attribution="Adrian Badea"
                role="Chef-Patron"
            />

            <section className="home-editorial__cards">
                <CardPanel>
                    <KineticHeading as="h3">Membership ledgers</KineticHeading>
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="Seasonal membership keeps pantry standards, crew briefings, and menu revisions aligned without repeating checklists."
                            keywords={["membership", "private table"]}
                            variant="forest"
                        />
                    </KineticParagraph>
                    <div className="home-editorial__card-actions">
                        <Link className="btn" href="/membership" onClick={handleCardCta("primary", "/membership", "View membership")}>
                            View membership
                        </Link>
                        <Link className="btn ghost" href="/consult" onClick={handleCardCta("secondary", "/consult", "Schedule consult")}>
                            Schedule consult
                        </Link>
                    </div>
                </CardPanel>
            </section>

            <FactRow facts={factRow} />

            <ImageMosaic images={mosaicImages} />

            <TestimonialCarousel testimonials={testimonials} />

            <CTABand
                analyticsId="home-luxury-cta"
                title="Reserve your chapter"
                description="Share the date, guest profile, and venue. We return within the day with provisioning briefs, pacing notes, and the proposed crew."
                primary={{ label: "Reserve a private table", href: "/contact" }}
                secondary={{ label: "Speak with the chef", href: "/consult" }}
            />
        </article>
    );
}
