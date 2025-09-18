import Image from "next/image";
import Link from "next/link";
import type { PageContent, Tier, PageId, SectionKey } from "@/data/siteContent";
import type { TierCta } from "@/lib/pricing";
import { priceCatalog } from "@/lib/pricing";
import PayButton from "@/components/PayButton";
import { createProductJsonLd } from "@/lib/metadata";

const heroImages: Record<PageId | "default", { src: string; alt: string }> = {
    default: {
        src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?fm=webp&w=2400&h=1600&fit=crop&q=85",
        alt: "Soft daylight across a linen-covered table set with ceramics and herbs.",
    },
    home: {
        src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?fm=webp&w=2400&h=1600&fit=crop&q=85",
        alt: "Table set for an intimate dinner with natural light and seasonal dishes.",
    },
    about: {
        src: "https://images.unsplash.com/photo-1529692236671-f1dc28ac0f2a?fm=webp&w=2400&h=1600&fit=crop&q=85",
        alt: "Chef plating a dish with precision in a calm kitchen.",
    },
    experiences: {
        src: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?fm=webp&w=2400&h=1600&fit=crop&q=85",
        alt: "Evening coastal view beyond a candlelit table.",
    },
    products: {
        src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?fm=webp&w=2400&h=1600&fit=crop&q=85",
        alt: "Minimal pantry shelves with glass jars and linen.",
    },
    contact: {
        src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?fm=webp&w=2400&h=1600&fit=crop&q=85",
        alt: "Handwritten notes beside a porcelain cup on a marble surface.",
    },
    gallery: {
        src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?fm=webp&w=2400&h=1600&fit=crop&q=85",
        alt: "Minimal pantry shelves with glass jars and linen.",
    },
    press: {
        src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?fm=webp&w=2400&h=1600&fit=crop&q=85",
        alt: "Stacks of crisp newsprint beside a ceramic cup.",
    },
    reviews: {
        src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?fm=webp&w=2400&h=1600&fit=crop&q=85",
        alt: "Soft daylight across a linen-covered table set with ceramics and herbs.",
    },
    adminLeads: {
        src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?fm=webp&w=2400&h=1600&fit=crop&q=85",
        alt: "Handwritten notes beside a porcelain cup on a marble surface.",
    },
    pricingCalculator: {
        src: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?fm=webp&w=2400&h=1600&fit=crop&q=85",
        alt: "Minimal desk with a calculator, notebook, and soft light.",
    },
};

const sectionIllustrations: Partial<
    Record<PageId, Partial<Record<SectionKey, { src: string; alt: string }>>>
> = {
    home: {
        values: {
            src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=webp&w=2000&h=1334&fit=crop&q=85",
            alt: "Close view of plated seasonal vegetables with herbs.",
        },
        included: {
            src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?fm=webp&w=2000&h=1334&fit=crop&q=85",
            alt: "Dining table being set with glassware and linens.",
        },
        testimonials: {
            src: "https://images.unsplash.com/photo-1514986888952-8cd320577b68?fm=webp&w=2000&h=1334&fit=crop&q=85",
            alt: "Guests gathered around a candlelit table.",
        },
    },
    about: {
        values: {
            src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?fm=webp&w=2000&h=1334&fit=crop&q=85",
            alt: "Chef presenting a composed dish on porcelain.",
        },
        process: {
            src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?fm=webp&w=2000&h=1334&fit=crop&q=85",
            alt: "Notebook with meticulous planning notes.",
        },
    },
    experiences: {
        values: {
            src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=webp&w=2000&h=1334&fit=crop&q=85",
            alt: "Fine dining plating with tweezers and herbs.",
        },
        pricing: {
            src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?fm=webp&w=2000&h=1334&fit=crop&q=85",
            alt: "Glassware aligned on a linen runner.",
        },
    },
    products: {
        values: {
            src: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?fm=webp&w=2000&h=1334&fit=crop&q=85",
            alt: "Curated pantry shelves with jars and tools.",
        },
    },
    contact: {
        included: {
            src: "https://images.unsplash.com/photo-1526925539332-aa3b66e35444?fm=webp&w=2000&h=1334&fit=crop&q=85",
            alt: "Calligraphed invitation resting beside a fountain pen.",
        },
    },
};

const anchor = (page: PageContent, target: string) => `${page.slug}-${target}`;

function heroFor(page: PageContent) {
    return heroImages[page.id] ?? heroImages.default;
}

function illustrationFor(page: PageContent, key: SectionKey) {
    return sectionIllustrations[page.id]?.[key];
}

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
    const figure = heroFor(page);

    return (
        <section className="editorial-hero" id={anchor(page, "hero")}>
            <figure className="full-bleed hero-figure">
                <Image
                    src={figure.src}
                    alt={figure.alt}
                    fill
                    priority
                    sizes="100vw"
                    className="hero-figure__image"
                />
            </figure>
            <div className="editorial-container hero-copy">
                <h1>{hero.title}</h1>
                <p className="lead">{hero.description}</p>
                <div className="cta-row">
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
            <hr className="separator" />
        </section>
    );
}

