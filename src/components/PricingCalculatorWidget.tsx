"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PayButton from "@/components/PayButton";
import { pricingCalculatorOptions, priceCatalog, estimatePricing, getCalculatorOption } from "@/lib/pricing";
import type { CalculatorOption, TierCta } from "@/lib/pricing";

function CTAButton({ cta }: { cta: TierCta }) {
    if (cta.type === "checkout") {
        const config = priceCatalog[cta.priceKey];
        const mode = cta.mode ?? config.mode;
        return (
            <PayButton priceId={config.id} mode={mode}>
                {cta.label}
            </PayButton>
        );
    }
    return (
        <Link className="btn" href={cta.href}>
            {cta.label}
        </Link>
    );
}

export default function PricingCalculatorWidget() {
    const [selectedId, setSelectedId] = useState<string>(pricingCalculatorOptions[0].id);
    const [guests, setGuests] = useState<number>(pricingCalculatorOptions[0].includedGuests || 10);
    const [addons, setAddons] = useState<Record<string, boolean>>({});

    const option = useMemo<CalculatorOption>(() => getCalculatorOption(selectedId), [selectedId]);

    const selectedAddons = useMemo(
        () => Object.entries(addons).filter(([, checked]) => checked).map(([id]) => id),
        [addons]
    );

    const estimate = useMemo(
        () => estimatePricing(option, guests, selectedAddons),
        [option, guests, selectedAddons]
    );

    return (
        <div className="calculator">
            <label className="calculator-field">
                <span>Experience</span>
                <select
                    value={selectedId}
                    onChange={(event) => {
                        const nextId = event.target.value;
                        setSelectedId(nextId);
                        const target = getCalculatorOption(nextId);
                        setGuests(target?.includedGuests || 0);
                        setAddons({});
                    }}
                >
                    {pricingCalculatorOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </label>

            <p className="muted" style={{ marginTop: 6 }}>{option.description}</p>

            <label className="calculator-field">
                <span>Guests</span>
                <input
                    type="number"
                    min={option.includedGuests || 1}
                    value={estimate.guestCount}
                    onChange={(event) => setGuests(Number(event.target.value) || 0)}
                />
                {option.includedGuests ? (
                    <small className="muted">Includes {option.includedGuests} guests · €{option.perGuest} per additional guest</small>
                ) : null}
            </label>

            <fieldset className="calculator-field">
                <legend>Add enhancements</legend>
                {option.enhancements.map((enhancement) => (
                    <label key={enhancement.id} className="addon">
                        <input
                            type="checkbox"
                            checked={Boolean(addons[enhancement.id])}
                            onChange={(event) =>
                                setAddons((prev) => ({
                                    ...prev,
                                    [enhancement.id]: event.target.checked,
                                }))
                            }
                        />
                        <span>
                            {enhancement.label}
                            <small>{enhancement.description} · €{enhancement.amount.toLocaleString("en-GB")}</small>
                        </span>
                    </label>
                ))}
            </fieldset>

            <div className="calculator-summary">
                <p>
                    <strong>Total estimate:</strong> €{estimate.total.toLocaleString("en-GB")}
                </p>
                <p>
                    <strong>Deposit due:</strong> €{estimate.deposit.toLocaleString("en-GB")}
                </p>
            </div>

            <div className="hero-ctas" style={{ marginTop: 16 }}>
                <CTAButton cta={option.cta} />
                <Link className="btn ghost" href={`/contact?context=${encodeURIComponent(option.id)}`}>
                    send inquiry
                </Link>
            </div>
        </div>
    );
}
