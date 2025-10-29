"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, Wallet, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
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
        message: "The passwords do not match.",
        path: ["confirmPassword"],
    });

type FormValues = z.infer<typeof schema>;

export default function RegisterForm() {
    const router = useRouter();
    const [status, setStatus] = useState<"idle" | "submitting">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fieldFocus, setFieldFocus] = useState<string | null>(null);
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
        <motion.form 
            className="space-y-8"
            onSubmit={form.handleSubmit(onSubmit)} 
            noValidate
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
        >
            {/* Full name Field */}
            <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <label className="block text-sm font-medium text-ink mb-3" htmlFor="fullName">
                    Full name
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className={`w-5 h-5 transition-colors ${fieldFocus === 'fullName' ? 'text-accent' : 'text-ink-soft'}`} />
                    </div>
                    <input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="Full name"
                        className={`input-field pl-12 pr-4 ${
                            form.formState.errors.fullName 
                                ? 'border-red-300 focus:border-red-400' 
                                : fieldFocus === 'fullName'
                                ? 'border-accent focus:border-accent'
                                : 'border-[rgba(99,159,171,0.35)] focus:border-accent'
                        }`}
                        {...form.register("fullName")}
                        onFocus={() => setFieldFocus('fullName')}
                        onBlur={() => setFieldFocus(null)}
                        aria-invalid={form.formState.errors.fullName ? "true" : "false"}
                    />
                    {form.watch("fullName") && !form.formState.errors.fullName && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                    )}
                </div>
                <AnimatePresence>
                    {form.formState.errors.fullName && (
                        <motion.p 
                            className="flex items-center gap-2 text-sm text-red-600 mt-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            role="alert"
                        >
                            <AlertCircle className="w-4 h-4" />
                            {form.formState.errors.fullName.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Email Field */}
            <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <label className="block text-sm font-medium text-ink mb-3" htmlFor="email">
                    Email address
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className={`w-5 h-5 transition-colors ${fieldFocus === 'email' ? 'text-accent' : 'text-ink-soft'}`} />
                    </div>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email address"
                        className={`input-field pl-12 pr-4 ${
                            form.formState.errors.email 
                                ? 'border-red-300 focus:border-red-400' 
                                : fieldFocus === 'email'
                                ? 'border-accent focus:border-accent'
                                : 'border-[rgba(99,159,171,0.35)] focus:border-accent'
                        }`}
                        {...form.register("email")}
                        onFocus={() => setFieldFocus('email')}
                        onBlur={() => setFieldFocus(null)}
                        aria-invalid={form.formState.errors.email ? "true" : "false"}
                    />
                    {form.watch("email") && !form.formState.errors.email && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                    )}
                </div>
                <AnimatePresence>
                    {form.formState.errors.email && (
                        <motion.p 
                            className="flex items-center gap-2 text-sm text-red-600 mt-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            role="alert"
                        >
                            <AlertCircle className="w-4 h-4" />
                            {form.formState.errors.email.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Password Field */}
            <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <label className="block text-sm font-medium text-ink mb-2" htmlFor="password">
                    Create password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className={`w-5 h-5 transition-colors ${fieldFocus === 'password' ? 'text-accent' : 'text-ink-soft'}`} />
                    </div>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Create password"
                        className={`input-field pl-12 pr-12 ${
                            form.formState.errors.password 
                                ? 'border-red-300 focus:border-red-400' 
                                : fieldFocus === 'password'
                                ? 'border-accent focus:border-accent'
                                : 'border-[rgba(99,159,171,0.35)] focus:border-accent'
                        }`}
                        {...form.register("password")}
                        onFocus={() => setFieldFocus('password')}
                        onBlur={() => setFieldFocus(null)}
                        aria-invalid={form.formState.errors.password ? "true" : "false"}
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
                    {form.formState.errors.password && (
                        <motion.p 
                            className="flex items-center gap-2 text-sm text-red-600 mt-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            role="alert"
                        >
                            <AlertCircle className="w-4 h-4" />
                            {form.formState.errors.password.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <label className="block text-sm font-medium text-ink mb-2" htmlFor="confirmPassword">
                    Confirm password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className={`w-5 h-5 transition-colors ${fieldFocus === 'confirmPassword' ? 'text-accent' : 'text-ink-soft'}`} />
                    </div>
                    <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Confirm password"
                        className={`input-field pl-12 pr-12 ${
                            form.formState.errors.confirmPassword 
                                ? 'border-red-300 focus:border-red-400' 
                                : fieldFocus === 'confirmPassword'
                                ? 'border-accent focus:border-accent'
                                : 'border-[rgba(99,159,171,0.35)] focus:border-accent'
                        }`}
                        {...form.register("confirmPassword")}
                        onFocus={() => setFieldFocus('confirmPassword')}
                        onBlur={() => setFieldFocus(null)}
                        aria-invalid={form.formState.errors.confirmPassword ? "true" : "false"}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-accent transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                <AnimatePresence>
                    {form.formState.errors.confirmPassword && (
                        <motion.p 
                            className="flex items-center gap-2 text-sm text-red-600 mt-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            role="alert"
                        >
                            <AlertCircle className="w-4 h-4" />
                            {form.formState.errors.confirmPassword.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Wallet Address Field */}
            <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
            >
                <label className="block text-sm font-medium text-ink mb-2" htmlFor="walletAddress">
                    Wallet address (optional)
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Wallet className={`w-5 h-5 transition-colors ${fieldFocus === 'walletAddress' ? 'text-accent' : 'text-ink-soft'}`} />
                    </div>
                    <input
                        id="walletAddress"
                        type="text"
                        placeholder="Wallet address (optional)"
                        className={`input-field pl-12 pr-4 ${
                            form.formState.errors.walletAddress 
                                ? 'border-red-300 focus:border-red-400' 
                                : fieldFocus === 'walletAddress'
                                ? 'border-accent focus:border-accent'
                                : 'border-[rgba(99,159,171,0.35)] focus:border-accent'
                        }`}
                        {...form.register("walletAddress")}
                        onFocus={() => setFieldFocus('walletAddress')}
                        onBlur={() => setFieldFocus(null)}
                        aria-invalid={form.formState.errors.walletAddress ? "true" : "false"}
                    />
                    {form.watch("walletAddress") && !form.formState.errors.walletAddress && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                    )}
                </div>
                <AnimatePresence>
                    {form.formState.errors.walletAddress ? (
                        <motion.p 
                            className="flex items-center gap-2 text-sm text-red-600 mt-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            role="alert"
                        >
                            <AlertCircle className="w-4 h-4" />
                            {form.formState.errors.walletAddress.message}
                        </motion.p>
                    ) : (
                        <motion.p 
                            className="text-sm text-ink-soft mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            Providing a wallet now speeds settlement for international engagements.
                        </motion.p>
                    )}
                </AnimatePresence>
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
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <button
                    type="submit"
                    className="btn btn--full justify-center gap-3 font-semibold disabled:opacity-50 disabled:pointer-events-none"
                    disabled={status === "submitting"}
                >
                    {status === "submitting" ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting request...
                        </>
                    ) : (
                        "Request access"
                    )}
                </button>
            </motion.div>

            {/* Login Link */}
            <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <p className="text-sm text-ink-soft">
                    Already registered?{" "}
                    <Link 
                        href="/auth/login" 
                        className="text-accent hover:text-accent/80 underline hover:no-underline transition-all duration-200 font-medium"
                    >
                        Sign in to your account
                    </Link>
                </p>
            </motion.div>
        </motion.form>
    );
}


