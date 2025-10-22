"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { CookiePreferences, type ConsentCategories } from "@/components/CookiePreferences";

type StoredConsent = {
    categories: ConsentCategories;
    updatedAt: string;
};

type CookieConsentContextValue = {
    categories: ConsentCategories;
    hasConsent: boolean;
    openPreferences: () => void;
    acceptAll: () => void;
    rejectNonEssential: () => void;
};

const STORAGE_KEY = "tda-cookie-consent";
const initialCategories: ConsentCategories = {
    necessary: true,
    analytics: false,
    marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function readStoredConsent(): StoredConsent | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as StoredConsent;
    } catch {
        return null;
    }
}

function persistConsent(categories: ConsentCategories) {
    if (typeof window === "undefined") return;
    const payload: StoredConsent = {
        categories,
        updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    const consentEvent = { event: "consent:update", consent: categories };
    if (Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer)) {
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push(consentEvent);
    } else {
        (window as unknown as { dataLayer: unknown[] }).dataLayer = [consentEvent];
    }
}

function ConsentScripts({ categories }: { categories: ConsentCategories }) {
    const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    const cfToken = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

    if (!categories.analytics && !categories.marketing) {
        return null;
    }

    return (
        <>
            {categories.analytics && plausibleDomain ? (
                <Script
                    id="plausible-analytics"
                    src="https://plausible.io/js/script.js"
                    data-domain={plausibleDomain}
                    strategy="afterInteractive"
                    defer
                />
            ) : null}
            {categories.analytics && cfToken ? (
                <Script
                    id="cloudflare-analytics"
                    src="https://static.cloudflareinsights.com/beacon.min.js"
                    strategy="afterInteractive"
                    data-cf-beacon={JSON.stringify({ token: cfToken, spa: true })}
                />
            ) : null}
        </>
    );
}

function Banner({
    visible,
    onAcceptAll,
    onReject,
    onOpenPreferences,
}: {
    visible: boolean;
    onAcceptAll: () => void;
    onReject: () => void;
    onOpenPreferences: () => void;
}) {
    const titleId = "cookie-consent-banner-title";
    if (!visible) return null;

    return (
        <section
            className="fixed inset-x-4 bottom-4 z-[2500] max-w-4xl mx-auto rounded-3xl bg-paper-soft/95 px-6 py-5 shadow-2xl border border-[var(--line-soft)] text-ink"
            role="dialog"
            aria-live="polite"
            aria-modal="false"
            aria-labelledby={titleId}
        >
            <h2 id={titleId} className="text-lg font-semibold text-accent">
                Curate your consent
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
                We use strictly necessary cookies to safeguard bookings. Enable analytics to refine every service cadence, and marketing to receive elixir dispatches tailored to your tastes.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" className="btn text-sm" onClick={onAcceptAll}>
                    Accept all
                </button>
                <button type="button" className="btn ghost text-sm" onClick={onReject}>
                    Reject non-essential
                </button>
                <button
                    type="button"
                    className="btn ghost text-sm underline-offset-4 underline"
                    onClick={onOpenPreferences}
                >
                    Preferences
                </button>
            </div>
        </section>
    );
}

export function CookieConsent({ children }: { children?: React.ReactNode }) {
    const [categories, setCategories] = useState<ConsentCategories>(initialCategories);
    const [preferencesOpen, setPreferencesOpen] = useState(false);
    const [hasConsent, setHasConsent] = useState(false);

    useEffect(() => {
        const stored = readStoredConsent();
        if (stored) {
            setCategories({ ...initialCategories, ...stored.categories });
            setHasConsent(true);
        }
    }, []);

    const saveConsent = useCallback(
        (next: ConsentCategories) => {
            const normalized = { ...next, necessary: true };
            setCategories(normalized);
            setHasConsent(true);
            persistConsent(normalized);
        },
        [setCategories],
    );

    const acceptAll = useCallback(() => {
        saveConsent({ necessary: true, analytics: true, marketing: true });
        setPreferencesOpen(false);
    }, [saveConsent]);

    const rejectNonEssential = useCallback(() => {
        saveConsent({ necessary: true, analytics: false, marketing: false });
        setPreferencesOpen(false);
    }, [saveConsent]);

    const openPreferences = useCallback(() => {
        setPreferencesOpen(true);
    }, []);

    const closePreferences = useCallback(() => {
        setPreferencesOpen(false);
    }, []);

    const handlePreferencesSave = useCallback(
        (next: ConsentCategories) => {
            saveConsent(next);
            setPreferencesOpen(false);
        },
        [saveConsent],
    );

    const contextValue = useMemo<CookieConsentContextValue>(
        () => ({
            categories,
            hasConsent,
            openPreferences,
            acceptAll,
            rejectNonEssential,
        }),
        [categories, hasConsent, openPreferences, acceptAll, rejectNonEssential],
    );

    return (
        <CookieConsentContext.Provider value={contextValue}>
            {children}
            <ConsentScripts categories={categories} />
            <Banner visible={!hasConsent} onAcceptAll={acceptAll} onReject={rejectNonEssential} onOpenPreferences={openPreferences} />
            <CookiePreferences
                open={preferencesOpen}
                categories={categories}
                onSave={handlePreferencesSave}
                onClose={closePreferences}
            />
        </CookieConsentContext.Provider>
    );
}

export function useCookieConsent(): CookieConsentContextValue {
    const context = useContext(CookieConsentContext);
    if (!context) {
        throw new Error("useCookieConsent must be used within CookieConsent");
    }
    return context;
}
