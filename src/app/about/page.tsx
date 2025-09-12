import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About",
    description:
        "Table d’Adrian is a private chef table on the Côte d’Azur. Ingredient-driven menus, fragrance-forward plating, quiet service. Chef Adrian and Antonia (PharmD) bridge gastronomy and longevity for villas, yachts, and salons across Antibes, Cannes, and Monaco.",
    alternates: { canonical: "/about" },
    keywords: [
        "private chef Côte d’Azur",
        "luxury private dining",
        "tasting menu",
        "longevity cuisine",
        "villa chef Antibes Cannes Monaco",
        "pharmacist chef wellness",
    ],
};

export default function AboutPage() {
    return (
        <main className="section">
            <div className="container container--narrow">
                <p className="kicker center-text">private chef · côte d’azur</p>
                <h1 className="title center-text">Table d’Adrian</h1>

                <p className="lead center-text" style={{ maxWidth: "62ch", marginInline: "auto" }}>
                    Michelin-level, ingredient-driven cuisine for private villas, yachts, and salons.
                    Ritual, aroma, and texture at the center—delivered with pacing and hush. Antonia
                    (PharmD) translates clinical goals into daily systems; Adrian engineers the menus,
                    mise and calm service your team can repeat.
                </p>

                {/* small chips */}
                <div className="about-chipset">
                    <span className="chip">fragrance-forward</span>
                    <span className="chip">clarified light</span>
                    <span className="chip">calm service</span>
                    <span className="chip">seasonal arc</span>
                </div>

                {/* 4-up cards on one line (desktop) */}
                <div className="grid-4 about-grid" style={{ marginTop: 16 }}>
                    <article className="card about-card">
                        <h3 className="about-h">philosophy</h3>
                        <p>
                            Ingredient as narrative: coast, orchard, and forest expressed through broth, flame,
                            smoke, and clarified acidity. A table that gathers attention without raising its voice.
                        </p>
                    </article>

                    <article className="card about-card">
                        <h3 className="about-h">craft</h3>
                        <p>
                            Ferments and clarified consommés; cultured creams and slow reductions—precision in
                            service of softness. Technique, then restraint.
                        </p>
                    </article>

                    <article className="card about-card">
                        <h3 className="about-h">provenance</h3>
                        <p>
                            Riviera orchards, small boats, and wild herbs. Ceramics and linens by local artisans;
                            glass pulled from flame. Detail used to focus the room.
                        </p>
                    </article>

                    <article className="card about-card">
                        <h3 className="about-h">service</h3>
                        <p>
                            Quiet choreography and exact pacing. Fragrance-led plating, minimal noise, linen and
                            light tuned for attention and ease.
                        </p>
                    </article>
                </div>

                {/* principles (replaces the extra card clutter & removes stats) */}
                <section className="section" aria-label="Principles">
                    <h2 className="center-text" style={{ marginBottom: 8 }}>principles</h2>
                    <ul className="principles">
                        <li><strong>Privacy first.</strong> Discretion, NDAs on request, no devices at service.</li>
                        <li><strong>Longevity-minded.</strong> Less sugar, clean carbohydrates, fermented brightness; options for CGM-aligned arcs.</li>
                        <li><strong>Sourcing with care.</strong> Small boats, in-season produce, and responsible luxury.</li>
                        <li><strong>Systems you can repeat.</strong> Mise, labeling, and training for household teams.</li>
                    </ul>
                </section>

                {/* gentle CTA row */}
                <div className="center" style={{ gap: 10, marginTop: 8 }}>
                    <Link className="btn" href="/menu" aria-label="View menus">
                        view menu
                    </Link>
                    <Link className="btn ghost" href="/book" aria-label="Request a date">
                        request a date
                    </Link>
                </div>
            </div>
        </main>
    );
}
