import Image from "next/image";
import PayButton from "@/components/PayButton";
import CardPanel from "@/components/CardPanel";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import FactRow from "@/components/FactRow";
import CTABand from "@/components/CTABand";
import { membershipTiers, formatMoney, formatRange } from "@/lib/pricing";
import { buildMetadataForPath } from "@/lib/metadata";

export const metadata = buildMetadataForPath("/membership", {
    title: "Membership",
    description:
        "Member programs by Antonia (PharmD) & Adrian (private chef). Quarterly to premier plans with pharmacist oversight, menu systems, and hosted dinners.",
});

const HERO_IMAGE = {
    src: "/placeholder/hero-membership.svg",
    alt: "Soft light over a private dining room prepared for membership guests.",
};

const KEYWORDS = ["membership", "private table", "chef's table", "seasonal", "consult"] as const;

const INTRO = [
    "Membership exists for households that expect clinical oversight, culinary theatre, and systems that survive full calendars.",
    "Antonia (PharmD) and Adrian document every standard so your team can repeat it without us present while hosted dinners stay on the calendar year-round.",
];

export default function MembershipPage() {
    return (
        <article className="editorial-page membership-page">
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure" data-parallax="8">
                    <Image src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} fill priority sizes="100vw" className="hero-figure__image" />
                </figure>
                <div className="editorial-container hero-copy">
                    <KineticHeading as="h1">Membership ledgers</KineticHeading>
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
                    <div className="membership-grid">
                        {membershipTiers.map((tier, index) => {
                            const facts = [
                                { label: "Investment", value: formatMoney(tier.investment) },
                                { label: "Hosted dinners", value: `${formatRange(tier.hostedDinners)} per year` },
                                { label: "Priority window", value: `${tier.priorityWindowDays}-day first holds` },
                                { label: "Ideal guest range", value: formatRange(tier.guestRange) },
                            ];
                            return (
                                <CardPanel key={tier.id} className="membership-card">
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
                                    <div className="membership-card__cta">
                                        <PayButton priceKey={tier.checkout.priceKey}>
                                            {tier.checkout.label}
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
                    <KineticHeading as="h2">Continue the narrative</KineticHeading>
                    <CTABand
                        title="Schedule a membership consult"
                        description="Bring us the realities of your calendar. We respond within 24 hours with the intake outline, provisioning notes, and first available service dates."
                        primary={{ label: "Book consult", href: "/consult" }}
                        secondary={{ label: "Message the chef", href: "/contact" }}
                    />
                </div>
            </section>
        </article>
    );
}
