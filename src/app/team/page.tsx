import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import { buildMetadataForPath } from "@/lib/metadata";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const metadata = buildMetadataForPath("/team", {
    title: "Team · Private Chef Atelier",
    description:
        "A small atelier led by Chef Adrian with clinical systems by Antonia (PharmD). We shape season, texture, and fragrance into one calm table along the Côte d’Azur.",
    keywords: [
        "private chef team",
        "luxury private dining",
        "Côte d’Azur chef",
        "Cote d’Azur chef",
        "tasting menu",
        "sommelier",
        "pastry",
    ],
});

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

export default function TeamPage() {
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
        <article className="editorial-page">
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure" data-parallax="8">
                    <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="100vw" className="hero-figure__image" />
                </figure>
                <div className="editorial-container hero-copy">
                    <KineticHeading as="h1">Team</KineticHeading>
                    <KineticParagraph className="lead">
                        <KeywordHighlighter
                            text="A compact group shaping season, texture, and fragrance into one calm service. Technical where needed, restrained where it matters."
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
                            text="Explore current menus or request a date—we’ll respond with a plan that holds to your standards and keeps the room composed."
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
                                explore membership
                            </Link>
                        </motion.span>
                    </div>
                </div>
            </section>
        </article>
    );
}
