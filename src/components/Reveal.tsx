"use client";

import React, { useEffect, useRef } from "react";

type RevealProps = {
  as?: keyof HTMLElementTagNameMap | React.ElementType;
  className?: string;
  children?: React.ReactNode;
  threshold?: number;
};

export default function Reveal({ as = "div", className = "", children, threshold = 0.15 }: RevealProps) {
  const RefTag = as as any;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;

    // Add base class if not present
    if (!el.classList.contains("reveal")) {
      el.classList.add("reveal");
    }

    // If user prefers reduced motion, show immediately
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { root: null, rootMargin: "0px", threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <RefTag ref={ref} className={className}>
      {children}
    </RefTag>
  );
}
