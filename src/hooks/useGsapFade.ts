"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type TimelineLike = {
    kill(): void;
    fromTo(
        element: HTMLElement,
        from: { opacity?: number; y?: number },
        to: { opacity?: number; y?: number; duration?: number; ease?: string; clearProps?: string },
    ): void;
} | null;

export function useGsapFade(
    options: { delay?: number; duration?: number; y?: number } = {},
): React.MutableRefObject<HTMLElement | null> {
    const elementRef = useRef<HTMLElement | null>(null);
    const prefersReducedMotion = usePrefersReducedMotion();
    const delay = options.delay ?? 0.1;
    const duration = options.duration ?? 0.6;
    const y = options.y ?? 14;

    useEffect(() => {
        if (prefersReducedMotion || !elementRef.current) {
            return;
        }

        let timeline: TimelineLike | null = null;
        let cancelled = false;

        void import("gsap").then(({ gsap }) => {
            if (cancelled || !elementRef.current) {
                return;
            }

            const instance = gsap.timeline({ delay });
            instance.fromTo(
                elementRef.current,
                { opacity: 0, y },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    ease: "power2.out",
                    clearProps: "all",
                },
            );
            timeline = instance;
        });

        return () => {
            cancelled = true;
            if (timeline) {
                timeline.kill();
            }
        };
    }, [prefersReducedMotion, delay, duration, y]);

    return elementRef;
}
