import Image from "next/image";
import type { Metadata } from "next";
import PayButton from "@/components/PayButton";
import CardPanel from "@/components/CardPanel";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import FactRow from "@/components/FactRow";
import CTABand from "@/components/CTABand";
import { consultPackages, formatMoney, formatRange } from "@/lib/pricing";

export const metadata: Metadata = {
    title: "Consult",
    description:
        "Pharmacist-led wellness and private-chef consulting by Antonia & Adrian. From focused intakes to 12-week concierge seasons for villas and yachts.",
    alternates: { canonical: "/consult" },
};

const HERO_IMAGE = {
    src: "/placeholder/hero-consult.svg",
    alt: "Consultation notes beside herbs and citrus on a marble counter.",
};

const KEYWORDS = ["consult", "membership", "chef's table", "seasonal"] as const;

const INTRO = [
    "We stabilise post-meal fatigue, reactive snacking, and restless sleep by translating clinical insight into daily menus and mise that feel luxurious.",
    "Glycemic volatility, lipid risk, and GI sensitivities become livable routines through practical coaching for staff and crew across villas and charters.",
];

export default function ConsultPage() {
    return (
        <article className="editorial-page consult-page">
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure" data-parallax="8">
                    <Image src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} fill priority sizes="100vw" className="hero-figure__image" />
                </figure>
                <div className="editorial-container hero-copy">
                    <KineticHeading as="h1">Private wellness &amp; culinary consult</KineticHeading>
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
                    <KineticHeading as="h2">Consulting paths</KineticHeading>
                    <div className="membership-grid">
                        {consultPackages.map((pkg, index) => {
                            const facts = [
                                { label: "Investment", value: formatMoney(pkg.investment) },
                                { label: "Duration", value: formatRange(pkg.duration) },
                                pkg.guestRange ? { label: "Guest scope", value: formatRange(pkg.guestRange) } : null,
                            ].filter(Boolean) as { label: string; value: string }[];
                            return (
                                <CardPanel key={pkg.id} className="membership-card">
                                    <KineticHeading as="h3">{pkg.name}</KineticHeading>
                                    {pkg.narrative.map((paragraph, pIndex) => (
                                        <KineticParagraph key={pIndex}>
                                            <KeywordHighlighter
                                                text={paragraph}
                                                keywords={KEYWORDS}
                                                variant={index % 2 === 0 ? "forest" : "bronze"}
                                            />
                                        </KineticParagraph>
                                    ))}
                                    {pkg.followUp.map((paragraph, fIndex) => (
                                        <KineticParagraph key={`follow-${fIndex}`}>
                                            <KeywordHighlighter
                                                text={paragraph}
                                                keywords={KEYWORDS}
                                                variant={index % 2 === 0 ? "bronze" : "forest"}
                                            />
                                        </KineticParagraph>
                                    ))}
                                    <FactRow facts={facts} />
                                    <div className="membership-card__cta">
                                        <PayButton priceKey={pkg.checkout.priceKey}>
                                            {pkg.checkout.label}
                                        </PayButton>
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
                    <KineticHeading as="h2">Schedule your intake</KineticHeading>
                    <CTABand
                        title="Begin with a focused intake"
                        description="We reply within 24 hours with intake availability, pre-work, and the documentation your physician or crew will need."
                        primary={{ label: "Book intake", href: "/consult#consult-intake" }}
                        secondary={{ label: "Message the team", href: "/contact" }}
                    />
                </div>
            </section>
        </article>
    );
}
