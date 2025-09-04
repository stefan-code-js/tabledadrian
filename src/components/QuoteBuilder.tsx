"use client";

import { useState } from 'react';

interface QuoteData {
  date: string;
  guests: string;
  mood: string;
  budget: string;
  name: string;
  email: string;
  location: string;
  diet: string;
  referral?: string;
}

/**
 * QuoteBuilder component
 *
 * A multi‑step form that guides prospective clients through selecting a date, guest count,
 * mood and budget before entering their personal details. It’s more engaging than a
 * single form and can reduce abandonment. At each step a Plausible event is fired to
 * measure funnel progression. On submission it posts to `/api/contact` with a flag
 * identifying it as a quote request. The UI gracefully handles loading and error
 * states. Turnstile integration (if enabled) happens at the final step.
 */
export default function QuoteBuilder() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteData>({
    date: '',
    guests: '',
    mood: '',
    budget: '',
    name: '',
    email: '',
    location: '',
    diet: '',
    referral: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const steps = [
    {
      label: 'Date',
      component: (
        <label style={{ display: 'block' }}>
          Choose your desired date
          <input
            type="date"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            required
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '8px' }}
          />
        </label>
      ),
    },
    {
      label: 'Guests',
      component: (
        <label style={{ display: 'block' }}>
          Number of guests
          <input
            type="number"
            min={2}
            max={30}
            value={data.guests}
            onChange={(e) => setData({ ...data, guests: e.target.value })}
            required
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '8px' }}
          />
        </label>
      ),
    },
    {
      label: 'Mood',
      component: (
        <label style={{ display: 'block' }}>
          What’s the mood?
          <select
            value={data.mood}
            onChange={(e) => setData({ ...data, mood: e.target.value })}
            required
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <option value="" disabled>
              Select…
            </option>
            <option value="signature">Signature tasting</option>
            <option value="performance">Performance dinner</option>
            <option value="salon">Salon supper</option>
            <option value="longevity">Longevity / wellness</option>
            <option value="celebration">Celebration / anniversary</option>
          </select>
        </label>
      ),
    },
    {
      label: 'Budget',
      component: (
        <label style={{ display: 'block' }}>
          What’s your budget per guest?
          <select
            value={data.budget}
            onChange={(e) => setData({ ...data, budget: e.target.value })}
            required
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <option value="" disabled>
              Select…
            </option>
            <option value="120-180">€120–180</option>
            <option value="180-250">€180–250</option>
            <option value="250+">€250+</option>
          </select>
        </label>
      ),
    },
    {
      label: 'Details',
      component: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <label>
            Full name
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
              style={{ width: '100%', marginTop: '0.2rem', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '8px' }}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
              style={{ width: '100%', marginTop: '0.2rem', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '8px' }}
            />
          </label>
          <label>
            Location
            <input
              type="text"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              required
              placeholder="Antibes, Cannes, Monaco…"
              style={{ width: '100%', marginTop: '0.2rem', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '8px' }}
            />
          </label>
          <label>
            Dietary notes (optional)
            <textarea
              value={data.diet}
              onChange={(e) => setData({ ...data, diet: e.target.value })}
              rows={3}
              style={{ width: '100%', marginTop: '0.2rem', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '8px' }}
            />
          </label>
          <label>
            Referral code (optional)
            <input
              type="text"
              value={data.referral}
              onChange={(e) => setData({ ...data, referral: e.target.value })}
              placeholder="Enter referral code"
              style={{ width: '100%', marginTop: '0.2rem', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '8px' }}
            />
          </label>
          {/* Turnstile widget placeholder. Only appears if NEXT_PUBLIC_TURNSTILE_SITE_KEY is set */}
          {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              data-callback="onQuoteTurnstile"
              style={{ marginTop: '0.5rem' }}
            />
          )}
        </div>
      ),
    },
  ];

  async function nextStep() {
    // Fire a plausible event for each step except final
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(`Quote Step ${steps[step].label}`);
    }
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  }
  function prevStep() {
    setStep((prev) => Math.max(prev - 1, 0));
  }
  async function handleSubmit() {
    // Fire final plausible event
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('Quote Submitted');
    }
    setStatus('sending');
    try {
      // Prepare payload with a flag indicating this is a quote request
      const payload: any = { ...data, formType: 'quote' };
      // Include Turnstile token if present on window
      const tsToken = (window as any).turnstile?.getResponse?.(
        undefined,
        'onQuoteTurnstile'
      );
      if (tsToken) payload.turnstileToken = tsToken;
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setData({
        date: '',
        guests: '',
        mood: '',
        budget: '',
        name: '',
        email: '',
        location: '',
        diet: '',
        referral: '',
      });
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <div className="card" style={{ maxWidth: 720, margin: '0 auto' }}>
      <h3 style={{ marginTop: 0 }}>Instant quote</h3>
      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Answer a few questions to receive a personalised estimate.
      </p>
      {/* Progress indicator */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
        {steps.map((s, idx) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              height: '4px',
              background: idx <= step ? '#1b1b1b' : '#e8e8e8',
              borderRadius: '2px',
            }}
          />
        ))}
      </div>
      {/* Current step component */}
      <div style={{ marginBottom: '1rem' }}>{steps[step].component}</div>
      {/* Navigation buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {step > 0 && (
          <button
            type="button"
            onClick={prevStep}
            className="button ghost"
            style={{ flex: '0 0 auto' }}
          >
            Back
          </button>
        )}
        {step < steps.length - 1 && (
          <button
            type="button"
            onClick={nextStep}
            className="button"
            style={{ marginLeft: 'auto' }}
          >
            Next
          </button>
        )}
        {step === steps.length - 1 && (
          <button
            type="button"
            onClick={handleSubmit}
            className="button"
            disabled={status === 'sending'}
            style={{ marginLeft: 'auto' }}
          >
            {status === 'sending' ? 'Sending…' : 'Get quote'}
          </button>
        )}
      </div>
      {status === 'sent' && (
        <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '1rem' }}>
          Thank you! We’ve received your details and will send you an estimate soon.
        </p>
      )}
      {status === 'error' && (
        <p style={{ color: 'crimson', fontSize: '0.9rem', marginTop: '1rem' }}>
          Couldn’t send. Please try again or email us directly.
        </p>
      )}
    </div>
  );
}