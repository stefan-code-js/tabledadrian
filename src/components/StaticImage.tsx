import NextImage, { type ImageLoaderProps, type ImageProps } from "next/image";

const passthroughLoader = ({ src }: ImageLoaderProps): string => src;

type StaticImageProps = Omit<ImageProps, "loader"> & { loader?: never };

export default function StaticImage(props: StaticImageProps) {
    return <NextImage {...props} loader={passthroughLoader} unoptimized />;
}
