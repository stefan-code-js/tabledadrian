"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { reducedMotion, loadGsap } from "@/lib/motion";

type KineticParagraphProps = {
    children: ReactNode;
    className?: string;
};

export default function KineticParagraph({ children, className }: KineticParagraphProps) {
    const ref = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node || reducedMotion) {
            return;
        }

        void loadGsap().then((gsap) => {
            if (!gsap || !ref.current) {
                return;
            }
            gsap.fromTo(
                node,
                { autoAlpha: 0, y: 12 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: node,
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        });
    }, []);

    return (
        <p ref={ref} className={clsx("kinetic-paragraph", className)}>
            {children}
        </p>
    );
}
