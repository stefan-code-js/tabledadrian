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
import { images } from "@/data/images";
import { createPageMetadata } from "@/lib/metadata";
import KineticHeading from "@/components/KineticHeading";

const page = sitePages.gallery;

export const metadata = createPageMetadata(page);

const galleryAssets = [
    images.homeGalleryOne,
    images.homeGalleryTwo,
    images.homeGalleryThree,
    images.homeGalleryFour,
    images.homeGalleryFive,
    images.homeGallerySix,
];

export default function GalleryPage() {
    return (
        <article className="editorial-page">
            <PageStructuredData page={page} />
            <PageHero page={page} />
            <ValueSection page={page} />
            <IncludedSection page={page} />
            <ProcessSection page={page} />
            <section className="editorial-section" id={`${page.slug}-gallery`}>
                <div className="editorial-container">
                    <div className="section-heading">
                        <KineticHeading as="h2">Gallery</KineticHeading>
                    </div>
                    <LightboxGallery images={galleryAssets} analyticsId="gallery-main" />
                </div>
                <hr className="separator" />
            </section>
            <PricingSection page={page} />
            <TestimonialsSection page={page} />
            <FinalCtaSection page={page} />
        </article>
    );
}




