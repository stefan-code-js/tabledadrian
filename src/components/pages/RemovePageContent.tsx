"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const KEYWORDS = ["privacy", "data", "booking", "membership", "records"] as const;

export default function RemovePageContent() {
    const prefersReduced = usePrefersReducedMotion();
    const motionProps = prefersReduced
        ? { whileHover: undefined, whileTap: undefined }
        : {
              whileHover: { y: -3 },
              whileTap: { scale: 0.97 },
          } as const;

    const handleCta = (label: string, href: string) => () => {
        trackEvent(ANALYTICS_EVENTS.ctaClick, {
            location: "remove-final",
            kind: label,
            href,
        });
    };

    return (
        <article className="space-y-space-7">
            <section className="w-full max-w-measure mx-auto space-y-space-4">
                <Reveal>
                    <span className="text-xs tracking-widest uppercase text-ink-muted">Privacy</span>
                </Reveal>
                <Reveal>
                    <KineticHeading as="h1">Remove my data</KineticHeading>
                </Reveal>
                <Reveal>
                    <KineticParagraph className="lead">
                        <KeywordHighlighter
                            text="We take privacy seriously. Use the options below to request deletion of any personal information you have shared, including messages, booking requests, and review submissions. We’ll confirm completion via email."
                            keywords={KEYWORDS}
                            variant="forest"
                        />
                    </KineticParagraph>
                </Reveal>
            </section>

            <section className="w-full max-w-measure mx-auto space-y-space-4">
                <div className="grid gap-space-4 md:grid-cols-2">
                    <Reveal className="space-y-space-2">
                        <KineticHeading as="h2">Immediate removal</KineticHeading>
                        <KineticParagraph>
                            <KeywordHighlighter
                                text="Email us from the address you used and include any relevant context (e.g., message date, phone number, or booking reference). We will remove all associated records and confirm within one business day."
                                keywords={KEYWORDS}
                                variant="bronze"
                            />
                        </KineticParagraph>
                        <a className="btn" href="mailto:adrian@tabledadrian.com?subject=Data%20deletion%20request">
                            Email deletion request
                        </a>
                    </Reveal>

                    <Reveal className="space-y-space-2">
                        <KineticHeading as="h2">What we delete</KineticHeading>
                        <ul className="list-disc pl-space-4 space-y-space-1 text-ink">
                            <li>Contact messages and lead records</li>
                            <li>Booking requests and confirmations</li>
                            <li>Reviews you submitted</li>
                            <li>Any analytics identifiers we control</li>
                        </ul>
                        <KineticParagraph className="small text-ink-muted">
                            Note: Payment providers (e.g., Stripe) may retain limited records to meet legal and accounting obligations. We request redaction wherever possible.
                        </KineticParagraph>
                    </Reveal>
                </div>
            </section>

            <section className="w-full max-w-measure mx-auto space-y-space-3">
                <Reveal>
                    <KineticHeading as="h2">Prefer to speak directly?</KineticHeading>
                </Reveal>
                <Reveal>
                    <div className="flex flex-wrap gap-space-2">
                        <motion.span {...motionProps} className="inline-flex">
                            <Link className="btn" href="/contact" onClick={handleCta("contact", "/contact")}>
                                Contact us
                            </Link>
                        </motion.span>
                        <motion.span {...motionProps} className="inline-flex">
                            <a className="btn ghost" href="mailto:adrian@tabledadrian.com" onClick={handleCta("email", "mailto:adrian@tabledadrian.com")}>
                                Email Adrian
                            </a>
                        </motion.span>
                    </div>
                </Reveal>
            </section>
        </article>
    );
}
