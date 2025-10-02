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

    const classes = ["testimonial-carousel", className].filter(Boolean).join(" ");

    return (
        <section className={classes} aria-label="Guest testimonials">
            <div className="testimonial-carousel__viewport">
                <AnimatePresence initial={false}>
                    <motion.figure
                        key={index}
                        className="testimonial-carousel__slide"
                        initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
                        transition={{ duration: 0.45, ease: [0.19, 0.74, 0.31, 1] }}
                    >
                        <blockquote>
                            <p>{current.quote}</p>
                        </blockquote>
                        <figcaption>
                            <span className="testimonial-carousel__name">{current.name}</span>
                            {current.role ? (
                                <span className="testimonial-carousel__role">{current.role}</span>
                            ) : null}
                        </figcaption>
                    </motion.figure>
                </AnimatePresence>
            </div>
            {items.length > 1 ? (
                <div className="testimonial-carousel__controls">
                    <button
                        type="button"
                        onClick={() => setIndex((prev) => (prev - 1 + items.length) % items.length)}
                        aria-label="Previous testimonial"
                    >
                        ‹
                    </button>
                    <span className="testimonial-carousel__index">
                        {index + 1} / {items.length}
                    </span>
                    <button
                        type="button"
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

