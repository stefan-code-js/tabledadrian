import Link from "next/link";
import type { PageContent, Tier, TierCta } from "@/data/siteContent";
import { priceCatalog } from "@/data/siteContent";
import PayButton from "@/components/PayButton";
import { createProductJsonLd } from "@/lib/metadata";

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

export function PageHero({ page }: { page: PageContent }) {
    const { hero } = page;
    return (
        <section className="hero-bleed" id={anchor(page, "hero")}>
            {hero.image ? (
                <figure className="hero-image">
                    <img src={hero.image.src} alt={hero.image.alt} />
                </figure>
            ) : null}
            <div className="hero-content">
                <h1>{hero.title}</h1>
                <p className="lead">{hero.description}</p>
                <div className="hero-actions">
                    <Link className="btn" href={hero.primaryCta.href}>
                        {hero.primaryCta.label}
                    </Link>
                    {hero.secondaryCta ? (
                        <Link className="btn ghost" href={hero.secondaryCta.href}>
                            {hero.secondaryCta.label}
                        </Link>
                    ) : null}
                </div>
            </div>
        </section>
    );
}

export function PageQuickNav() {
    return null;
}

export function ValueSection({ page }: { page: PageContent }) {
    const { values } = page;
    return (
        <section className="editorial-section" id={anchor(page, "values")}>
            <div className="section-inner">
                <h2>{values.title}</h2>
                <div className="narrative-grid">
                    {values.cards.map((card) => (
                        <article key={card.title} className="narrative-block">
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            <ul className="plain-list">
                                {card.bullets.map((bullet) => (
                                    <li key={bullet}>{bullet}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function IncludedSection({ page }: { page: PageContent }) {
    const { included } = page;
    return (
        <section className="editorial-section" id={anchor(page, "included")}>
            <div className="section-inner narrow">
                <h2>{included.title}</h2>
                {included.description ? <p>{included.description}</p> : null}
                <ul className="plain-list">
                    {included.bullets.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export function ProcessSection({ page }: { page: PageContent }) {
    const { process } = page;
    return (
        <section className="editorial-section" id={anchor(page, "process")}>
            <div className="section-inner split">
                <div>
                    <h2>{process.title}</h2>
                </div>
                <ol className="process-list">
                    {process.steps.map((step) => (
                        <li key={step.title}>
                            <span className="step-title">{step.title}</span>
                            <p>{step.detail}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export function PricingSection({ page }: { page: PageContent }) {
    const { pricing } = page;
    return (
        <section className="editorial-section" id={anchor(page, "pricing")}>
            <div className="section-inner">
                <h2>{pricing.title}</h2>
                <div className="tier-grid">
                    {pricing.tiers.map((tier: Tier) => (
                        <article key={tier.id} className="tier-block" id={`${anchor(page, "pricing")}-${tier.id}`}>
                            <header>
                                <h3>{tier.title}</h3>
                                <p className="tier-price">{tier.price}</p>
                            </header>
                            {tier.description ? <p>{tier.description}</p> : null}
                            <ul className="plain-list">
                                {tier.bullets.map((bullet) => (
                                    <li key={bullet}>{bullet}</li>
                                ))}
                            </ul>
                            {tier.details ? (
                                <details className="tier-details">
                                    <summary>{tier.details.summary}</summary>
                                    <p>{tier.details.body}</p>
                                </details>
                            ) : null}
                            <div className="tier-action">
                                <TierAction cta={tier.cta} />
                            </div>
                        </article>
                    ))}
                </div>
                {pricing.note ? <p className="muted" style={{ marginTop: 16 }}>{pricing.note}</p> : null}
            </div>
        </section>
    );
}

export function TestimonialsSection({ page }: { page: PageContent }) {
    const { testimonials } = page;
    return (
        <section className="editorial-section" id={anchor(page, "testimonials")}>
            <div className="section-inner">
                <h2>{testimonials.title}</h2>
                <div className="quote-grid">
                    {testimonials.items.map((item, index) => (
                        <figure className="pull-quote" key={`${item.name}-${index}`}>
                            <blockquote>
                                <p>“{item.quote}”</p>
                            </blockquote>
                            <figcaption>
                                — {item.name}
                                {item.role ? <span className="muted"> · {item.role}</span> : null}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function FinalCtaSection({ page, children }: { page: PageContent; children?: React.ReactNode }) {
    const { finalCta } = page;
    return (
        <section className="editorial-section final" id={anchor(page, "cta")}>
            <div className="section-inner narrow">
                <h2>{finalCta.title}</h2>
                <p>{finalCta.description}</p>
                {children}
                <div className="hero-actions">
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
