"use client";

import { useEffect, useState } from 'react';

/**
 * CookieConsent component
 *
 * Shows a small banner requesting consent for analytics cookies. When accepted, it stores
 * a flag in localStorage and dynamically loads the analytics script defined by the
 * `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` environment variables.
 * Without consent the analytics scripts are never loaded. A Plausible event is also fired
 * upon acceptance to measure opt‑in rates.
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const consent = typeof window !== 'undefined' ? localStorage.getItem('cookie-consent') : null;
    if (!consent) setShow(true);
  }, []);
  function accept() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie-consent', 'true');
      setShow(false);
      // Fire Plausible event for analytics consent
      if ((window as any).plausible) {
        (window as any).plausible('Analytics Consent');
      }
      // Load analytics script based on configured environment variables
      const cfToken = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;
      const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
      if (cfToken) {
        const s = document.createElement('script');
        s.defer = true;
        s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
        s.setAttribute('data-cf-beacon', JSON.stringify({ token: cfToken }));
        document.head.appendChild(s);
      }
      if (plausibleDomain) {
        const s = document.createElement('script');
        s.defer = true;
        s.dataset.domain = plausibleDomain;
        s.src = 'https://plausible.io/js/script.js';
        document.head.appendChild(s);
      }
    }
  }
  if (!show) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#f9f9f9',
        borderTop: '1px solid #e8e8e8',
        padding: '1rem',
        zIndex: 10000,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
        We use anonymous analytics to understand how our site is used. Do you accept?
      </span>
      <button
        onClick={accept}
        className="button"
        style={{ fontSize: '0.9rem', padding: '0.4rem 0.9rem' }}
      >
        Accept
      </button>
    </div>
  );
}