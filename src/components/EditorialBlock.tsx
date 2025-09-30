"use client";
import Image, { type StaticImageData } from "next/image";
import { cloneElement, isValidElement, type ReactElement } from "react";
import clsx from "clsx";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/data/images";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";

type EditorialImage =
    | ImageAsset
    | {
          src: string | StaticImageData;
          alt: string;
          aspect?: string;
          placeholder?: "blur" | "empty";
          blurDataURL?: string;
      };

type EditorialBlockProps = {
    title: string;
    copy: ReactNode[];
    image: EditorialImage;
    kicker?: string;
    cta?: ReactNode;
    align?: "left" | "right";
    className?: string;
};

function isImageAsset(image: EditorialImage): image is ImageAsset {
    return typeof (image as ImageAsset).slug === "string";
}

function resolveImage(image: EditorialImage) {
    if (isImageAsset(image)) {
        return {
            src: image.src,
            alt: image.alt,
            aspect: image.aspectRatio,
            placeholder: image.placeholder,
            blurDataURL: image.blurDataURL,
        };
    }

    return {
        src: image.src,
        alt: image.alt,
        aspect: image.aspect,
        placeholder: image.placeholder,
        blurDataURL: image.blurDataURL,
    };
}

export default function EditorialBlock({
    title,
    copy,
    image,
    kicker,
    cta,
    align = "left",
    className,
}: EditorialBlockProps) {
    const classes = clsx("editorial-block", align === "right" && "editorial-block--right", className);

    const resolved = resolveImage(image);
    const parallax = align === "right" ? 5 : 7;
    const aspect = resolved.aspect;
    const placeholder = resolved.placeholder === "blur" ? "blur" : "empty";

    return (
        <section className={`${classes} bg-paper-soft py-6`}>
            <div className="editorial-block__media">
                <div
                    className="editorial-block__frame"
                    data-parallax={parallax}
                    style={aspect ? { aspectRatio: aspect } : undefined}
                >
                    <Image
                        src={resolved.src}
                        alt={resolved.alt}
                        fill
                        sizes="(min-width: 900px) 50vw, 90vw"
                        placeholder={placeholder}
                        blurDataURL={placeholder === "blur" ? resolved.blurDataURL : undefined}
                    />
                </div>
            </div>
            <div className="editorial-block__copy">
                {kicker ? <span className="editorial-block__kicker">{kicker}</span> : null}
                <KineticHeading as="h2" className="editorial-block__title">{title}</KineticHeading>
                {copy.map((paragraph, index) => {
                    if (isValidElement(paragraph) && paragraph.type === KineticParagraph) {
                        const element = paragraph as ReactElement<{ className?: string }>;
                        return cloneElement(element, {
                            key: index,
                            className: clsx("editorial-block__paragraph", element.props.className),
                        });
                    }
                    return (
                        <KineticParagraph key={index} className="editorial-block__paragraph">
                            {paragraph}
                        </KineticParagraph>
                    );
                })}
                {cta ? <div className="editorial-block__cta">{cta}</div> : null}
            </div>
        </section>
    );
}


