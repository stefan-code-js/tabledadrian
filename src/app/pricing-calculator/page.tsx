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
import PricingCalculatorWidget from "@/components/PricingCalculatorWidget";

export const metadata: Metadata = {
    title: "Pricing Calculator",
    description:
        "Estimate investment for your gathering or program. Adjust guests and enhancements, then route to booking or checkout.",
    alternates: { canonical: "/pricing-calculator" },
};

export default function PricingCalculatorPage() {
    const page = sitePages.pricingCalculator;
    return (
        <section className="section structured-page">
            <div className="container container--narrow prose">
                <PageHero page={page} />
                <PageQuickNav page={page} />
                <ValueSection page={page} />
                <IncludedSection page={page} />
                <ProcessSection page={page} />
                <section className="structured-section" id={`${page.slug}-calculator`}>
                    <h2 className="lux-h center-text">Interactive calculator</h2>
                    <PricingCalculatorWidget />
                </section>
                <PricingSection page={page} />
                <TestimonialsSection page={page} />
                <FinalCtaSection page={page} />
            </div>
        </section>
    );
}
