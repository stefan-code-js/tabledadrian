"use client";

import Image from "@/components/StaticImage";
import Link from "next/link";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const heroImage = {
    src: "/gallery/B8FBB31E-B185-4FD6-B6AD-C694DE95E5D8.jpg",
    alt: "Team preparing ingredients in a calm kitchen with daylight.",
};

const members = [
    {
        name: "Adrian Stefan Badea",
        role: "Chef-Patron & Founder",
        image: "/placeholder/portrait-adrian.svg",
        link: "https://www.linkedin.com/in/adrian-stefan-badea-82456131b",
        bio: "Michelin-trained private chef orchestrating cinematic dining for Monaco villas, Dubai penthouses, and Mayfair salons.",
    },
    {
        name: "Antonia Badea, PharmD",
        role: "Clinical Gastronomy Director",
        image: "/placeholder/portrait-antonia.svg",
        bio: "PharmD strategist translating biomarker data, supplementation plans, and longevity protocols into indulgent menus.",
    },
    {
        name: "Claire Dupont",
        role: "Head Sommelier",
        image: "/placeholder/portrait-claire.svg",
        bio: "Curates Old World cellars, zero-proof pairings, and yacht-friendly libraries for UHNW hosts worldwide.",
    },
    {
        name: "Julien Marchand",
        role: "Pastry & Rituals",
        image: "/placeholder/portrait-julien.svg",
        bio: "Designs patisserie moments, fasting breaks, and sunrise boulangerie service tailored to each household.",
    },
];

const KEYWORDS = [
    "atelier",
    "private chef",
    "PharmD",
    "wellness",
    "Riviera",
    "luxury hospitality",
] as const;

export default function TeamPageContent() {
    const prefersReduced = usePrefersReducedMotion();
    const motionProps = prefersReduced
        ? { whileHover: undefined, whileTap: undefined }
        : ({ whileHover: { y: -3 }, whileTap: { scale: 0.97 } } as const);

    const handleCta = (label: string, href: string) => () => {
        trackEvent(ANALYTICS_EVENTS.ctaClick, {
            location: "team-final",
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
                        loading="lazy"
                        sizes="(max-width: 900px) 100vw, 960px"
                        className="hero-figure__image"
                    />
                </figure>
                <div className="editorial-container hero-copy">
                    <KineticHeading as="h1">The Atelier Team</KineticHeading>
                    <KineticParagraph className="lead">
                        <KeywordHighlighter
                            text="A PharmD-led private chef collective aligning clinical wellness, Michelin artistry, and silent service across Monaco, Dubai, London, Miami, and New York."
                            keywords={KEYWORDS}
                            variant="forest"
                        />
                    </KineticParagraph>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="section-heading">
                        <KineticHeading as="h2">Atelier leads</KineticHeading>
                    </div>
                    <div className="team-layout">
                        {members.map((member) => (
                            <article key={member.name} className="team-profile">
                                <div className="team-avatar">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 900px) 100vw, 320px"
                                        loading="lazy"
                                        className="team-avatar__image"
                                    />
                                </div>
                                <KineticHeading as="h3">{member.name}</KineticHeading>
                                <KineticParagraph className="muted">{member.role}</KineticParagraph>
                                {member.bio ? (
                                    <KineticParagraph>
                                        <KeywordHighlighter text={member.bio} keywords={KEYWORDS} variant="bronze" />
                                    </KineticParagraph>
                                ) : null}
                                {member.link ? (
                                    <KineticParagraph>
                                        <a href={member.link} target="_blank" rel="noreferrer">
                                            view profile
                                        </a>
                                    </KineticParagraph>
                                ) : null}
                            </article>
                        ))}
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container final-call">
                    <KineticHeading as="h2">Meet us at the table</KineticHeading>
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="Explore PharmD-approved menus or request a date—we will choreograph cuisine, wellness, and service so your residences, yachts, and jets feel effortlessly composed."
                            keywords={KEYWORDS}
                            variant="bronze"
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

