"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

/**
 * Success page displayed after a form submission. Uses GSAP to fade and slide
 * the thank you message into view. Provides a clear call to action to return
 * to the home page. This route lives at /success and is referenced by the
 * contact component. Because of the use client directive, it will run in
 * the browser.
 */
export default function SuccessPage() {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }, []);
  return (
    <div style={{ paddingTop: '96px' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 ref={ref}>Thank you – your request has been received.</h1>
        <p className="sub">
          I will get back to you within 24 hours with details. In the meantime,
          feel free to explore the site.
        </p>
        <div style={{ marginTop: 32 }}>
          <Link href="/" className="button">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}