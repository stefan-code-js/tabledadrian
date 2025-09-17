'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { useEditorialMotion } from '@/hooks/useEditorialMotion';
import { useGsapFade } from '@/hooks/useGsapFade';

const heroCopy = {
    kicker: 'private chef · côte d’azur',
    title: 'Table d’Adrian',
    lead: 'Seasonal tasting menus for private villas, yachts, and salons along the Côte d’Azur.',
    primaryCta: { href: '/contact', label: 'request a booking' },
    secondaryCta: { href: '/membership', label: 'explore membership' },
};

export default function Hero() {
    const motion = useEditorialMotion();
    const figureRef = useGsapFade({ delay: 0.2, y: 22 });

    const MotionDiv = useMemo(() => motion?.div ?? null, [motion]);
    const MotionParagraph = useMemo(() => motion?.p ?? null, [motion]);
    const MotionHeading = useMemo(() => motion?.h1 ?? null, [motion]);

    return (
        <section className="hero container" aria-label="Introduction">
            {MotionDiv && MotionParagraph && MotionHeading ? (
                <MotionDiv
                    className="hero-copy"
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
                >
                    <MotionParagraph
                        className="kicker"
                        variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
                    >
                        {heroCopy.kicker}
                    </MotionParagraph>
                    <MotionHeading
                        className="title"
                        variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
                    >
                        {heroCopy.title}
                    </MotionHeading>
                    <MotionParagraph
                        className="lead"
                        variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
                    >
                        {heroCopy.lead}
                    </MotionParagraph>
                    <MotionDiv
                        className="cta"
                        variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                    >
                        <Link href={heroCopy.primaryCta.href} className="btn primary">
                            {heroCopy.primaryCta.label}
                        </Link>
                        <Link href={heroCopy.secondaryCta.href} className="btn">
                            {heroCopy.secondaryCta.label}
                        </Link>
                    </MotionDiv>
                </MotionDiv>
            ) : (
                <div className="hero-copy">
                    <p className="kicker">{heroCopy.kicker}</p>
                    <h1 className="title">{heroCopy.title}</h1>
                    <p className="lead">{heroCopy.lead}</p>
                    <div className="cta">
                        <Link href={heroCopy.primaryCta.href} className="btn primary">
                            {heroCopy.primaryCta.label}
                        </Link>
                        <Link href={heroCopy.secondaryCta.href} className="btn">
                            {heroCopy.secondaryCta.label}
                        </Link>
                    </div>
                </div>
            )}

            <figure
                className="hero-media"
                ref={(node) => {
                    figureRef.current = node;
                }}
            >
                <Image
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?fm=webp&w=2000&h=1334&fit=crop&q=85"
                    alt="Ivory table with herbs, candlelight, and hand-thrown ceramics."
                    fill
                    sizes="(max-width: 900px) 100vw, 900px"
                    priority
                    className="hero-media__image"
                />
            </figure>
        </section>
    );
}
