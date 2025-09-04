"use client";
import Reveal from './Reveal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiChevronRight } from 'react-icons/fi';

/**
 * Membership tiers available for purchase. Each tier corresponds to a Stripe price ID
 * configured in environment variables: STRIPE_PRICE_SALON, STRIPE_PRICE_TASTING and
 * STRIPE_PRICE_PATRON. Members receive early access to bookings, recipes and essays.
 */
const tiers = [
  { id: 'salon', label: 'Salon', description: 'Quarterly dinners & recipes', price: '€29/mo' },
  { id: 'tasting', label: 'Tasting', description: 'Monthly essays & invites', price: '€49/mo' },
  { id: 'patron', label: 'Patron', description: 'All‑access + one dinner', price: '€99/mo' },
];

/**
 * Membership section entices visitors to join your inner circle. It explains
 * benefits and points users to the journal for deeper content. In the future
 * you can integrate a payment gateway and members-only area.
 */
export default function Membership() {
  const [email, setEmail] = useState('');
  const [referral, setReferral] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending'>('idle');
  const router = useRouter();

  /**
   * Initiates Stripe Checkout for the chosen tier. Includes an optional referral code and
   * triggers Plausible analytics. If the request succeeds, the user is redirected
   * to Stripe’s hosted checkout page.
   */
  async function join(tier: string) {
    if (status === 'sending') return;
    setStatus('sending');
    try {
      // fire Plausible custom event
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('Membership Checkout', { props: { tier, referral: referral || undefined } });
      }
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, email, referral }),
      });
      const data = await res.json();
      if (data.ok && data.url) {
        window.location.href = data.url;
      } else {
        setStatus('idle');
      }
    } catch {
      setStatus('idle');
    }
  }

  /**
   * Opens the Stripe customer portal to manage an existing subscription. The user
   * should provide their customer ID (often their email if using Checkout) and
   * will be redirected if successful.
   */
  async function manage() {
    if (!email) {
      alert('Please enter your membership email before managing your subscription');
      return;
    }
    try {
      const res = await fetch('/api/customer-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: email }),
      });
      const data = await res.json();
      if (data.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || 'Unable to open portal');
      }
    } catch {
      alert('Failed to open portal');
    }
  }

  return (
    <section className="section" id="membership">
      <div className="container">
        <h2>Membership</h2>
        <Reveal>
          <p className="sub">
            Inner-circle access: seasonal recipes, long-form essays, private Q&amp;A sessions, and early booking for pop-ups and suppers. Monthly or annual. Cancel anytime.
          </p>
        </Reveal>
        <div style={{ marginTop: 24, maxWidth: 600 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginTop: 4, width: '100%', padding: '0.6rem', border: '1px solid var(--line)', borderRadius: 8 }}
            />
          </label>
          <label style={{ display: 'block', marginBottom: 16 }}>
            Referral code (optional)
            <input
              placeholder="friend-code"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              style={{ marginTop: 4, width: '100%', padding: '0.6rem', border: '1px solid var(--line)', borderRadius: 8 }}
            />
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {tiers.map((t) => (
              <button
                key={t.id}
                className="button"
                onClick={() => join(t.id)}
                disabled={status === 'sending'}
                style={{ flex: 1, minWidth: '130px' }}
              >
                {t.label} – {t.price}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <button className="button ghost" onClick={manage} style={{ fontSize: '0.9rem' }}>
              Manage your subscription
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}