"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const REQUEST_TYPES = [
    { value: "access", label: "Access my data" },
    { value: "erase", label: "Erase my data" },
    { value: "rectify", label: "Rectify inaccuracies" },
    { value: "export", label: "Export my data" },
    { value: "object", label: "Object to processing" },
] as const;

const COUNTRIES = [
    "United States",
    "France",
    "Monaco",
    "United Kingdom",
    "United Arab Emirates",
    "Switzerland",
    "Italy",
    "Spain",
    "Germany",
    "Canada",
] as const;

const schema = z.object({
    email: z.string().email("Use a valid email so we can respond."),
    requestType: z.enum(REQUEST_TYPES.map((item) => item.value) as [typeof REQUEST_TYPES[number]["value"], ...Array<typeof REQUEST_TYPES[number]["value"]>]),
    details: z
        .string()
        .min(20, "Please share enough detail so our privacy team can honor your request.")
        .max(2000, "Please limit to 2,000 characters."),
    country: z.string().min(2, "Select your country"),
});

type FormValues = z.infer<typeof schema>;

export function PrivacyRequestForm() {
    const searchParams = useSearchParams();
    const requestedType = searchParams.get("type");
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            requestType: REQUEST_TYPES[0].value,
            details: "",
            country: COUNTRIES[0],
        },
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [ticketId, setTicketId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (requestedType) {
            const normalized = REQUEST_TYPES.find((item) => item.value === requestedType);
            if (normalized) {
                form.setValue("requestType", normalized.value);
            }
        }
    }, [requestedType, form]);

    const countryOptions = useMemo(() => [...COUNTRIES].sort((a, b) => a.localeCompare(b)), []);

    const onSubmit = async (values: FormValues) => {
        setStatus("loading");
        setTicketId(null);
        setErrorMessage(null);
        try {
            const response = await fetch("/api/privacy/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!response.ok) {
                throw new Error("Unable to log your request. Please retry or email us directly.");
            }
            const payload = (await response.json()) as { ticketId: string };
            setTicketId(payload.ticketId);
            setStatus("success");
            form.reset({
                email: "",
                requestType: values.requestType,
                details: "",
                country: values.country,
            });
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
        }
    };

    return (
        <section className="mt-10 rounded-3xl border border-[var(--line-soft)] bg-paper-soft/60 p-8 text-ink shadow-lg">
            <h2 className="text-2xl font-serif text-accent">Submit a data rights request</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
                Our data privacy stewards respond within 30 days. We will verify your identity using the details you provide below and keep you informed at every step of the transmutation.
            </p>
            <form className="mt-6 grid gap-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <label className="grid gap-2 text-sm">
                    <span className="font-semibold">Email address</span>
                    <input
                        {...form.register("email")}
                        type="email"
                        autoComplete="email"
                        className="rounded-xl border border-[var(--line-hairline)] bg-white/5 px-4 py-3 focus-visible:outline-accent"
                        placeholder="you@example.com"
                        aria-invalid={form.formState.errors.email ? "true" : "false"}
                    />
                    {form.formState.errors.email ? <span className="text-xs text-error">{form.formState.errors.email.message}</span> : null}
                </label>

                <label className="grid gap-2 text-sm">
                    <span className="font-semibold">Request type</span>
                    <select
                        {...form.register("requestType")}
                        className="rounded-xl border border-[var(--line-hairline)] bg-white/5 px-4 py-3 focus-visible:outline-accent"
                    >
                        {REQUEST_TYPES.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="grid gap-2 text-sm">
                    <span className="font-semibold">Country or region</span>
                    <select
                        {...form.register("country")}
                        className="rounded-xl border border-[var(--line-hairline)] bg-white/5 px-4 py-3 focus-visible:outline-accent"
                    >
                        {countryOptions.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                    {form.formState.errors.country ? <span className="text-xs text-error">{form.formState.errors.country.message}</span> : null}
                </label>

                <label className="grid gap-2 text-sm">
                    <span className="font-semibold">Request details</span>
                    <textarea
                        {...form.register("details")}
                        rows={6}
                        className="rounded-xl border border-[var(--line-hairline)] bg-white/5 px-4 py-3 focus-visible:outline-accent"
                        placeholder="Describe the data you want to access, erase, or adjust."
                        aria-invalid={form.formState.errors.details ? "true" : "false"}
                    />
                    {form.formState.errors.details ? <span className="text-xs text-error">{form.formState.errors.details.message}</span> : null}
                </label>

                <div className="flex flex-wrap items-center gap-4">
                    <button
                        type="submit"
                        className="btn"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Submitting..." : "Send request"}
                    </button>
                    <p className="text-xs text-ink-soft">
                        We may reach out for identity verification to honor regulatory requirements.
                    </p>
                </div>

                {status === "success" && ticketId ? (
                    <div className="rounded-xl border border-[var(--line-hairline)] bg-green-500/10 px-4 py-3 text-sm text-green-200">
                        Thank you. Your request is logged as ticket <strong>{ticketId}</strong>. We will confirm completion within 30 days.
                    </div>
                ) : null}

                {status === "error" && errorMessage ? (
                    <div className="rounded-xl border border-[var(--line-hairline)] bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {errorMessage}
                    </div>
                ) : null}
            </form>
        </section>
    );
}
