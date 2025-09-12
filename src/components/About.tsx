// src/components/About.tsx
import Link from "next/link";

export default function About() {
    return (
        <section className="section" id="about-teaser" aria-labelledby="about-teaser-title">
            <div className="container container--narrow about-hero">
                <p className="about-kicker reveal" style={{ animationDelay: "60ms" }}>
                    our story
                </p>

                <h2 className="title about-title reveal" id="about-teaser-title" style={{ animationDelay: "140ms" }}>
                    Table d’Adrian
                </h2>

                <p className="lead about-lead reveal" style={{ animationDelay: "220ms" }}>
                    Ingredient-driven cuisine on the Côte d’Azur. Ferments, clarified broths, cultured creams—
                    precision in service of softness. Calm pacing, fragrance-forward plates.
                </p>

                <div className="about-cta reveal" style={{ animationDelay: "300ms" }}>
                    <Link href="/about" className="btn ghost" aria-label="Read the full story about Table d’Adrian">
                        read the story
                    </Link>
                </div>
            </div>
        </section>
    );
}
