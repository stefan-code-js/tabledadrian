import Image from "next/image";
import type { Metadata } from "next";
import PayButton from "@/components/PayButton";
import { membershipTiers, priceCatalog } from "@/lib/pricing";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
    title: "Membership",
    description:
        "Member programs by Antonia (PharmD) & Adrian (private chef). Quarterly to premier plans with pharmacist oversight, menu systems, and hosted dinners.",
    alternates: { canonical: "/membership" },
};

const heroImage = {
    src: "/placeholder/hero-membership.svg",
    alt: "Soft light over a private dining room prepared for membership guests.",
};

export default function MembershipPage() {
    const pillarParagraphs = [
        "Pharmacist oversight, sensible lab cadence, and Adrian’s culinary engineering combine so daily routines feel elevated without losing ease.",
        "Seasonal menu systems, mise charts, and documentation travel with you while hosted dinners, priority access, and discreet coordination keep standards intact in every property.",
    ];

    const cadence = [
        {
            title: "Annual cadence",
            detail: "Quarterly or annual cycle guided by pharmacist–chef leadership.",
        },
        {
            title: "Kickoff review",
            detail: "Menu book and provisioning tailored to your medical priorities.",
        },
        {
            title: "Ongoing adjustments",
            detail: "Monthly or weekly refinements based on how you feel and lab feedback.",
        },
        {
            title: "Hosted dinners",
            detail: "Dates held within your priority window; every service is documented.",
        },
        {
            title: "Living standards",
            detail: "Systems updated seasonally so your team can repeat them without us present.",
        },
    ];

    const faqs = [
        {
            question: "Are hosted dinners truly included?",
            answer:
                "Yes. Each plan includes the stated number of hosted dinners per membership year. Dates are held within your priority window and groceries or wine are billed at cost if you request rare products.",
        },
        {
            question: "Is membership a medical service?",
            answer:
                "Membership is lifestyle and culinary consulting with pharmacist oversight. It complements your physician; medical decisions always remain with your doctor, and we coordinate where helpful.",
        },
        {
            question: "Can we pause or upgrade mid-year?",
            answer:
                "You can upgrade at any time and the difference is prorated. Pauses are available for travel or life events, and unused hosted dinners roll forward within the same year when possible.",
        },
        {
            question: "How far ahead should we book?",
            answer:
                "Essential offers a seven-day priority window, Studio fourteen days, and Patron thirty days with first holds. We recommend reserving your recurring evenings each quarter for smooth planning.",
        },
        {
            question: "Do you support dietary constraints?",
            answer:
                "Yes. We design elegant, repeatable menus for FODMAP, histamine, lipid-sensitive, and gluten-free patterns—without introducing food anxiety.",
        },
    ];

    return (
        <article className="editorial-page">
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure">
                    <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="100vw" className="hero-figure__image" />
                </figure>
                <div className="editorial-container hero-copy">
                    <Reveal as="h1">Membership</Reveal>
                    <Reveal as="p" className="lead">
                        Designed for leaders who protect energy and attention. Antonia (PharmD) translates medical goals into daily systems; Adrian engineers the food, mise, and menus your team can repeat. Membership adds continuity, hosted dinners, and priority access.
                    </Reveal>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="two-column">
                        <Reveal className="narrative-block">
                            <h2>What members receive</h2>
                            {pillarParagraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </Reveal>
                        <Reveal className="narrative-block">
                            <h2>How membership works</h2>
                            <div className="process-flow">
                                {cadence.map((step) => (
                                    <Reveal as="article" className="process-step" key={step.title}>
                                        <h3>{step.title}</h3>
                                        <p>{step.detail}</p>
                                    </Reveal>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="section-heading">
                        <Reveal as="h2">Member tiers</Reveal>
                    </div>
                    <div className="pricing-stack">
                        {membershipTiers.map((tier) => {
                            const priceEntry = priceCatalog[tier.checkout.priceKey];
                            return (
                                <Reveal as="article" className="pricing-tier" key={tier.id}>
                                    <div className="pricing-tier__intro">
                                        <h3>{tier.name}</h3>
                                        <p className="pricing-tier__price">{tier.price}</p>
                                    </div>
                                    <div className="pricing-tier__body">
                                        {tier.paragraphs.map((paragraph) => (
                                            <p key={paragraph}>{paragraph}</p>
                                        ))}
                                        <details>
                                            <summary>{tier.summary}</summary>
                                            <p>{tier.detail}</p>
                                        </details>
                                        <PayButton priceId={priceEntry.id} mode={priceEntry.mode}>
                                            {tier.checkout.label}
                                        </PayButton>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="section-heading">
                        <Reveal as="h2">Membership questions</Reveal>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq) => (
                            <Reveal as="details" key={faq.question}>
                                <summary>{faq.question}</summary>
                                <p>{faq.answer}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </article>
    );
}
