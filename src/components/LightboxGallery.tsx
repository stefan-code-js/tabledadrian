"use client";

import Image from "@/components/StaticImage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ImageAsset } from "@/data/images";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

const FOCUSABLE_SELECTOR = [
    "button:not([disabled])",
    "a[href]",
    "[tabindex]:not([tabindex='-1'])",
].join(",");

type LightboxGalleryProps = {
    images: ImageAsset[];
    className?: string;
    analyticsId?: string;
    thumbSizes?: string;
    lightboxSizes?: string;
};

const DEFAULT_THUMB_SIZES = "(min-width: 900px) 25vw, 90vw";
const DEFAULT_LIGHTBOX_SIZES = "90vw";

export default function LightboxGallery({
    images,
    className,
    analyticsId = "gallery",
    thumbSizes = DEFAULT_THUMB_SIZES,
    lightboxSizes = DEFAULT_LIGHTBOX_SIZES,
}: LightboxGalleryProps) {
    const [active, setActive] = useState<number | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    const location = analyticsId;

    const galleryImages = useMemo(() => {
        const seen = new Set<string>();
        return images.filter((image) => {
            const key = image.slug ?? image.src;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }, [images]);

    const open = useCallback(
        (index: number) => {
            lastFocusedRef.current = document.activeElement as HTMLElement;
            setActive(index);
            const image = galleryImages[index];
            trackEvent(ANALYTICS_EVENTS.galleryOpen, {
                location,
                index,
                slug: image?.slug,
            });
        },
        [galleryImages, location]
    );

    const close = useCallback(() => {
        if (active != null) {
            const image = galleryImages[active];
            trackEvent(ANALYTICS_EVENTS.galleryClose, {
                location,
                index: active,
                slug: image?.slug,
            });
        }
        setActive(null);
    }, [active, galleryImages, location]);

    const navigate = useCallback(
        (direction: "next" | "prev") => {
            if (!galleryImages.length) {
                return;
            }

            setActive((prev) => {
                const current = prev ?? 0;
                const nextIndex =
                    direction === "next"
                        ? (current + 1) % galleryImages.length
                        : (current - 1 + galleryImages.length) % galleryImages.length;
                const image = galleryImages[nextIndex];
                trackEvent(ANALYTICS_EVENTS.galleryNavigate, {
                    location,
                    direction,
                    index: nextIndex,
                    slug: image?.slug,
                });
                return nextIndex;
            });
        },
        [galleryImages, location]
    );

    const visibleImage = useMemo(() => (active != null ? galleryImages[active] : null), [active, galleryImages]);

    useEffect(() => {
        if (active == null) {
            document.body.classList.remove("no-scroll");
            if (lastFocusedRef.current) {
                lastFocusedRef.current.focus();
            }
            return;
        }

        document.body.classList.add("no-scroll");
        const overlay = overlayRef.current;
        if (!overlay) return;

        const focusables = () => Array.from(overlay.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        const firstFocusable = focusables()[0];
        firstFocusable?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                close();
                return;
            }
            if (event.key === "ArrowRight") {
                event.preventDefault();
                navigate("next");
                return;
            }
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                navigate("prev");
                return;
            }
            if (event.key === "Tab") {
                const elms = focusables();
                if (elms.length === 0) return;
                const first = elms[0];
                const last = elms[elms.length - 1];
                if (event.shiftKey) {
                    if (document.activeElement === first) {
                        event.preventDefault();
                        last.focus();
                    }
                } else if (document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        overlay.addEventListener("keydown", handleKeyDown);
        return () => overlay.removeEventListener("keydown", handleKeyDown);
    }, [active, close, navigate]);

    return (
        <div className={["lightbox-gallery", className].filter(Boolean).join(" ")}>
            <div className="lightbox-gallery__grid">
                {galleryImages.map((image, index) => (
                    <button
                        key={`${image.slug}-${index}`}
                        type="button"
                        className="lightbox-gallery__thumb"
                        onClick={() => open(index)}
                    >
                        <span className="sr-only">Open image {image.alt}</span>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes={thumbSizes}
                            placeholder={image.placeholder}
                            blurDataURL={image.blurDataURL}
                        />
                    </button>
                ))}
            </div>

            {active != null && visibleImage ? (
                <div className="lightbox" role="dialog" aria-modal="true" ref={overlayRef}>
                    <div className="lightbox__scrim" aria-hidden="true" onClick={close} />
                    <div className="lightbox__panel">
                        <div className="lightbox__controls">
                            <button type="button" onClick={() => navigate("prev")}>
                                Prev
                            </button>
                            <button type="button" onClick={close}>
                                Close
                            </button>
                            <button type="button" onClick={() => navigate("next")}>
                                Next
                            </button>
                        </div>
                        <div className="lightbox__media">
                            <Image
                                src={visibleImage.src}
                                alt={visibleImage.alt}
                                fill
                                sizes={lightboxSizes}
                                placeholder={visibleImage.placeholder}
                                blurDataURL={visibleImage.blurDataURL}
                            />
                        </div>
                        {visibleImage.caption ? <p className="lightbox__caption">{visibleImage.caption}</p> : null}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

