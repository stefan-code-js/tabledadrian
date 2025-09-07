'use client';

import { motion, type Variants, type Easing } from 'framer-motion';

const EASE: Easing = [0.16, 1, 0.3, 1];
const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function About() {
    return (
        <section className="section" aria-label="About Table d’Adrian">
            <div className="container container--narrow">
                <motion.div className="prose center-text" initial="hidden" animate="show" variants={parent}>
                    <motion.h1 className="title" variants={fadeUp}>About</motion.h1>
                    <motion.p className="lead" variants={fadeUp}>
                        Michelin-level, ingredient-driven cuisine. Nature-rooted storytelling. Ritual, aroma, and texture at the center.                    </motion.p>
                </motion.div>

                <motion.div className="pillars" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={parent}>
                    <motion.article className="card" variants={fadeUp}>
                        <h3>philosophy</h3>
                        Ingredient as narrative: forest, stone, and sea expressed through broth, flame, smoke, and bright acidity.                    </motion.article>

                    <motion.article className="card" variants={fadeUp}>
                        <h3>technique</h3>
                        <p>Ferments, clarified consommés, dry-aging, cultured creams, slow reductions; precision balanced with softness.
                        </p>
                    </motion.article>

                    <motion.article className="card" variants={fadeUp}>
                        <h3>provenance</h3>
                        <p>Foraged herbs, small farms, Riviera orchards. Ceramics and linens by local artisans; glass by flame.</p>
                    </motion.article>
                </motion.div>

                <motion.div className="stats" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={parent}>
                    <motion.div className="stat card" variants={fadeUp}>
                        <div className="num">12–16</div>
                        <div className="note">courses, seasonally</div>
                    </motion.div>
                    <motion.div className="stat card" variants={fadeUp}>
                        <div className="num">seasonal</div>
                        <div className="note">seafood & select meats available</div>
                    </motion.div>
                    <motion.div className="stat card" variants={fadeUp}>
                        <div className="num">1</div>
                        <div className="note">table — yours</div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