export function ValueSection({ page }: { page: PageContent }) {
    const { values } = page;
    const illustration = illustrationFor(page, "values");

    return (
        <section className="editorial-section" id={anchor(page, "values")}>
            <div className="editorial-container">
                <div className="section-heading">
                    <h2>{values.title}</h2>
                </div>
                <div className="two-column">
                    {values.cards.map((card) => (
                        <article key={card.title} className="narrative-block">
                            <h3>{card.title}</h3>
                            {card.paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </article>
                    ))}
                </div>
            </div>
            {illustration ? (
                <figure className="full-bleed narrative-figure">
                    <Image
                        src={illustration.src}
                        alt={illustration.alt}
                        fill
                        sizes="100vw"
                        loading="lazy"
                        className="narrative-figure__image"
                    />
                </figure>
            ) : null}
            <hr className="separator" />
        </section>
    );
}

export function IncludedSection({ page }: { page: PageContent }) {
    const { included } = page;
    const illustration = illustrationFor(page, "included");

    return (
        <section className="editorial-section" id={anchor(page, "included")}>
            <div className="editorial-container">
                <div className="section-heading">
                    <h2>{included.title}</h2>
                </div>
                <div className="narrative-block">
                    {included.intro ? <p>{included.intro}</p> : null}
                    {included.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </div>
            {illustration ? (
                <figure className="full-bleed narrative-figure">
                    <Image
                        src={illustration.src}
                        alt={illustration.alt}
                        fill
                        sizes="100vw"
                        loading="lazy"
                        className="narrative-figure__image"
                    />
                </figure>
            ) : null}
            <hr className="separator" />
        </section>
    );
}

export function ProcessSection({ page }: { page: PageContent }) {
    const { process } = page;
    const illustration = illustrationFor(page, "process");

    return (
        <section className="editorial-section" id={anchor(page, "process")}>
            <div className="editorial-container">
                <div className="section-heading">
                    <h2>{process.title}</h2>
                </div>
                <div className="process-flow">
                    {process.steps.map((step) => (
                        <article key={step.title} className="process-step">
                            <h3>{step.title}</h3>
                            <p>{step.detail}</p>
                        </article>
                    ))}
                </div>
            </div>
            {illustration ? (
                <figure className="full-bleed narrative-figure">
                    <Image
                        src={illustration.src}
                        alt={illustration.alt}
                        fill
                        sizes="100vw"
                        loading="lazy"
                        className="narrative-figure__image"
                    />
                </figure>
            ) : null}
            <hr className="separator" />
        </section>
    );
}

export function PricingSection({ page }: { page: PageContent }) {
    const { pricing } = page;
    const illustration = illustrationFor(page, "pricing");

    return (
        <section className="editorial-section" id={anchor(page, "pricing")}>
            <div className="editorial-container">
                <div className="section-heading">
                    <h2>{pricing.title}</h2>
                </div>
                <div className="pricing-stack">
                    {pricing.tiers.map((tier: Tier) => (
                        <article key={tier.id} className="pricing-tier">
                            <div className="pricing-tier__intro">
                                <h3>{tier.title}</h3>
                                {tier.price ? <p className="pricing-tier__price">{tier.price}</p> : null}
                            </div>
                            <div className="pricing-tier__body">
                                {tier.description ? <p>{tier.description}</p> : null}
                                {tier.paragraphs.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                                {tier.details ? (
                                    <details>
                                        <summary>{tier.details.summary}</summary>
                                        <p>{tier.details.body}</p>
                                    </details>
                                ) : null}
                                <TierAction cta={tier.cta} />
                            </div>
                        </article>
                    ))}
                </div>
                {pricing.note ? <p className="muted note">{pricing.note}</p> : null}
            </div>
            {illustration ? (
                <figure className="full-bleed narrative-figure">
                    <Image
                        src={illustration.src}
                        alt={illustration.alt}
                        fill
                        sizes="100vw"
                        className="narrative-figure__image"
                    />
                </figure>
            ) : null}
            <hr className="separator" />
        </section>
    );
}

export function TestimonialsSection({ page }: { page: PageContent }) {
    const { testimonials } = page;
    const illustration = illustrationFor(page, "testimonials");

    return (
        <section className="editorial-section" id={anchor(page, "testimonials")}>
            <div className="editorial-container">
                <div className="section-heading">
                    <h2>{testimonials.title}</h2>
                </div>
                <div className="pull-quote-stack">
                    {testimonials.items.map((item, index) => (
                        <blockquote className="pull-quote" key={`${item.name}-${index}`}>
                            <p>“{item.quote}”</p>
                            <footer>
                                {item.name}
                                {item.role ? <span> · {item.role}</span> : null}
                            </footer>
                        </blockquote>
                    ))}
                </div>
            </div>
            {illustration ? (
                <figure className="full-bleed narrative-figure">
                    <Image
                        src={illustration.src}
                        alt={illustration.alt}
                        fill
                        sizes="100vw"
                        className="narrative-figure__image"
                    />
                </figure>
            ) : null}
            <hr className="separator" />
        </section>
    );
}

export function FinalCtaSection({ page, children }: { page: PageContent; children?: React.ReactNode }) {
    const { finalCta } = page;

    return (
        <section className="editorial-section" id={anchor(page, "cta")}>
            <div className="editorial-container final-call">
                <h2>{finalCta.title}</h2>
                <p>{finalCta.description}</p>
                {children}
                <div className="cta-row">
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
