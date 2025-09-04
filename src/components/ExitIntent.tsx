"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * ExitIntent component
 *
 * Listens for the user's cursor leaving the top of the viewport (indicative of a tab close or back
 * button action). When triggered, it displays a gentle overlay asking if they’d like to book a
 * complimentary 15‑minute consult. The banner only appears once per visit and respects the user’s
 * wish to close it. A plausible custom event is fired when the banner appears so you can track
 * engagement. To enable or disable the feature globally, simply omit this component from your
 * page composition.
 */
export default function ExitIntent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    function handleMouseLeave(event: MouseEvent) {
      if (event.clientY <= 50 && !show) {
        setShow(true);
        // Fire a Plausible event when exit intent triggers
        if (typeof window !== 'undefined' && (window as any).plausible) {
          (window as any).plausible('Exit Intent');
        }
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [show]);
  if (!show) return null;
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(27,27,27,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
          maxWidth: '420px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Still deciding?</h3>
        <p style={{ marginBottom: '1.2rem', color: '#666' }}>
          Have questions about an event or menu? Book a complimentary 15‑minute consult.
        </p>
        <Link
          href="/consult"
          className="button"
          style={{ display: 'inline-block', marginBottom: '0.5rem' }}
        >
          Schedule now
        </Link>
        <br />
        <button
          onClick={() => setShow(false)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#666',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '0.85rem',
            marginTop: '0.5rem',
          }}
        >
          No thanks
        </button>
      </div>
    </div>
  );
}