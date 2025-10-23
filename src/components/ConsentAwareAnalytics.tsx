"use client";

import React from "react";
import dynamic from "next/dynamic";

import { useCookieConsent } from "@/components/CookieConsent";

const VercelAnalytics = dynamic(() => import("@vercel/analytics/next").then((mod) => mod.Analytics), {
    ssr: false,
    loading: () => null,
});

const VercelSpeedInsights = dynamic(
    () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
    {
        ssr: false,
        loading: () => null,
    },
);

export default function ConsentAwareAnalytics() {
    const { categories } = useCookieConsent();
    const isVercelAnalyticsEnabled =
        typeof process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID === "string" &&
        process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID.length > 0;

    if (!categories.analytics || !isVercelAnalyticsEnabled) {
        return null;
    }

    return (
        <>
            <VercelAnalytics />
            <VercelSpeedInsights />
        </>
    );
}
