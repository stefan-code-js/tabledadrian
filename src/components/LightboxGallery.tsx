"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { galleryImages } from "@/data/siteContent";

export default function LightboxGallery() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const lastFocused = useRef<HTMLElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (openIndex === null) {
            return;
        }

        function onKey(event: KeyboardEvent) {
            if (event.key === "Escape") {
                event.preventDefault();
                close();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                setOpenIndex((prev) => {
                    if (prev === null) return 0;
                    return (prev + 1) % galleryImages.length;
                });
            } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                setOpenIndex((prev) => {
                    if (prev === null) return galleryImages.length - 1;
                    return (prev - 1 + galleryImages.length) % galleryImages.length;
                });
            }
        }

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [openIndex]);

    useEffect(() => {
        if (typeof document === "undefined") {
            return () => undefined;
        }

        if (openIndex !== null) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [openIndex]);

    useEffect(() => {
        if (openIndex !== null) {
            closeButtonRef.current?.focus();
        } else {
            closeButtonRef.current = null;
        }
    }, [openIndex]);

    function open(index: number, element: HTMLElement) {
        lastFocused.current = element;
        setOpenIndex(index);
    }

    function close() {
        setOpenIndex(null);
        document.body.classList.remove("no-scroll");
        lastFocused.current?.focus();
    }

    const current = openIndex !== null ? galleryImages[openIndex] : null;

    return (
        <div className="gallery-grid" role="list">
            {galleryImages.map((image, index) => (
                <button
                    key={image.src}
                    type="button"
                    className="gallery-tile"
                    onClick={(event) => open(index, event.currentTarget)}
                    aria-label={`Open ${image.alt}`}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        className="gallery-tile__image"
                        loading="lazy"
                        sizes="(min-width: 768px) 33vw, 80vw"
                    />
                </button>
            ))}

            {current ? (
                <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.alt}>
                    <div className="lightbox-backdrop" onClick={close} />
                    <div className="lightbox-body">
                        <div className="lightbox-media">
                            <Image
                                src={current.src}
                                alt={current.alt}
                                width={current.width}
                                height={current.height}
                                sizes="90vw"
                                className="lightbox-image"
                            />
                        </div>
                        <p>{current.caption}</p>
                        <div className="lightbox-actions">
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenIndex((prev) =>
                                        prev === null ? 0 : (prev - 1 + galleryImages.length) % galleryImages.length
                                    )
                                }
                                aria-label="Previous image"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                onClick={close}
                                aria-label="Close gallery"
                                ref={closeButtonRef}
                            >
                                close
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenIndex((prev) =>
                                        prev === null ? 0 : (prev + 1) % galleryImages.length
                                    )
                                }
                                aria-label="Next image"
                            >
                                ›
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
