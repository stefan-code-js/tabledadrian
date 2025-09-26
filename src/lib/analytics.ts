export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
    interface Window {
        plausible?: (event: string, options?: { props?: AnalyticsPayload }) => void;
        ma?: (...args: unknown[]) => void;
    }
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}): void {
    if (typeof window === "undefined") {
        return;
    }

    try {
        if (typeof window.plausible === "function") {
            window.plausible(event, { props: payload });
        }
    } catch {}

    try {
        if (typeof window.ma === "function") {
            window.ma("event", event, payload);
        }
    } catch {}
}

export function bindEvent<K extends keyof HTMLElementEventMap>(
    element: HTMLElement | null,
    type: K,
    eventName: string,
    payload?: AnalyticsPayload,
): void {
    if (!element) return;
    const handler = () => trackEvent(eventName, payload);
    element.addEventListener(type, handler, { once: true });
}

export const ANALYTICS_EVENTS = {
    bookingCta: "booking_cta",
    formStart: "form_start",
    formSuccess: "form_success",
    formError: "form_error",
    checkoutSuccess: "checkout_success",
    menuToggle: "menu_toggle",
    navClick: "nav_click",
    heroCta: "hero_cta",
    ctaClick: "cta_click",
    galleryOpen: "gallery_open",
    galleryNavigate: "gallery_navigate",
    galleryClose: "gallery_close",
};
