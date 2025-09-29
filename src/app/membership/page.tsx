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
        <article className="space-y-space-7">
            <section className="grid gap-space-5 pb-space-6">
                <figure className="relative w-full h-[clamp(260px,45vw,420px)] overflow-hidden rounded-lg" data-parallax="8">
                    <Image src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} fill priority sizes="100vw" className="object-cover saturate-[0.85]" />
                </figure>
                <div className="w-full max-w-measure mx-auto space-y-space-4">
                    <KineticHeading as="h1">Membership ledgers</KineticHeading>
                    {INTRO.map((paragraph, index) => (
                        <KineticParagraph key={index}>
                            <KeywordHighlighter text={paragraph} keywords={KEYWORDS} variant={index === 0 ? "forest" : "bronze"} />
                        </KineticParagraph>
                    ))}
                </div>
                <hr className="border-t border-ink-muted/20" />
            </section>

            <section className="w-full max-w-measure mx-auto space-y-space-5">
                <KineticHeading as="h2">Membership pathways</KineticHeading>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-space-4">
                    {membershipTiers.map((tier, index) => {
                        const facts = [
                            { label: "Investment", value: formatMoney(tier.investment) },
                            { label: "Hosted dinners", value: `${formatRange(tier.hostedDinners)} per year` },
                            { label: "Priority window", value: `${tier.priorityWindowDays}-day first holds` },
                            { label: "Ideal guest range", value: formatRange(tier.guestRange) },
                        ];
                        return (
                            <CardPanel key={tier.id} className="grid gap-space-3">
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
                                <div className="mt-space-2">
                                    <PayButton priceHandle={tier.checkout.priceHandle}>
                                        {tier.checkout.label}
                                    </PayButton>
                                </div>
                            </CardPanel>
                        );
                    })}
                </div>
                <hr className="border-t border-ink-muted/20" />
            </section>

            <section className="w-full max-w-measure mx-auto">
                <KineticHeading as="h2">Continue the narrative</KineticHeading>
                <CTABand
                    title="Schedule a membership consult"
                    description="Bring us the realities of your calendar. We respond within 24 hours with the intake outline, provisioning notes, and first available service dates."
                    primary={{ label: "Book consult", href: "/consult" }}
                    secondary={{ label: "Message the chef", href: "/contact" }}
                />
            </section>
        </article>
    );
}