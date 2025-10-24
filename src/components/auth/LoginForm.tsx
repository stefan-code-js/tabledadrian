"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
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
    const [showPassword, setShowPassword] = useState(false);
    const [fieldFocus, setFieldFocus] = useState<string | null>(null);
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
        <motion.form 
            className="space-y-8"
            onSubmit={form.handleSubmit(onSubmit)} 
            noValidate
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
        >
            {/* Email Field */}
            <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <label className="block text-sm font-medium text-ink mb-3" htmlFor="email">
                    Email Address
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className={`w-5 h-5 transition-colors ${fieldFocus === 'email' ? 'text-accent' : 'text-ink-soft'}`} />
                    </div>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@maison.com"
                        className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-200 bg-paper/50 backdrop-blur-sm text-ink placeholder-ink-soft focus:outline-none focus:ring-0 ${
                            errors.email 
                                ? 'border-red-300 focus:border-red-400' 
                                : fieldFocus === 'email'
                                ? 'border-accent focus:border-accent'
                                : 'border-[var(--line-hairline)] focus:border-accent'
                        }`}
                        {...form.register("email")}
                        onFocus={() => setFieldFocus('email')}
                        onBlur={() => setFieldFocus(null)}
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    {form.watch("email") && !errors.email && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                    )}
                </div>
                <AnimatePresence>
                    {errors.email && (
                        <motion.p 
                            className="flex items-center gap-2 text-sm text-red-600 mt-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            role="alert"
                        >
                            <AlertCircle className="w-4 h-4" />
                            {errors.email.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Password Field */}
            <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <label className="block text-sm font-medium text-ink mb-3" htmlFor="password">
                    Access Phrase
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className={`w-5 h-5 transition-colors ${fieldFocus === 'password' ? 'text-accent' : 'text-ink-soft'}`} />
                    </div>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your phrase"
                        className={`w-full pl-12 pr-12 py-4 rounded-2xl border-2 transition-all duration-200 bg-paper/50 backdrop-blur-sm text-ink placeholder-ink-soft focus:outline-none focus:ring-0 ${
                            errors.password 
                                ? 'border-red-300 focus:border-red-400' 
                                : fieldFocus === 'password'
                                ? 'border-accent focus:border-accent'
                                : 'border-[var(--line-hairline)] focus:border-accent'
                        }`}
                        {...form.register("password")}
                        onFocus={() => setFieldFocus('password')}
                        onBlur={() => setFieldFocus(null)}
                        aria-invalid={errors.password ? "true" : "false"}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-accent transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                <AnimatePresence>
                    {errors.password && (
                        <motion.p 
                            className="flex items-center gap-2 text-sm text-red-600 mt-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            role="alert"
                        >
                            <AlertCircle className="w-4 h-4" />
                            {errors.password.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Enhanced Options */}
            <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <div className="flex flex-col sm:flex-row gap-4" role="group" aria-label="Session preferences">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={handleRememberToggle}
                                className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                rememberMe 
                                    ? 'bg-accent border-accent' 
                                    : 'border-[var(--line-soft)] group-hover:border-accent'
                            }`}>
                                {rememberMe && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                        </div>
                        <span className="text-sm text-ink group-hover:text-accent transition-colors">Remember me</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={savePassword}
                                onChange={handleSavePasswordToggle}
                                className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                savePassword 
                                    ? 'bg-accent border-accent' 
                                    : 'border-[var(--line-soft)] group-hover:border-accent'
                            }`}>
                                {savePassword && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                        </div>
                        <span className="text-sm text-ink group-hover:text-accent transition-colors">Save access phrase</span>
                    </label>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed">
                    Enable remembrance only on a trusted personal device so your credentials remain private.
                </p>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
                {errorMessage && (
                    <motion.div 
                        className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        role="alert"
                    >
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <p className="text-sm text-red-800">{errorMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <button
                    type="submit"
                    className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-accent to-accent/80 text-white font-medium text-sm uppercase tracking-[0.3em] transition-all duration-200 hover:from-accent/90 hover:to-accent/70 hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    disabled={status === "submitting"}
                >
                    {status === "submitting" ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Verifying credentials...
                        </>
                    ) : (
                        "Access account"
                    )}
                </button>
            </motion.div>

            {/* Register Link */}
            <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <p className="text-sm text-ink-soft">
                    New to the atelier?{" "}
                    <Link 
                        href="/auth/register" 
                        className="text-accent hover:text-accent/80 underline hover:no-underline transition-all duration-200 font-medium"
                    >
                        Request your invitation
                    </Link>
                </p>
            </motion.div>
        </motion.form>
    );
}
