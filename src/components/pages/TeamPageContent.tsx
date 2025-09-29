"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const heroImage = {
    src: "/placeholder/hero-team.svg",
    alt: "Team preparing ingredients in a calm kitchen with daylight.",
};

const members = [
    {
        name: "Adrian Stefan Badea",
        role: "Chef & Founder",
        image: "/placeholder/portrait-adrian.svg",
        link: "https://www.linkedin.com/in/adrian-stefan-badea-82456131b",
    },
    {
        name: "Antonia Badea, PharmD",
        role: "Clinical Systems",
        image: "/placeholder/portrait-antonia.svg",
    },
    {
        name: "Claire Dupont",
        role: "Sommelier",
        image: "/placeholder/portrait-claire.svg",
    },
    {
        name: "Julien Marchand",
        role: "Pastry",
        image: "/placeholder/portrait-julien.svg",
    },
];

const KEYWORDS = ["atelier", "chef", "service", "membership", "Riviera"] as const;

export default function TeamPageContent() {
    const prefersReduced = usePrefersReducedMotion();
    const motionProps = prefersReduced
        ? { whileHover: undefined, whileTap: undefined }
        : {
              whileHover: { y: -3 },
              whileTap: { scale: 0.97 },
          } as const;

    const handleCta = (label: string, href: string) => () => {
        trackEvent(ANALYTICS_EVENTS.ctaClick, {
            location: "team-final",
            kind: label,
            href,
        });
    };

    return (
        <article className="space-y-space-7">
            <section className="grid gap-space-5 pb-space-6">
                <figure className="relative w-full h-[clamp(260px,45vw,420px)] overflow-hidden rounded-lg" data-parallax="8">
                    <Image
                        src={heroImage.src}
                        alt={heroImage.alt}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover saturate-[0.85]"
                    />
                </figure>
                <div className="w-full max-w-measure mx-auto space-y-space-4">
                    <span className="text-xs tracking-widest uppercase text-ink-muted">Our atelier</span>
                    <KineticHeading as="h1">Adrian, Antonia, and the Riviera cadre</KineticHeading>
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="The Côte d’Azur ateliers we steward carry private dining, clinical systems, and the small rituals that make service feel inevitable."
                            keywords={KEYWORDS}
                            variant="bronze"
                        />
                    </KineticParagraph>
                </div>
            </section>

            <section className="w-full max-w-measure mx-auto space-y-space-4">
                <KineticHeading as="h2">Leadership</KineticHeading>
                <div className="grid gap-space-4 md:grid-cols-2">
                    {members.map((member) => (
                        <article key={member.name} className="grid gap-space-2">
                            <div className="relative h-64 overflow-hidden rounded-lg">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-space-1">
                                <KineticHeading as="h3">{member.name}</KineticHeading>
                                <KineticParagraph>
                                    <KeywordHighlighter text={member.role} keywords={KEYWORDS} variant="forest" />
                                </KineticParagraph>
                                {member.link ? (
                                    <Link className="text-link" href={member.link} target="_blank" rel="noreferrer">
                                        View profile
                                    </Link>
                                ) : null}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="w-full max-w-measure mx-auto space-y-space-4">
                <KineticHeading as="h2">Expect calm stewardship</KineticHeading>
                <KineticParagraph>
                    <KeywordHighlighter
                        text="Every booking arrives with mise, supplier briefs, timelines, and the documentation your household needs to glide through service."
                        keywords={KEYWORDS}
                        variant="forest"
                    />
                </KineticParagraph>
                <div className="flex flex-wrap gap-space-2">
                    <motion.span {...motionProps} className="inline-flex">
                        <Link className="btn" href="/contact" onClick={handleCta("contact", "/contact")}>
                            Contact the atelier
                        </Link>
                    </motion.span>
                    <motion.span {...motionProps} className="inline-flex">
                        <Link className="btn ghost" href="/membership" onClick={handleCta("membership", "/membership")}>
                            Explore membership
                        </Link>
                    </motion.span>
                </div>
            </section>
        </article>
    );
}
