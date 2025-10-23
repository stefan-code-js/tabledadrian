import Link from "next/link";

const deletionItems = [
    "Contact messages and concierge lead records",
    "Private chef bookings, proposals, and confirmations",
    "PharmD intake forms, supplementation logs, and wellness questionnaires",
    "Reviews, testimonials, and media consent you submitted",
    "Any analytics identifiers or service documentation we control",
] as const;

export default function RemovePageContent() {
    return (
        <article className="editorial-page">
            <section className="editorial-hero">
                <div className="editorial-container hero-copy">
                    <h1 className="kinetic-heading">Remove my data</h1>
                    <p className="kinetic-paragraph lead">
                        We take privacy seriously. Use the options below to request deletion of private chef dossiers, PharmD intake notes, booking requests, and review submissions. We&apos;ll confirm completion via email.
                    </p>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="two-column">
                        <article className="narrative-block">
                            <h2 className="kinetic-heading">Immediate removal</h2>
                            <p className="kinetic-paragraph">
                                Email us from the address you used and include any relevant context (for example, tasting date, villa location, yacht name, or booking reference). We will remove all associated records and confirm within one business day.
                            </p>
                            <a
                                className="btn"
                                href="mailto:adrian@tabledadrian.com?subject=Data%20deletion%20request"
                            >
                                Email deletion request
                            </a>
                        </article>

                        <article className="narrative-block">
                            <h2 className="kinetic-heading">What we delete</h2>
                            <ul>
                                {deletionItems.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <p className="kinetic-paragraph small muted">
                                Note: Payment providers (e.g., Stripe) may retain limited records to meet legal and accounting obligations. We request redaction wherever possible.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="editorial-section">
                <div className="editorial-container final-call">
                    <h2 className="kinetic-heading">Prefer to speak directly?</h2>
                    <div className="cta-row">
                        <Link className="btn" href="/contact">
                            contact us
                        </Link>
                        <a className="btn ghost" href="mailto:adrian@tabledadrian.com">
                            email Adrian
                        </a>
                    </div>
                </div>
            </section>
        </article>
    );
}
