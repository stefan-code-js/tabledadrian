import type { Metadata } from "next";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Newsletter Atelier | Table d'Adrian",
    description:
        "Request seasonal dispatches from Table d'Adrian highlighting residencies, collectible drops, and wellness rituals for private salons.",
};

export default function NewsletterPage() {
    return (
        <article className="editorial-page">
            <header className="page-cover">
                <div className="page-cover__body">
                    <span className="page-eyebrow">Concierge newsletter</span>
                    <h1 className="page-heading">Dispatches for the discerning host</h1>
                    <p className="page-subheading">
                        Receive seasonal itineraries, collectible briefings, and tasting rituals curated for Table d&apos;Adrian members.
                        Every note is written by the atelier to keep your household several steps ahead of the next soirée.
                    </p>
                </div>
            </header>

            <section className="page-surface">
                <div className="page-grid page-grid--two">
                    <div className="page-card page-card--stack">
                        <NewsletterSignup />
                        <div className="page-card">
                            <h3 className="page-card__title">What to expect</h3>
                            <ul className="page-card__body page-list">
                                <li>Seasonal menus engineered for villas, yachts, and alpine hideaways.</li>
                                <li>Private tasting invitations and forum salon recaps reserved for members.</li>
                                <li>Wellness and recovery rituals authored with our pharmacist-led team.</li>
                            </ul>
                        </div>
                    </div>
                    <aside className="page-card page-card--stack">
                        <h2 className="page-card__title">Already a member?</h2>
                        <p className="page-card__body">
                            Access the forum or recipe atelier to apply the latest dispatches inside your household playbook.
                        </p>
                        <div className="page-actions page-actions--start">
                            <Link href="/forum" className="btn">
                                Visit forum
                            </Link>
                            <Link href="/recipes" className="btn ghost">
                                Explore recipes
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>
        </article>
    );
}

