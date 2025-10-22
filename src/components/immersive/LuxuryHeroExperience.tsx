"use client";

import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function FallbackAura() {
    return (
        <div className="immersive-hero__fallback">
            <span>Table d&apos;Adrian</span>
        </div>
    );
}

export default function LuxuryHeroExperience() {
    const prefersReduced = usePrefersReducedMotion();
    const splineEmbed = useMemo(() => process.env.NEXT_PUBLIC_SPLINE_EMBED_URL ?? process.env.NEXT_PUBLIC_SPLINE_SCENE_URL, []);

    if (prefersReduced || !splineEmbed) {
        return (
            <div className="immersive-hero" aria-hidden>
                <FallbackAura />
            </div>
        );
    }

    return (
        <div className="immersive-hero" aria-hidden>
            <iframe
                title="Spline experience"
                src={splineEmbed}
                className="immersive-hero__canvas"
                allow="autoplay; fullscreen"
                loading="lazy"
            />
        </div>
    );
}
