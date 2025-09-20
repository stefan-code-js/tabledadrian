"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

// A highly animated, yet accessible, luxury home experience
// No third-party animation libs; CSS + IntersectionObserver only

function useRevealOnScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return; // Respect user preference

    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window) || els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function HomeLuxury() {
  useRevealOnScroll();
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Simple parallax effect for hero decoration
  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const deco = node.querySelector(".hero-deco") as HTMLElement | null;
    if (!deco) return;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const tx = x * 20;
      const ty = y * 12;
      deco.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };
    node.addEventListener("mousemove", onMove);
    return () => node.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="lux-hero" aria-label="Prologue">
        <div className="hero-bg" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-deco" aria-hidden="true" />

        <div className="editorial-container hero-inner">
          <p className="eyebrow reveal">Côte d’Azur · Private Table</p>
          <h1 className="display reveal">
            Table d’Adrian
            <span className="display-sub">An evening told in chapters</span>
          </h1>
          <p className="lede reveal">
            A seasonal journey for private clients — 
            intimate, choreographed, and quietly unforgettable.
          </p>
          <div className="hero-ctas reveal">
            <Link prefetch className="btn btn-primary" href="/book">
              Reserve a table
            </Link>
            <a className="btn btn-ghost" href="#prologue">
              Begin the story
            </a>
          </div>
        </div>

        <div className="hero-marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>Seasonal · Intimate · Bespoke · Riviera · </span>
            <span>Seasonal · Intimate · Bespoke · Riviera · </span>
            <span>Seasonal · Intimate · Bespoke · Riviera · </span>
          </div>
        </div>
      </section>

      {/* PROLOGUE */}
      <section id="prologue" className="lux-section">
        <div className="editorial-container two-col">
          <div className="col-text">
            <h2 className="section-title reveal">Prologue</h2>
            <p className="section-copy reveal">
              The evening opens softly — linen, glass, coastline light. Courses
              move like chapters, paced to conversation. Provençal gardens
              inform a menu that is elegant, restrained, and exacting.
            </p>
            <div className="inline-cta reveal">
              <a className="text-link" href="#atelier">Continue · Atelier</a>
            </div>
          </div>
          <div className="col-media reveal">
            <div className="frame">
              <Image
                src="/placeholder/hero-consult.svg"
                alt="Soft daylight across a linen-covered table set with ceramics and herbs."
                fill
                priority
                sizes="(max-width: 900px) 90vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ATELIER */}
      <section id="atelier" className="lux-section alt">
        <div className="editorial-container two-col">
          <div className="col-media reveal">
            <div className="frame tall">
              <Image
                src="/placeholder/portrait-claire.svg"
                alt="Chef at work in a calm kitchen."
                fill
                sizes="(max-width: 900px) 90vw, 40vw"
              />
            </div>
          </div>
          <div className="col-text">
            <h2 className="section-title reveal">Atelier</h2>
            <p className="section-copy reveal">
              Technique stays hidden, service remains quiet. We design each
              course to feel inevitable — perfect temperature, perfect weight,
              nothing left to chance, every gesture considered.
            </p>
            <div className="inline-cta reveal">
              <a className="text-link" href="#table">Continue · The Table</a>
            </div>
          </div>
        </div>
      </section>

      {/* THE TABLE */}
      <section id="table" className="lux-section">
        <div className="editorial-container two-col">
          <div className="col-text">
            <h2 className="section-title reveal">The Table</h2>
            <p className="section-copy reveal">
              Seating for those who value discretion and excellence. A tasting
              that honors the Riviera and your story — whites that stay cold,
              sauces that stay warm, and a cadence that allows time.
            </p>
            <div className="inline-cta reveal">
              <a className="text-link" href="#salon">Continue · Salon</a>
            </div>
          </div>
          <div className="col-media reveal">
            <div className="frame">
              <Image
                src="/placeholder/section-home-values.svg"
                alt="Close view of plated seasonal vegetables with herbs."
                fill
                sizes="(max-width: 900px) 90vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SALON */}
      <section id="salon" className="lux-section alt">
        <div className="editorial-container two-col">
          <div className="col-media reveal">
            <div className="frame">
              <Image
                src="/placeholder/section-home-testimonials.svg"
                alt="Guests gathered around a candlelit table."
                fill
                sizes="(max-width: 900px) 90vw, 40vw"
              />
            </div>
          </div>
          <div className="col-text">
            <h2 className="section-title reveal">Salon</h2>
            <p className="section-copy reveal">
              After dinner extends into conversation, music, and a quieter
              hour. We host with attention to lighting and pace — you decide
              how the night concludes.
            </p>
            <div className="inline-cta reveal">
              <a className="text-link" href="#reserve">Continue · Reservations</a>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVATIONS */}
      <section id="reserve" className="lux-reserve">
        <div className="editorial-container">
          <h2 className="display reveal">Reserve your evening</h2>
          <p className="lede reveal">
            Private clients by request. Same‑day replies and discreet
            coordination.
          </p>
          <div className="hero-ctas reveal">
            <Link prefetch className="btn btn-primary" href="/book">
              Book now
            </Link>
            <Link prefetch className="btn btn-ghost" href="/contact">
              Speak with us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
