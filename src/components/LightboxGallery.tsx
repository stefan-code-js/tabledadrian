"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const FOCUSABLE_SELECTOR = [
    "button:not([disabled])",
    "a[href]",
    "[tabindex]:not([tabindex='-1'])",
].join(",");

type LightboxImage = {
    src: string | StaticImageData;
    alt: string;
    caption?: string;
};

type LightboxGalleryProps = {
    images: LightboxImage[];
    className?: string;
};

export default function LightboxGallery({ images, className }: LightboxGalleryProps) {
    const [active, setActive] = useState<number | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    const open = useCallback((index: number) => {
        lastFocusedRef.current = document.activeElement as HTMLElement;
        setActive(index);
    }, []);

    const close = useCallback(() => {
        setActive(null);
    }, []);

    const visibleImage = useMemo(() => (active != null ? images[active] : null), [active, images]);

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
                setActive((prev) => (prev === null ? 0 : (prev + 1) % images.length));
                return;
            }
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                setActive((prev) => (prev === null ? 0 : (prev - 1 + images.length) % images.length));
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
    }, [active, close, images.length]);

    return (
        <div className={["lightbox-gallery", className].filter(Boolean).join(" ")}>
            <div className="lightbox-gallery__grid">
                {images.map((image, index) => (
                    <button
                        key={`${image.alt}-${index}`}
                        type="button"
                        className="lightbox-gallery__thumb"
                        onClick={() => open(index)}
                    >
                        <span className="sr-only">Open image {image.alt}</span>
                        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 900px) 25vw, 90vw" />
                    </button>
                ))}
            </div>

            {active != null && visibleImage ? (
                <div className="lightbox" role="dialog" aria-modal="true" ref={overlayRef}>
                    <div className="lightbox__scrim" aria-hidden="true" onClick={close} />
                    <div className="lightbox__panel">
                        <div className="lightbox__controls">
                            <button type="button" onClick={() => setActive((prev) => (prev === null ? 0 : (prev - 1 + images.length) % images.length))}>
                                Prev
                            </button>
                            <button type="button" onClick={close}>
                                Close
                            </button>
                            <button type="button" onClick={() => setActive((prev) => (prev === null ? 0 : (prev + 1) % images.length))}>
                                Next
                            </button>
                        </div>
                        <div className="lightbox__media">
                            <Image src={visibleImage.src} alt={visibleImage.alt} fill sizes="90vw" />
                        </div>
                        {visibleImage.caption ? <p className="lightbox__caption">{visibleImage.caption}</p> : null}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
