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
import ContactChannels from "@/components/ContactChannels";
import { createPageMetadata } from "@/lib/metadata";

const page = sitePages.contact;

export const metadata = createPageMetadata(page);

export const runtime = "edge";

type ContactSearchParams = {
    context?: string | string[];
};

async function resolveSearchParams<T>(searchParams?: Promise<T>) {
    if (!searchParams) {
        return undefined as T | undefined;
    }
    try {
        return await searchParams;
    } catch {
        return undefined as T | undefined;
    }
}

export default async function ContactPage({
    searchParams,
}: {
    searchParams?: Promise<ContactSearchParams>;
}) {
    const resolvedParams = await resolveSearchParams(searchParams);
    const contextParam = resolvedParams?.context;
    const contextValue = Array.isArray(contextParam) ? contextParam[0] : contextParam;
    const context = contextValue ? decodeURIComponent(contextValue) : undefined;
    return (
        <article className="editorial-page">
            <PageStructuredData page={page} />
            <PageHero page={page} />
            <ValueSection page={page} />
            <IncludedSection page={page} />
            <ProcessSection page={page} />
            <PricingSection page={page} />
            <TestimonialsSection page={page} />
            <ContactChannels />
            <FinalCtaSection page={page}>
                <ContactForm context={context} />
            </FinalCtaSection>
        </article>
    );
}
