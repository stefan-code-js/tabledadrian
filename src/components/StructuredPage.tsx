import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { PageContent, Tier, PageId } from "@/data/siteContent";
import type { TierCta } from "@/lib/pricing";
import PayButton from "@/components/PayButton";
import { createBreadcrumbJsonLd, createProductJsonLd } from "@/lib/metadata";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import EditorialBlock from "@/components/EditorialBlock";
import PullQuote from "@/components/PullQuote";
import CTABand from "@/components/CTABand";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import FactRow from "@/components/FactRow";
import CardPanel from "@/components/CardPanel";
import { images, type ImageAsset } from "@/data/images";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

const KEYWORDS = ["private table", "Cote d'Azur", "seasonal", "membership", "consult", "chef's table"] as const;

const heroAssets: Record<PageId | "default", ImageAsset> = {
    default: images.heroDefault,
    home: images.heroHome,
    about: images.heroAbout,
    experiences: images.heroExperiences,
    products: images.heroServices,
    contact: images.heroContact,
    gallery: images.heroGallery,
    press: images.heroPress,
    reviews: images.heroReviews,
    adminLeads: images.heroAdminLeads,
    pricingCalculator: images.heroPricing,
};

const anchor = (page: PageContent, target: string) => `${page.slug}-${target}`;

function heroFor(page: PageContent): ImageAsset {
    return heroAssets[page.id] ?? heroAssets.default;
}

type TierActionProps = {
    cta: TierCta;
    context: { pageId: PageId; tierId?: string };
};

function TierAction({ cta, context }: TierActionProps) {
    if (cta.type === "checkout") {
        return (
            <PayButton priceKey={cta.priceKey}>
                {cta.label}
            </PayButton>
        );
    }

    const handleClick = () => {
        trackEvent(ANALYTICS_EVENTS.ctaClick, {
            location: `${context.pageId}-pricing`,
            tier: context.tierId,
            href: cta.href,
            label: cta.label,
        });
    };

    return (
        <Link className="text-link" href={cta.href} onClick={handleClick}>
            {cta.label}
        </Link>
    );
}

const highlight = (text: string, variant: "forest" | "bronze" | "oxblood" = "forest") => (
    <KeywordHighlighter text={text} keywords={KEYWORDS} variant={variant} />
);

