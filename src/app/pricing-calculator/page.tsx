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
import KineticHeading from "@/components/KineticHeading";

const page = sitePages.pricingCalculator;

export const metadata = createPageMetadata(page);

export default function PricingCalculatorPage() {
    return (
        <article className="editorial-page">
            <PageStructuredData page={page} />
            <PageHero page={page} />
            <ValueSection page={page} />
            <IncludedSection page={page} />
            <ProcessSection page={page} />
            <section className="editorial-section" id={`${page.slug}-calculator`}>
                <div className="editorial-container">
                    <div className="section-heading">
                        <KineticHeading as="h2">Interactive calculator</KineticHeading>
                    </div>
                    <PricingCalculatorWidget />
                </div>
                <hr className="separator" />
            </section>
            <PricingSection page={page} />
            <TestimonialsSection page={page} />
            <FinalCtaSection page={page} />
        </article>
    );
}
