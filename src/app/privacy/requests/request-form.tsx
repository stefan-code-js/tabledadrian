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
        <section className="card-panel privacy-request">
            <h2 className="privacy-request__title">Submit a data rights request</h2>
            <p className="privacy-request__intro">
                Our data privacy stewards respond within 30 days. We verify your identity using the details you share and keep you informed at every step.
            </p>
            <form className="form form--wide privacy-request__form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <div className="form-grid privacy-request__grid">
                    <label className="field" htmlFor="privacy-email">
                        <span>Email address</span>
                        <input
                            id="privacy-email"
                            {...form.register("email")}
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            aria-invalid={form.formState.errors.email ? "true" : "false"}
                        />
                        {form.formState.errors.email ? (
                            <p className="field__message error" role="alert">
                                {form.formState.errors.email.message}
                            </p>
                        ) : null}
                    </label>

                    <label className="field" htmlFor="privacy-request-type">
                        <span>Request type</span>
                        <select
                            id="privacy-request-type"
                            {...form.register("requestType")}
                        >
                            {REQUEST_TYPES.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="field" htmlFor="privacy-country">
                        <span>Country or region</span>
                        <select
                            id="privacy-country"
                            {...form.register("country")}
                            aria-invalid={form.formState.errors.country ? "true" : "false"}
                        >
                            {countryOptions.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                        {form.formState.errors.country ? (
                            <p className="field__message error" role="alert">
                                {form.formState.errors.country.message}
                            </p>
                        ) : null}
                    </label>
                </div>

                <label className="field" htmlFor="privacy-details">
                    <span>Request details</span>
                    <textarea
                        id="privacy-details"
                        {...form.register("details")}
                        rows={6}
                        placeholder="Describe the data you want to access, erase, or adjust."
                        aria-invalid={form.formState.errors.details ? "true" : "false"}
                    />
                    {form.formState.errors.details ? (
                        <p className="field__message error" role="alert">
                            {form.formState.errors.details.message}
                        </p>
                    ) : (
                        <p className="field__message">
                            Share enough context so our privacy team can honor your request promptly.
                        </p>
                    )}
                </label>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Submitting..." : "Send request"}
                    </button>
                    <p className="form-note">
                        We may reach out for identity verification to honor regulatory requirements.
                    </p>
                </div>

                {status === "success" && ticketId ? (
                    <p className="form-message success" role="status">
                        Thank you. Your request is logged as ticket <strong>{ticketId}</strong>. We will confirm completion within 30 days.
                    </p>
                ) : null}

                {status === "error" && errorMessage ? (
                    <p className="form-message error" role="alert">
                        {errorMessage}
                    </p>
                ) : null}
            </form>
        </section>
    );
}
