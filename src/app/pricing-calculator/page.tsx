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
    PageStructuredData,
} from "@/components/StructuredPage";
import PricingCalculatorWidget from "@/components/PricingCalculatorWidget";
import { createPageMetadata } from "@/lib/metadata";

const page = sitePages.pricingCalculator;

export const metadata = createPageMetadata(page);

export default function PricingCalculatorPage() {
    return (
        <section className="section structured-page">
            <div className="container container--narrow prose">
                <PageStructuredData page={page} />
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
