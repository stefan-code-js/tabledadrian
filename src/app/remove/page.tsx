import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import { buildMetadataForPath } from "@/lib/metadata";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const metadata = buildMetadataForPath("/remove", {
  title: "Remove my data",
  description:
    "Request deletion of your personal data, leads, and communications related to Table d’Adrian. We respond the same day.",
  indexable: false,
});

const KEYWORDS = ["privacy", "data", "booking", "membership", "records"] as const;

export default function RemovePage() {
  const prefersReduced = usePrefersReducedMotion();
  const motionProps = prefersReduced
    ? { whileHover: undefined, whileTap: undefined }
    : {
        whileHover: { y: -3 },
        whileTap: { scale: 0.97 },
      } as const;

  const handleCta = (label: string, href: string) => () => {
    trackEvent(ANALYTICS_EVENTS.ctaClick, {
      location: "remove-final",
      kind: label,
      href,
    });
  };

  return (
    <article className="editorial-page">
      <section className="editorial-hero">
        <div className="editorial-container hero-copy">
          <Reveal>
            <KineticHeading as="h1">Remove my data</KineticHeading>
          </Reveal>
          <Reveal>
            <KineticParagraph className="lead">
              <KeywordHighlighter
                text="We take privacy seriously. Use the options below to request deletion of any personal information you have shared, including messages, booking requests, and review submissions. We’ll confirm completion via email."
                keywords={KEYWORDS}
                variant="forest"
              />
            </KineticParagraph>
          </Reveal>
        </div>
        <hr className="separator" />
      </section>

      <section className="editorial-section">
        <div className="editorial-container">
          <div className="two-column">
            <Reveal className="narrative-block">
              <KineticHeading as="h2">Immediate removal</KineticHeading>
              <KineticParagraph>
                <KeywordHighlighter
                  text="Email us from the address you used and include any relevant context (e.g., message date, phone number, or booking reference). We will remove all associated records and confirm within one business day."
                  keywords={KEYWORDS}
                  variant="bronze"
                />
              </KineticParagraph>
              <KineticParagraph>
                <a className="btn" href="mailto:adrian@tabledadrian.com?subject=Data%20deletion%20request">
                  Email deletion request
                </a>
              </KineticParagraph>
            </Reveal>

            <Reveal className="narrative-block">
              <KineticHeading as="h2">What we delete</KineticHeading>
              <ul>
                <li>Contact messages and lead records</li>
                <li>Booking requests and confirmations</li>
                <li>Reviews you submitted</li>
                <li>Any analytics identifiers we control</li>
              </ul>
              <KineticParagraph className="small muted">
                Note: Payment providers (e.g., Stripe) may retain limited records to meet legal and accounting obligations. We request redaction wherever possible.
              </KineticParagraph>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="editorial-container final-call">
          <Reveal>
            <KineticHeading as="h2">Prefer to speak directly?</KineticHeading>
          </Reveal>
          <Reveal>
            <div className="cta-row">
              <motion.span {...motionProps} className="inline-flex">
                <Link className="btn" href="/contact" onClick={handleCta("contact", "/contact")}>
                  Contact us
                </Link>
              </motion.span>
              <motion.span {...motionProps} className="inline-flex">
                <a className="btn ghost" href="mailto:adrian@tabledadrian.com" onClick={handleCta("email", "mailto:adrian@tabledadrian.com")}>
                  Email Adrian
                </a>
              </motion.span>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
