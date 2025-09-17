// src/components/About.tsx
import Link from "next/link";
import { motion } from "framer-motion";
import KineticText from "@/components/KineticText";

export default function About() {
    return (
        <section className="section about-teaser" id="about-teaser" aria-labelledby="about-teaser-title">
            <div className="container container--narrow about-teaser__inner">
                <motion.p
                    className="kicker"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    our story
                </motion.p>

                <KineticText as="h2" text="Table d’Adrian" className="about-teaser__title" id="about-teaser-title" />

                <motion.p
                    className="lead about-teaser__lead"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    Ingredient-driven cuisine on the Côte d’Azur. Ferments, clarified broths, cultured creams—precision in
                    service of softness. Calm pacing, fragrance-forward plates.
                </motion.p>

                <motion.div
                    className="about-teaser__cta"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Link href="/about" className="btn btn--ghost" aria-label="Read the full story about Table d’Adrian">
                        read the story
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
