import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Request Membership | Table d'Adrian",
    description:
        "Request Table d'Adrian access to coordinate concierge engagements and tailored dining experiences.",
};

export default function RegisterPage() {
    return (
        <article className="editorial-page">
            <header className="page-cover">
                <div className="page-cover__body">
                    <span className="page-eyebrow">Concierge onboarding</span>
                    <h1 className="page-heading">Request your concierge credentials</h1>
                    <p className="page-subheading">
                        Share your details so we may onboard your household, aligning itineraries, wellness briefings,
                        and private dining updates with your preferences.
                    </p>
                </div>
            </header>

            <section className="page-surface">
                <div className="page-grid page-grid--two">
                    <div className="page-card page-card--stack">
                        <div className="page-card page-card--form">
                            <RegisterForm />
                        </div>
                        <div className="page-card">
                            <h3 className="page-card__title">What happens next</h3>
                            <ul className="page-card__body page-list">
                                <li>Our concierge verifies your request and household details.</li>
                                <li>You receive a private welcome brief with next steps.</li>
                                <li>Access opens to itineraries, tasting notes, and forum salons.</li>
                            </ul>
                        </div>
                    </div>

                    <aside className="page-card page-card--stack">
                        <h2 className="page-card__title">Already possess credentials?</h2>
                        <p className="page-card__body">
                            <Link href="/auth/login" className="text-accent underline focus-visible:outline-accent">
                                Sign in here
                            </Link>{" "}
                            to manage itineraries, concierge updates, and collectible invitations.
                        </p>
                        <div className="page-actions page-actions--start">
                            <Link href="/newsletter" className="btn">
                                Read dispatches
                            </Link>
                            <Link href="/contact" className="btn ghost">
                                Speak with concierge
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>
        </article>
    );
}
