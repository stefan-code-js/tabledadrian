"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const DEFAULT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FramerBridge({ pathname, children }: { pathname: string; children: ReactNode }) {
    const prefersReduced = usePrefersReducedMotion();

    const transition: Transition = prefersReduced
        ? { duration: 0 }
        : {
              duration: 0.45,
              ease: DEFAULT_EASE,
          };

    const initial = prefersReduced ? {} : { opacity: 0, y: 12 };
    const animate = prefersReduced ? {} : { opacity: 1, y: 0 };
    const exit = prefersReduced ? {} : { opacity: 0, y: -8 };

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div key={pathname} initial={initial} animate={animate} exit={exit} transition={transition}>
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
