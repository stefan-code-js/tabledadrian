import type { Metadata } from "next";
import Script from "next/script";
// If you removed Footer from layout and want it here instead, uncomment:
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
    title: "Contact | Table d’Adrian",
    description: "Private dining and seasonal tasting menus along the Côte d’Azur. Write to us.",
    alternates: { canonical: "/contact" },
};

export default function ContactPage() {
    const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "adrian@tabledadrian.com";

    return (
        <main className="section">
            <div className="container container--narrow">
                <h1 className="title center-text">Contact</h1>
                <p className="lead center-text">
                    Write with location and guest count. We’ll shape the season to your table.
                </p>

                <section className="section" style={{ paddingTop: 16 }}>
                    <ContactForm emailFallback={EMAIL} />
                </section>
            </div>

            {/* Turnstile (spam protection) */}
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />

            {/* If layout doesn't include Footer, render it here instead: */}

        </main>
    );
}
