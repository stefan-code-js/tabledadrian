import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Contact | Table d’Adrian",
    description:
        "Reservations and private events along the Côte d’Azur. Email, calendar, and profiles.",
    alternates: { canonical: "/contact" },
};

export default function ContactPage() {
    const SITE = process.env.SITE_URL || "https://tabledadrian.com";
    const EMAIL =
        process.env.NEXT_PUBLIC_CONTACT_EMAIL || "adrian@tabledadrian.com";
    const CAL =
        process.env.CAL_PUBLIC_LINK || "https://cal.com/adrian-stefan";
    const IG =
        process.env.INSTAGRAM_PROFILE_URL || "https://instagram.com/tabledadrian";
    const LI =
        process.env.LINKEDIN_PROFILE_URL ||
        "https://www.linkedin.com/in/adrian-stefan-badea-82456131b";

    const ld = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Table d’Adrian",
        url: SITE,
        email: EMAIL,
        sameAs: [IG, LI],
        areaServed: ["Antibes", "Cannes", "Monaco"],
        contactPoint: [
            {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: EMAIL,
                availableLanguage: ["en", "fr"],
            },
        ],
    };

    return (
        <main className="section">
            <div className="container container--narrow">
                <h1 className="title center-text">Contact</h1>
                <p className="lead center-text">
                    Private dining and seasonal tasting menus along the Côte d’Azur.
                </p>

                <section className="section" style={{ paddingTop: 16 }}>
                    <div className="grid-2">
                        <article className="card">
                            <h3>write to us</h3>
                            <p>
                                Email{" "}
                                <a className="link" href={`mailto:${EMAIL}`}>
                                    {EMAIL}
                                </a>{" "}
                                with location and guest count.
                            </p>
                            <div className="cta" style={{ marginTop: 8 }}>
                                <a className="btn primary" href={`mailto:${EMAIL}?subject=Private%20Dining%20Enquiry`}>
                                    email
                                </a>
                                <a className="btn" href={IG} target="_blank" rel="noreferrer">
                                    instagram
                                </a>
                                <a className="btn" href={LI} target="_blank" rel="noreferrer">
                                    linkedin
                                </a>
                            </div>
                        </article>

                        <article className="card">
                            <h3>booking &amp; availability</h3>
                            <p>
                                Choose a date. We’ll confirm details and tailor the menu to your table.
                            </p>
                            <p style={{ marginTop: 8 }}>
                                <Link className="btn" href="/book">open booking</Link>
                            </p>
                            <iframe
                                className="embed contact-embed"
                                src={`${CAL}?embed=1&theme=light`}
                                title="Cal — Table d’Adrian"
                                allow="fullscreen; geolocation *; microphone *; camera *"
                                loading="lazy"
                                style={{ marginTop: 10 }}
                            />
                        </article>
                    </div>
                </section>
            </div>

            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
            />
        </main>
    );
}
