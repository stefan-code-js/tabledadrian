"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Shield, Lock, Sparkles, Crown, Star } from "lucide-react";

type AuthShellProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    accent?: string;
};

export default function AuthShell({ title, subtitle, children, accent = "member" }: AuthShellProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [currentPrivilege, setCurrentPrivilege] = useState(0);

    const privileges = [
        {
            icon: <Crown className="w-5 h-5" />,
            title: "Exclusive Access",
            description: "Personalized menu briefs archived for your household.",
            color: "text-yellow-600"
        },
        {
            icon: <Sparkles className="w-5 h-5" />,
            title: "Concierge Service",
            description: "Follow-ups and wellness-focused pairing notes.",
            color: "text-purple-600"
        },
        {
            icon: <Star className="w-5 h-5" />,
            title: "Priority Scheduling",
            description: "Across Monaco, New York, Dubai, and London.",
            color: "text-blue-600"
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: "Secure History",
            description: "Itinerary history and billing confirmations.",
            color: "text-green-600"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPrivilege((prev) => (prev + 1) % privileges.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-paper-soft via-paper to-paper-soft flex items-center justify-center p-4">
        <motion.section
                className="relative mx-auto flex w-full max-w-5xl flex-col gap-12 rounded-[3rem] border border-[var(--line-soft)] bg-paper-soft/90 px-12 py-16 text-ink shadow-2xl backdrop-blur-xl"
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Enhanced Header */}
                <motion.div 
                    className="space-y-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-xs uppercase tracking-[0.45em] text-ink-soft font-medium">
                            Secure Access Portal
            </div>
                    </div>
                    <h1 className="text-5xl font-serif text-accent leading-tight">{title}</h1>
                    <p className="mx-auto max-w-3xl text-base text-ink-soft leading-relaxed">{subtitle}</p>
                </motion.div>

                <div className="grid gap-12 justify-items-center lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:justify-items-start">
                    {/* Enhanced Form Container */}
                    <motion.div 
                        className="space-y-8 w-full max-w-2xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        {children}
                    </motion.div>

                    {/* Enhanced Privileges Panel */}
                    <motion.aside 
                        className="hidden rounded-3xl border border-[var(--line-hairline)] bg-gradient-to-br from-paper/80 to-paper-soft/40 p-10 text-left lg:block backdrop-blur-sm"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                                    <Crown className="w-4 h-4 text-accent" />
                                </div>
                                <p className="text-sm uppercase tracking-[0.3em] text-ink-soft font-medium">Member Privileges</p>
                            </div>

                            {/* Animated Privilege Cards */}
                            <div className="space-y-4">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentPrivilege}
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="auth-privilege-card-enhanced"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-paper to-paper-soft flex items-center justify-center ${privileges[currentPrivilege].color}`}>
                                                {privileges[currentPrivilege].icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-ink text-sm mb-1">
                                                    {privileges[currentPrivilege].title}
                                                </h3>
                                                <p className="text-xs leading-relaxed text-ink-soft">
                                                    {privileges[currentPrivilege].description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Status Indicator */}
                            <div className="mt-8 pt-6 border-t border-[var(--line-hairline)]">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-xs uppercase tracking-[0.35em] text-accent font-medium">Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-xs text-ink-soft">Active</span>
                                    </div>
                                </div>
                                <p className="text-xl font-semibold text-ink">
                                    {accent === "vip" ? "VIP Patron" : "Circle Member"}
                                </p>
                                <p className="text-xs text-ink-soft mt-1">
                                    {accent === "vip" ? "Premium concierge access" : "Standard member privileges"}
                                </p>
                            </div>
                        </div>
                    </motion.aside>
            </div>

                {/* Security Badge */}
                <motion.div 
                    className="flex items-center justify-center gap-2 text-xs text-ink-soft mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <Shield className="w-4 h-4" />
                    <span>256-bit SSL encryption • GDPR compliant</span>
                </motion.div>
        </motion.section>
        </div>
    );
}
