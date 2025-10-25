"use client";

import { useEffect, useMemo, useRef } from "react";
import { useAnalytics } from "@/providers/AnalyticsProvider";

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
const acuityUrl = process.env.NEXT_PUBLIC_ACUITY_SCHEDULER_URL;

export default function ConciergeScheduler() {
    const analytics = useAnalytics();
    const hasTrackedRef = useRef(false);

    const schedulerUrl = useMemo(() => {
        return calendlyUrl ?? acuityUrl ?? null;
    }, []);

    useEffect(() => {
        if (schedulerUrl || hasTrackedRef.current) {
            return;
        }
        analytics.track("concierge.scheduler.unconfigured");
        hasTrackedRef.current = true;
    }, [analytics, schedulerUrl]);

    if (!schedulerUrl) {
        return (
            <div className="concierge-scheduler concierge-scheduler--fallback">
                <p className="concierge-scheduler__headline">Private scheduling available by request</p>
                <p className="concierge-scheduler__copy">
                    Share your preferred timing in the contact form and the concierge desk will confirm a secure voice or video
                    consultation within the hour.
                </p>
            </div>
        );
    }

    return (
        <div className="concierge-scheduler">
            <iframe
                src={schedulerUrl}
                title="Schedule a concierge consultation"
                className="concierge-scheduler__frame"
                loading="lazy"
                onLoad={() => {
                    if (!hasTrackedRef.current) {
                        analytics.track("concierge.scheduler.loaded");
                        hasTrackedRef.current = true;
                    }
                }}
            />
        </div>
    );
}
