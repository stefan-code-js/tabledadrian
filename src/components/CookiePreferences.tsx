"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

export type ConsentCategories = {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
};

type CookiePreferencesProps = {
    open: boolean;
    categories: ConsentCategories;
    onSave: (categories: ConsentCategories) => void;
    onClose: () => void;
};

const CategoryDescriptions: Record<keyof ConsentCategories, string> = {
    necessary: "Essential for secure bookings, authentication tokens, and form submissions.",
    analytics: "Helps us measure performance through privacy-aware analytics once you grant consent.",
    marketing: "Enables Mailchimp automations and personalized elixir dispatches tailored to your palate.",
};

export function CookiePreferences({ open, categories, onSave, onClose }: CookiePreferencesProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const firstControlRef = useRef<HTMLInputElement>(null);
    const [draft, setDraft] = useState<ConsentCategories>(categories);

    const handleClose = useCallback(() => {
        setDraft(categories);
        onClose();
    }, [categories, onClose]);

    useEffect(() => {
        if (open) {
            setDraft(categories);
            window.requestAnimationFrame(() => firstControlRef.current?.focus());
        }
    }, [open, categories]);

    useEffect(() => {
        if (!open) return;
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, handleClose]);

    if (!open) return null;

    const handleToggle = (key: keyof ConsentCategories) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (key === "necessary") return;
        setDraft((prev) => ({ ...prev, [key]: event.target.checked }));
    };

    const handleSave = () => {
        onSave({ ...draft, necessary: true });
    };

    let focusAssigned = false;

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/60 px-4" role="presentation">
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="cookie-preferences-title"
                className="w-full max-w-lg rounded-2xl bg-paper-soft p-8 shadow-2xl border border-[var(--line-soft)] text-ink"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-ink-soft mb-2">Refine Consent</p>
                        <h2 id="cookie-preferences-title" className="text-2xl font-serif text-accent">
                            Cookie Preferences
                        </h2>
                        <p className="mt-2 text-sm text-ink-soft">
                            Tailor the analytics and marketing enchantments that accompany your dining journey. Necessary cookies remain active to protect secure experiences.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="text-ink-soft hover:text-accent focus-visible:outline-accent"
                        aria-label="Close cookie preferences"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div className="mt-6 space-y-5">
                    {(Object.keys(categories) as Array<keyof ConsentCategories>).map((key) => {
                        const disabled = key === "necessary";
                        const id = `cookie-toggle-${key}`;
                        const checked = draft[key];
                        const assignRef = !disabled && !focusAssigned;
                        if (assignRef) {
                            focusAssigned = true;
                        }
                        return (
                            <label key={key} className="flex items-start gap-3 rounded-xl border border-[var(--line-hairline)] bg-white/4 px-4 py-3">
                                <input
                                    ref={assignRef ? firstControlRef : undefined}
                                    id={id}
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
                                    checked={checked}
                                    onChange={handleToggle(key)}
                                    disabled={disabled}
                                    aria-describedby={`${id}-description`}
                                />
                                <span>
                                    <span className="block font-semibold text-sm capitalize">{key}</span>
                                    <span id={`${id}-description`} className="text-sm text-ink-soft mt-1 block">
                                        {CategoryDescriptions[key]}
                                    </span>
                                </span>
                            </label>
                        );
                    })}
                </div>

                <div className="mt-8 flex flex-wrap gap-3 justify-end">
                    <button type="button" onClick={handleClose} className="btn ghost text-sm">
                        Cancel
                    </button>
                    <button type="button" onClick={handleSave} className="btn text-sm">
                        Save selections
                    </button>
                </div>
            </div>
        </div>
    );
}
