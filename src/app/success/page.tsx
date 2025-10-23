import Image from "@/components/StaticImage";
import Link from "next/link";
import CheckoutSuccessBeacon from "@/components/CheckoutSuccessBeacon";
import { getOrder } from "@/lib/orders";
import { resolveStripeSecret } from "@/lib/stripe";

export const runtime = "edge";

export const metadata = {
    title: "Thank you - Table d'Adrian",
    description: "Confirmation and next steps after reserving your private table.",
    robots: { index: false, follow: false },
    alternates: {
        canonical: "https://tabledadrian.com/success",
    },
    openGraph: {
        title: "Thank you - Table d'Adrian",
        description: "Confirmation and next steps after reserving your private table.",
        url: "https://tabledadrian.com/success",
        siteName: "Table d'Adrian",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Thank you - Table d'Adrian",
        description: "Confirmation and next steps after reserving your private table.",
    },
} as const;

const formatCurrency = (amount: number, currency: string) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(amount);

const heroImage = {
    src: "/gallery/IMG_3520.webp",
    alt: "Candlelit salon dressed for a private celebration after booking.",
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

const STRIPE_SECRET = resolveStripeSecret();

async function fetchStripeSummary(sessionId: string, secret: string) {
    try {
        const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
            headers: {
                Authorization: `Bearer ${secret}`,
            },
            cache: "no-store",
        });
        if (!response.ok) return null;
        return (await response.json()) as { amount_total?: number; currency?: string };
    } catch {
        return null;
    }
}

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

    const secret = sessionId ? STRIPE_SECRET : undefined;
    const stripe = sessionId && !localOrder && secret ? await fetchStripeSummary(sessionId, secret) : null;

    const amount = stripe?.amount_total ? (stripe.amount_total / 100).toLocaleString("en-GB") : undefined;
    const currency = stripe?.currency?.toUpperCase();

    const localAmount =
        localOrder?.amount && localOrder.currency ? formatCurrency(localOrder.amount, localOrder.currency) : undefined;

    const paymentMessage = localAmount
        ? `Payment of ${localAmount} confirmed. A receipt is on its way.`
        : localOrder?.priceId
          ? `Order ${localOrder.priceId} confirmed. A receipt is on its way.`
          : amount && currency
            ? `Payment of ${currency} ${amount} confirmed. Your receipt will arrive by email within minutes.`
          : "Your payment was received. We will send intake notes and scheduling details shortly.";

    return (
        <article className="editorial-page">
            <CheckoutSuccessBeacon priceId={localOrder?.priceId} sessionId={sessionId ?? undefined} />
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure" data-parallax="8">
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
                    <h1 className="kinetic-heading">Merci - your table is reserved</h1>
                    <p className="kinetic-paragraph">
                        We are reviewing your booking now and will reply within a single business day.
                    </p>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="two-column">
                        <article className="narrative-block">
                            <h2 className="kinetic-heading">What happens next</h2>
                            <p className="kinetic-paragraph">{paymentMessage}</p>
                            <p className="kinetic-paragraph">
                                If the confirmation email does not arrive, write to{" "}
                                <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>
                                {" "}and we will resend details immediately.
                            </p>
                            <p className="kinetic-paragraph">
                                Our pharmacist and chef co-author the intake summary, align on sensitivities, and brief the crew so the evening feels inevitable from the first course through the final reset.
                            </p>
                        </article>
                        <article className="narrative-block">
                            <h2 className="kinetic-heading">Service cadence</h2>
                            <div className="process-flow">
                                {followUpSteps.map((step) => (
                                    <article key={step.title} className="process-step">
                                        <h3 className="kinetic-heading">{step.title}</h3>
                                        <p className="kinetic-paragraph">{step.detail}</p>
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
                    <h2 className="kinetic-heading">Extend the relationship</h2>
                    <p className="kinetic-paragraph">
                        Membership programs keep PharmD oversight, hosted dinners, and culinary documentation on cadence so every property feels consistent. Share your next intention and we will design the plan.
                    </p>
                    <div className="cta-row">
                        <Link className="btn" href="/book">
                            share another date
                        </Link>
                        <Link className="btn ghost" href="/membership">
                            explore memberships
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    );
}


