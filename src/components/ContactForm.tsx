"// src/components/ContactForm.tsx
'use client';

import React from 'react';

<<<<<<< HEAD
export default function ContactForm({ context }: { context?: string }) {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [message, setMessage] = useState<string>("");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const payload = {
            name: String(formData.get("name") || ""),
            email: String(formData.get("email") || ""),
            guests: Number(formData.get("guests") || 0),
            eventDate: String(formData.get("eventDate") || ""),
            location: String(formData.get("location") || ""),
            budget: String(formData.get("budget") || ""),
            message: String(formData.get("message") || ""),
            company: String(formData.get("company") || ""),
        };

        setStatus("submitting");
        setMessage("");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok || !data?.ok) {
                setStatus("error");
                setMessage(
                    data?.errors?.join?.(" ") ||
                        "Unable to send right now. Please check your details and try again."
                );
                return;
            }
            form.reset();
            if (context) {
                const messageField = form.elements.namedItem("message") as HTMLTextAreaElement | null;
                if (messageField) {
                    messageField.value = `Pricing context: ${context}\n`;
                }
            }
            setStatus("success");
            setMessage("Merci — we’ll confirm details shortly.");
        } catch {
            setStatus("error");
            setMessage("Network error. Please retry in a moment.");
        }
=======
export default function ContactForm() {
  const [status, setStatus] = React.useState<'idle'| 'sending' | 'ok' | 'error'>('idle');
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
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || `Bad response ${res.status}`);
      }
      setStatus('ok');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
>>>>>>> da04435 (Update ContactForm.tsx)
    }
  }

<<<<<<< HEAD
    return (
        <form id="contact-form" className="form contact-form" onSubmit={onSubmit}>
            <div className="grid-two">
                <label>
                    <span>Name</span>
                    <input name="name" autoComplete="name" required aria-required type="text" />
                </label>
                <label>
                    <span>Email</span>
                    <input name="email" type="email" autoComplete="email" required aria-required />
                </label>
            </div>
            <div className="grid-two">
                <label>
                    <span>Guests</span>
                    <input name="guests" type="number" min={1} max={120} required aria-required />
                </label>
                <label>
                    <span>Event date</span>
                    <input name="eventDate" type="date" required aria-required />
                </label>
            </div>
            <div className="grid-two">
                <label>
                    <span>Location</span>
                    <input name="location" placeholder="Antibes, Cannes…" />
                </label>
                <label>
                    <span>Budget</span>
                    <input name="budget" placeholder="Approximate investment" />
                </label>
            </div>
            <label>
                <span>Intent / notes</span>
                <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about the evening, preferences, or key priorities."
                    defaultValue={context ? `Pricing context: ${context}\n` : undefined}
                />
            </label>
            <div style={{ display: "none" }} aria-hidden="true">
                <label>
                    company
                    <input name="company" tabIndex={-1} autoComplete="off" />
                </label>
            </div>
            <div className="actions">
                <button className="btn" type="submit" disabled={status === "submitting"}>
                    {status === "submitting" ? "sending…" : "submit inquiry"}
                </button>
            </div>
            {status === "error" ? (
                <p className="error" role="alert">{message}</p>
            ) : null}
            {status === "success" ? <p className="ok">{message}</p> : null}
        </form>
    );
}
=======
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
>>>>>>> da04435 (Update ContactForm.tsx)
