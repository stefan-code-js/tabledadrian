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
        <article className="space-y-space-7">
            <PageStructuredData page={page} />
            <PageHero page={page} />
            <ValueSection page={page} />
            <IncludedSection page={page} />
            <ProcessSection page={page} />
            <section className="w-full max-w-measure mx-auto space-y-space-5" id={`${page.slug}-calculator`}>
                <div className="max-w-xl">
                    <KineticHeading as="h2">Interactive calculator</KineticHeading>
                </div>
                <PricingCalculatorWidget />
                <hr className="border-t border-ink-muted/20" />
            </section>
            <PricingSection page={page} />
            <TestimonialsSection page={page} />
            <FinalCtaSection page={page} />
        </article>
    );
}