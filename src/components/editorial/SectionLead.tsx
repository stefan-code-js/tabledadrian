import Image from "@/components/StaticImage";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import type { ReactNode } from "react";
import { getImage, type ImageAsset, type ImageSlug } from "@/data/images";

const sectionLeadRoot = cva(
    "section-lead grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] items-start",
    {
        variants: {
            align: {
                left: "",
                right: "md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]",
            },
        },
        defaultVariants: {
            align: "left",
        },
    }
);

const mediaVariants = cva("section-lead__media relative rounded-[28px] overflow-hidden", {
    variants: {
        align: {
            left: "order-1",
            right: "md:order-2",
        },
    },
    defaultVariants: {
        align: "left",
    },
});

const copyVariants = cva("section-lead__copy flex flex-col gap-6", {
    variants: {
        align: {
            left: "md:order-2",
            right: "md:order-1",
        },
    },
    defaultVariants: {
        align: "left",
    },
});

export type SectionLeadProps = {
    kicker?: ReactNode;
    title?: ReactNode;
    summary?: ReactNode;
    details?: ReactNode;
    footnote?: ReactNode;
    image?: ImageAsset | ImageSlug;
    align?: "left" | "right";
    children?: ReactNode;
};

export default function SectionLead({
    kicker,
    title,
    summary,
    details,
    footnote,
    image,
    align = "left",
    children,
}: SectionLeadProps) {
    const media = image ? (typeof image === "string" ? getImage(image) : image) : null;

    return (
        <section className={twMerge(sectionLeadRoot({ align }))}>
            {media ? (
                <figure className={twMerge(mediaVariants({ align }))} data-parallax="6">
                    <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(min-width: 768px) 45vw, 100vw"
                        placeholder={media.placeholder}
                        blurDataURL={media.blurDataURL}
                        className="section-lead__image"
                    />
                    {media.caption ? <figcaption>{media.caption}</figcaption> : null}
                </figure>
            ) : null}
            <div className={twMerge(copyVariants({ align }))}>
                {kicker ? <span className="section-lead__kicker">{kicker}</span> : null}
                {title}
                {summary}
                {details}
                {children}
                {footnote ? <div className="section-lead__footnote">{footnote}</div> : null}
            </div>
        </section>
    );
}

