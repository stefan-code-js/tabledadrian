import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Table d’Adrian",
    description:
        "A quiet, luxury table on the Côte d’Azur — cuisine as narrative, season as author, texture as memory.",
    alternates: { canonical: "/about" },
};

export default function AboutPage() {
    return (
        <main className="section">
            <div className="container container--narrow story">
                <h1 className="title center-text">Table d’Adrian</h1>
                <p className="lead center-text intro">
                    A quiet table on the Côte d’Azur. Cuisine as narrative; season as author; texture as memory.
                </p>

                <p className="prose" style={{ marginTop: 16 }}>
                    <span className="dropcap">T</span>able d’Adrian began with a simple insistence: that a dinner
                    can feel like a page turned by hand — calm, deliberate, scented with heat. Forest, stone, and
                    sea are our constant vocabulary; flame, smoke, and clarified light, the punctuation.
                </p>

                <p className="pull">
                    We cook for hush — a table that gathers attention without raising its voice.
                </p>

                <div className="story-grid">
                    <section>
                        <h2>origins</h2>
                        <p className="note">
                            Riviera orchards, small boats, and wild herbs. Ceramics and linens by local artisans;
                            glass pulled from flame. Detail is a tool for focus.
                        </p>
                    </section>

                    <section>
                        <h2>craft</h2>
                        <p className="note">
                            Ferments and clarified consommés; cultured creams and slow reductions — technique in
                            service of softness. Precision, then restraint.
                        </p>
                    </section>

                    <section>
                        <h2>service</h2>
                        <p className="note">
                            Calm pacing; linen and low sound. The room becomes a vessel: fragrance-forward plating,
                            quiet choreography, attention anchored to taste.
                        </p>
                    </section>

                    <section>
                        <h2>place</h2>
                        <p className="note">
                            Antibes · Cannes · Monaco — seasonal menus designed to travel to private villas, yachts,
                            and salons. One table; yours.
                        </p>
                    </section>
                </div>

                <p className="prose" style={{ marginTop: 18 }}>
                    The menu breathes with the coast: 12–16 courses, composed for fragrance, texture, and
                    seasonality. Vegetarian, vegan, and gluten-free paths available with notice. Seafood and
                    select meats appear when the story asks for them.
                </p>
            </div>
        </main>
    );
}

