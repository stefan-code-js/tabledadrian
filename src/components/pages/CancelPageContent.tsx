"use client";

import Image from "@/components/StaticImage";
import Link from "next/link";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const KEYWORDS = ["booking", "membership", "calendar", "table", "private chef"] as const;

const heroImage = {
    src: "/gallery/IMG_3090.JPG",
    alt: "Notebook, pen, and citrus on a marble counter awaiting notes for the next booking.",
};

const reassuranceParagraphs = [
    "No charges were made and your private chef engagement remains on hold. When you are ready, we will reserve the calendar again and tailor the PharmD intake to your new timing.",
    "Adrian and Antonia are available to align on cuisine, wellness protocols, and logistics so the next confirmation feels effortless for your household, yacht, or jet.",
];

export default function CancelPageContent() {
    const prefersReduced = usePrefersReducedMotion();
    const motionProps = prefersReduced
        ? { whileHover: undefined, whileTap: undefined }
        : ({ whileHover: { y: -3 }, whileTap: { scale: 0.97 } } as const);

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
                        loading="lazy"
                        sizes="(max-width: 900px) 100vw, 960px"
                        className="hero-figure__image"
                    />
                </figure>
                <div className="editorial-container hero-copy">
                    <KineticHeading as="h1">Private chef payment canceled</KineticHeading>
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="Your PharmD-guided table remains unbooked for now. Return when the timing suits your guests and destinations."
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
                                <KeywordHighlighter text="Write to" keywords={KEYWORDS} variant="forest" /> {" "}
                                <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a> {" "}
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
                                    text="The booking calendar can be reopened instantly and deposits remain optional until you approve the documented menu, wellness cadence, and service plan."
                                    keywords={KEYWORDS}
                                    variant="forest"
                                />
                            </KineticParagraph>
                            <KineticParagraph>
                                <KeywordHighlighter
                                    text="Membership programs keep hosted dinners, PharmD reviews, and household standards on cadence if you prefer to avoid rebooking each villa or yacht each season."
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
                            text="We will hold the calendar as soon as you confirm the new date. Start with an inquiry or move directly to a membership to keep your PharmD-guided culinary cadence steady across every residence."
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
                                explore memberships
                            </Link>
                        </motion.span>
                    </div>
                </div>
            </section>
        </article>
    );
}

