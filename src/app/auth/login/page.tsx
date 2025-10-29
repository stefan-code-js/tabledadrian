import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Enter the Atelier | Table d'Adrian",
    description:
        "Authenticate to review personalized itineraries, concierge updates, and secure booking details.",
};

export default function LoginPage() {
    return (
        <article className="editorial-page">
            <header className="page-cover">
                <div className="page-cover__body">
                    <span className="page-eyebrow">Secure access portal</span>
                    <h1 className="page-heading">Gracefully return to the atelier</h1>
                    <p className="page-subheading">
                        Confirm your credentials to review concierge updates, private itineraries, and in-progress
                        engagements prepared expressly for your household.
                    </p>
                </div>
            </header>

            <section className="page-surface">
                <div className="page-grid page-grid--two">
                    <div className="page-card page-card--stack">
                        <div className="page-card page-card--form">
                            <LoginForm />
                        </div>
                        <div className="page-card">
                            <h3 className="page-card__title">Need to adjust access?</h3>
                            <p className="page-card__body">
                                If your household upgraded to a new concierge email,{" "}
                                <Link href="/auth/register" className="text-accent underline focus-visible:outline-accent">
                                    request a fresh invitation
                                </Link>{" "}
                                so we can refresh your credentials.
                            </p>
                            <ul className="page-card__body page-list">
                                <li>Resend welcome briefs or itinerary confirmations.</li>
                                <li>Coordinate access for executive assistants or household staff.</li>
                                <li>Notify the atelier about updated preferences or allergies.</li>
                            </ul>
                        </div>
                    </div>

                    <aside className="page-card page-card--stack">
                        <h2 className="page-card__title">Circle member benefits</h2>
                        <p className="page-card__body">
                            Signing in maintains secure access to tasting itineraries, billing confirmations, and private
                            dispatches curated for your residences.
                        </p>
                        <div className="page-actions page-actions--start">
                            <Link href="/members" className="btn">
                                Visit member hub
                            </Link>
                            <Link href="/contact" className="btn ghost">
                                Concierge support
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>
        </article>
    );
}
