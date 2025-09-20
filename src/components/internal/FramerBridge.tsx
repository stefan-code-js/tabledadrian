"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function FramerBridge({ pathname, children }: { pathname: string; children: ReactNode }) {
    const prefersReduced = usePrefersReducedMotion();

    const transition = prefersReduced
        ? { duration: 0 }
        : {
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
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
