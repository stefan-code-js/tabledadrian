import Image from "@/components/StaticImage";
import Link from "next/link";

const heroImage = {
    src: "/gallery/IMG_3090.webp",
    alt: "Notebook, pen, and citrus on a marble counter awaiting notes for the next booking.",
};

const reassuranceParagraphs = [
    "No charges were made and your private chef engagement remains on hold. When you are ready, we will reserve the calendar again and tailor the PharmD intake to your new timing.",
    "Adrian and Antonia are available to align on cuisine, wellness protocols, and logistics so the next confirmation feels effortless for your household, yacht, or jet.",
] as const;

export default function CancelPageContent() {
    return (
        <article className="editorial-page">
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure" data-parallax="6">
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
                    <h1 className="kinetic-heading">Private chef payment canceled</h1>
                    <p className="kinetic-paragraph">
                        Your PharmD-guided table remains unbooked for now. Return when the timing suits your guests and destinations.
                    </p>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="two-column">
                        <article className="narrative-block">
                            <h2 className="kinetic-heading">Pick up where you left off</h2>
                            {reassuranceParagraphs.map((paragraph) => (
                                <p key={paragraph} className="kinetic-paragraph">
                                    {paragraph}
                                </p>
                            ))}
                            <p className="kinetic-paragraph">
                                Write to{" "}
                                <a href="mailto:adrian@tabledadrian.com" className="text-accent underline focus-visible:outline-accent">
                                    adrian@tabledadrian.com
                                </a>{" "}
                                with preferred dates or priorities and we will respond within a day.
                            </p>
                        </article>
                        <article className="narrative-block">
                            <h2 className="kinetic-heading">When you are ready</h2>
                            <p className="kinetic-paragraph">
                                The booking calendar can be reopened instantly and deposits remain optional until you approve the documented menu, wellness cadence, and service plan.
                            </p>
                            <p className="kinetic-paragraph">
                                Membership programs keep hosted dinners, PharmD reviews, and household standards on cadence if you prefer to avoid rebooking each villa or yacht each season.
                            </p>
                        </article>
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container final-call">
                    <h2 className="kinetic-heading">Ready to continue?</h2>
                    <p className="kinetic-paragraph">
                        We will hold the calendar as soon as you confirm the new date. Start with an inquiry or move directly to a membership to keep your PharmD-guided culinary cadence steady across every residence.
                    </p>
                    <div className="cta-row">
                        <Link className="btn" href="/book">
                            request a booking
                        </Link>
                        <Link className="btn ghost" href="/membership">
                            explore memberships
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
