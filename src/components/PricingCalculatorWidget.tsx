"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PayButton from "@/components/PayButton";
import {
    pricingCalculatorOptions,
    estimatePricing,
    getCalculatorOption,
    formatMoney,
    formatRange,
    type CalculatorOption,
    type TierCta,
} from "@/lib/pricing";

function CTAButton({ cta }: { cta: TierCta }) {
    if (cta.type === "checkout") {
        return (
            <PayButton priceKey={cta.priceKey}>
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
    const [guestInput, setGuestInput] = useState<number>(pricingCalculatorOptions[0].includedGuests || 12);
    const [addons, setAddons] = useState<Record<string, boolean>>({});

    const option = useMemo<CalculatorOption>(() => getCalculatorOption(selectedId), [selectedId]);

    const selectedAddons = useMemo(
        () => Object.entries(addons).filter(([, checked]) => checked).map(([id]) => id),
        [addons]
    );

    const estimate = useMemo(() => estimatePricing(option, guestInput, selectedAddons), [option, guestInput, selectedAddons]);

    const handleOptionChange = (value: string) => {
        const next = getCalculatorOption(value);
        setSelectedId(value);
        setGuestInput(next.includedGuests ?? next.guestRange?.min ?? 10);
        setAddons({});
    };

    const perGuestText = option.perGuest
        ? `${formatMoney(option.perGuest, { includeCadence: false })} per additional guest`
        : undefined;

    return (
        <div className="calculator">
            <label className="calculator-field">
                <span>Experience</span>
                <select value={selectedId} onChange={(event) => handleOptionChange(event.target.value)}>
                    {pricingCalculatorOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </label>

            <p className="muted" style={{ marginTop: 6 }}>
                {option.description}
            </p>

            <label className="calculator-field">
                <span>Guests</span>
                <input
                    type="number"
                    min={option.guestRange?.min ?? 1}
                    value={estimate.guestCount}
                    onChange={(event) => setGuestInput(Number(event.target.value) || 0)}
                />
                {option.includedGuests && option.perGuest ? (
                    <small className="muted">
                        Includes {option.includedGuests} guests · {perGuestText}
                    </small>
                ) : null}
            </label>

            {option.enhancements.length ? (
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
                                <small>
                                    {enhancement.description} · {formatMoney(enhancement.cost, { includeCadence: false })}
                                </small>
                            </span>
                        </label>
                    ))}
                </fieldset>
            ) : null}

            <div className="calculator-summary">
                <p>
                    <strong>Total estimate:</strong> {formatMoney(estimate.total)}
                </p>
                <p>
                    <strong>Deposit due:</strong> {formatMoney(estimate.deposit)}
                </p>
                {option.duration ? (
                    <p className="muted">Service duration: {formatRange(option.duration)}</p>
                ) : null}
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
