import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment canceled · Table d’Adrian",
    robots: { index: false },
    alternates: { canonical: "/cancel" },
};

const heroImage = {
    src: "https://images.unsplash.com/photo-1526356028180-26cb1437b6a9?fm=webp&w=2400&h=1600&fit=crop&q=85",
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
                <figure className="full-bleed hero-figure">
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
                    <h1>Payment canceled</h1>
                    <p className="lead">Your table remains unbooked for now. Return when the timing suits you.</p>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="two-column">
                        <article className="narrative-block">
                            <h2>Pick up where you left off</h2>
                            {reassuranceParagraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                            <p>
                                Write to <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a> with preferred dates
                                or priorities and we will respond within a day.
                            </p>
                        </article>
                        <article className="narrative-block">
                            <h2>When you are ready</h2>
                            <p>
                                The booking calendar can be reopened instantly and deposits remain optional until you approve the
                                documented menu and service plan.
                            </p>
                            <p>
                                Membership keeps hosted dinners, pharmacist reviews, and household standards on cadence if you
                                prefer to avoid rebooking each season.
                            </p>
                        </article>
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container final-call">
                    <h2>Ready to continue?</h2>
                    <p>
                        We will hold the calendar as soon as you confirm the new date. Start with an inquiry or move directly to
                        membership to keep the cadence steady.
                    </p>
                    <div className="cta-row">
                        <Link className="btn" href="/contact">
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
