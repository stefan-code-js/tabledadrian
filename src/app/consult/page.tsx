import Image from "next/image";
import type { Metadata } from "next";
import PayButton from "@/components/PayButton";
import { consultPackages, priceCatalog } from "@/lib/pricing";

export const metadata: Metadata = {
    title: "Consult",
    description:
        "Pharmacist-led wellness and private-chef consulting by Antonia & Adrian. From focused intakes to 12-week concierge seasons for villas and yachts.",
    alternates: { canonical: "/consult" },
};

const heroImage = {
    src: "/placeholder/hero-consult.svg",
    alt: "Consultation notes beside herbs and citrus on a marble counter.",
};

export default function ConsultPage() {
    const challengeParagraphs = [
        "We stabilise post-meal fatigue, reactive snacking, and restless sleep by translating clinical insight into daily menus and mise that feel luxurious.",
        "Glycemic volatility, lipid risk, and GI sensitivities such as FODMAP or histamine intolerance become livable through practical routines and training for staff and crew so standards hold when you travel.",
    ];

    const cadence = [
        {
            title: "Intake",
            detail: "90-minute pharmacist review plus culinary mapping to understand goals and constraints.",
        },
        {
            title: "Kitchen systems",
            detail: "Mise en place, grocery standards, and menu rhythm documented for your team.",
        },
        {
            title: "Weekly adjustments",
            detail: "Light labs with your physician, pragmatic supplementation, and feedback loops that respect your schedule.",
        },
        {
            title: "Team coaching",
            detail: "Provisioning, prep lists, and service flow taught to household or charter crews.",
        },
        {
            title: "Documentation",
            detail: "Refined playbooks so the system survives busy weeks and travel swings.",
        },
    ];

    const faqs = [
        {
            question: "Is pharmacist input useful if I already have a doctor?",
            answer:
                "Yes. Antonia complements your physician by translating medical goals into daily systems, screening interactions, and proposing a lab cadence to discuss with your doctor. You remain under your physician’s care.",
        },
        {
            question: "Do I need a CGM?",
            answer:
                "Not required. When used, we apply it short-term to understand your personal responses and build a routine you can live with—no gadgets necessary long-term.",
        },
        {
            question: "Remote or on-site?",
            answer:
                "Intakes and resets run beautifully via video. Concierge work is hybrid with on-site periods for provisioning, crew coaching, and service standards across villas or charters.",
        },
        {
            question: "Can you train our household or yacht crew?",
            answer:
                "Yes. We document prep lists, station setup, and service flow, then train to that standard so consistency holds even when you’re away.",
        },
        {
            question: "What about supplements and interactions?",
            answer:
                "Antonia provides pragmatic guidance and checks interactions. Any changes are coordinated with your physician—we avoid the overflowing supplement drawer.",
        },
    ];

    return (
        <article className="editorial-page">
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure">
                    <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="100vw" className="hero-figure__image" />
                </figure>
                <div className="editorial-container hero-copy">
                    <h1>Private wellness &amp; culinary consult</h1>
                    <p className="lead">
                        Antonia (clinical pharmacist) and Adrian (private chef) build systems that protect energy, cognition, and joy at home, on charter, and in your villas. Clear steps, measured feedback, beautiful food.
                    </p>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="two-column">
                        <div className="narrative-block">
                            <h2>What we solve</h2>
                            {challengeParagraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="narrative-block">
                            <h2>How it unfolds</h2>
                            <div className="process-flow">
                                {cadence.map((step) => (
                                    <article key={step.title} className="process-step">
                                        <h3>{step.title}</h3>
                                        <p>{step.detail}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="section-heading">
                        <h2>Consulting paths</h2>
                    </div>
                    <div className="pricing-stack">
                        {consultPackages.map((tier) => {
                            const priceEntry = priceCatalog[tier.checkout.priceKey];
                            return (
                                <article key={tier.id} className="pricing-tier">
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
                                </article>
                            );
                        })}
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="section-heading">
                        <h2>Frequently asked</h2>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq) => (
                            <details key={faq.question}>
                                <summary>{faq.question}</summary>
                                <p>{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </article>
    );
}
