import Image from "next/image";
import PayButton from "@/components/PayButton";
import CardPanel from "@/components/CardPanel";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import FactRow from "@/components/FactRow";
import CTABand from "@/components/CTABand";
import { membershipPrograms, formatMoney, formatRange } from "@/lib/pricing";
import { buildMetadataForPath } from "@/lib/metadata";

export const metadata = buildMetadataForPath("/membership", {
    title: "Membership Programs",
    description:
        "Table d'Adrian membership programs pair Michelin-level private chef artistry with PharmD-guided wellness for estates, yachts, and penthouses from Monaco to Manhattan.",
});

const HERO_IMAGE = {
    src: "/placeholder/hero-membership.svg",
    alt: "Candlelit salon table awaiting a private chef membership soirée.",
};

const KEYWORDS = [
    "Table d'Adrian",
    "private chef",
    "membership",
    "PharmD",
    "Monaco",
    "Dubai",
    "New York",
    "wellness gastronomy",
] as const;

const INTRO = [
    "Membership ensures your residences, yachts, and executive retreats experience Michelin-composed cuisine curated with medical precision, seasonal sourcing, and palace-level service choreography.",
    "Chef Adrian partners with Antonia, PharmD, to author nutritionally verified tasting sequences, clinical allergen protocols, and immersive sensory design tailored to Riviera villas, Dubai penthouses, Manhattan sky lofts, and alpine chalets.",
];

export default function MembershipPage() {
    return (
        <article className="editorial-page membership-page">
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure" data-parallax="8">
                    <Image src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} fill priority sizes="100vw" className="hero-figure__image" />
                </figure>
                <div className="editorial-container hero-copy">
                    <KineticHeading as="h1">Membership tableaus</KineticHeading>
                    {INTRO.map((paragraph, index) => (
                        <KineticParagraph key={index}>
                            <KeywordHighlighter text={paragraph} keywords={KEYWORDS} variant={index === 0 ? "forest" : "bronze"} />
                        </KineticParagraph>
                    ))}
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <KineticHeading as="h2">Membership pathways</KineticHeading>
                    <div className="program-grid">
                        {membershipPrograms.map((tier, index) => {
                            const facts = [
                                { label: "Investment", value: formatMoney(tier.investment) },
                                { label: "Hosted tableaus", value: `${formatRange(tier.hostedDinners)} annually` },
                                { label: "Priority window", value: `${tier.priorityWindowDays}-day first holds` },
                                { label: "Ideal guest range", value: formatRange(tier.guestRange) },
                            ];
                            return (
                                <CardPanel key={tier.id} className="program-card">
                                    <div className="program-card__body">
                                        <KineticHeading as="h3">{tier.name}</KineticHeading>
                                        {tier.narrative.map((paragraph, pIndex) => (
                                            <KineticParagraph key={pIndex}>
                                                <KeywordHighlighter
                                                    text={paragraph}
                                                    keywords={KEYWORDS}
                                                    variant={index % 2 === 0 ? "forest" : "bronze"}
                                                />
                                            </KineticParagraph>
                                        ))}
                                        {tier.followUp.map((paragraph, fIndex) => (
                                            <KineticParagraph key={`follow-${fIndex}`}>
                                                <KeywordHighlighter
                                                    text={paragraph}
                                                    keywords={KEYWORDS}
                                                    variant={index % 2 === 0 ? "bronze" : "forest"}
                                                />
                                            </KineticParagraph>
                                        ))}
                                        <FactRow facts={facts} />
                                    </div>
                                    <div className="program-card__cta">
                                        <PayButton priceHandle={tier.checkout.priceHandle}>{tier.checkout.label}</PayButton>
                                    </div>
                                </CardPanel>
                            );
                        })}
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <KineticHeading as="h2">Continue the narrative</KineticHeading>
                    <CTABand
                        title="Schedule a membership consult"
                        description="Outline your calendar across Monaco, Dubai, London, and New York. We respond within 24 hours with intake dossiers, medical nutrition notes, and tailored service choreography."
                        primary={{ label: "Book consult", href: "/consult" }}
                        secondary={{ label: "Message the chef", href: "/contact" }}
                    />
                </div>
            </section>
        </article>
    );
}
