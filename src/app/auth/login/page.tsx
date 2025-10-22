import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Enter the Atelier | Table d'Adrian",
    description:
        "Authenticate to review personalized itineraries, concierge updates, and secure booking details.",
};

export default function LoginPage() {
    return (
        <AuthShell
            title="Gracefully return to the atelier"
            subtitle="Confirm your credentials to review concierge updates, private itineraries, and in-progress engagements prepared for your household."
        >
            <LoginForm />
            <div className="rounded-2xl border border-[var(--line-hairline)] bg-paper/40 px-4 py-4 text-xs leading-relaxed text-ink-soft">
                <p className="font-semibold text-ink">Need to adjust access?</p>
                <p className="mt-2">
                    If your household upgraded to a new concierge email,{" "}
                    <Link href="/auth/register" className="text-accent underline focus-visible:outline-accent">
                        request a fresh invitation
                    </Link>{" "}
                    so we can refresh your credentials.
                </p>
            </div>
        </AuthShell>
    );
}
