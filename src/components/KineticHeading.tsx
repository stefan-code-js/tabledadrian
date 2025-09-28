"use client";

import { useEffect, useRef } from "react";
import { reducedMotion, loadGsap } from "@/lib/motion";
import { splitIntoLines } from "@/lib/typography";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type KineticHeadingProps = {
    as?: HeadingLevel;
    children: string;
    className?: string;
};

export default function KineticHeading({ as: Component = "h2", children, className }: KineticHeadingProps) {
    const ref = useRef<HTMLHeadingElement | null>(null);
    const accessibleLabel = typeof children === "string" ? children : undefined;

    useEffect(() => {
        const node = ref.current;
        if (!node || reducedMotion) {
            return;
        }

        const { lines, words, cleanup } = splitIntoLines(node);

        void loadGsap().then((gsap) => {
            if (!gsap || !node || words.length === 0) {
                cleanup();
                return;
            }

            const timeline = gsap.timeline({
                defaults: { ease: "power2.out" },
                scrollTrigger: {
                    trigger: node,
                    start: "top 80%",
                    once: true,
                },
            });

            timeline.set(lines, { overflow: "hidden", display: "inline-block" });
            timeline.from(words, {
                y: 12,
                autoAlpha: 0,
                duration: 0.6,
                stagger: { each: 0.12 },
            });
        });

        return () => {
            cleanup();
        };
    }, []);

    const classes = ["kinetic-heading", className].filter(Boolean).join(" ");

    return (
        <Component ref={ref} className={classes} aria-label={accessibleLabel} data-kinetic-text={accessibleLabel}>
            {children}
        </Component>
    );
}
