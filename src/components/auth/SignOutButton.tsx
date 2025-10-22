"use client";

import React from "react";
import { signOut } from "next-auth/react";

type Props = {
    className?: string;
};

export default function SignOutButton({ className }: Props) {
    return (
        <button
            type="button"
            className={className ?? "btn ghost text-xs uppercase tracking-[0.35em]"}
            onClick={() => signOut({ callbackUrl: "/" })}
        >
            Sign out
        </button>
    );
}
