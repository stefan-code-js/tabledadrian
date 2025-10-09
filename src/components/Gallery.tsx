// src/components/Gallery.tsx
import { images, type ImageAsset } from "@/data/images";

const shots: ImageAsset[] = [
    images.galleryCourseFinish,
    images.galleryTablescape,
    images.galleryLogistics,
    images.galleryPressStudy,
    images.gallerySalonStill,
    images.galleryFlorals,
    images.galleryLedgerDetail,
];

export default function Gallery() {
    return (
        <section className="section" aria-labelledby="gallery-title">
            <div className="container">
                <h2 id="gallery-title" className="section-title center-text">Gallery</h2>
                <div className="gallery" role="list">
                    {shots.map((shot, index) => (
                        <figure role="listitem" key={`${shot.slug}-${index}`}>
                            <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
                        </figure>
                    ))}
                </div>
            </div>
        </section>

    );
}
