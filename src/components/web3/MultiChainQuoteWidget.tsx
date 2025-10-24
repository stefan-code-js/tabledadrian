"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useAnalytics } from "@/providers/AnalyticsProvider";

type QuoteSource = "live" | "fallback";

type Quote = {
    networkId: string;
    networkLabel: string;
    assetSymbol: string;
    assetName: string;
    assetType: "native" | "stablecoin";
    tokenPrice: number;
    tokenAmount: number;
};

type QuoteResponse = {
    amount: number;
    currency: "usd" | "eur" | "gbp";
    source: QuoteSource;
    updatedAt: string;
    quotes: Quote[];
};

type Props = {
    defaultAmount?: number;
};

const CURRENCIES: Array<{ value: "usd" | "eur" | "gbp"; label: string }> = [
    { value: "usd", label: "USD" },
    { value: "eur", label: "EUR" },
    { value: "gbp", label: "GBP" },
];

const FETCH_DEBOUNCE_MS = 300;

export default function MultiChainQuoteWidget({ defaultAmount = 25000 }: Props) {
    const analytics = useAnalytics();
    const [amountInput, setAmountInput] = useState(() => defaultAmount.toString());
    const [currency, setCurrency] = useState<"usd" | "eur" | "gbp">("usd");
    const [quote, setQuote] = useState<QuoteResponse | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");
    const [message, setMessage] = useState<string | null>("Loading live routes...");
    const abortRef = useRef<AbortController | null>(null);

    const normalizedAmount = useMemo(() => {
        const numeric = Number.parseFloat(amountInput.replace(/[^0-9.]/g, ""));
        return Number.isFinite(numeric) ? numeric : 0;
    }, [amountInput]);

    useEffect(() => {
        if (abortRef.current) {
            abortRef.current.abort();
            abortRef.current = null;
        }

        if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
            setStatus("idle");
            setQuote(null);
            setMessage("Enter an amount to preview settlement routes.");
            return;
        }

        setStatus("loading");
        setMessage("Refreshing cross-chain rates...");

        const controller = new AbortController();
        abortRef.current = controller;
        const timer = setTimeout(async () => {
            try {
                const response = await fetch("/api/payments/quote", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount: normalizedAmount, currency }),
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error("Unable to load quotes");
                }

                const payload = (await response.json()) as QuoteResponse;
                setQuote(payload);
                setStatus("idle");
                setMessage(null);
                analytics.track("web3.payments.quote_loaded", {
                    amount: payload.amount,
                    currency: payload.currency,
                    source: payload.source,
                });
            } catch (error) {
                if (controller.signal.aborted) {
                    return;
                }
                setStatus("error");
                setQuote(null);
                setMessage(error instanceof Error ? error.message : "Unable to refresh quotes.");
                analytics.track("web3.payments.quote_failed", {
                    currency,
                    reason: error instanceof Error ? error.message : "unknown",
                });
            }
        }, FETCH_DEBOUNCE_MS);

        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, [analytics, currency, normalizedAmount]);

    const currencyLabel = useMemo(() => CURRENCIES.find((option) => option.value === (quote?.currency ?? currency))?.label ?? "USD", [
        currency,
        quote?.currency,
    ]);

    const currencyFormatter = useMemo(
        () =>
            new Intl.NumberFormat("en", {
                style: "currency",
                currency: (quote?.currency ?? currency).toUpperCase(),
                maximumFractionDigits: 0,
            }),
        [currency, quote?.currency],
    );

    const tokenFormatter = useMemo(
        () =>
            new Intl.NumberFormat("en", {
                maximumFractionDigits: 4,
            }),
        [],
    );

    const priceFormatter = useMemo(
        () =>
            new Intl.NumberFormat("en", {
                style: "currency",
                currency: (quote?.currency ?? currency).toUpperCase(),
                maximumFractionDigits: 2,
            }),
        [currency, quote?.currency],
    );

    return (
        <section className="multi-chain-quote">
            <div className="multi-chain-quote__header">
                <span className="page-eyebrow">Multi-chain settlement</span>
                <h2 id="multi-chain-quote-heading" className="page-heading">
                    Preview concierge payment routes
                </h2>
                <p className="page-subheading">
                    Enter your proposed retainer or tasting investment to view the equivalent amounts across the concierge&apos;s
                    preferred chains.
                </p>
            </div>

            <div className="multi-chain-quote__form" role="group" aria-labelledby="multi-chain-quote-heading">
                <label className="field" htmlFor="quote-amount">
                    <span>Investment amount</span>
                    <input
                        id="quote-amount"
                        inputMode="decimal"
                        type="text"
                        value={amountInput}
                        onChange={(event) => setAmountInput(event.target.value)}
                        placeholder="25000"
                        aria-describedby="multi-chain-quote-helper"
                    />
                </label>
                <label className="field" htmlFor="quote-currency">
                    <span>Currency</span>
                    <select
                        id="quote-currency"
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value as typeof currency)}
                    >
                        {CURRENCIES.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <p id="multi-chain-quote-helper" className="multi-chain-quote__helper">
                Quotes refresh automatically and stay private to your browser.
            </p>

            <div className="multi-chain-quote__status" role="status" aria-live="polite">
                {message ? message : null}
            </div>

            {quote ? (
                <div className="multi-chain-quote__grid">
                    {quote.quotes.map((item) => {
                        const amountLabel = tokenFormatter.format(item.tokenAmount);
                        const priceLabel = priceFormatter.format(item.tokenPrice);
                        const badge = item.assetType === "native" ? "Native" : "Stablecoin";
                        return (
                            <article key={`${item.networkId}-${item.assetSymbol}`} className="multi-chain-quote__card">
                                <header className="multi-chain-quote__card-header">
                                    <span className="multi-chain-quote__badge">{badge}</span>
                                    <h3>{item.networkLabel}</h3>
                                </header>
                                <p className="multi-chain-quote__asset">{item.assetSymbol}</p>
                                <p className="multi-chain-quote__amount">≈ {amountLabel}</p>
                                <p className="multi-chain-quote__price">{priceLabel} per {item.assetSymbol}</p>
                                <p className="multi-chain-quote__note">{item.assetName}</p>
                            </article>
                        );
                    })}
                </div>
            ) : null}

            <footer className="multi-chain-quote__footer">
                <span>
                    {status === "error"
                        ? "Rates unavailable. Concierge will confirm settlement during intake."
                        : `~${currencyFormatter.format(normalizedAmount || quote?.amount || defaultAmount)} ${currencyLabel}`}
                </span>
                <span className={clsx("multi-chain-quote__source", quote?.source === "fallback" && "is-fallback")}>
                    {quote?.source === "live" ? "Live rates powered by CryptoCompare" : "Approximate rates using concierge fallbacks"}
                </span>
                {quote ? (
                    <span className="multi-chain-quote__timestamp">
                        Updated {new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit" }).format(new Date(quote.updatedAt))}
                    </span>
                ) : null}
            </footer>
        </section>
    );
}
