"use client";

import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useCookieConsent } from "@/components/CookieConsent";

export default function ConsentAwareAnalytics() {
    const { categories } = useCookieConsent();

    if (!categories.analytics) {
        return null;
    }

    return (
        <>
            <Analytics />
            <SpeedInsights />
        </>
    );
}
