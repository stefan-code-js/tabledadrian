import NextImage, { type ImageProps } from "next/image";

type StaticImageProps = Omit<ImageProps, "loader">;

export default function StaticImage(props: StaticImageProps) {
    return <NextImage {...props} unoptimized />;
}
