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
import ContactForm from "@/components/ContactForm";
import { createPageMetadata } from "@/lib/metadata";

const page = sitePages.contact;

export const metadata = createPageMetadata(page);

export const runtime = "edge";

export default function ContactPage({ searchParams }: { searchParams?: { context?: string } }) {
    const context = searchParams?.context ? decodeURIComponent(searchParams.context) : undefined;
    return (
        <section className="section structured-page">
            <div className="container container--narrow prose">
                <PageStructuredData page={page} />
                <PageHero page={page} />
                <PageQuickNav page={page} />
                <ValueSection page={page} />
                <IncludedSection page={page} />
                <ProcessSection page={page} />
                <PricingSection page={page} />
                <TestimonialsSection page={page} />
                <FinalCtaSection page={page}>
                    <ContactForm context={context} />
                </FinalCtaSection>
            </div>
        </section>
    );
}
