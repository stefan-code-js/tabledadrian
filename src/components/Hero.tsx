'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants, type Easing } from 'framer-motion';

const EASE: Easing = [0.16, 1, 0.3, 1]; // cubic-bezier easeOut

const parent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: EASE },
    },
};

export default function Hero() {
    return (
        <section className="hero container" aria-label="Introduction">
            <motion.div className="hero-copy" variants={parent} initial="hidden" animate="show">
                <motion.p className="kicker" variants={fadeUp}>atelier gastronomy · côte d’azur</motion.p>
                <motion.h1 className="title" variants={fadeUp}>Table d’Adrian</motion.h1>
                <motion.p className="lead" variants={fadeUp}>
                    Private table, wellness systems, and salon atmospheres crafted with pharmacist precision and chef poetry.
                </motion.p>
                <motion.div className="cta" variants={fadeUp}>
                    <Link href="/book" className="btn primary">reserve a season</Link>
                    <Link href="/menu" className="btn ghost">view experiences</Link>
                </motion.div>
            </motion.div>

            <motion.figure
                className="hero-media"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
            >
                <Image
                    src="/hero-art.svg"
                    alt="Atmospheric gradient artwork evoking candlelight on the Riviera."
                    fill
                    sizes="(max-width: 900px) 100vw, 900px"
                    priority
                />
            </motion.figure>
        </section>
    );
}
