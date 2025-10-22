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
        <article className="space-y-12 pb-20">
            <header className="relative overflow-hidden rounded-[3rem] border border-[var(--line-soft)] bg-paper-soft/80 px-10 py-16 text-center shadow-2xl">
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
                    <span className="text-xs uppercase tracking-[0.45em] text-ink-soft">Concierge Newsletter</span>
                    <h1 className="text-4xl font-serif text-accent">Dispatches for the discerning host</h1>
                    <p className="text-sm text-ink-soft leading-relaxed">
                        Receive seasonal itineraries, collectible briefings, and tasting rituals curated for Table d'Adrian members.
                        Every note is written by the atelier to keep your household several steps ahead of the next soirée.
                    </p>
                </div>
            </header>

            <section className="grid gap-10 md:grid-cols-[minmax(0,1fr)_360px]">
                <div className="space-y-6">
                    <NewsletterSignup />
                    <div className="rounded-3xl border border-[var(--line-hairline)] bg-paper/40 p-6 text-sm text-ink-soft">
                        <p className="font-semibold text-ink">What to expect</p>
                        <ul className="mt-3 grid gap-3 text-left">
                            <li>Seasonal menus engineered for villas, yachts, and alpine hideaways.</li>
                            <li>Private tasting invitations and forum salon recaps reserved for members.</li>
                            <li>Wellness and recovery rituals authored with our pharmacist-led team.</li>
                        </ul>
                    </div>
                </div>
                <aside className="space-y-5 rounded-3xl border border-[var(--line-hairline)] bg-paper-soft/60 p-6 text-sm text-ink-soft">
                    <h2 className="text-2xl font-serif text-ink">Already a member?</h2>
                    <p>
                        Access the forum or recipe atelier to apply the latest dispatches inside your household playbook.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/forum" className="btn text-xs uppercase tracking-[0.35em]">
                            Visit forum
                        </Link>
                        <Link href="/recipes" className="btn ghost text-xs uppercase tracking-[0.35em]">
                            Explore recipes
                        </Link>
                    </div>
                </aside>
            </section>
        </article>
    );
}

