"use client";

import { useState } from "react";
import { useAnalytics } from "@/providers/AnalyticsProvider";

type ConciergeBrief = {
    brief: string;
    fallback?: boolean;
    message?: string;
};

export default function ConciergeBriefForm() {
    const analytics = useAnalytics();
    const [occasion, setOccasion] = useState("");
    const [guests, setGuests] = useState("");
    const [preferences, setPreferences] = useState("");
    const [location, setLocation] = useState("");
    const [result, setResult] = useState<ConciergeBrief | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!occasion.trim()) {
            setStatus("error");
            setResult({ brief: "Please describe the occasion so the concierge can tailor your experience." });
            return;
        }
        setStatus("loading");
        setResult(null);
        try {
            const response = await fetch("/api/concierge/brief", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    occasion: occasion.trim(),
                    guests: guests.trim(),
                    preferences: preferences.trim() || undefined,
                    location: location.trim() || undefined,
                }),
            });
            const payload = (await response.json()) as ConciergeBrief;
            if (!response.ok) {
                throw new Error(payload.message ?? "Unable to craft a brief.");
            }
            setResult(payload);
            setStatus("idle");
            analytics.track("concierge.brief.generated", { fallback: payload.fallback ?? false });
        } catch (error) {
            setStatus("error");
            const message = error instanceof Error ? error.message : "Unexpected issue generating your brief.";
            setResult({ brief: message, message });
            analytics.track("concierge.brief.failed", { message });
        }
    };

    return (
        <section className="concierge-brief">
            <div className="concierge-brief__header">
                <span className="page-eyebrow">Concierge intelligence</span>
                <h2 className="page-heading">Preview your bespoke experience</h2>
                <p className="page-subheading">
                    Outline the celebration and our OpenAI concierge drafts an atelier-ready brief with suggested menus, atmospheres,
                    and token-gated perks.
                </p>
            </div>
            <form className="concierge-brief__form" onSubmit={handleSubmit}>
                <label className="field" htmlFor="brief-occasion">
                    <span>Occasion</span>
                    <input
                        id="brief-occasion"
                        value={occasion}
                        onChange={(event) => setOccasion(event.target.value)}
                        placeholder="e.g. Monaco villa anniversary"
                        required
                    />
                </label>
                <label className="field" htmlFor="brief-guests">
                    <span>Guests</span>
                    <input
                        id="brief-guests"
                        value={guests}
                        onChange={(event) => setGuests(event.target.value)}
                        placeholder="e.g. 18 guests"
                    />
                </label>
                <label className="field" htmlFor="brief-location">
                    <span>Destination</span>
                    <input
                        id="brief-location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        placeholder="Monaco · Dubai · NYC"
                    />
                </label>
                <label className="field" htmlFor="brief-preferences">
                    <span>Preferences</span>
                    <textarea
                        id="brief-preferences"
                        value={preferences}
                        onChange={(event) => setPreferences(event.target.value)}
                        placeholder="Wellness-forward, caviar, late-night lounge, token utility"
                        rows={3}
                    />
                </label>
                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn text-xs uppercase tracking-[0.3em]"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Drafting brief..." : "Generate preview"}
                    </button>
                </div>
            </form>
            {result ? (
                <div
                    className={`concierge-brief__result${status === "error" ? " concierge-brief__result--error" : ""}`}
                    role={status === "error" ? "alert" : "status"}
                >
                    <pre>{result.brief}</pre>
                </div>
            ) : null}
        </section>
    );
}
