"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Crisp } from "crisp-sdk-web";
import { useAnalytics } from "@/providers/AnalyticsProvider";

const crispWebsiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

export default function LiveConciergeChat() {
    const { data: session } = useSession();
    const analytics = useAnalytics();
    const initializedRef = useRef(false);

    useEffect(() => {
        if (!crispWebsiteId || typeof window === "undefined" || initializedRef.current) {
            return;
        }

        try {
            Crisp.configure(crispWebsiteId);
            Crisp.chat.show();
            initializedRef.current = true;
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.warn("Unable to initialize Crisp chat", error);
            }
        }
    }, []);

    useEffect(() => {
        if (!initializedRef.current || !session?.user) {
            return;
        }

        const name = session.user.name ?? undefined;
        const email = session.user.email ?? undefined;
        const wallet = session.user.walletAddress ?? undefined;

        try {
            if (email) {
                Crisp.user.setEmail(email);
            }
            if (name) {
                Crisp.user.setNickname(name);
            }
            const sessionData: Record<string, string> = {};
            if (wallet) {
                sessionData.wallet = wallet;
            }
            const roles = Array.isArray(session.user.roles) ? session.user.roles.join(", ") : undefined;
            if (roles) {
                sessionData.roles = roles;
            }
            if (Object.keys(sessionData).length > 0) {
                Crisp.session.setData(sessionData);
            }

            analytics.identify(session.user.email ?? session.user.name ?? "guest", {
                concierge_chat_enabled: true,
            });
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.warn("Unable to sync Crisp user profile", error);
            }
        }
    }, [analytics, session?.user]);

    return null;
}
