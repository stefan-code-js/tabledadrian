import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Remove my data",
  description:
    "Request deletion of your personal data, leads, and communications related to Table d’Adrian. We respond the same day.",
  alternates: { canonical: "/remove" },
  robots: { index: true, follow: true },
};

export default function RemovePage() {
  return (
    <article className="editorial-page">
      <section className="editorial-hero">
        <div className="editorial-container hero-copy">
          <Reveal as="h1">Remove my data</Reveal>
          <Reveal as="p" className="lead">
            We take privacy seriously. Use the options below to request deletion of
            any personal information you have shared, including messages, booking requests,
            and review submissions. We’ll confirm completion via email.
          </Reveal>
        </div>
        <hr className="separator" />
      </section>

      <section className="editorial-section">
        <div className="editorial-container">
          <div className="two-column">
            <Reveal className="narrative-block">
              <h2>Immediate removal</h2>
              <p>
                Email us from the address you used and include any relevant context
                (e.g., message date, phone number, or booking reference). We will
                remove all associated records and confirm within one business day.
              </p>
              <p>
                <a className="btn" href="mailto:adrian@tabledadrian.com?subject=Data%20deletion%20request">
                  Email deletion request
                </a>
              </p>
            </Reveal>

            <Reveal className="narrative-block">
              <h2>What we delete</h2>
              <ul>
                <li>Contact messages and lead records</li>
                <li>Booking requests and confirmations</li>
                <li>Reviews you submitted</li>
                <li>Any analytics identifiers we control</li>
              </ul>
              <p className="small muted">
                Note: Payment providers (e.g., Stripe) may retain limited records to
                meet legal and accounting obligations. We request redaction wherever possible.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="editorial-container final-call">
          <Reveal as="h2">Prefer to speak directly?</Reveal>
          <Reveal>
            <div className="cta-row">
              <Link className="btn" href="/contact">
                Contact us
              </Link>
              <a className="btn ghost" href="mailto:adrian@tabledadrian.com">
                Email Adrian
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
