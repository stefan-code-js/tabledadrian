import { sitePages } from "@/data/siteContent";
import {
    PageHero,
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
        <section className="editorial-page">
            <div className="editorial-shell">
                <PageStructuredData page={page} />
                <PageHero page={page} />
                <ValueSection page={page} />
                <IncludedSection page={page} />
                <ProcessSection page={page} />
                <section className="editorial-section" id={`${page.slug}-calculator`}>
                    <div className="section-inner">
                        <h2>Interactive calculator</h2>
                        <PricingCalculatorWidget />
                    </div>
                </section>
                <PricingSection page={page} />
                <TestimonialsSection page={page} />
                <FinalCtaSection page={page} />
            </div>
        </section>
    );
}
