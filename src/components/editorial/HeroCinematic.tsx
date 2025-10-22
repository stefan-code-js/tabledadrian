"use client";

import Image from "@/components/StaticImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import type { MouseEvent, ReactNode } from "react";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";
import { getImage, type ImageAsset, type ImageSlug } from "@/data/images";
import type { ButtonVariant, HeroTone } from "@/lib/theme";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const heroRoot = cva(
    "hero-cinematic relative isolate overflow-hidden",
    {
        variants: {
            tone: {
                nocturne: "hero-cinematic--nocturne bg-ink text-cream",
                ivory: "hero-cinematic--ivory bg-cream text-ink",
            },
        },
        defaultVariants: {
            tone: "nocturne",
        },
    }
);

const heroContent = "hero-cinematic__content";
const heroActions = "hero-cinematic__actions";

export type HeroCinematicAction = {
    label: string;
    href: string;
    variant?: ButtonVariant;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export type HeroCinematicProps = {
    kicker?: string;
    title: string;
    summary?: ReactNode;
    image: ImageAsset | ImageSlug;
    media?: ReactNode;
    primaryAction?: HeroCinematicAction;
    secondaryAction?: HeroCinematicAction;
    tone?: HeroTone;
    analyticsId?: string;
    children?: ReactNode;
};

export default function HeroCinematic({
    kicker,
    title,
    summary,
    image,
    media,
    primaryAction,
    secondaryAction,
    tone = "nocturne",
    analyticsId = "hero",
    children,
}: HeroCinematicProps) {
    const asset = typeof image === "string" ? getImage(image) : image;

    return (
        <section className={twMerge(heroRoot({ tone }))}>
            <div className="hero-cinematic__media" data-parallax="8">
                {media ?? (
                    <Image
                        src={asset.src}
                        alt={asset.alt}
                        fill
                        priority={Boolean(asset.priority)}
                        sizes="(max-width: 900px) 100vw, 960px"
                        placeholder={asset.placeholder}
                        blurDataURL={asset.blurDataURL}
                        className="hero-cinematic__image"
                    />
                )}
                <span className="hero-cinematic__grain" aria-hidden="true" />
            </div>
            <div className={heroContent}>
                {kicker ? <span className="hero-cinematic__kicker">{kicker}</span> : null}
                <KineticHeading as="h1">{title}</KineticHeading>
                {typeof summary === "string" ? (
                    <KineticParagraph>{summary}</KineticParagraph>
                ) : (
                    summary
                )}
                {children}
                {(primaryAction || secondaryAction) && (
                    <div className={heroActions}>
                        {primaryAction ? (
                            <HeroLink
                                {...primaryAction}
                                variant={primaryAction.variant ?? "primary"}
                                context={{ location: analyticsId, kind: "primary" }}
                            />
                        ) : null}
                        {secondaryAction ? (
                            <HeroLink
                                {...secondaryAction}
                                variant={secondaryAction.variant ?? "ghost"}
                                context={{ location: analyticsId, kind: "secondary" }}
                            />
                        ) : null}
                    </div>
                )}
            </div>
        </section>
    );
}

type HeroLinkProps = HeroCinematicAction & {
    variant: ButtonVariant;
    context: { location: string; kind: "primary" | "secondary" };
};

function HeroLink({ label, href, variant, onClick, context }: HeroLinkProps) {
    const prefersReduced = usePrefersReducedMotion();
    const motionProps = prefersReduced
        ? {}
        : {
              whileHover: { y: -3 },
              whileTap: { scale: 0.97 },
          } as const;

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        trackEvent(ANALYTICS_EVENTS.heroCta, {
            location: context.location,
            kind: context.kind,
            href,
            label,
        });
        onClick?.(event);
    };

    return (
        <motion.span className="inline-flex" {...motionProps}>
            <Link className={variant === "ghost" ? "btn ghost" : "btn"} href={href} onClick={handleClick}>
                {label}
            </Link>
        </motion.span>
    );
}


