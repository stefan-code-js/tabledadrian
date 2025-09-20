import Image from "next/image";
import Link from "next/link";
import type { PageContent, Tier, PageId, SectionKey } from "@/data/siteContent";
import type { TierCta } from "@/lib/pricing";
import { priceCatalog } from "@/lib/pricing";
import PayButton from "@/components/PayButton";
import { createProductJsonLd } from "@/lib/metadata";
import Reveal from "@/components/Reveal";

const heroImages: Record<PageId | "default", { src: string; alt: string }> = {
    default: {
        src: "/placeholder/hero-default.svg",
        alt: "Soft daylight across a linen-covered table set with ceramics and herbs.",
    },
    home: {
        src: "/placeholder/hero-home.svg",
        alt: "Table set for an intimate dinner with natural light and seasonal dishes.",
    },
    about: {
        src: "/placeholder/hero-about.svg",
        alt: "Chef plating a dish with precision in a calm kitchen.",
    },
    experiences: {
        src: "/placeholder/hero-experiences.svg",
        alt: "Evening coastal view beyond a candlelit table.",
    },
    products: {
        src: "/placeholder/hero-products.svg",
        alt: "Minimal pantry shelves with glass jars and linen.",
    },
    contact: {
        src: "/placeholder/hero-contact.svg",
        alt: "Handwritten notes beside a porcelain cup on a marble surface.",
    },
    gallery: {
        src: "/placeholder/hero-gallery.svg",
        alt: "Minimal pantry shelves with glass jars and linen.",
    },
    press: {
        src: "/placeholder/hero-press.svg",
        alt: "Stacks of crisp newsprint beside a ceramic cup.",
    },
    reviews: {
        src: "/placeholder/hero-reviews.svg",
        alt: "Soft daylight across a linen-covered table set with ceramics and herbs.",
    },
    adminLeads: {
        src: "/placeholder/hero-admin-leads.svg",
        alt: "Handwritten notes beside a porcelain cup on a marble surface.",
    },
    pricingCalculator: {
        src: "/placeholder/hero-pricing-calculator.svg",
        alt: "Minimal desk with a calculator, notebook, and soft light.",
    },
};

const sectionIllustrations: Partial<
    Record<PageId, Partial<Record<SectionKey, { src: string; alt: string }>>>
> = {
    home: {
        values: {
            src: "/placeholder/section-home-values.svg",
            alt: "Close view of plated seasonal vegetables with herbs.",
        },
        included: {
            src: "/placeholder/section-home-included.svg",
            alt: "Dining table being set with glassware and linens.",
        },
        testimonials: {
            src: "/placeholder/section-home-testimonials.svg",
            alt: "Guests gathered around a candlelit table.",
        },
    },
    about: {
        values: {
            src: "/placeholder/section-about-values.svg",
            alt: "Chef presenting a composed dish on porcelain.",
        },
        process: {
            src: "/placeholder/section-about-process.svg",
            alt: "Notebook with meticulous planning notes.",
        },
    },
    experiences: {
        values: {
            src: "/placeholder/section-experiences-values.svg",
            alt: "Fine dining plating with tweezers and herbs.",
        },
        pricing: {
            src: "/placeholder/section-experiences-pricing.svg",
            alt: "Glassware aligned on a linen runner.",
        },
    },
    products: {
        values: {
            src: "/placeholder/section-products-values.svg",
            alt: "Curated pantry shelves with jars and tools.",
        },
    },
    contact: {
        included: {
            src: "/placeholder/section-contact-included.svg",
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
                <Reveal as="h1">{hero.title}</Reveal>
                <Reveal as="p" className="lead">{hero.description}</Reveal>
                <Reveal>
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
                </Reveal>
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
                    <Reveal as="h2">{values.title}</Reveal>
                </div>
                <div className="two-column">
                    {values.cards.map((card) => (
                        <Reveal as="article" className="narrative-block" key={card.title}>
                            <h3>{card.title}</h3>
                            {card.paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </Reveal>
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
                    <Reveal as="h2">{included.title}</Reveal>
                </div>
                <Reveal className="narrative-block">
                    {included.intro ? <p>{included.intro}</p> : null}
                    {included.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </Reveal>
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
                    <Reveal as="h2">{process.title}</Reveal>
                </div>
                <div className="process-flow">
                    {process.steps.map((step) => (
                        <Reveal as="article" className="process-step" key={step.title}>
                            <h3>{step.title}</h3>
                            <p>{step.detail}</p>
                        </Reveal>
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
                    <Reveal as="h2">{pricing.title}</Reveal>
                </div>
                <div className="pricing-stack">
                    {pricing.tiers.map((tier: Tier) => (
                        <Reveal as="article" className="pricing-tier" key={tier.id}>
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
                        </Reveal>
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
                    <Reveal as="h2">{testimonials.title}</Reveal>
                </div>
                <div className="pull-quote-stack">
                    {testimonials.items.map((item, index) => (
                        <Reveal as="blockquote" className="pull-quote" key={`${item.name}-${index}`}>
                            <p>“{item.quote}”</p>
                            <footer>
                                {item.name}
                                {item.role ? <span> · {item.role}</span> : null}
                            </footer>
                        </Reveal>
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
                <Reveal as="h2">{finalCta.title}</Reveal>
                <Reveal as="p">{finalCta.description}</Reveal>
                {children}
                <Reveal>
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
                </Reveal>
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
