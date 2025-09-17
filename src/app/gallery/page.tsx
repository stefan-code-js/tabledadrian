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
import LightboxGallery from "@/components/LightboxGallery";
import { createPageMetadata } from "@/lib/metadata";

const page = sitePages.gallery;

export const metadata = createPageMetadata(page);

export default function GalleryPage() {
    return (
        <section className="section structured-page">
            <div className="container container--narrow prose">
                <PageStructuredData page={page} />
                <PageHero page={page} />
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
