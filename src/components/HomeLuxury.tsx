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
import TestimonialCarousel from "@/components/TestimonialCarousel";
import FactRow from "@/components/FactRow";
import CardPanel from "@/components/CardPanel";

const HERO_KEYWORDS: string[] = ["private table", "Côte d'Azur", "seasonal", "membership", "consult", "chef's table"];

type Sequence = {
    title: string;
    kicker: string;
    copy: ReactNode[];
    image: { src: string; alt: string; aspect?: string };
    align?: "left" | "right";
    cta?: ReactNode;
};

const sequences: Sequence[] = [
    {
        title: "The provenance",
        kicker: "Chapter one",
        copy: [
            <KineticParagraph key="provenance-1">
                <KeywordHighlighter
                    text="Every service opens with a walk through your pantry and the surrounding terroir. We catalogue glassware heights, preferred vintages, and the liberties you allow for the season."
                    keywords={HERO_KEYWORDS}
                    variant="forest"
                />
            </KineticParagraph>,
            <KineticParagraph key="provenance-2">
                <KeywordHighlighter
                    text="Mise notes become a tasting arc that feels like your household. Vendors receive the same narrative so nothing slips once guests arrive."
                    keywords={HERO_KEYWORDS}
                    variant="bronze"
                />
            </KineticParagraph>,
        ],
        image: {
            src: "/placeholder/section-home-values.svg",
            alt: "Seasonal produce prepared for service.",
            aspect: "4 / 5",
        },
    },
    {
        title: "Service in quiet motion",
        kicker: "Chapter two",
        copy: [
            <KineticParagraph key="service-1">
                <KeywordHighlighter
                    text="We rehearse each pour, each hand-off, and every glance where your guests should feel completely seen. Lighting and scent are tuned to the hour; cadence is never improvisational."
                    keywords={HERO_KEYWORDS}
                    variant="forest"
                />
            </KineticParagraph>,
            <KineticParagraph key="service-2">
                <KeywordHighlighter
                    text="Membership and consult pathways allow the private table and chef's table standard to travel without compromise."
                    keywords={["membership", "consult", "chef's table"]}
                    variant="bronze"
                />
            </KineticParagraph>,
        ],
        image: {
            src: "/placeholder/section-home-included.svg",
            alt: "Service choreography in motion.",
            aspect: "3 / 4",
        },
        align: "right",
        cta: (
            <Link className="text-link" href="/membership">
                Explore membership pathways
            </Link>
        ),
    },
    {
        title: "Ledger of memory",
        kicker: "Chapter three",
        copy: [
            <KineticParagraph key="ledger-1">
                <KeywordHighlighter
                    text="After the final digestif we record every preference—temperatures, plating, and the cadence that allowed conversation to bloom."
                    keywords={HERO_KEYWORDS}
                    variant="forest"
                />
            </KineticParagraph>,
            <KineticParagraph key="ledger-2">
                <KeywordHighlighter
                    text="Seasonal clients carry that documentation between villas, yachts, and salons, ensuring the Côte d'Azur narrative follows wherever you convene."
                    keywords={["Côte d'Azur", "seasonal"]}
                    variant="bronze"
                />
            </KineticParagraph>,
        ],
        image: {
            src: "/placeholder/section-home-testimonials.svg",
            alt: "Guests enjoying a candlelit salon.",
            aspect: "4 / 3",
        },
    },
];

const testimonials = [
    {
        quote:
            "The evening felt choreographed yet unforced—our guests believed we had done it for years. The deck log lets us repeat it city to city.",
        name: "Isabelle D.",
        role: "Monaco Residence Manager",
    },
    {
        quote:
            "Their membership consult eliminated friction in the galley. Provisioning, dietary notes, and cellar pairings arrive as a single narrative.",
        name: "Captain Laurent B.",
    },
    {
        quote: "It is the only private chef experience where even the stillness feels intentional.",
        name: "James M.",
        role: "Salon Host",
    },
];

const mosaicImages = [
    { src: "/placeholder/gallery-01.svg", alt: "Linen draped private table." },
    { src: "/placeholder/gallery-02.svg", alt: "Coastal garden herbs." },
    { src: "/placeholder/gallery-03.svg", alt: "Cellar with curated pairings." },
    { src: "/placeholder/gallery-04.svg", alt: "Salon finale with digestifs." },
];

const factRow = [
    { label: "Lead time", value: "14 days for Côte d'Azur residences" },
    { label: "Season", value: "Menus revise at dawn with the markets" },
    { label: "Guests", value: "4 to 24 guests, chef's table intimacy" },
    { label: "Consult", value: "Membership or single-evening consult" },
];

export default function HomeLuxury() {
    return (
        <article className="home-editorial">
            <section className="home-editorial__hero">
                <div className="home-editorial__media">
                    <Image
                        src="/placeholder/hero-home.svg"
                        alt="Editorial still of the Côte d'Azur private table."
                        fill
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className="home-editorial__overlay" />
                <div className="home-editorial__content">
                    <span className="home-editorial__kicker">Private table · Côte d'Azur</span>
                    <KineticHeading as="h1">An evening written in quiet chapters</KineticHeading>
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="Our private table on the Côte d'Azur moves through seasonal courses, meticulous service, and membership consultations that translate the chef's table across every residence."
                            keywords={HERO_KEYWORDS}
                            variant="bronze"
                        />
                    </KineticParagraph>
                    <div className="home-editorial__actions">
                        <Link className="btn" href="/contact">
                            Reserve a private table
                        </Link>
                        <Link className="btn ghost" href="/consult">
                            Begin membership consult
                        </Link>
                    </div>
                </div>
            </section>

            {sequences.map((sequence, index) => (
                <EditorialBlock
                    key={sequence.title}
                    title={sequence.title}
                    kicker={sequence.kicker}
                    copy={sequence.copy}
                    image={sequence.image}
                    align={sequence.align}
                    cta={sequence.cta}
                />
            ))}

            <PullQuote
                quote="A cinematic dinner where every gesture is deliberate, every service cue rehearsed, every guest allowed to belong."
                attribution="Adrian Badea"
                role="Chef-Patron"
            />

            <section className="home-editorial__cards">
                <CardPanel>
                    <KineticHeading as="h3">Membership ledgers</KineticHeading>
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="Seasonal membership maintains your private table standards across villas, yachts, and salons without a single reminder from you."
                            keywords={["membership", "private table"]}
                            variant="forest"
                        />
                    </KineticParagraph>
                    <div className="home-editorial__card-actions">
                        <Link className="btn" href="/membership">
                            View membership
                        </Link>
                        <Link className="btn ghost" href="/consult">
                            Schedule consult
                        </Link>
                    </div>
                </CardPanel>
            </section>

            <FactRow facts={factRow} />

            <ImageMosaic images={mosaicImages} />

            <TestimonialCarousel testimonials={testimonials} />

            <CTABand
                title="Reserve your chapter"
                description="Share your preferred date, venue, and guest profile. We respond within the day with a composed narrative, provisioning briefs, and the choreography of service."
                primary={{ label: "Reserve a private table", href: "/contact" }}
                secondary={{ label: "Speak with the chef", href: "/consult" }}
            />
        </article>
    );
}

