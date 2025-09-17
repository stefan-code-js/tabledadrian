'use client';

import { AnimatePresence, motion, type Easing } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { ReactNode } from 'react';

const ease: Easing = [0.22, 1, 0.36, 1];

const transition = {
    duration: 0.6,
    ease,
};

export default function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const prefersReducedMotion = usePrefersReducedMotion();

    if (prefersReducedMotion) {
        return <>{children}</>;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                className="page-transition"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={transition}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
