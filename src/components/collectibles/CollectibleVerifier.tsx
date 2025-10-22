"use client";

import React, { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function CollectibleVerifier() {
    const [wallet, setWallet] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [message, setMessage] = useState<string | null>(null);
    const [eligible, setEligible] = useState<boolean | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("loading");
        setMessage(null);
        setEligible(null);

        try {
            const response = await fetch("/api/collectibles/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ walletAddress: wallet.trim() }),
            });
            if (!response.ok) {
                const payload = (await response.json()) as { message?: string };
                throw new Error(payload.message ?? "Verification failed.");
            }
            const payload = (await response.json()) as { eligible: boolean };
            setEligible(payload.eligible);
            setStatus("success");
            setMessage(
                payload.eligible
                    ? "Your wallet unlocks the full Alchemy experience—please ensure it is linked to your profile."
                    : "We could not confirm a collectible for this wallet. Mint or acquire one to unlock the vault.",
            );
        } catch (error) {
            setStatus("error");
            setEligible(null);
            setMessage(error instanceof Error ? error.message : "Unexpected issue verifying this wallet.");
        }
    };

    return (
        <section id="verify" className="rounded-3xl border border-[var(--line-hairline)] bg-paper/40 p-6">
            <h3 className="text-lg font-semibold text-ink">Verify your collectible</h3>
            <p className="mt-2 text-sm text-ink-soft">
                Enter the wallet address you linked during registration. Verification runs against the on-chain smart
                contract and our concierge registry.
            </p>
            <form className="mt-4 flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit} noValidate>
                <input
                    type="text"
                    className="flex-1 rounded-2xl border border-[var(--line-hairline)] bg-paper/60 px-4 py-3 text-sm text-ink focus-visible:outline-accent"
                    placeholder="0x..."
                    value={wallet}
                    onChange={(event) => setWallet(event.target.value)}
                    required
                    pattern="^0x[a-fA-F0-9]{40}$"
                />
                <button
                    type="submit"
                    className="btn text-xs uppercase tracking-[0.3em]"
                    disabled={status === "loading"}
                >
                    {status === "loading" ? "Verifying..." : "Check status"}
                </button>
            </form>
            {message ? (
                <p
                    className={`mt-3 text-sm ${
                        eligible ? "text-emerald-200" : status === "error" ? "text-error" : "text-ink-soft"
                    }`}
                >
                    {message}
                </p>
            ) : null}
        </section>
    );
}
