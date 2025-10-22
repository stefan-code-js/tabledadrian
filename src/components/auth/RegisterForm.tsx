"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const schema = z
    .object({
        fullName: z
            .string()
            .min(3, "Introduce yourself with at least 3 characters.")
            .max(80, "Keep the name within 80 characters."),
        email: z.string().email("Provide a refined email address."),
        password: z
            .string()
            .min(8, "Use a phrase of at least 8 characters.")
            .regex(/[A-Z]/, "Include at least one capital letter.")
            .regex(/[0-9]/, "Include at least one numeral."),
        confirmPassword: z.string(),
        walletAddress: z
            .string()
            .regex(/^0x[a-fA-F0-9]{40}$/, "Enter a 42-character wallet address starting with 0x.")
            .optional()
            .or(z.literal("")),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "The access phrases do not match.",
        path: ["confirmPassword"],
    });

type FormValues = z.infer<typeof schema>;

export default function RegisterForm() {
    const router = useRouter();
    const [status, setStatus] = useState<"idle" | "submitting">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            walletAddress: "",
        },
    });

    const onSubmit = async (values: FormValues) => {
        setStatus("submitting");
        setErrorMessage(null);
        try {
            const response = await fetch("/api/members/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: values.fullName,
                    email: values.email,
                    password: values.password,
                    walletAddress: values.walletAddress ? values.walletAddress.toLowerCase() : undefined,
                }),
            });

            if (!response.ok) {
                const payload = (await response.json()) as { message?: string };
                setErrorMessage(
                    payload.message ??
                        "We could not complete the registration this moment. Please refine and try once more.",
                );
                setStatus("idle");
                return;
            }

            const signInResult = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (signInResult?.error) {
                setErrorMessage("Registration succeeded, but we could not start your session. Please sign in manually.");
                setStatus("idle");
                return;
            }

            router.replace("/members");
            router.refresh();
        } catch (error) {
            console.error("Registration failed", error);
            setErrorMessage("Our servers are momentarily occupied. Please attempt again shortly.");
            setStatus("idle");
        }
    };

    return (
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-3">
                <label className="text-sm font-semibold text-ink" htmlFor="fullName">
                    Full name
                </label>
                <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    className="rounded-2xl border border-[var(--line-hairline)] bg-paper/60 px-4 py-3 text-sm text-ink focus-visible:outline-accent"
                    placeholder="Alexis Laurent"
                    {...form.register("fullName")}
                    aria-invalid={form.formState.errors.fullName ? "true" : "false"}
                />
                {form.formState.errors.fullName ? (
                    <p className="text-xs text-error">{form.formState.errors.fullName.message}</p>
                ) : null}
            </div>

            <div className="grid gap-3">
                <label className="text-sm font-semibold text-ink" htmlFor="email">
                    Email address
                </label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="rounded-2xl border border-[var(--line-hairline)] bg-paper/60 px-4 py-3 text-sm text-ink focus-visible:outline-accent"
                    placeholder="you@maison.com"
                    {...form.register("email")}
                    aria-invalid={form.formState.errors.email ? "true" : "false"}
                />
                {form.formState.errors.email ? (
                    <p className="text-xs text-error">{form.formState.errors.email.message}</p>
                ) : null}
            </div>

            <div className="grid gap-3">
                <label className="text-sm font-semibold text-ink" htmlFor="password">
                    Access phrase
                </label>
                <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    className="rounded-2xl border border-[var(--line-hairline)] bg-paper/60 px-4 py-3 text-sm text-ink focus-visible:outline-accent"
                    placeholder="Craft an elegant phrase"
                    {...form.register("password")}
                    aria-invalid={form.formState.errors.password ? "true" : "false"}
                />
                {form.formState.errors.password ? (
                    <p className="text-xs text-error">{form.formState.errors.password.message}</p>
                ) : null}
            </div>

            <div className="grid gap-3">
                <label className="text-sm font-semibold text-ink" htmlFor="confirmPassword">
                    Confirm access phrase
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className="rounded-2xl border border-[var(--line-hairline)] bg-paper/60 px-4 py-3 text-sm text-ink focus-visible:outline-accent"
                    placeholder="Repeat for precision"
                    {...form.register("confirmPassword")}
                    aria-invalid={form.formState.errors.confirmPassword ? "true" : "false"}
                />
                {form.formState.errors.confirmPassword ? (
                    <p className="text-xs text-error">{form.formState.errors.confirmPassword.message}</p>
                ) : null}
            </div>

            <div className="grid gap-3">
                <label className="text-sm font-semibold text-ink" htmlFor="walletAddress">
                    Collectors wallet (optional)
                </label>
                <input
                    id="walletAddress"
                    type="text"
                    className="rounded-2xl border border-[var(--line-hairline)] bg-paper/60 px-4 py-3 text-sm text-ink focus-visible:outline-accent"
                    placeholder="0x..."
                    {...form.register("walletAddress")}
                    aria-invalid={form.formState.errors.walletAddress ? "true" : "false"}
                />
                {form.formState.errors.walletAddress ? (
                    <p className="text-xs text-error">{form.formState.errors.walletAddress.message}</p>
                ) : (
                    <p className="text-[0.7rem] text-ink-soft">
                        Linking your wallet now accelerates collectible verifications later.
                    </p>
                )}
            </div>

            {errorMessage ? (
                <div className="rounded-2xl border border-error/40 bg-error/10 px-4 py-3 text-sm text-error">
                    {errorMessage}
                </div>
            ) : null}

            <button
                type="submit"
                className="btn w-full text-sm uppercase tracking-[0.3em]"
                disabled={status === "submitting"}
            >
                {status === "submitting" ? "Inviting..." : "Request membership"}
            </button>

            <p className="text-xs text-ink-soft">
                Already initiated?{" "}
                <Link href="/auth/login" className="text-accent underline focus-visible:outline-accent">
                    Enter your access phrase
                </Link>
                .
            </p>
        </form>
    );
}
