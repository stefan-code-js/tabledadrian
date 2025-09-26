import Image from "next/image";
import type { ImageAsset } from "@/data/images";

type ImageMosaicProps = {
    images: ImageAsset[];
    className?: string;
    sizes?: string;
};

const DEFAULT_SIZES = "(min-width: 900px) 30vw, 90vw";

export default function ImageMosaic({ images, className, sizes = DEFAULT_SIZES }: ImageMosaicProps) {
    if (images.length === 0) return null;
    const classes = ["image-mosaic", className].filter(Boolean).join(" ");

    return (
        <div className={classes}>
            {images.map((image, index) => {
                const intensity = 4 + (index % 3) * 2;

                return (
                    <div
                        key={`${image.slug}-${index}`}
                        className="image-mosaic__item"
                        data-parallax={intensity}
                        style={{ aspectRatio: image.aspectRatio ?? `${image.width} / ${image.height}` }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes={sizes}
                            placeholder={image.placeholder}
                            blurDataURL={image.blurDataURL}
                            className="image-mosaic__image"
                        />
                    </div>
                );
            })}
        </div>
    );
}
