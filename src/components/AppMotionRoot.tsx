"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "@studio-freight/lenis";
import { loadGsap, loadLenis } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const FramerBridge = dynamic(() => import("@/components/internal/FramerBridge"), { ssr: false });

export default function AppMotionRoot({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const prefersReduced = usePrefersReducedMotion();
    const lenisRef = useRef<Lenis | null>(null);
    const frameRef = useRef<number | null>(null);
    const detachRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (prefersReduced) {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
            }
            detachRef.current?.();
            detachRef.current = null;
            lenisRef.current?.destroy();
            lenisRef.current = null;
            return;
        }

        let cancelled = false;

        Promise.all([loadLenis(), loadGsap(), import("gsap/ScrollTrigger")])
            .then(([LenisCtor, gsap, { ScrollTrigger }]) => {
                if (!LenisCtor || !gsap || cancelled) {
                    return;
                }

                const lenis = new (LenisCtor as unknown as new (...args: unknown[]) => Lenis)({
                    lerp: 0.12,
                    smoothWheel: true,
                    smoothTouch: false,
                });

                lenisRef.current = lenis;

                const sync = () => ScrollTrigger.update();
                lenis.on("scroll", sync);
                detachRef.current = () => lenis.off("scroll", sync);

                const raf = (time: number) => {
                    lenis.raf(time);
                    frameRef.current = requestAnimationFrame(raf);
                };
                frameRef.current = requestAnimationFrame(raf);
            })
            .catch(() => undefined);

        return () => {
            cancelled = true;
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
            }
            detachRef.current?.();
            detachRef.current = null;
            lenisRef.current?.destroy();
            lenisRef.current = null;
        };
    }, [prefersReduced, pathname]);

    useEffect(() => {
        if (prefersReduced) {
            return;
        }

        let cleanup: Array<() => void> = [];
        let cancelled = false;

        void Promise.all([loadGsap(), import("gsap/ScrollTrigger")]).then(([gsap, { ScrollTrigger }]) => {
            if (!gsap || cancelled) {
                return;
            }

            const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
            const contexts = nodes.map((node) => {
                const intensity = Math.min(Math.max(Number(node.dataset.parallax) || 6, 2), 10);
                const ctx = gsap.context(() => {
                    gsap.fromTo(
                        node,
                        { y: -intensity },
                        {
                            y: intensity,
                            ease: "none",
                            scrollTrigger: {
                                trigger: node,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        },
                    );
                }, node);

                return () => ctx.revert();
            });

            cleanup = contexts;
            ScrollTrigger.refresh();
        });

        return () => {
            cancelled = true;
            cleanup.forEach((dispose) => dispose());
            cleanup = [];
        };
    }, [pathname, prefersReduced]);

    return <FramerBridge pathname={pathname}>{children}</FramerBridge>;
}
