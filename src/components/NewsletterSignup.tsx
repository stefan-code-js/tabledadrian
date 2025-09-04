"use client";

import { useState } from 'react';

/**
 * NewsletterSignup component
 *
 * Collects an email address for your journal/newsletter. It posts to `/api/newsletter` and
 * displays a thank‑you message upon success. A Plausible event is triggered to track
 * newsletter signups. To change providers, adjust the `/api/newsletter` route.
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setEmail('');
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('Newsletter Join');
      }
    } catch (err) {
      setStatus('error');
    }
  }
  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.9rem' }}>
        Receive journal essays &amp; pop‑up invites
      </label>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          style={{ flex: 1, padding: '0.6rem 0.8rem', border: '1px solid #ccc', borderRadius: '8px' }}
        />
        <button
          type="submit"
          className="button"
          disabled={status === 'sending'}
          style={{ whiteSpace: 'nowrap' }}
        >
          {status === 'sending' ? 'Sending…' : 'Join'}
        </button>
      </div>
      {status === 'sent' && <small style={{ color: '#666' }}>Thanks! Check your inbox for a welcome note.</small>}
      {status === 'error' && <small style={{ color: 'crimson' }}>Couldn’t subscribe. Try again.</small>}
    </form>
  );
}