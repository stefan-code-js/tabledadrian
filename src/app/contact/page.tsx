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
import ContactForm from "@/components/ContactForm";
import { createPageMetadata } from "@/lib/metadata";

const page = sitePages.contact;

export const metadata = createPageMetadata(page);

export const runtime = "edge";

type ContactPageProps = {
    searchParams?: Promise<Record<string, string | string[]>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
    const resolved = searchParams ? await searchParams : undefined;
    const rawContext = resolved?.context;
    const contextValue = Array.isArray(rawContext) ? rawContext[0] : rawContext;
    const context = contextValue ? decodeURIComponent(contextValue) : undefined;
    return (
        <section className="section structured-page">
            <div className="container container--narrow prose">
                <PageStructuredData page={page} />
                <PageHero page={page} />
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
