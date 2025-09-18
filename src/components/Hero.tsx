"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useEditorialMotion } from "@/hooks/useEditorialMotion";
import { useGsapFade } from "@/hooks/useGsapFade";

const heroContent = {
    title: "Table d’Adrian",
    description:
        "Seasonal tasting menus with pharmacist-designed wellness systems. Villas, yachts, and salons along the Côte d’Azur.",
    primary: { href: "/contact", label: "request a booking" },
    secondary: { href: "/membership", label: "explore membership" },
    image: {
        src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?fm=webp&w=2400&h=1600&fit=crop&q=85",
        alt: "Ivory table dressed with stoneware, herbs, and candlelight awaiting guests.",
    },
};

export default function Hero() {
    const motion = useEditorialMotion();
    const figureRef = useGsapFade({ delay: 0.18, y: 24 });

    const MotionDiv = useMemo(() => motion?.div ?? null, [motion]);
    const MotionHeading = useMemo(() => motion?.h1 ?? null, [motion]);
    const MotionParagraph = useMemo(() => motion?.p ?? null, [motion]);

    return (
        <section className="editorial-hero" aria-label="Introduction">
            <figure
                className="full-bleed hero-figure"
                ref={(node) => {
                    figureRef.current = node;
                }}
            >
                <Image
                    src={heroContent.image.src}
                    alt={heroContent.image.alt}
                    fill
                    priority
                    sizes="100vw"
                    className="hero-figure__image"
                />
            </figure>
            <div className="editorial-container hero-copy">
                {MotionDiv && MotionHeading && MotionParagraph ? (
                    <MotionDiv
                        initial="hidden"
                        animate="visible"
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                    >
                        <MotionHeading
                            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                        >
                            {heroContent.title}
                        </MotionHeading>
                        <MotionParagraph
                            className="lead"
                            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                        >
                            {heroContent.description}
                        </MotionParagraph>
                        <MotionDiv
                            className="cta-row"
                            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
                        >
                            <Link className="btn" href={heroContent.primary.href}>
                                {heroContent.primary.label}
                            </Link>
                            <Link className="btn ghost" href={heroContent.secondary.href}>
                                {heroContent.secondary.label}
                            </Link>
                        </MotionDiv>
                    </MotionDiv>
                ) : (
                    <>
                        <h1>{heroContent.title}</h1>
                        <p className="lead">{heroContent.description}</p>
                        <div className="cta-row">
                            <Link className="btn" href={heroContent.primary.href}>
                                {heroContent.primary.label}
                            </Link>
                            <Link className="btn ghost" href={heroContent.secondary.href}>
                                {heroContent.secondary.label}
                            </Link>
                        </div>
                    </>
                )}
            </div>
            <hr className="separator" />
        </section>
    );
}
