import Image, { type StaticImageData } from "next/image";

type MosaicImage = {
    src: string | StaticImageData;
    alt: string;
    aspect?: string;
};

type ImageMosaicProps = {
    images: MosaicImage[];
    className?: string;
};

export default function ImageMosaic({ images, className }: ImageMosaicProps) {
    if (images.length === 0) return null;
    const classes = ["image-mosaic", className].filter(Boolean).join(" ");

    return (
        <div className={classes}>
            {images.map((image, index) => (
                <div
                    key={`${image.alt}-${index}`}
                    className="image-mosaic__item"
                    style={image.aspect ? { aspectRatio: image.aspect } : undefined}
                >
                    <Image src={image.src} alt={image.alt} fill sizes="(min-width: 900px) 30vw, 90vw" />
                </div>
            ))}
        </div>
    );
}
