"use client";
import Link from "next/link";
import type { MouseEvent } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

type CTA = {
    label: string;
    href: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

type CTABandProps = {
    title: string;
    description: string;
    primary: CTA;
    secondary?: CTA;
    analyticsId?: string;
    className?: string;
};

export default function CTABand({ title, description, primary, secondary, analyticsId, className }: CTABandProps) {
    const classes = ["cta-band", className].filter(Boolean).join(" ");
    const location = analyticsId ?? title;

    const handleClick = (
        kind: "primary" | "secondary",
        href: string,
        label: string,
        userHandler?: (event: MouseEvent<HTMLAnchorElement>) => void,
    ) => {
        return (event: MouseEvent<HTMLAnchorElement>) => {
            trackEvent(ANALYTICS_EVENTS.ctaClick, {
                location,
                kind,
                href,
                label,
            });
            userHandler?.(event);
        };
    };

    return (
        <section className={`${classes} bg-accent-muted py-6`}>
            <div className="cta-band__inner">
                <div className="cta-band__copy">
                    <h3 className="text-ink mb-2">{title}</h3>
                    <p className="text-ink-soft mb-4">{description}</p>
                </div>
                <div className="cta-band__actions flex gap-3">
                    <Link
                        className="cta-band__button cta-band__button--primary bg-accent text-paper px-5 py-2 rounded-md shadow-soft"
                        href={primary.href}
                        onClick={handleClick("primary", primary.href, primary.label, primary.onClick)}
                    >
                        {primary.label}
                    </Link>
                    {secondary ? (
                        <Link
                            className="cta-band__button cta-band__button--secondary bg-paper text-accent px-5 py-2 rounded-md border border-accent"
                            href={secondary.href}
                            onClick={handleClick("secondary", secondary.href, secondary.label, secondary.onClick)}
                        >
                            {secondary.label}
                        </Link>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
