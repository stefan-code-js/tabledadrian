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

            const payload = (await response.json().catch(() => ({}))) as {
                eligible?: boolean;
                message?: string;
            };

            if (!response.ok || typeof payload.eligible !== "boolean") {
                const errorMessage = payload.message ?? "Verification failed. Please try again.";
                throw new Error(errorMessage);
            }

            setEligible(payload.eligible);
            setStatus("success");
            setMessage(
                payload.eligible
                    ? "Your wallet unlocks the full Alchemy experience. Our concierge will confirm it is linked to your profile."
                    : "We could not confirm a collectible for this wallet. Mint one or contact the concierge to open the vault.",
            );
        } catch (error) {
            setStatus("error");
            setEligible(null);
            setMessage(error instanceof Error ? error.message : "Unexpected issue verifying this wallet.");
        }
    };

    const messageClass =
        eligible === true ? "form-message success" : status === "error" ? "form-message error" : "form-message";
    const messageRole: "alert" | "status" = status === "error" ? "alert" : "status";

    return (
        <section id="verify" className="card-panel collectible-verifier">
            <h3 className="collectible-verifier__title">Verify your collectible</h3>
            <p className="collectible-verifier__intro">
                Enter the wallet address you linked during registration. Verification runs against the on-chain smart
                contract and our concierge registry.
            </p>
            <form className="form form--wide collectible-verifier__form" onSubmit={handleSubmit} noValidate>
                <div className="form-grid collectible-verifier__grid">
                    <label className="field" htmlFor="walletAddress">
                        <span>Wallet address</span>
                        <input
                            id="walletAddress"
                            type="text"
                            placeholder="0x..."
                            value={wallet}
                            onChange={(event) => setWallet(event.target.value)}
                            required
                            pattern="^0x[a-fA-F0-9]{40}$"
                            aria-describedby="wallet-helper"
                        />
                        <p className="field__message" id="wallet-helper">
                            Provide the 42-character address that begins with 0x.
                        </p>
                    </label>
                    <div className="form-actions collectible-verifier__actions">
                        <button
                            type="submit"
                            className="btn text-xs uppercase tracking-[0.3em]"
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "Verifying..." : "Check status"}
                        </button>
                    </div>
                </div>
            </form>
            {message ? (
                <p className={messageClass} role={messageRole}>
                    {message}
                </p>
            ) : null}
        </section>
    );
}
