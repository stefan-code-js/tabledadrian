'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import KineticText from '@/components/KineticText';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Hero() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [gsapActive, setGsapActive] = useState(false);
    const scope = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: scope,
        offset: ['start start', 'end start'],
    });

    const translateY = useTransform(scrollYProgress, [0, 1], [0, -120]);

    useEffect(() => {
        if (prefersReducedMotion) return;
        if (typeof window === 'undefined') return;
        const { gsap, ScrollTrigger } = window as typeof window & {
            gsap?: any;
            ScrollTrigger?: any;
        };

        if (!gsap || !scope.current) return;
        if (ScrollTrigger && typeof gsap.registerPlugin === 'function') {
            try {
                gsap.registerPlugin(ScrollTrigger);
            } catch {
                // ignore if already registered
            }
        }

        setGsapActive((prev) => (prev ? prev : true));

        const context = typeof gsap.context === 'function'
            ? gsap.context(() => {
                  gsap.fromTo(
                      '.hero__copy .gsap-fade',
                      { opacity: 0, y: 28 },
                      {
                          opacity: 1,
                          y: 0,
                          duration: 1,
                          ease: 'power3.out',
                          stagger: 0.12,
                      },
                  );

                  if (ScrollTrigger) {
                      ScrollTrigger.create({
                          trigger: scope.current,
                          start: 'top bottom',
                          end: 'bottom top',
                          scrub: true,
                          animation: gsap.to('.hero__media', { yPercent: -12, ease: 'none' }),
                      });
                  }
              }, scope)
            : null;

        return () => {
            if (context && typeof context.revert === 'function') context.revert();
        };
    }, [prefersReducedMotion]);

    const shouldUseFramer = !gsapActive && !prefersReducedMotion;

    return (
        <section className="hero" aria-label="Introduction">
            <div className="container hero__inner" ref={scope}>
                <div className="hero__copy">
                    <motion.p
                        className="kicker hero__kicker gsap-fade"
                        {...(shouldUseFramer
                            ? {
                                  initial: { opacity: 0, y: 18 },
                                  animate: { opacity: 1, y: 0 },
                                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                              }
                            : { initial: false })}
                    >
                        atelier gastronomy · côte d’azur
                    </motion.p>
                    <KineticText as="h1" text="Table d’Adrian" className="hero__title" />
                    <motion.p
                        className="lead hero__lead gsap-fade"
                        {...(shouldUseFramer
                            ? {
                                  initial: { opacity: 0, y: 24 },
                                  animate: { opacity: 1, y: 0 },
                                  transition: { delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                              }
                            : { initial: false })}
                    >
                        Private table, wellness systems, and salon atmospheres crafted with pharmacist precision and chef poetry.
                    </motion.p>
                    <motion.div
                        className="hero__actions gsap-fade"
                        {...(shouldUseFramer
                            ? {
                                  initial: { opacity: 0, y: 24 },
                                  animate: { opacity: 1, y: 0 },
                                  transition: { delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                              }
                            : { initial: false })}
                    >
                        <Link href="/book" className="btn btn--primary">
                            reserve a season
                        </Link>
                        <Link href="/menu" className="btn btn--ghost">
                            view experiences
                        </Link>
                    </motion.div>
                </div>

                <motion.figure
                    className="hero__media"
                    style={prefersReducedMotion || gsapActive ? undefined : { y: translateY }}
                    initial={shouldUseFramer ? { opacity: 0 } : {}}
                    animate={shouldUseFramer ? { opacity: 1 } : undefined}
                    transition={shouldUseFramer ? { delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] } : undefined}
                >
                    <span aria-hidden className="hero__glow hero__glow--amber" />
                    <span aria-hidden className="hero__glow hero__glow--iris" />
                    <Image
                        src="/hero-art.svg"
                        alt="Atmospheric gradient artwork evoking candlelight on the Riviera."
                        fill
                        sizes="(max-width: 900px) 100vw, 900px"
                        priority
                    />
                </motion.figure>
            </div>
        </section>
    );
}
