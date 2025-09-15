import type { Metadata } from "next";
import { sitePages } from "@/data/siteContent";
import {
    PageHero,
    PageQuickNav,
    ValueSection,
    IncludedSection,
    ProcessSection,
    PricingSection,
    TestimonialsSection,
    FinalCtaSection,
} from "@/components/StructuredPage";

export const metadata: Metadata = {
    title: "Table d’Adrian",
    description:
        "Ingredient-driven cuisine with ritual, aroma, and texture at the center. Seasonal tasting menus for private villas, yachts, and salons along the Côte d’Azur.",
    alternates: { canonical: "https://tabledadrian.com/" },
};

export default function HomePage() {
    const page = sitePages.home;
    return (
        <section className="section structured-page">
            <div className="container container--narrow prose">
                <PageHero page={page} />
                <PageQuickNav page={page} />
                <ValueSection page={page} />
                <IncludedSection page={page} />
                <ProcessSection page={page} />
                <PricingSection page={page} />
                <TestimonialsSection page={page} />
                <FinalCtaSection page={page} />
            </div>
        </section>
    );
}
