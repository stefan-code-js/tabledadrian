
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

const menus = [
    {
        id: "signature",
        title: "Signature tasting",
        summary:
            "Twelve courses written for villas and salons. Aroma-led aperitif through warm, composed desserts with seamless pacing.",
        body: [
            "Clarified broths, cultured creams, and charcoal-kissed mains move quietly so conversation leads while the experience feels precise.",
            "Crew manages rentals, lighting, and discreet resets. Documentation stays behind so your household can repeat the rhythm when we depart.",
        ],
        note: "Best for 6-12 guests  deposit confirms date",
    },
    {
        id: "performance",
        title: "Performance dinner",
        summary:
            "Pharmacist and chef design a longevity-minded arc that protects cognition and energy without sacrificing joy.",
        body: [
            "Ferments, luminous carbohydrates, and measured protein keep guests buoyant. Service includes supplementation guidance and pantry prep for the next day.",
            "Ideal for leadership teams balancing demanding calendars with disciplined nutrition cues.",
        ],
        note: "Best for 6-10 guests  includes intake with Antonia",
    },
    {
        id: "salon",
        title: "Salon supper",
        summary:
            "Family-style ritual for conversations that stretch late. Warm abundance, refined plating, and attentive pacing.",
        body: [
            "Seasonal platters arrive in waves with quiet annotations from the crew. Wine pairing and florals are coordinated as required.",
            "Designed for private galleries and penthouse salons where ease matters more than theatre.",
        ],
        note: "Best for 8-16 guests  documentation for household crew provided",
    },
] as const;

export default function Menus() {
    const prefersReduced = usePrefersReducedMotion();
    const motionProps = prefersReduced
        ? {}
        : {
              whileHover: { y: -3 },
              whileTap: { scale: 0.97 },
          } as const;

    const handleCta = (menuId: string, intent: "booking" | "membership", href: string) => () => {
        const event = intent === "booking" ? ANALYTICS_EVENTS.bookingCta : ANALYTICS_EVENTS.ctaClick;
        trackEvent(event, {
            location: "menus",
            menu: menuId,
            href,
            intent,
        });
    };

    return (
        <section className="editorial-section" id="menu">
            <div className="editorial-container">
                <div className="section-heading">
                    <KineticHeading as="h2">Menus</KineticHeading>
                    <KineticParagraph>
                        Every service is choreographed for the venue. Choose the arc that fits your guests, then we tailor the menu after a private intake.
                    </KineticParagraph>
                </div>
                <div className="two-column">
                    {menus.map((menu) => (
                        <article key={menu.id} className="narrative-block">
                            <KineticHeading as="h3">{menu.title}</KineticHeading>
                            <KineticParagraph>{menu.summary}</KineticParagraph>
                            {menu.body.map((paragraph) => (
                                <KineticParagraph key={paragraph}>{paragraph}</KineticParagraph>
                            ))}
                            <KineticParagraph className="muted small">{menu.note}</KineticParagraph>
                            <div className="cta-row">
                                <motion.span className="inline-flex" {...motionProps}>
                                    <Link className="btn" href="/book" onClick={handleCta(menu.id, "booking", "/book")}>
                                        request a booking
                                    </Link>
                                </motion.span>
                                <motion.span className="inline-flex" {...motionProps}>
                                    <Link className="btn ghost" href="/membership" onClick={handleCta(menu.id, "membership", "/membership")}>
                                        explore membership
                                    </Link>
                                </motion.span>
                            </div>
                        </article>
                    ))}
                </div>
                <KineticParagraph className="muted note">
                    Looking for a longer cadence? Membership locks in hosted dinners and pharmacist oversight across the season.
                </KineticParagraph>
            </div>
            <hr className="separator" />
        </section>
    );
}
