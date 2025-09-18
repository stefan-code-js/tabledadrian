// src/components/ContactForm.tsx
'use client';

import React from 'react';

export default function ContactForm() {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = React.useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError('');

    const fd = new FormData(e.currentTarget);

    // Turnstile auto-injects a hidden input with this name:
    const token =
      (fd.get('cf-turnstile-response') as string | null) ??
      (fd.get('token') as string | null) ??
      '';

    const body = {
      name: (fd.get('name') as string) ?? '',
      email: (fd.get('email') as string) ?? '',
      phone: (fd.get('phone') as string) ?? '',
      intent: (fd.get('intent') as string) ?? 'signature',
      message: (fd.get('message') as string) ?? '',
      token,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || `Bad response ${res.status}`);
      }
      setStatus('ok');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid" aria-label="Contact form">
      <div className="grid">
        <label>
          name
          <input name="name" type="text" required placeholder="Your full name" />
        </label>
        <label>
          email
          <input name="email" type="email" required placeholder="you@domain.com" />
        </label>
        <label>
          phone <span className="muted">(optional)</span>
          <input name="phone" type="tel" placeholder="+33 ..." />
        </label>
      </div>

      <fieldset className="options">
        <legend>menu intent</legend>
        <label><input type="radio" name="intent" value="signature" defaultChecked /> signature</label>
        <label><input type="radio" name="intent" value="garden" /> garden</label>
        <label><input type="radio" name="intent" value="salon" /> salon</label>
      </fieldset>

      <label>
        message
        <textarea name="message" rows={5} placeholder="Share details about date, guests, location…"></textarea>
      </label>

      {/* Turnstile widget INSIDE the form so the hidden field is added */}
      <div
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        data-theme="light"
      />

      <button className="btn primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'sending…' : 'send'}
      </button>

      {status === 'ok' && <p className="sub" role="status">Thanks — we’ll reply shortly.</p>}
      {status === 'error' && <p className="sub" role="alert">Error: {error}</p>}
    </form>
  );
}
