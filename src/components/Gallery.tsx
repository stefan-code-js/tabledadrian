// src/components/Gallery.tsx
import Image from "@/components/StaticImage";
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
                            <Image src={shot.src} alt={shot.alt} width={640} height={480} />
                        </figure>
                    ))}
                </div>
            </div>
        </section>

    );
}
