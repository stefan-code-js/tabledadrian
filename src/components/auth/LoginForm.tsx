"use client";

import React, { useEffect, useState } from "react";
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

const STORAGE_KEYS = {
    rememberFlag: "tda-login-remember",
    rememberedEmail: "tda-login-email",
    passwordFlag: "tda-login-save-password",
    rememberedPassword: "tda-login-password",
} as const;

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "submitting">("idle");
    const [rememberMe, setRememberMe] = useState(false);
    const [savePassword, setSavePassword] = useState(false);
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const storedRemember = window.localStorage.getItem(STORAGE_KEYS.rememberFlag) === "true";
            const storedEmail = storedRemember ? window.localStorage.getItem(STORAGE_KEYS.rememberedEmail) ?? "" : "";
            const storedSavePassword = window.localStorage.getItem(STORAGE_KEYS.passwordFlag) === "true";
            const storedPassword = storedSavePassword
                ? window.localStorage.getItem(STORAGE_KEYS.rememberedPassword) ?? ""
                : "";

            setRememberMe(storedRemember);
            setSavePassword(storedSavePassword);
            if (storedEmail) {
                form.setValue("email", storedEmail, { shouldDirty: false });
            }
            if (storedPassword) {
                form.setValue("password", storedPassword, { shouldDirty: false });
            }
        } catch (error) {
            console.error("Unable to read stored login preferences", error);
        }
    }, [form]);

    useEffect(() => {
        const subscription = form.watch((value, info) => {
            if (typeof window === "undefined") return;
            if (info?.name === "email" && rememberMe) {
                window.localStorage.setItem(STORAGE_KEYS.rememberedEmail, value.email ?? "");
            }
            if (info?.name === "password" && savePassword) {
                window.localStorage.setItem(STORAGE_KEYS.rememberedPassword, value.password ?? "");
            }
        });
        return () => {
            if (subscription && typeof subscription.unsubscribe === "function") {
                subscription.unsubscribe();
            }
        };
    }, [form, rememberMe, savePassword]);

    const handleRememberToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setRememberMe(checked);
        if (typeof window === "undefined") {
            return;
        }
        if (checked) {
            window.localStorage.setItem(STORAGE_KEYS.rememberFlag, "true");
            window.localStorage.setItem(STORAGE_KEYS.rememberedEmail, form.getValues("email") ?? "");
        } else {
            window.localStorage.removeItem(STORAGE_KEYS.rememberFlag);
            window.localStorage.removeItem(STORAGE_KEYS.rememberedEmail);
        }
    };

    const handleSavePasswordToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setSavePassword(checked);
        if (typeof window === "undefined") {
            return;
        }
        if (checked) {
            window.localStorage.setItem(STORAGE_KEYS.passwordFlag, "true");
            window.localStorage.setItem(STORAGE_KEYS.rememberedPassword, form.getValues("password") ?? "");
        } else {
            window.localStorage.removeItem(STORAGE_KEYS.passwordFlag);
            window.localStorage.removeItem(STORAGE_KEYS.rememberedPassword);
        }
    };

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
            if (typeof window !== "undefined") {
                if (rememberMe) {
                    window.localStorage.setItem(STORAGE_KEYS.rememberFlag, "true");
                    window.localStorage.setItem(STORAGE_KEYS.rememberedEmail, values.email);
                } else {
                    window.localStorage.removeItem(STORAGE_KEYS.rememberFlag);
                    window.localStorage.removeItem(STORAGE_KEYS.rememberedEmail);
                }
                if (savePassword) {
                    window.localStorage.setItem(STORAGE_KEYS.passwordFlag, "true");
                    window.localStorage.setItem(STORAGE_KEYS.rememberedPassword, values.password);
                } else {
                    window.localStorage.removeItem(STORAGE_KEYS.passwordFlag);
                    window.localStorage.removeItem(STORAGE_KEYS.rememberedPassword);
                }
            }
            router.replace(callbackUrl);
            router.refresh();
        } catch (error) {
            console.error("Login failed", error);
            setErrorMessage("Something went astray. Please retry in a moment.");
            setStatus("idle");
        }
    };

    const { errors } = form.formState;

    return (
        <form className="form form--narrow auth-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <label className="field" htmlFor="email">
                <span>Email address</span>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@maison.com"
                    {...form.register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email ? (
                    <p className="field__message error" role="alert">
                        {errors.email.message}
                    </p>
                ) : null}
            </label>

            <label className="field" htmlFor="password">
                <span>Access phrase</span>
                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your phrase"
                    {...form.register("password")}
                    aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password ? (
                    <p className="field__message error" role="alert">
                        {errors.password.message}
                    </p>
                ) : null}
            </label>

            <div className="form-options" role="group" aria-label="Session preferences">
                <label className="form-option">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={handleRememberToggle}
                    />
                    <span>Remember me</span>
                </label>
                <label className="form-option">
                    <input
                        type="checkbox"
                        checked={savePassword}
                        onChange={handleSavePasswordToggle}
                    />
                    <span>Save access phrase</span>
                </label>
            </div>
            <p className="form-note">
                Enable remembrance only on a trusted personal device so your credentials remain private.
            </p>

            {errorMessage ? (
                <p className="form-message error" role="alert">
                    {errorMessage}
                </p>
            ) : null}

            <div className="form-actions">
                <button
                    type="submit"
                    className="btn btn--full text-sm uppercase tracking-[0.3em]"
                    disabled={status === "submitting"}
                >
                    {status === "submitting" ? "Verifying..." : "Access account"}
                </button>
            </div>

            <p className="form-note">
                New to the atelier?{" "}
                <Link href="/auth/register" className="text-accent underline focus-visible:outline-accent">
                    Request your invitation
                </Link>
                .
            </p>
        </form>
    );
}
