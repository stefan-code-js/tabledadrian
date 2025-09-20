"use client";

import { useEffect, useMemo, useRef } from "react";
import { loadGsap, reducedMotion } from "@/lib/motion";

type KeywordHighlighterProps = {
    text: string;
    keywords: readonly string[];
    variant?: "forest" | "bronze" | "oxblood";
    className?: string;
};

type Segment = { text: string; highlighted: boolean };

export default function KeywordHighlighter({ text, keywords, variant = "forest", className }: KeywordHighlighterProps) {
    const ref = useRef<HTMLSpanElement | null>(null);

    const normalizedKeywords = useMemo(() => Array.from(new Set(keywords.map((kw) => kw.toLowerCase()))), [keywords]);

    const segments = useMemo<Segment[]>(() => {
        if (normalizedKeywords.length === 0) {
            return [{ text, highlighted: false }];
        }
        const pattern = new RegExp(`(${normalizedKeywords.map((kw) => kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
        const parts: Segment[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(text)) !== null) {
            const matchStart = match.index;
            const matchEnd = pattern.lastIndex;
            if (matchStart > lastIndex) {
                parts.push({ text: text.slice(lastIndex, matchStart), highlighted: false });
            }
            parts.push({ text: text.slice(matchStart, matchEnd), highlighted: true });
            lastIndex = matchEnd;
        }
        if (lastIndex < text.length) {
            parts.push({ text: text.slice(lastIndex), highlighted: false });
        }
        return parts.length ? parts : [{ text, highlighted: false }];
    }, [text, normalizedKeywords]);

    useEffect(() => {
        if (reducedMotion) {
            return;
        }
        const node = ref.current;
        if (!node) {
            return;
        }

        const targets = node.querySelectorAll<HTMLElement>(".keyword-accent");
        if (targets.length === 0) {
            return;
        }

        void loadGsap().then((gsap) => {
            if (!gsap) {
                return;
            }
            gsap.fromTo(
                targets,
                { y: 2, color: "var(--color-ink-muted)" },
                {
                    y: 0,
                    color: `var(--color-${variant})`,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: node,
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        });
    }, [variant]);

    const classes = ["keyword-highlighter", `accent--${variant}`, className].filter(Boolean).join(" ");

    return (
        <span ref={ref} className={classes}>
            {segments.map((segment, index) =>
                segment.highlighted ? (
                    <em key={index} className="keyword-accent">
                        {segment.text}
                    </em>
                ) : (
                    <span key={index}>{segment.text}</span>
                )
            )}
        </span>
    );
}
