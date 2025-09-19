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
import { createPageMetadata } from "@/lib/metadata";

const page = sitePages.home;

export const metadata = createPageMetadata(page);

export default function HomePage() {
    return (
        <article className="editorial-page">
            <PageStructuredData page={page} />
            <PageHero page={page} />
            <ValueSection page={page} />
            <IncludedSection page={page} />
            <ProcessSection page={page} />
            <PricingSection page={page} />
            <TestimonialsSection page={page} />
            <FinalCtaSection page={page} />
        </article>
    );
}
