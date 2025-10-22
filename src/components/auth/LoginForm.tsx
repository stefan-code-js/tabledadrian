"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const schema = z.object({
    email: z.string().email("Enter the email you used with the Table d'Adrian concierge."),
    password: z.string().min(8, "Your access phrase must be at least 8 characters."),
});

type FormValues = z.infer<typeof schema>;

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "submitting">("idle");
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: FormValues) => {
        setStatus("submitting");
        setErrorMessage(null);
        try {
            const callbackUrl = searchParams.get("callbackUrl") ?? "/members";
            const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });
            if (result?.error) {
                setErrorMessage("We could not authenticate those details. Please refine them or register first.");
                setStatus("idle");
                return;
            }
            router.replace(callbackUrl);
            router.refresh();
        } catch (error) {
            console.error("Login failed", error);
            setErrorMessage("Something went astray. Please retry in a moment.");
            setStatus("idle");
        }
    };

    return (
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
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
                    autoComplete="current-password"
                    className="rounded-2xl border border-[var(--line-hairline)] bg-paper/60 px-4 py-3 text-sm text-ink focus-visible:outline-accent"
                    placeholder="Enter your phrase"
                    {...form.register("password")}
                    aria-invalid={form.formState.errors.password ? "true" : "false"}
                />
                {form.formState.errors.password ? (
                    <p className="text-xs text-error">{form.formState.errors.password.message}</p>
                ) : null}
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
                {status === "submitting" ? "Verifying..." : "Enter the circle"}
            </button>

            <p className="text-xs text-ink-soft">
                New to the atelier?{" "}
                <Link href="/auth/register" className="text-accent underline focus-visible:outline-accent">
                    Request your invitation
                </Link>
                .
            </p>
        </form>
    );
}
