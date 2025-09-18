"use client";

import { useEffect, useState } from "react";

/**
 * Lightweight hook to respect the user's reduced-motion preference without
 * touching any animation libraries until we need them. The preference is
 * memoised in state so components can branch instantly on the client.
 */
export function usePrefersReducedMotion(): boolean {
    const [prefersReduced, setPrefersReduced] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) {
            return;
        }

        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setPrefersReduced(media.matches);

        update();
        media.addEventListener("change", update);

        return () => media.removeEventListener("change", update);
    }, []);

    return prefersReduced;
}
