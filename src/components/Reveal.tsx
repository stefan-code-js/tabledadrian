"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once to avoid duplicates in strict mode.
if (typeof window !== 'undefined' && gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reveal wraps its children and animates them into view when scrolling into the viewport.
 * It uses GSAP + ScrollTrigger. Elements are initially hidden via CSS (.reveal class)
 * and when triggered, GSAP will animate opacity and y position to reveal them.
 */
export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    );
  }, []);
  return <div ref={ref} className="reveal">{children}</div>;
}