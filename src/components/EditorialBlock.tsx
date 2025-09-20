import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type EditorialBlockProps = {
    title: string;
    copy: ReactNode[];
    image: { src: string | StaticImageData; alt: string; aspect?: string };
    kicker?: string;
    cta?: ReactNode;
    align?: "left" | "right";
    className?: string;
};

export default function EditorialBlock({
    title,
    copy,
    image,
    kicker,
    cta,
    align = "left",
    className,
}: EditorialBlockProps) {
    const classes = ["editorial-block", align === "right" ? "editorial-block--right" : "", className]
        .filter(Boolean)
        .join(" ");

    return (
        <section className={classes}>
            <div className="editorial-block__media">
                <div className="editorial-block__frame" style={image.aspect ? { aspectRatio: image.aspect } : undefined}>
                    <Image src={image.src} alt={image.alt} fill sizes="(min-width: 900px) 50vw, 90vw" />
                </div>
            </div>
            <div className="editorial-block__copy">
                {kicker ? <span className="editorial-block__kicker">{kicker}</span> : null}
                <h2 className="editorial-block__title">{title}</h2>
                {copy.map((paragraph, index) => (
                    <div className="editorial-block__paragraph" key={index}>
                        {paragraph}
                    </div>
                ))}
                {cta ? <div className="editorial-block__cta">{cta}</div> : null}
            </div>
        </section>
    );
}
