import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-[calc(100vh-120px)] items-center justify-center overflow-hidden px-6 py-24">
            <div className="pointer-events-none absolute inset-0 opacity-60">
                <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-[var(--color-accent)] blur-3xl" />
                <div className="absolute bottom-0 right-[-6rem] h-80 w-80 rounded-full bg-[var(--color-ink-soft)] blur-3xl" />
            </div>
            <div className="relative z-10 w-full">{children}</div>
        </div>
    );
}
