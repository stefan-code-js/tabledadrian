import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Request Membership | Table d'Adrian",
    description:
        "Apply for Table d'Adrian membership to unlock private recipes, collectible drops, and bespoke hospitality intelligence.",
};

export default function RegisterPage() {
    return (
        <AuthShell
            title="Request your alchemy credentials"
            subtitle="Share your details so we may induct you into the Table d'Adrian circle—complete with cinematic recipes, collectible unlocks, and invite-only salons."
            accent="vip"
        >
            <RegisterForm />
            <div className="rounded-2xl border border-[var(--line-hairline)] bg-paper/40 px-4 py-4 text-xs leading-relaxed text-ink-soft">
                <p className="font-semibold text-ink">Already possess credentials?</p>
                <p className="mt-2">
                    <Link href="/auth/login" className="text-accent underline focus-visible:outline-accent">
                        Sign in here
                    </Link>{" "}
                    to explore the latest elixir dispatches and collectible unlocks.
                </p>
            </div>
        </AuthShell>
    );
}
