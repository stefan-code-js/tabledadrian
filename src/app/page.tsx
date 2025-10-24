import React from "react";
import SectionLead from "@/components/editorial/SectionLead";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import KeywordHighlighter from "@/components/KeywordHighlighter";
import PullQuote from "@/components/PullQuote";
import FactRow from "@/components/FactRow";
import ImageMosaic from "@/components/ImageMosaic";
import TestimonialCarousel, { type Testimonial } from "@/components/TestimonialCarousel";
import CTABand from "@/components/CTABand";
import { PageHero } from "@/components/StructuredPage";
import { images } from "@/data/images";
import { sitePages } from "@/data/siteContent";
import { createPageMetadata } from "@/lib/metadata";

const page = sitePages.home;

export const metadata = createPageMetadata(page);

const HERO_KEYWORDS = [
    "Table d'Adrian",
    "private chef",
    "luxury dining",
    "bespoke events",
    "Monaco",
    "Dubai",
    "New York City",
    "yacht",
] as const;

const EXPERIENCE_SECTIONS = [
    {
        slug: "experience",
        kicker: "The experience",
        title: "Commissioned culinary storytelling",
        summary:
            "A Table d'Adrian evening transforms villas, penthouses, yachts, and private jets into ephemeral dining rooms choreographed around your guests.",
        detail:
            "Lighting, porcelain, crystal, and pacing are art-directed so conversation flows without interruption while Michelin-caliber cuisine interprets terroir, seasonal markets, and cultural inspirations with poise.",
        image: images.sectionHomeValues,
        align: "left" as const,
    },
    {
        slug: "services",
        kicker: "Services & offerings",
        title: "Private chef engagements without compromise",
        summary:
            "The atelier designs bespoke occasions for residences, yachts, chalets, corporate salons, and brand collaborations across Monaco, Miami, New York City, Dubai, London, Courchevel, and Geneva.",
        detail:
            "Private in-home chef services for intimate celebrations; gala-scale luxury dining for UHNW events; culinary residencies for yachts and private jets; and gastronomic storytelling for luxury maisons are orchestrated by sommeliers, butlers, florists, and mixologists fluent in palace etiquette.",
        image: images.sectionHomeIncluded,
        align: "right" as const,
    },
    {
        slug: "journey",
        kicker: "Chef Adrian's journey",
        title: "Michelin pedigree, global discretion",
        summary:
            "Chef Adrian is an EHL alumnus whose craft matured at Hotel du Cap-Eden-Roc, K2 Palace, Mondrian Cannes, luxury cruises, and private Dior dinners.",
        detail:
            "This foundation powers a chef-for-hire trusted by UHNW families and iconic brands to deliver Michelin-level gastronomy anywhere, supported by service captains, sommeliers, and artisans who anticipate every gesture.",
        image: images.sectionHomeTestimonials,
        align: "left" as const,
    },
    {
        slug: "reach",
        kicker: "Global reach",
        title: "Destinations served worldwide",
        summary:
            "Table d'Adrian operates from the French Riviera while hosting celebrations across the Americas, Europe, the Middle East, and select Asian destinations.",
        detail:
            "Monaco & the Côte d’Azur, Miami & Palm Beach, New York City & the Northeast, Dubai & Abu Dhabi, London & alpine retreats in Courchevel and Geneva, plus bespoke engagements in Los Cabos, Riviera Maya, Singapore, and Hong Kong receive identical atelier-level preparation.",
        image: images.sectionHomeIncluded,
        align: "right" as const,
    },
] as const;

const FACTS = [
    { label: "Languages", value: "English, French, Italian, Arabic, Spanish on request" },
    { label: "Service scope", value: "Private chef, yacht dining, UHNW events, luxury brand collaborations" },
    { label: "Destinations", value: "Monaco, Miami, New York City, Dubai, London, Courchevel, Geneva, worldwide" },
    { label: "Response", value: "Discovery call scheduled within 24 hours of inquiry" },
];

const TESTIMONIALS: Testimonial[] = [
    {
        quote:
            "Table d'Adrian transformed our Monaco villa into a Michelin dining room—service was silent, choreography impeccable, and cuisine unforgettable.",
        name: "Isabelle D.",
        role: "Residence manager, Monaco",
    },
    {
        quote:
            "Our Palm Beach yacht membership flowed from sunrise wellness menus to midnight indulgence without a single detail overlooked.",
        name: "Captain Laurent B.",
        role: "Superyacht captain",
    },
    {
        quote:
            "The New York leadership retreat became an immersive culinary journey that deepened relationships and inspired strategy.",
        name: "James M.",
        role: "Global advisory CEO",
    },
] as const;

const MOSAIC = [
    images.homeGalleryOne,
    images.homeGalleryTwo,
    images.homeGalleryThree,
    images.homeGalleryFour,
];

export default function HomePage() {
    return (
        <article className="editorial-page page-home">
            <PageHero page={page} />

            <div className="editorial-page__content">
                {EXPERIENCE_SECTIONS.map((section, index) => (
                    <SectionLead
                        key={section.slug}
                        kicker={section.kicker}
                        title={<KineticHeading as="h2">{section.title}</KineticHeading>}
                        summary={
                            <KineticParagraph>
                                <KeywordHighlighter
                                    text={section.summary}
                                    keywords={HERO_KEYWORDS}
                                    variant={index % 2 === 0 ? "forest" : "bronze"}
                                />
                            </KineticParagraph>
                        }
                        details={
                            <KineticParagraph>
                                <KeywordHighlighter
                                    text={section.detail}
                                    keywords={HERO_KEYWORDS}
                                    variant={index % 2 === 0 ? "bronze" : "forest"}
                                />
                            </KineticParagraph>
                        }
                        image={section.image}
                        align={section.align}
                    />
                ))}

                <PullQuote
                    quote="Every commission is a bespoke gastronomic story—the cuisine, service, and atmosphere composed to honor the host's narrative."
                    attribution="Chef Adrian"
                    role="Executive Private Chef"
                />

                <FactRow facts={FACTS} />

                <ImageMosaic images={MOSAIC} />

                <TestimonialCarousel testimonials={TESTIMONIALS} />

                <CTABand
                    analyticsId="home-cta"
                    title="Begin your culinary journey"
                    description="Share your celebration, guest profile, and destination. The atelier responds within 24 hours with a tailored proposal, logistics timeline, and culinary direction."
                    primary={{ label: "Reserve a private table", href: "/contact" }}
                    secondary={{ label: "Speak with the chef", href: "/consult" }}
                />
            </div>
        </article>
    );
}




