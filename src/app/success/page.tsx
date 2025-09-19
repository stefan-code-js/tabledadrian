import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getOrder } from "@/lib/orders";

export const runtime = "edge";

export const metadata: Metadata = {
    title: "Thank you · Table d’Adrian",
    robots: { index: false },
};

async function fetchStripeSummary(sessionId: string) {
    if (!process.env.STRIPE_SECRET_KEY) return null;
    try {
        const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
            headers: {
                Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
            },
            cache: "no-store",
        });
        if (!response.ok) return null;
        return (await response.json()) as { amount_total?: number; currency?: string };
    } catch {
        return null;
    }
}

const heroImage = {
    src: "/placeholder/hero-success.svg",
    alt: "Chef wiping the rim of a porcelain plate before service in a calm kitchen.",
};

const followUpSteps = [
    {
        title: "Schedule confirmation",
        detail: "We reply within 24 hours to align on venue access, guest cadence, and dietary nuance.",
    },
    {
        title: "Documentation",
        detail: "Menu books, mise charts, and provisioning lists arrive so your team feels prepared.",
    },
    {
        title: "Coordination",
        detail: "We liaise with staff, captains, or estate managers to choreograph the arrival window and crew footprint.",
    },
    {
        title: "Service",
        detail: "Adrian and Antonia lead the evening, then leave a documented reset so the space is composed by morning.",
    },
];

async function resolveSearchParams<T>(searchParams?: Promise<T>) {
    if (!searchParams) {
        return undefined as T | undefined;
    }
    try {
        return await searchParams;
    } catch {
        return undefined as T | undefined;
    }
}

export default async function SuccessPage({
    searchParams,
}: {
    searchParams?: Promise<{ session_id?: string }>;
}) {
    const resolvedParams = await resolveSearchParams(searchParams);
    const sessionId = resolvedParams?.session_id;
    const localOrder = sessionId ? getOrder(sessionId) : undefined;
    const stripe = sessionId && !localOrder ? await fetchStripeSummary(sessionId) : null;

    const amount = stripe?.amount_total ? (stripe.amount_total / 100).toLocaleString("en-GB") : undefined;
    const currency = stripe?.currency?.toUpperCase();

    const paymentMessage = localOrder
        ? `Order ${localOrder.priceId} confirmed. A receipt is on its way.`
        : amount && currency
          ? `Payment of ${currency} ${amount} confirmed. Your receipt will arrive by email within minutes.`
          : "Your payment was received. We will send intake notes and scheduling details shortly.";

    return (
        <article className="editorial-page">
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure">
                    <Image
                        src={heroImage.src}
                        alt={heroImage.alt}
                        fill
                        priority
                        sizes="100vw"
                        className="hero-figure__image"
                    />
                </figure>
                <div className="editorial-container hero-copy">
                    <h1>Merci — your table is reserved</h1>
                    <p className="lead">We are reviewing your booking now and will reply within a single business day.</p>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="two-column">
                        <article className="narrative-block">
                            <h2>What happens next</h2>
                            <p>{paymentMessage}</p>
                            <p>
                                If the confirmation email does not arrive, write to <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a> and we will resend details immediately.
                            </p>
                            <p>
                                Our pharmacist and chef co-author the intake summary, align on sensitivities, and brief the crew so
                                the evening feels inevitable from the first course through the final reset.
                            </p>
                        </article>
                        <article className="narrative-block">
                            <h2>Service cadence</h2>
                            <div className="process-flow">
                                {followUpSteps.map((step) => (
                                    <article key={step.title} className="process-step">
                                        <h3>{step.title}</h3>
                                        <p>{step.detail}</p>
                                    </article>
                                ))}
                            </div>
                        </article>
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container final-call">
                    <h2>Extend the relationship</h2>
                    <p>
                        Membership keeps pharmacist oversight, hosted dinners, and culinary documentation on cadence so every
                        property feels consistent. Share your next intention and we will design the plan.
                    </p>
                    <div className="cta-row">
                        <Link className="btn" href="/book">
                            share another date
                        </Link>
                        <Link className="btn ghost" href="/membership">
                            explore membership
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
