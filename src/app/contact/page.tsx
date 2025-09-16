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

type ContactSearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ContactPage({ searchParams }: { searchParams?: ContactSearchParams }) {
    const resolved = (await searchParams) ?? {};
    const rawContext = resolved.context;
    const encodedContext = Array.isArray(rawContext) ? rawContext[0] : rawContext;
    let context: string | undefined;
    if (encodedContext) {
        try {
            context = decodeURIComponent(encodedContext);
        } catch {
            context = encodedContext;
        }
    }
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
