'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type MotionModule = typeof import('framer-motion');

export type MotionApi = MotionModule['motion'] | null;

/**
 * Dynamically loads Framer Motion only when the user has not requested
 * reduced motion. Components can branch on the returned `motion` factory
 * and render static markup on the first paint to avoid hydration drift.
 */
export function useEditorialMotion(): MotionApi {
    const [motion, setMotion] = useState<MotionApi>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            setMotion(null);
            return;
        }

        let mounted = true;
        import('framer-motion').then((mod) => {
            if (!mounted) {
                return;
            }
            setMotion(mod.motion);
        });

        return () => {
            mounted = false;
        };
    }, [prefersReducedMotion]);

    return motion;
}

