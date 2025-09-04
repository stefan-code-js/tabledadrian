"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

/**
 * Hero displays the main tagline and two primary calls-to-action. A subtle fade-in
 * animation introduces the heading on mount. Section uses center alignment to
 * focus the visitor on your mission.
 */
export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, []);
  return (
    <section className="section" id="home" style={{ paddingTop: 96 }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 ref={headingRef}>
          Michelin‑trained private chef — plant‑based haute cuisine on the Côte d’Azur
        </h1>
        <p className="sub">
          Quiet luxury. Multi‑sensory ritual. Designed for calm and clarity.
        </p>
        <div
          style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="#contact" className="button">
            Request a dinner
          </Link>
          <Link href="#membership" className="button ghost">
            Membership
          </Link>
        </div>
      </div>
    </section>
  );
}