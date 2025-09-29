"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import { buildMetadataForPath } from "@/lib/metadata";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
export const runtime = "edge";

export const metadata = buildMetadataForPath("/cancel", {
    title: "Payment canceled - Table d'Adrian",
    description: "Manage or cancel an existing Table d'Adrian booking.",
    indexable: false,
});

const KEYWORDS = ["booking", "membership", "calendar", "table"] as const;

const heroImage = {
    src: "/placeholder/hero-cancel.svg",
    alt: "Notebook, pen, and citrus on a marble counter awaiting notes for the next booking.",
};

const reassuranceParagraphs = [
    "No charges were made and your calendar remains open. When you are ready, we can hold the date again and finalize the details.",
    "Adrian and Antonia are available to answer any menu or logistics questions so the next confirmation feels effortless.",
];

export default function CancelPage() {
    const prefersReduced = usePrefersReducedMotion();
    const motionProps = prefersReduced
        ? { whileHover: undefined, whileTap: undefined }
        : {
              whileHover: { y: -3 },
              whileTap: { scale: 0.97 },
          } as const;

    const handleCta = (label: string, href: string) => () => {
        trackEvent(ANALYTICS_EVENTS.ctaClick, {
            location: "cancel-final",
            kind: label,
            href,
        });
    };

    return (
        <article className="editorial-page">
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure" data-parallax="6">
                    <Image
                        src={heroImage.src}
                        alt={heroImage.alt}
                        fill
                        priority
                        sizes="100vw"
                        className="hero-figure__image"
                    />
                </figure>
                <div className="editorial-container hero-copy">
                    <KineticHeading as="h1">Payment canceled</KineticHeading>
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="Your table remains unbooked for now. Return when the timing suits you."
                            keywords={KEYWORDS}
                            variant="forest"
                        />
                    </KineticParagraph>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="two-column">
                        <article className="narrative-block">
                            <KineticHeading as="h2">Pick up where you left off</KineticHeading>
                            {reassuranceParagraphs.map((paragraph) => (
                                <KineticParagraph key={paragraph}>
                                    <KeywordHighlighter text={paragraph} keywords={KEYWORDS} variant="bronze" />
                                </KineticParagraph>
                            ))}
                            <KineticParagraph>
                                <KeywordHighlighter text="Write to" keywords={KEYWORDS} variant="forest" />
                                {" "}
                                <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>
                                {" "}
                                <KeywordHighlighter
                                    text="with preferred dates or priorities and we will respond within a day."
                                    keywords={KEYWORDS}
                                    variant="forest"
                                />
                            </KineticParagraph>
                        </article>
                        <article className="narrative-block">
                            <KineticHeading as="h2">When you are ready</KineticHeading>
                            <KineticParagraph>
                                <KeywordHighlighter
                                    text="The booking calendar can be reopened instantly and deposits remain optional until you approve the documented menu and service plan."
                                    keywords={KEYWORDS}
                                    variant="forest"
                                />
                            </KineticParagraph>
                            <KineticParagraph>
                                <KeywordHighlighter
                                    text="Membership keeps hosted dinners, pharmacist reviews, and household standards on cadence if you prefer to avoid rebooking each season."
                                    keywords={KEYWORDS}
                                    variant="bronze"
                                />
                            </KineticParagraph>
                        </article>
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container final-call">
                    <KineticHeading as="h2">Ready to continue?</KineticHeading>
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="We will hold the calendar as soon as you confirm the new date. Start with an inquiry or move directly to membership to keep the cadence steady."
                            keywords={KEYWORDS}
                            variant="forest"
                        />
                    </KineticParagraph>
                    <div className="cta-row">
                        <motion.span {...motionProps} className="inline-flex">
                            <Link className="btn" href="/book" onClick={handleCta("request-booking", "/book")}>
                                request a booking
                            </Link>
                        </motion.span>
                        <motion.span {...motionProps} className="inline-flex">
                            <Link className="btn ghost" href="/membership" onClick={handleCta("explore-membership", "/membership")}>
                                explore membership
                            </Link>
                        </motion.span>
                    </div>
                </div>
            </section>
        </article>
    );
}
