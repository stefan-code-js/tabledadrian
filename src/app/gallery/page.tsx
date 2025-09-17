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
        <section className="editorial-page">
            <div className="editorial-shell">
                <PageStructuredData page={page} />
                <PageHero page={page} />
                <ValueSection page={page} />
                <IncludedSection page={page} />
                <ProcessSection page={page} />
                <section className="editorial-section" id={`${page.slug}-gallery`}>
                    <div className="section-inner">
                        <h2>Gallery</h2>
                        <LightboxGallery />
                    </div>
                </section>
                <PricingSection page={page} />
                <TestimonialsSection page={page} />
                <FinalCtaSection page={page} />
            </div>
        </section>
    );
}
