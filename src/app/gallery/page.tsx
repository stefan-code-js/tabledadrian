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
import LightboxGallery from "@/components/LightboxGallery";

export const metadata: Metadata = {
    title: "Gallery",
    description: "A look at recent tables: ceramics, courses, and atmospheres curated for villas, yachts, and salons.",
    alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
    const page = sitePages.gallery;
    return (
        <section className="section structured-page">
            <div className="container container--narrow prose">
                <PageHero page={page} />
                <PageQuickNav page={page} />
                <ValueSection page={page} />
                <IncludedSection page={page} />
                <ProcessSection page={page} />
                <section className="structured-section" id={`${page.slug}-gallery`}>
                    <h2 className="lux-h center-text">Gallery</h2>
                    <LightboxGallery />
                </section>
                <PricingSection page={page} />
                <TestimonialsSection page={page} />
                <FinalCtaSection page={page} />
            </div>
        </section>
    );
}
