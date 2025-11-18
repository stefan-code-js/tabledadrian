'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      if (headingRef.current) {
        tl.from(headingRef.current.children, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.2,
        });
      }
      
      if (subtitleRef.current) {
        tl.from(subtitleRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
        }, '-=0.4');
      }
      
      if (buttonsRef.current) {
        tl.from(buttonsRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
        }, '-=0.3');
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleServicesClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center bg-bg-primary pt-24 md:pt-32">
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          {/* Main Heading */}
          <h1 ref={headingRef} className="text-4xl sm:text-5xl md:text-6xl font-display text-text-primary mb-6 sm:mb-8 tracking-tight">
            <span className="block">Luxury Private Chef Services</span>
            <span className="block text-accent-primary mt-2">
              Personalized Culinary Excellence
            </span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
            Experience personalized culinary excellence with Table d&apos;Adrian.
            <br className="hidden md:block" />
            Professional private chef for exclusive events, dinner parties, and weekly meal preparation.
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleContactClick}
              className="btn-primary"
              type="button"
            >
              Book Your Private Chef
            </button>
            <button
              onClick={handleServicesClick}
              className="btn-secondary"
              type="button"
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
