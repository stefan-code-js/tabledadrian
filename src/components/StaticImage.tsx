import NextImage, { type ImageProps } from "next/image";

type StaticImageProps = Omit<ImageProps, "loader"> & {
    quality?: number;
};

export default function StaticImage({ quality, ...props }: StaticImageProps) {
    return <NextImage {...props} quality={quality ?? 85} />;
}
