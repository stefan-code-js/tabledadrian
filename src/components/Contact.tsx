"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Contact section includes a custom booking form. When submitted, it sends an
 * email via the API route /api/contact. A honeypot field discourages bots. After
 * submission, status feedback is displayed. Errors are quietly handled.
 */
export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form) as any);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Send failed');
      setStatus('sent');
      form.reset();
      // Track plausible event for contact submission
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('Inquiry Submitted');
      }
      // Redirect to success page after a brief delay to show thank you message
      setTimeout(() => {
        router.push('/success');
      }, 300);
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <h2>Reserve your experience</h2>
        <p className="sub">Tell me a few details and I’ll reply within 24 hours.</p>

        <form onSubmit={submit} className="card" style={{ maxWidth: 720 }}>
          <div
            style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}
          >
            <label>
              Full name
              <br />
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <br />
              <input name="email" type="email" required placeholder="you@example.com" />
            </label>
          </div>

          <div
            style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr', marginTop: 12 }}
          >
            <label>
              Event date
              <br />
              <input name="date" type="date" required />
            </label>
            <label>
              Location
              <br />
              <input
                name="location"
                required
                placeholder="Antibes, Cannes, Monaco…"
              />
            </label>
          </div>

          <div
            style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr', marginTop: 12 }}
          >
            <label>
              Guests
              <br />
              <input
                name="guests"
                type="number"
                min={2}
                max={30}
                required
                placeholder="8"
              />
            </label>
            <label>
              Budget band
              <br />
              <select name="budget" required>
                <option value="120-180">€120–180 per guest</option>
                <option value="180-250">€180–250 per guest</option>
                <option value="250+">€250+ per guest</option>
              </select>
            </label>
          </div>

          <label style={{ display: 'block', marginTop: 12 }}>
            Dietary notes
            <br />
            <textarea
              name="diet"
              rows={4}
              placeholder="allergies, preferences, tone of the evening…"
            ></textarea>
          </label>

          {/* Honeypot anti-spam: hidden to humans */}
          <input
            type="text"
            name="company"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Turnstile widget for bot protection. Only rendered when a site key is present */}
          {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              data-callback="onContactTurnstile"
              style={{ marginTop: '0.5rem' }}
            />
          )}

          <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
            <button
              className="button"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send request'}
            </button>
            {status === 'sent' && <span>Thanks — I’ll reply soon.</span>}
            {status === 'error' && (
              <span style={{ color: 'crimson' }}>Couldn’t send. Try again.</span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}