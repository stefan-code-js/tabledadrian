"use client";

import React from "react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type SessionProviderProps = {
    children: React.ReactNode;
    session?: Session | null;
};

export default function LuxurySessionProvider({ children, session }: SessionProviderProps) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
