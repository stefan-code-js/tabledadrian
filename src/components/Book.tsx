import Image from "next/image";
import Link from "next/link";

const CAL_HANDLE = process.env.NEXT_PUBLIC_CAL_LINK ?? "adrian-stefan";
const CAL_URL = `https://cal.com/${CAL_HANDLE}`;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "adrian@tabledadrian.com";

const heroImage = {
    src: "/placeholder/hero-book.svg",
    alt: "Soft light across a table laid with porcelain, glassware, and herbs ready for service.",
};

const briefingParagraphs = [
    "Bookings include a chef-led tasting menu, pharmacist-guided intake, and discreet crew who manage the evening end to end.",
    "We coordinate rentals, linens, and beverage service as required, then leave a documented reset so the space feels composed the next morning.",
    "Each experience is designed around fragrance, temperature, and pacing so conversation has room to breathe while the menu unfolds with intent.",
];

const schedulingSteps = [
    { title: "Choose your window", detail: "Select the date and preferred service time that fits your villa, yacht, or salon." },
    { title: "Confirm the brief", detail: "Share priorities, sensitivities, and guest cadence. We refine the menu within 24 hours." },
    { title: "Hold the calendar", detail: "Deposit or booking confirmation reserves the team. Logistics and provisioning follow immediately." },
    { title: "Receive documentation", detail: "We send menu books, mise charts, and household notes so everyone feels prepared before we arrive." },
];

export default function Book() {
    return (
        <article className="editorial-page">
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure" data-parallax="8">
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
                    <h1>Reserve your private table</h1>
                    <p className="lead">
                        Adrian and Antonia hold dates for villas, yachts, and Riviera salons. Choose your window, share your
                        intentions, and we prepare the entire arc so the room settles into calm hospitality.
                    </p>
                    <div className="cta-row">
                        <a className="btn" href={CAL_URL} target="_blank" rel="noreferrer">
                            open booking calendar
                        </a>
                        <Link className="btn ghost" href="/membership">
                            explore membership
                        </Link>
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section" id="booking-overview">
                <div className="editorial-container">
                    <div className="two-column">
                        <article className="narrative-block">
                            <h2>What the evening includes</h2>
                            {briefingParagraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                            <p>
                                Questions ahead of service? Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and
                                we will align on every detail.
                            </p>
                        </article>
                        <article className="narrative-block">
                            <h2>How booking unfolds</h2>
                            <div className="process-flow">
                                {schedulingSteps.map((step) => (
                                    <article key={step.title} className="process-step">
                                        <h3>{step.title}</h3>
                                        <p>{step.detail}</p>
                                    </article>
                                ))}
                            </div>
                        </article>
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section" id="booking-calendar">
                <div className="editorial-container">
                    <div className="section-heading">
                        <h2>Schedule now</h2>
                    </div>
                    <div className="cal-embed">
                        <iframe
                            src={`${CAL_URL}?embed=1&theme=light`}
                            title="Booking calendar"
                            loading="lazy"
                            allow="fullscreen; geolocation *; microphone *; camera *"
                        />
                    </div>
                    <p className="muted scheduling-note">
                        Prefer to brief us before confirming? Submit the inquiry form and we will hold dates while we align on
                        the menu.
                    </p>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container final-call">
                    <h2>Need an ongoing cadence?</h2>
                    <p>
                        Membership keeps pharmacist reviews, hosted dinners, and culinary documentation on the calendar so your
                        standards stay consistent across every property.
                    </p>
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
