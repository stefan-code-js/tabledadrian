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
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
    title: "Contact & Booking",
    description:
        "Share your date, guest cadence, and intentions. We reply with availability, pricing, and clear next steps within 24 hours.",
    alternates: { canonical: "/contact" },
};

export const runtime = "edge";

export default function ContactPage({ searchParams }: { searchParams?: { context?: string } }) {
    const page = sitePages.contact;
    const context = searchParams?.context ? decodeURIComponent(searchParams.context) : undefined;
    return (
        <section className="section structured-page">
            <div className="container container--narrow prose">
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
