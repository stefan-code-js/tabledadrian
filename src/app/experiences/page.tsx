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

export const metadata: Metadata = {
    title: "Experiences & Menus",
    description:
        "Signature tastings, salon suppers, and voyage weekends engineered around your guests, pantry, and properties.",
    alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
    const page = sitePages.experiences;
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
                <FinalCtaSection page={page} />
            </div>
        </section>
    );
}
