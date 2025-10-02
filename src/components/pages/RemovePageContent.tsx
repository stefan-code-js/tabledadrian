"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const KEYWORDS = [
    "privacy",
    "data",
    "private chef",
    "PharmD",
    "culinary documentation",
    "membership",
] as const;

export default function RemovePageContent() {
    const prefersReduced = usePrefersReducedMotion();
    const motionProps = prefersReduced
        ? { whileHover: undefined, whileTap: undefined }
        : ({ whileHover: { y: -3 }, whileTap: { scale: 0.97 } } as const);

    const handleCta = (label: string, href: string) => () => {
        trackEvent(ANALYTICS_EVENTS.ctaClick, {
            location: "remove-final",
            kind: label,
            href,
        });
    };

    return (
        <article className="editorial-page">
            <section className="editorial-hero">
                <div className="editorial-container hero-copy">
                    <Reveal>
                        <KineticHeading as="h1">Remove my data</KineticHeading>
                    </Reveal>
                    <Reveal>
                        <KineticParagraph className="lead">
                                <KeywordHighlighter
                                    text="We take privacy seriously. Use the options below to request deletion of private chef dossiers, PharmD intake notes, booking requests, and review submissions. We’ll confirm completion via email."
                                    keywords={KEYWORDS}
                                    variant="forest"
                                />
                        </KineticParagraph>
                    </Reveal>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="two-column">
                        <Reveal className="narrative-block">
                            <KineticHeading as="h2">Immediate removal</KineticHeading>
                            <KineticParagraph>
                                <KeywordHighlighter
                                    text="Email us from the address you used and include any relevant context (e.g., tasting date, villa location, yacht name, or booking reference). We will remove all associated records and confirm within one business day."
                                    keywords={KEYWORDS}
                                    variant="bronze"
                                />
                            </KineticParagraph>
                            <a className="btn" href="mailto:adrian@tabledadrian.com?subject=Data%20deletion%20request">
                                Email deletion request
                            </a>
                        </Reveal>

                        <Reveal className="narrative-block">
                            <KineticHeading as="h2">What we delete</KineticHeading>
                            <ul>
                                <li>Contact messages and concierge lead records</li>
                                <li>Private chef bookings, proposals, and confirmations</li>
                                <li>PharmD intake forms, supplementation logs, and wellness questionnaires</li>
                                <li>Reviews, testimonials, and media consent you submitted</li>
                                <li>Any analytics identifiers or service documentation we control</li>
                            </ul>
                            <KineticParagraph className="small muted">
                                Note: Payment providers (e.g., Stripe) may retain limited records to meet legal and accounting obligations. We request redaction wherever possible.
                            </KineticParagraph>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="editorial-section">
                <div className="editorial-container final-call">
                    <Reveal>
                        <KineticHeading as="h2">Prefer to speak directly?</KineticHeading>
                    </Reveal>
                    <Reveal>
                        <div className="cta-row">
                            <motion.span {...motionProps} className="inline-flex">
                                <Link className="btn" href="/contact" onClick={handleCta("contact", "/contact")}>
                                    contact us
                                </Link>
                            </motion.span>
                            <motion.span {...motionProps} className="inline-flex">
                                <a className="btn ghost" href="mailto:adrian@tabledadrian.com" onClick={handleCta("email", "mailto:adrian@tabledadrian.com")}>
                                    email Adrian
                                </a>
                            </motion.span>
                        </div>
                    </Reveal>
                </div>
            </section>
        </article>
    );
}
