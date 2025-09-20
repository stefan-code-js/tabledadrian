"use client";

import { useEffect } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

type Props = {
    priceId?: string;
    sessionId?: string;
};

export default function CheckoutSuccessBeacon({ priceId, sessionId }: Props) {
    useEffect(() => {
        if (!priceId && !sessionId) {
            return;
        }
        trackEvent(ANALYTICS_EVENTS.checkoutSuccess, { priceId, sessionId });
    }, [priceId, sessionId]);

    return null;
}
