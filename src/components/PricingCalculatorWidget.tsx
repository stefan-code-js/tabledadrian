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
            <PayButton priceHandle={cta.priceHandle}>
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
        <div className="grid gap-space-4">
            <label className="grid gap-space-1">
                <span className="text-fluid-sm text-ink-muted">Experience</span>
                <select
                    className="w-full bg-cream-soft border-b border-ink-muted/20 focus:border-ink-muted transition-colors duration-300 ease-in-out py-space-2 px-space-1"
                    value={selectedId}
                    onChange={(event) => handleOptionChange(event.target.value)}
                >
                    {pricingCalculatorOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </label>

            <p className="text-ink-muted text-fluid-sm">
                {option.description}
            </p>

            <label className="grid gap-space-1">
                <span className="text-fluid-sm text-ink-muted">Guests</span>
                <input
                    className="w-full bg-cream-soft border-b border-ink-muted/20 focus:border-ink-muted transition-colors duration-300 ease-in-out py-space-2 px-space-1"
                    type="number"
                    min={option.guestRange?.min ?? 1}
                    value={estimate.guestCount}
                    onChange={(event) => setGuestInput(Number(event.target.value) || 0)}
                />
                {option.includedGuests && option.perGuest ? (
                    <small className="text-ink-muted">
                        Includes {option.includedGuests} guests {" \u00B7 "}{perGuestText}
                    </small>
                ) : null}
            </label>

            {option.enhancements.length ? (
                <fieldset className="grid gap-space-2">
                    <legend className="text-fluid-sm text-ink-muted">Add enhancements</legend>
                    {option.enhancements.map((enhancement) => (
                        <label key={enhancement.id} className="flex items-center gap-space-2">
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
                                <small className="block text-ink-muted">
                                    {enhancement.description}{" \u00B7 "}{formatMoney(enhancement.cost, { includeCadence: false })}
                                </small>
                            </span>
                        </label>
                    ))}
                </fieldset>
            ) : null}

            <div className="grid gap-space-1 text-right">
                <p>
                    <strong>Total estimate:</strong> {formatMoney(estimate.total)}
                </p>
                <p>
                    <strong>Deposit due:</strong> {formatMoney(estimate.deposit)}
                </p>
                {option.duration ? (
                    <p className="text-ink-muted">Service duration: {formatRange(option.duration)}</p>
                ) : null}
            </div>

            <div className="flex justify-end gap-space-2">
                <CTAButton cta={option.cta} />
                <Link className="btn ghost" href={`/contact?context=${encodeURIComponent(option.id)}`}>
                    Send inquiry
                </Link>
            </div>
        </div>
    );
}