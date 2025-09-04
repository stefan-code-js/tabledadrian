"use client";

import Link from 'next/link';

/**
 * ConsultCTA component
 *
 * Adds a persistent call‑to‑action for a 15‑minute consult to the bottom of articles or pages.
 * This encourages readers to convert while the value of your content is top of mind. A Plausible
 * event is triggered when users click the CTA so you can measure its performance. For example,
 * include this component at the end of each journal post or on pages where visitors may be
 * considering an enquiry.
 */
export default function ConsultCTA() {
  function handleClick() {
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('Consult CTA Click');
    }
  }
  return (
    <div
      style={{
        marginTop: '2rem',
        padding: '1.5rem',
        border: '1px solid #e8e8e8',
        borderRadius: '12px',
        textAlign: 'center',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Curate a longevity supper for your guests</h3>
      <p style={{ color: '#666', margin: '0.8rem 0' }}>
        Let’s design a menu that calms glucose, sharpens mind, and delights.
      </p>
      <Link
        href="/consult"
        className="button"
        onClick={handleClick}
      >
        Book a 15‑min call
      </Link>
    </div>
  );
}