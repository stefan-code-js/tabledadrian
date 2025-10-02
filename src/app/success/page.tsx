import Image from "next/image";
import Link from "next/link";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import CheckoutSuccessBeacon from "@/components/CheckoutSuccessBeacon";
import { getOrder } from "@/lib/orders";
import { buildMetadataForPath } from "@/lib/metadata";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import { resolveCfEnv } from "@/lib/cloudflare";

type Env = { STRIPE_SECRET_KEY?: string; STRIPE_KEY?: string };

export const runtime = "edge";

export const metadata = buildMetadataForPath("/success", {
    title: "Thank you - Table d'Adrian",
    description: "Confirmation and next steps after reserving your private table.",
    indexable: false,
});

const KEYWORDS = ["booking", "membership", "service", "cadence", "table", "PharmD"] as const;

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

const STRIPE_SECRET_ENV_KEYS = ["STRIPE_SECRET_KEY", "STRIPE_KEY"] as const;

const processStripeSecretKey =
    typeof process !== "undefined" && typeof process.env !== "undefined"
        ? process.env.STRIPE_SECRET_KEY
        : undefined;
const processStripeKey =
    typeof process !== "undefined" && typeof process.env !== "undefined" ? process.env.STRIPE_KEY : undefined;

function getStripeSecret(): string | undefined {
    const env = resolveCfEnv<Env>();
    for (const key of STRIPE_SECRET_ENV_KEYS) {
        const fromEnv = env?.[key];
        if (typeof fromEnv === "string" && fromEnv.length) {
            return fromEnv;
        }
    }

    if (processStripeSecretKey && processStripeSecretKey.length) {
        return processStripeSecretKey;
    }


    if (processStripeKey && processStripeKey.length) {
        return processStripeKey;

const STRIPE_SECRET_ENV_KEYS = ["STRIPE_SECRET_KEY", "STRIPE_KEY"] as const;

function getStripeSecret(): string | undefined {
    const env = getEnv();
    for (const key of STRIPE_SECRET_ENV_KEYS) {
        const fromEnv = env?.[key];
        if (typeof fromEnv === "string" && fromEnv.length) {
            return fromEnv;
        }
    }

    for (const key of STRIPE_SECRET_ENV_KEYS) {
        const fallback = getProcessEnv(key);
        if (typeof fallback === "string" && fallback.length) {
            return fallback;
        }

    }

    return undefined;
}

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

    const secret = sessionId ? getStripeSecret() : undefined;
    const stripe = sessionId && !localOrder && secret ? await fetchStripeSummary(sessionId, secret) : null;

    const amount = stripe?.amount_total ? (stripe.amount_total / 100).toLocaleString("en-GB") : undefined;
    const currency = stripe?.currency?.toUpperCase();

    const paymentMessage = localOrder
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
                    <KineticHeading as="h1">Merci - your table is reserved</KineticHeading>
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="We are reviewing your booking now and will reply within a single business day."
                            keywords={KEYWORDS}
                            variant="forest"
                        />
                    </KineticParagraph>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="two-column">
                        <article className="narrative-block">
                            <KineticHeading as="h2">What happens next</KineticHeading>
                            <KineticParagraph>{paymentMessage}</KineticParagraph>
                            <KineticParagraph>
                                <KeywordHighlighter
                                    text="If the confirmation email does not arrive, write to"
                                    keywords={KEYWORDS}
                                    variant="forest"
                                />
                                {" "}
                                <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>
                                {" "}
                                <KeywordHighlighter
                                    text="and we will resend details immediately."
                                    keywords={KEYWORDS}
                                    variant="forest"
                                />
                            </KineticParagraph>
                            <KineticParagraph>
                                <KeywordHighlighter
                                    text="Our pharmacist and chef co-author the intake summary, align on sensitivities, and brief the crew so the evening feels inevitable from the first course through the final reset."
                                    keywords={KEYWORDS}
                                    variant="bronze"
                                />
                            </KineticParagraph>
                        </article>
                        <article className="narrative-block">
                            <KineticHeading as="h2">Service cadence</KineticHeading>
                            <div className="process-flow">
                                {followUpSteps.map((step) => (
                                    <article key={step.title} className="process-step">
                                        <KineticHeading as="h3">{step.title}</KineticHeading>
                                        <KineticParagraph>
                                            <KeywordHighlighter text={step.detail} keywords={KEYWORDS} variant="forest" />
                                        </KineticParagraph>
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
                    <KineticHeading as="h2">Extend the relationship</KineticHeading>
                    <KineticParagraph>
                        <KeywordHighlighter
                            text="Membership programs keep PharmD oversight, hosted dinners, and culinary documentation on cadence so every property feels consistent. Share your next intention and we will design the plan."
                            keywords={KEYWORDS}
                            variant="bronze"
                        />
                    </KineticParagraph>
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
