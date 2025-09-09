'use client';

export default function About() {
    return (
        <section className="section" aria-label="About Table d’Adrian">
            <div className="container">
                <div className="prose center-text">
                    <h1 className="title">About</h1>
                    <p className="lead">
                        Michelin-level, ingredient-driven cuisine. Nature-rooted storytelling.
                        Ritual, aroma, and texture at the center.
                    </p>
                </div>

                {/* Pillars — same card language as Menus; perfectly centered and responsive */}
                <div className="grid-2" style={{ marginTop: 24 }}>
                    <article className="card">
                        <h3>philosophy</h3>
                        <p>
                            Ingredient as narrative: forest, stone, and sea expressed through broth, flame, smoke, and bright acidity.
                        </p>
                    </article>

                    <article className="card">
                        <h3>technique</h3>
                        <p>
                            Ferments, clarified consommés, dry-aging, cultured creams, and slow reductions —
                            precision balanced with softness.
                        </p>
                    </article>

                    <article className="card">
                        <h3>provenance</h3>
                        <p>
                            Riviera orchards, small boats, and foraged herbs. Ceramics and linens by local artisans; glass by flame.
                        </p>
                    </article>

                    <article className="card">
                        <h3>service</h3>
                        <p>
                            Quiet choreography. Pacing that breathes. Tableside rituals that heighten aroma and texture without theatre.
                        </p>
                    </article>
                </div>

                {/* Stats */}
                <div className="grid-3 stats" style={{ marginTop: 20 }}>
                    <div className="card stat">
                        <div className="num">12–16</div>
                        <div className="note">courses, seasonally</div>
                    </div>
                    <div className="card stat">
                        <div className="num">seasonal</div>
                        <div className="note">seafood & select meats available</div>
                    </div>
                    <div className="card stat">
                        <div className="num">1</div>
                        <div className="note">table — yours</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
