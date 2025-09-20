import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";

export const runtime = "edge";

export const metadata: Metadata = {
    title: "Payment canceled - Table d'Adrian",
    robots: { index: false },
    alternates: { canonical: "/cancel" },
};

const heroImage = {
    src: "/placeholder/hero-cancel.svg",
    alt: "Notebook, pen, and citrus on a marble counter awaiting notes for the next booking.",
};

const reassuranceParagraphs = [
    "No charges were made and your calendar remains open. When you are ready, we can hold the date again and finalize the details.",
    "Adrian and Antonia are available to answer any menu or logistics questions so the next confirmation feels effortless.",
];

export default function CancelPage() {
    return (
        <article className="editorial-page">
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure" data-parallax="6">
                    <Image
                        src={heroImage.src}
                        alt={heroImage.alt}
                        fill
                        priority
                        sizes="100vw"
                        className="hero-figure__image"
                    />
                </figure>
                <div className="editorial-container hero-copy">
                    <KineticHeading as="h1">Payment canceled</KineticHeading>
                    <KineticParagraph>Your table remains unbooked for now. Return when the timing suits you.</KineticParagraph>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="two-column">
                        <article className="narrative-block">
                            <KineticHeading as="h2">Pick up where you left off</KineticHeading>
                            {reassuranceParagraphs.map((paragraph) => (
                                <KineticParagraph key={paragraph}>{paragraph}</KineticParagraph>
                            ))}
                            <KineticParagraph>
                                Write to <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a> with preferred dates or priorities and we will respond within a day.
                            </KineticParagraph>
                        </article>
                        <article className="narrative-block">
                            <KineticHeading as="h2">When you are ready</KineticHeading>
                            <KineticParagraph>
                                The booking calendar can be reopened instantly and deposits remain optional until you approve the documented menu and service plan.
                            </KineticParagraph>
                            <KineticParagraph>
                                Membership keeps hosted dinners, pharmacist reviews, and household standards on cadence if you prefer to avoid rebooking each season.
                            </KineticParagraph>
                        </article>
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container final-call">
                    <KineticHeading as="h2">Ready to continue?</KineticHeading>
                    <KineticParagraph>
                        We will hold the calendar as soon as you confirm the new date. Start with an inquiry or move directly to membership to keep the cadence steady.
                    </KineticParagraph>
                    <div className="cta-row">
                        <Link className="btn" href="/book">
                            request a booking
                        </Link>
                        <Link className="btn ghost" href="/membership">
                            explore membership
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
