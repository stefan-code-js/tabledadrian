"use client";

import Image from "@/components/StaticImage";
import Link from "next/link";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { images } from "@/data/images";

const CAL_HANDLE = process.env.NEXT_PUBLIC_CAL_LINK ?? "adrian-stefan";
const CAL_URL = `https://cal.com/${CAL_HANDLE}`;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "adrian@tabledadrian.com";

const heroImage = images.valueDocumentation;

const KEYWORDS = ["Table d'Adrian", "private chef", "membership", "PharmD", "yacht", "bespoke dining"] as const;

const briefingParagraphs = [
    "Bookings include a chef-led tasting menu, pharmacist-guided intake, and discreet crew who manage the evening end to end.",
    "We coordinate rentals, linens, and beverage service as required, then leave a documented reset so the space feels composed the next morning.",
    "Each experience is designed around fragrance, temperature, and pacing so conversation has room to breathe while the menu unfolds with intent.",
];

const schedulingSteps = [
    { title: "Choose your window", detail: "Select the date and preferred service time that fits your villa, yacht, or salon." },
    { title: "Confirm the brief", detail: "Share priorities, sensitivities, and guest cadence. We refine the menu within 24 hours." },
    { title: "Hold the calendar", detail: "Deposit or booking confirmation reserves the team. Logistics and provisioning follow immediately." },
    { title: "Receive documentation", detail: "We send menu books, mise charts, and household notes so everyone feels prepared before we arrive." },
];

export default function Book() {
    const prefersReduced = usePrefersReducedMotion();
    const motionProps = prefersReduced
        ? { whileHover: undefined, whileTap: undefined }
        : {
              whileHover: { y: -3 },
              whileTap: { scale: 0.97 },
          } as const;

    const trackHeroCta = (kind: "calendar" | "membership") => () => {
        trackEvent(ANALYTICS_EVENTS.bookingCta, {
            location: "book-hero",
            kind,
            href: kind === "calendar" ? CAL_URL : "/membership",
        });
    };

    const trackFooterCta = (label: string, href: string) => () => {
        trackEvent(ANALYTICS_EVENTS.ctaClick, {
            location: "book-final",
            kind: label,
            href,
        });
    };

    return (
        <article className="editorial-page">
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure" data-parallax="8">
                    <Image
                        src={heroImage.src}
                        alt={heroImage.alt}
                        fill
                        priority
                        sizes="100vw"
                        placeholder={heroImage.placeholder}
                        blurDataURL={heroImage.blurDataURL}
                        className="hero-figure__image"
                    />
                </figure>
                <div className="editorial-container hero-copy">
                    <KineticHeading as="h1">Reserve your private table</KineticHeading>
                    <KineticParagraph className="lead">
                        <KeywordHighlighter
                            text="Adrian and Antonia hold dates for villas, yachts, and Riviera salons. Choose your window, share your intentions, and we prepare the entire arc so the room settles into calm hospitality."
                            keywords={KEYWORDS}
                            variant="bronze"
                        />
                    </KineticParagraph>
                    <div className="cta-row">
                        <motion.span {...motionProps} className="inline-flex">
                            <a className="btn" href={CAL_URL} target="_blank" rel="noreferrer" onClick={trackHeroCta("calendar")}>
                                open booking calendar
                            </a>
                        </motion.span>
                        <motion.span {...motionProps} className="inline-flex">
                            <Link className="btn ghost" href="/membership" onClick={trackHeroCta("membership")}>
                                explore memberships
                            </Link>
                        </motion.span>
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section" id="booking-overview">
                <div className="editorial-container">
                    <div className="two-column">
                        <article className="narrative-block">
                            <KineticHeading as="h2">What the evening includes</KineticHeading>
                            {briefingParagraphs.map((paragraph, index) => (
                                <KineticParagraph key={paragraph}>
                                    <KeywordHighlighter
                                        text={paragraph}
                                        keywords={KEYWORDS}
                                        variant={index % 2 === 0 ? "forest" : "bronze"}
                                    />
                                </KineticParagraph>
                            ))}
                            <KineticParagraph>
                                Questions ahead of service? Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will align on every detail.
                            </KineticParagraph>
                        </article>
                        <article className="narrative-block">
                            <KineticHeading as="h2">How booking unfolds</KineticHeading>
                            <div className="process-flow">
                                {schedulingSteps.map((step) => (
                                    <article key={step.title} className="process-step">
                                        <KineticHeading as="h3">{step.title}</KineticHeading>
                                        <KineticParagraph>
                                            <KeywordHighlighter text={step.detail} keywords={KEYWORDS} variant="forest" />
                                        </KineticParagraph>
                                    </article>
                                ))}
                            </div>
                        </article>
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section" id="booking-calendar">
                <div className="editorial-container">
                    <div className="section-heading">
                        <KineticHeading as="h2">Schedule now</KineticHeading>
                    </div>
                    <div className="cal-embed">
                        <iframe
                            src={`${CAL_URL}?embed=1&theme=light`}
                            title="Booking calendar"
                            loading="lazy"
                            allow="fullscreen; geolocation *; microphone *; camera *"
                        />
                    </div>
                    <KineticParagraph className="muted scheduling-note">
                        Prefer to brief us before confirming? Submit the inquiry form and we will hold dates while we align on the menu.
                    </KineticParagraph>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container final-call">
                    <KineticHeading as="h2">Need an ongoing cadence?</KineticHeading>
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="Membership programs keep PharmD reviews, hosted dinners, and culinary documentation on the calendar so your standards stay consistent across every property."
                            keywords={KEYWORDS}
                            variant="bronze"
                        />
                    </KineticParagraph>
                    <div className="cta-row">
                        <motion.span {...motionProps} className="inline-flex">
                            <Link className="btn" href="/book" onClick={trackFooterCta("request-booking", "/book")}>
                                request a booking
                            </Link>
                        </motion.span>
                        <motion.span {...motionProps} className="inline-flex">
                            <Link className="btn ghost" href="/membership" onClick={trackFooterCta("explore-membership", "/membership")}>
                                explore memberships
                            </Link>
                        </motion.span>
                    </div>
                </div>
            </section>
        </article>
    );
}


