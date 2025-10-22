import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Request Membership | Table d'Adrian",
    description:
        "Request Table d'Adrian access to coordinate concierge engagements and tailored dining experiences.",
};

export default function RegisterPage() {
    return (
        <AuthShell
            title="Request your concierge credentials"
            subtitle="Share your details so we may onboard your household, aligning itineraries, wellness briefings, and private dining updates with your preferences."
            accent="vip"
        >
            <RegisterForm />
            <div className="rounded-2xl border border-[var(--line-hairline)] bg-paper/40 px-4 py-4 text-xs leading-relaxed text-ink-soft">
                <p className="font-semibold text-ink">Already possess credentials?</p>
                <p className="mt-2">
                    <Link href="/auth/login" className="text-accent underline focus-visible:outline-accent">
                        Sign in here
                    </Link>{" "}
                    to manage your itineraries and concierge updates.
                </p>
            </div>
        </AuthShell>
    );
}