export function PageHero({ page }: { page: PageContent }) {
    const figure = heroFor(page);
    const location = `${page.slug}-hero`;

    const handleHeroClick = (kind: "primary" | "secondary", href: string, label: string) => () => {
        trackEvent(ANALYTICS_EVENTS.heroCta, {
            location,
            kind,
            href,
            label,
        });
    };

    return (
        <section className="editorial-hero" id={anchor(page, "hero")}>
            <figure className="full-bleed hero-figure" data-parallax="8">
                <Image
                    src={figure.src}
                    alt={figure.alt}
                    fill
                    priority={figure.priority ?? page.id === "home"}
                    sizes="100vw"
                    placeholder={figure.placeholder}
                    blurDataURL={figure.blurDataURL}
                    className="hero-figure__image"
                />
            </figure>
            <div className="editorial-container hero-copy">
                <span className="hero-kicker">{page.hero?.title ?? page.navLabel}</span>
                <KineticHeading as="h1">{page.hero.title}</KineticHeading>
                <KineticParagraph>{highlight(page.hero.description, "bronze")}</KineticParagraph>
                <div className="cta-row">
                    <Link className="btn" href={page.hero.primaryCta.href} onClick={handleHeroClick("primary", page.hero.primaryCta.href, page.hero.primaryCta.label)}>
                        {page.hero.primaryCta.label}
                    </Link>
                    {page.hero.secondaryCta ? (
                        <Link
                            className="btn ghost"
                            href={page.hero.secondaryCta.href}
                            onClick={handleHeroClick("secondary", page.hero.secondaryCta.href, page.hero.secondaryCta.label)}
                        >
                            {page.hero.secondaryCta.label}
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
    return (
        <section className="editorial-section" id={anchor(page, "values")}>
            <div className="editorial-container">
                <KineticHeading as="h2">{values.title}</KineticHeading>
            </div>
            {values.cards.map((card, index) => (
                <EditorialBlock
                    key={card.title}
                    title={card.title}
                    kicker={index === 0 ? "Focus" : undefined}
                    copy={card.paragraphs.map((paragraph, idx) => (
                        <KineticParagraph key={idx}>{highlight(paragraph, index % 2 === 0 ? "forest" : "bronze")}</KineticParagraph>
                    ))}
                    image={{
                        src: index % 2 === 0 ? "/placeholder/section-home-values.svg" : "/placeholder/section-products-values.svg",
                        alt: card.title,
                        aspect: index % 2 === 0 ? "4 / 5" : "3 / 4",
                    }}
                    align={index % 2 === 0 ? "left" : "right"}
                />
            ))}
            <hr className="separator" />
        </section>
    );
}

export function IncludedSection({ page }: { page: PageContent }) {
    const { included } = page;
    return (
        <section className="editorial-section" id={anchor(page, "included")}>
            <div className="editorial-container">
                <KineticHeading as="h2">{included.title}</KineticHeading>
                {included.intro ? <KineticParagraph>{highlight(included.intro)}</KineticParagraph> : null}
                <CardPanel>
                    {included.paragraphs.map((paragraph, index) => (
                        <KineticParagraph key={index}>{highlight(paragraph, index % 2 === 0 ? "forest" : "bronze")}</KineticParagraph>
                    ))}
                </CardPanel>
            </div>
            <hr className="separator" />
        </section>
    );
}

export function ProcessSection({ page }: { page: PageContent }) {
    const { process } = page;
    const facts = process.steps.map((step, index) => ({
        label: `${index + 1}. ${step.title}`,
        value: step.detail,
    }));
    return (
        <section className="editorial-section" id={anchor(page, "process")}>
            <div className="editorial-container">
                <KineticHeading as="h2">{process.title}</KineticHeading>
                <FactRow facts={facts} />
            </div>
            <hr className="separator" />
        </section>
    );
}

export function PricingSection({ page }: { page: PageContent }) {
    const { pricing } = page;
    if (!pricing.tiers.length) return null;
    return (
        <section className="editorial-section" id={anchor(page, "pricing")}>
            <div className="editorial-container">
                <KineticHeading as="h2">{pricing.title}</KineticHeading>
                <div className="pricing-grid">
                    {pricing.tiers.map((tier: Tier) => (
                        <CardPanel key={tier.id} className="pricing-card">
                            <span className="pricing-card__kicker">{tier.title}</span>
                            {tier.price ? <p className="pricing-card__price">{tier.price}</p> : null}
                            {tier.description ? (
                                <KineticParagraph>{highlight(tier.description, "bronze")}</KineticParagraph>
                            ) : null}
                            {tier.paragraphs.map((paragraph, index) => (
                                <KineticParagraph key={index}>{highlight(paragraph)}</KineticParagraph>
                            ))}
                            {tier.details ? (
                                <KineticParagraph>{highlight(tier.details.body, "oxblood")}</KineticParagraph>
                            ) : null}
                            <div className="pricing-card__cta">
                                <TierAction cta={tier.cta} context={{ pageId: page.id, tierId: tier.id }} />
                            </div>
                        </CardPanel>
                    ))}
                </div>
                {pricing.note ? (
                    <KineticParagraph className="pricing-note">{highlight(pricing.note, "oxblood")}</KineticParagraph>
                ) : null}
            </div>
            <hr className="separator" />
        </section>
    );
}

export function TestimonialsSection({ page }: { page: PageContent }) {
    const { testimonials } = page;
    if (!testimonials.items.length) return null;
    return (
        <section className="editorial-section" id={anchor(page, "testimonials")}>
            <div className="editorial-container">
                <KineticHeading as="h2">{testimonials.title}</KineticHeading>
                <TestimonialCarousel
                    testimonials={testimonials.items.map((item) => ({
                        quote: item.quote,
                        name: item.name,
                        role: item.role,
                    }))}
                />
            </div>
            <hr className="separator" />
        </section>
    );
}

export function FinalCtaSection({ page, children }: { page: PageContent; children?: ReactNode }) {
    const { finalCta } = page;
    return (
        <section className="editorial-section" id={anchor(page, "cta")}>
            <div className="editorial-container">
                <CTABand
                    analyticsId={`${page.slug}-final-cta`}
                    title={finalCta.title}
                    description={finalCta.description}
                    primary={finalCta.primary}
                    secondary={finalCta.secondary}
                />
                {children}
            </div>
        </section>
    );
}

export function PullQuoteSection({ quote, attribution, role }: { quote: string; attribution?: string; role?: string }) {
    return <PullQuote quote={quote} attribution={attribution} role={role} />;
}

export function PageStructuredData({ page }: { page: PageContent }) {
    const data = createProductJsonLd(page);
    if (!data) return null;
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

