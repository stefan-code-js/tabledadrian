"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnalyticsBrowser, type Analytics } from "@segment/analytics-next";
import mixpanel from "mixpanel-browser";
import posthog from "posthog-js";
import { useCookieConsent } from "@/components/CookieConsent";

const segmentWriteKey = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY;
const mixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com";

export type AnalyticsClient = {
    track: (event: string, properties?: Record<string, unknown>) => void;
    identify: (id: string, traits?: Record<string, unknown>) => void;
};

const noopClient: AnalyticsClient = {
    track: () => {},
    identify: () => {},
};

const AnalyticsContext = createContext<AnalyticsClient>(noopClient);

export function useAnalytics(): AnalyticsClient {
    return useContext(AnalyticsContext);
}

export default function AnalyticsProvider({ children }: { children: ReactNode }) {
    const { categories, hasConsent } = useCookieConsent();
    const [segment, setSegment] = useState<Analytics | null>(null);
    const mixpanelReady = useRef(false);
    const posthogReady = useRef(false);
    const loadingSegment = useRef(false);

    useEffect(() => {
        if (!hasConsent || !categories.analytics) return;

        if (segmentWriteKey && !segment && !loadingSegment.current) {
            loadingSegment.current = true;
            AnalyticsBrowser.load({ writeKey: segmentWriteKey })
                .then((response) => {
                    const [analytics] = response;
                    setSegment(analytics ?? null);
                })
                .finally(() => {
                    loadingSegment.current = false;
                });
        }

        if (mixpanelToken && !mixpanelReady.current) {
            mixpanel.init(mixpanelToken, {
                debug: false,
                persistence: "localStorage",
            });
            mixpanelReady.current = true;
        }

        if (posthogKey && !posthogReady.current) {
            posthog.init(posthogKey, {
                api_host: posthogHost,
                autocapture: true,
                capture_pageview: false,
            });
            posthogReady.current = true;
        }
    }, [categories.analytics, hasConsent]);

    useEffect(() => {
        if (!categories.analytics || !hasConsent) {
            if (posthogReady.current) {
                posthog.opt_out_capturing();
            }
            if (mixpanelReady.current) {
                mixpanel.opt_out_tracking?.();
            }
        } else {
            if (posthogReady.current) {
                posthog.opt_in_capturing();
            }
            if (mixpanelReady.current) {
                mixpanel.opt_in_tracking?.();
            }
        }
    }, [categories.analytics, hasConsent]);

    const value = useMemo<AnalyticsClient>(() => {
        if (!categories.analytics || !hasConsent) {
            return noopClient;
        }

        return {
            track: (event, properties) => {
                segment?.track(event, properties);
                if (mixpanelReady.current) {
                    mixpanel.track(event, properties);
                }
                if (posthogReady.current) {
                    posthog.capture(event, properties);
                }
            },
            identify: (id, traits) => {
                segment?.identify(id, traits);
                if (mixpanelReady.current) {
                    mixpanel.identify(id);
                    if (traits) {
                        mixpanel.people.set(traits);
                    }
                }
                if (posthogReady.current) {
                    posthog.identify(id, traits);
                }
            },
        } satisfies AnalyticsClient;
    }, [categories.analytics, hasConsent, segment]);

    return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}
