// src/components/NewsletterSignup.tsx
// Server component — reads build-time env to decide the form endpoint.

import Link from "next/link";

function parseHidden(): Record<string, string> {
    const raw = process.env.NEXT_PUBLIC_NEWSLETTER_HIDDEN_JSON;
    if (!raw) return {};
    try {
        const obj = JSON.parse(raw);
        if (obj && typeof obj === "object") {
            return Object.fromEntries(
                Object.entries(obj).map(([k, v]) => [k, String(v)])
            );
        }
    } catch {}
    return {};
}

export default function NewsletterSignup() {
    // PROVIDER-Agnostic setup
    // For Mailchimp or Buttondown, set NEXT_PUBLIC_NEWSLETTER_ACTION to their form action URL.
    const action = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION; // e.g., https://xxxx.list-manage.com/subscribe/post?...  OR  https://buttondown.email/api/emails/embed-subscribe/<handle>
    const emailField =
        process.env.NEXT_PUBLIC_NEWSLETTER_EMAIL_NAME || "email"; // Mailchimp requires "EMAIL", Buttondown uses "email"
    const honeypot = process.env.NEXT_PUBLIC_NEWSLETTER_HONEYPOT_NAME || ""; // Mailchimp uses something like b_<u>_<id>
    const hidden = parseHidden(); // Optional JSON of extra hidden fields

    // Fallback when not configured yet
    if (!action) {
        return (
            <div className="card newsletter center-text">
                <h3 className="title" style={{ fontSize: "clamp(20px,2.2vw,28px)" }}>
                    newsletter
                </h3>
                <p className="lead" style={{ marginBottom: "10px" }}>
                    Occasional notes on menus, dates, and seasonality. No spam.
                </p>
                <p className="sub">
                    Not configured yet.{" "}
                    <Link href="mailto:adrian@tabledadrian.com?subject=Newsletter%20Signup">
                        Email to subscribe
                    </Link>
                    .
                </p>
            </div>
        );
    }

    return (
        <div className="card newsletter center-text">
            <h3 className="title" style={{ fontSize: "clamp(20px,2.2vw,28px)" }}>
                newsletter
            </h3>
            <p className="lead" style={{ marginBottom: "12px" }}>
                Occasional notes on menus, dates, and seasonality. No spam.
            </p>

            {/* Posts directly to provider in a new tab (no secrets on client). */}
            <form
                className="inline-form"
                action={action}
                method="post"
                target="_blank"
                noValidate
            >
                {/* Email */}
                <label className="visually-hidden" htmlFor="nl-email">
                    Email
                </label>
                <input
                    id="nl-email"
                    type="email"
                    name={emailField}
                    required
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                />

                {/* Hidden provider fields (optional) */}
                {Object.entries(hidden).map(([k, v]) => (
                    <input key={k} type="hidden" name={k} value={v} />
                ))}

                {/* Honeypot (for Mailchimp) */}
                {honeypot ? (
                    <div className="visually-hidden" aria-hidden="true">
                        <input type="text" name={honeypot} tabIndex={-1} autoComplete="off" />
                    </div>
                ) : null}

                <button className="btn" type="submit">
                    subscribe
                </button>
            </form>

            <p className="sub" style={{ marginTop: "8px" }}>
                You’ll be redirected to confirm your subscription.
            </p>
        </div>
    );
}
