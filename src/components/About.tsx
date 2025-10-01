
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

export default function About() {
    const prefersReduced = usePrefersReducedMotion();
    const motionProps = prefersReduced
        ? {}
        : {
              whileHover: { y: -3 },
              whileTap: { scale: 0.97 },
          } as const;

    const handleCta = () => {
        trackEvent(ANALYTICS_EVENTS.ctaClick, {
            location: "about-teaser",
            href: "/about",
            label: "Read the story",
        });
    };

    return (
        <section className="section" id="about-teaser" aria-labelledby="about-teaser-heading">
            <div className="container container--narrow about-hero">
                <span className="about-kicker">our story</span>
                <div id="about-teaser-heading">
                    <KineticHeading as="h2" className="title about-title">
                        Table d'Adrian
                    </KineticHeading>
                </div>
                <KineticParagraph className="lead about-lead">
                    Ingredient-driven cuisine on the Cote d'Azur. Ferments, clarified broths, cultured creams -- precision in service of softness. Calm pacing, fragrance-forward plates.
                </KineticParagraph>
                <div className="about-cta">
                    <motion.span className="inline-flex" {...motionProps}>
                        <Link href="/about" className="btn ghost" aria-label="Read the full story about Table d'Adrian" onClick={handleCta}>
                            read the story
                        </Link>
                    </motion.span>
                </div>
            </div>
        </section>
    );
}
