"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { reducedMotion } from "@/lib/motion";

export type Testimonial = {
    quote: string;
    name: string;
    role?: string;
};

type TestimonialCarouselProps = {
    testimonials: Testimonial[];
    intervalMs?: number;
    className?: string;
};

export default function TestimonialCarousel({ testimonials, intervalMs = 7000, className }: TestimonialCarouselProps) {
    const items = useMemo(() => testimonials.filter((item) => item.quote), [testimonials]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (reducedMotion || items.length <= 1) {
            return;
        }
        const timer = window.setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, intervalMs);
        return () => window.clearInterval(timer);
    }, [items, intervalMs]);

    if (items.length === 0) {
        return null;
    }

    const current = items[index];

    const classes = ["grid gap-space-3 bg-ink/5 p-space-4 rounded-lg", className].filter(Boolean).join(" ");

    return (
        <section className={classes} aria-label="Guest testimonials">
            <div className="relative min-h-[220px]">
                <AnimatePresence mode="wait">
                    <motion.figure
                        key={index}
                        className="absolute inset-0 grid place-content-center text-center p-space-3"
                        initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
                        transition={{ duration: 0.45, ease: [0.19, 0.74, 0.31, 1] }}
                    >
                        <blockquote className="mb-space-3">
                            <p className="font-serif text-fluid-2xl leading-snug">{current.quote}</p>
                        </blockquote>
                        <figcaption>
                            <span className="block tracking-widest uppercase text-sm">{current.name}</span>
                            {current.role ? (
                                <span className="block text-xs tracking-wider uppercase text-ink-muted">{current.role}</span>
                            ) : null}
                        </figcaption>
                    </motion.figure>
                </AnimatePresence>
            </div>
            {items.length > 1 ? (
                <div className="flex justify-center items-center gap-space-2">
                    <button
                        type="button"
                        className="bg-transparent text-ink text-sm tracking-widest uppercase p-2 hover:text-forest focus-visible:outline-none focus-visible:text-forest"
                        onClick={() => setIndex((prev) => (prev - 1 + items.length) % items.length)}
                        aria-label="Previous testimonial"
                    >
                        ‹
                    </button>
                    <span className="text-xs tracking-widest uppercase text-ink-muted">
                        {index + 1} / {items.length}
                    </span>
                    <button
                        type="button"
                        className="bg-transparent text-ink text-sm tracking-widest uppercase p-2 hover:text-forest focus-visible:outline-none focus-visible:text-forest"
                        onClick={() => setIndex((prev) => (prev + 1) % items.length)}
                        aria-label="Next testimonial"
                    >
                        ›
                    </button>
                </div>
            ) : null}
        </section>
    );
}