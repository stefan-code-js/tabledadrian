import Link from "next/link";
import type { PageContent, Tier, TierCta } from "@/data/siteContent";
import { priceCatalog } from "@/data/siteContent";
import PayButton from "@/components/PayButton";
import Reveal from "@/components/Reveal";
import { createProductJsonLd } from "@/lib/metadata";
import { formatEuro, getCalculatorOption } from "@/lib/pricing";

const anchor = (page: PageContent, target: string) => `${page.slug}-${target}`;

function TierAction({ cta }: { cta: TierCta }) {
    if (cta.type === "checkout") {
        const config = priceCatalog[cta.priceKey];
        const mode = cta.mode ?? config.mode;
        return (
            <PayButton priceId={config.id} mode={mode}>
                {cta.label}
            </PayButton>
        );
    }
    return (
        <Link className="btn" href={cta.href}>
            {cta.label}
        </Link>
    );
}

function getTierPricing(tier: Tier) {
    if (!tier.calculatorId) {
        return { label: tier.price ?? null, meta: [] as string[] };
    }

    const option = getCalculatorOption(tier.calculatorId);
    const meta: string[] = [];

    if (option.includedGuests) meta.push(`Includes ${option.includedGuests} guests`);
    if (option.perGuest) meta.push(`${formatEuro(option.perGuest)} per additional guest`);
    if (option.deposit) meta.push(`Deposit ${formatEuro(option.deposit)}`);

    const label = option.perGuest > 0 ? `from ${formatEuro(option.base)}` : formatEuro(option.base);

    return { label, meta };
}

export function PageHero({ page }: { page: PageContent }) {
    const { hero } = page;
    return (
        <header className="center-text" id={anchor(page, "hero")}>
            <p className="kicker">{hero.kicker}</p>
            <h1 className="title">{hero.title}</h1>
            <p className="lead">{hero.description}</p>
            <div className="hero-ctas">
                <Link className="btn" href={hero.primaryCta.href}>
                    {hero.primaryCta.label}
                </Link>
                {hero.secondaryCta ? (
                    <Link className="btn ghost" href={hero.secondaryCta.href}>
                        {hero.secondaryCta.label}
                    </Link>
                ) : null}
            </div>
        </header>
    );
}

export function PageQuickNav({ page }: { page: PageContent }) {
    if (!page.quickNav?.length) return null;
    return (
        <nav className="page-quick-nav" aria-label={`${page.hero.title} quick navigation`}>
            {page.quickNav.map((item) => (
                <a key={item.target} href={`#${anchor(page, item.target)}`}>
                    {item.label}
                </a>
            ))}
        </nav>
    );
}

export function ValueSection({ page }: { page: PageContent }) {
    const { values } = page;
    return (
        <section className="structured-section" id={anchor(page, "values")}>
            <h2 className="lux-h center-text">{values.title}</h2>
            <div className="structured-grid top">
                {values.cards.map((card, index) => (
                    <Reveal key={card.title} delay={index * 0.08}>
                        <article className="lux-card">
                            <div className="lux-body">
                                <h3 className="lux-h">{card.title}</h3>
                                <p>{card.description}</p>
                                <ul className="lux-list">
                                    {card.bullets.map((bullet) => (
                                        <li key={bullet}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

export function IncludedSection({ page }: { page: PageContent }) {
    const { included } = page;
    return (
        <section className="structured-section" id={anchor(page, "included")}>
            <Reveal>
                <article className="lux-card wide">
                    <div className="lux-body">
                        <h2 className="lux-h">{included.title}</h2>
                        {included.description ? <p>{included.description}</p> : null}
                        <ul className="lux-list">
                            {included.bullets.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </article>
            </Reveal>
        </section>
    );
}

export function ProcessSection({ page }: { page: PageContent }) {
    const { process } = page;
    return (
        <section className="structured-section" id={anchor(page, "process")}>
            <Reveal>
                <article className="lux-card wide">
                    <div className="lux-body">
                        <h2 className="lux-h">{process.title}</h2>
                        <ol className="lux-steps">
                            {process.steps.map((step) => (
                                <li key={step.title}>
                                    <strong>{step.title}</strong>
                                    <p>{step.detail}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </article>
            </Reveal>
        </section>
    );
}

export function PricingSection({ page }: { page: PageContent }) {
    const { pricing } = page;
    return (
        <section className="structured-section" id={anchor(page, "pricing")}>
            <h2 className="lux-h center-text">{pricing.title}</h2>
            <div className="structured-grid tiers">
                {pricing.tiers.map((tier: Tier, index) => (
                    <Reveal key={tier.id} delay={index * 0.08}>
                        <article
                            className="lux-card"
                            id={`${anchor(page, "pricing")}-${tier.id}`}
                        >
                            <div className="lux-body">
                                <h3 className="lux-h">{tier.title}</h3>
                                {(() => {
                                    const pricingInfo = getTierPricing(tier);
                                    return (
                                        <>
                                            {pricingInfo.label ? (
                                                <p className="lux-price">{pricingInfo.label}</p>
                                            ) : null}
                                            {pricingInfo.meta.length ? (
                                                <ul className="lux-price-meta">
                                                    {pricingInfo.meta.map((item) => (
                                                        <li key={item}>{item}</li>
                                                    ))}
                                                </ul>
                                            ) : null}
                                        </>
                                    );
                                })()}
                                {tier.description ? <p>{tier.description}</p> : null}
                                <ul className="lux-list">
                                    {tier.bullets.map((bullet) => (
                                        <li key={bullet}>{bullet}</li>
                                    ))}
                                </ul>
                                {tier.details ? (
                                    <details className="lux-details">
                                        <summary>{tier.details.summary}</summary>
                                        <p>{tier.details.body}</p>
                                    </details>
                                ) : null}
                            </div>
                            <div className="lux-cta">
                                <TierAction cta={tier.cta} />
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
            {pricing.note ? <p className="muted center-text" style={{ marginTop: 12 }}>{pricing.note}</p> : null}
        </section>
    );
}

export function TestimonialsSection({ page }: { page: PageContent }) {
    const { testimonials } = page;
    return (
        <section className="structured-section" id={anchor(page, "testimonials")}>
            <h2 className="lux-h center-text">{testimonials.title}</h2>
            <div className="testimonial-grid">
                {testimonials.items.map((item, index) => (
                    <Reveal key={`${item.name}-${index}`} delay={index * 0.06}>
                        <blockquote className="quote card">
                            <p>“{item.quote}”</p>
                            <cite>
                                — {item.name}
                                {item.role ? <span className="muted"> · {item.role}</span> : null}
                            </cite>
                        </blockquote>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

export function FinalCtaSection({ page, children }: { page: PageContent; children?: React.ReactNode }) {
    const { finalCta } = page;
    return (
        <section className="structured-section final" id={anchor(page, "cta")}>
            <Reveal>
                <article className="lux-card wide">
                    <div className="lux-body">
                        <h2 className="lux-h">{finalCta.title}</h2>
                        <p>{finalCta.description}</p>
                        {children}
                        <div className="hero-ctas">
                            <Link className="btn" href={finalCta.primary.href}>
                                {finalCta.primary.label}
                            </Link>
                            {finalCta.secondary ? (
                                <Link className="btn ghost" href={finalCta.secondary.href}>
                                    {finalCta.secondary.label}
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </article>
            </Reveal>
        </section>
    );
}

export function PageStructuredData({ page }: { page: PageContent }) {
    const data = createProductJsonLd(page);
    if (!data) return null;
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    );
}
