"use client";

import React, { useMemo } from "react";
import { Sparkles, Crown, ShieldCheck } from "lucide-react";

type MemberProfileCardProps = {
    name?: string | null;
    email?: string | null;
    roles?: string[];
    createdAt?: string;
    hasCollectible: boolean;
    walletAddress?: string | null;
};

function buildInitials(name?: string | null, fallback?: string | null): string {
    if (name && name.trim().length > 0) {
        const parts = name.trim().split(/\s+/).slice(0, 2);
        return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
    }
    if (fallback && fallback.trim().length > 0) {
        return fallback.slice(0, 2).toUpperCase();
    }
    return "TD";
}

function formatWallet(address?: string | null): string | null {
    if (!address) return null;
    const lower = address.toLowerCase();
    if (lower.length <= 12) return lower;
    return `${lower.slice(0, 6)}â€¦${lower.slice(-4)}`;
}

export default function MemberProfileCard({
    name,
    email,
    roles = ["member"],
    createdAt,
    hasCollectible,
    walletAddress,
}: MemberProfileCardProps) {
    const initials = useMemo(() => buildInitials(name, email), [name, email]);
    const hueBase = useMemo(() => {
        const source = `${name ?? ""}${email ?? ""}${walletAddress ?? ""}`;
        return source
            .split("")
            .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;
    }, [name, email, walletAddress]);

    const gradient = useMemo(
        () => ({
            background: `linear-gradient(135deg, hsl(${hueBase}, 70%, 58%), hsl(${(hueBase + 45) % 360}, 72%, 48%))`,
        }),
        [hueBase],
    );

    const joinedDate = createdAt ? new Date(createdAt) : null;
    const tenureDays = joinedDate ? Math.max(1, Math.round((Date.now() - joinedDate.getTime()) / 86400000)) : 12;
    const baseLevel = hasCollectible ? 9 : 4;
    const level = Math.min(30, baseLevel + Math.floor(tenureDays / 45));
    const progress = Math.min(100, ((tenureDays % 45) / 45) * 100);
    const progressLabel = hasCollectible
        ? "Next unlock: concierge salon preview"
        : "Next unlock: verify collectible access";

    const profileBadges = useMemo(() => {
        const badgeSet = new Set<string>();
        roles.forEach((role) => badgeSet.add(role.replace(/_/g, " ")));
        if (hasCollectible) badgeSet.add("Collectible holder");
        if (!hasCollectible) badgeSet.add("Prospective member");
        const maskedWallet = formatWallet(walletAddress);
        if (maskedWallet) badgeSet.add(`Wallet ${maskedWallet}`);
        return Array.from(badgeSet);
    }, [roles, hasCollectible, walletAddress]);

    return (
        <section className="member-profile-card">
            <div className="member-profile-card__left">
                <div className="member-profile-card__avatar" style={gradient} aria-hidden="true">
                    <span>{initials}</span>
                </div>
                <div>
                    <div className="member-profile-card__headline">
                        <h2>{name ?? "Valued Member"}</h2>
                        <span className="member-profile-card__level">Level {level}</span>
                    </div>
                    {email ? <p className="member-profile-card__email">{email}</p> : null}
                    <div className="member-profile-card__badges" role="list">
                        {profileBadges.map((badge) => (
                            <span key={badge} role="listitem" className="member-profile-card__badge">
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="member-profile-card__right">
                <div className="member-profile-card__stat">
                    <Sparkles size={16} aria-hidden="true" />
                    <span>{tenureDays} day tenure</span>
                </div>
                <div className="member-profile-card__stat">
                    <ShieldCheck size={16} aria-hidden="true" />
                    <span>{hasCollectible ? "Collectible verified" : "Awaiting verification"}</span>
                </div>
                <div className="member-profile-card__stat">
                    <Crown size={16} aria-hidden="true" />
                    <span>{roles.includes("vip") ? "VIP patron" : "Circle member"}</span>
                </div>

                <div className="member-profile-card__progress">
                    <div className="member-profile-card__progress-bar" aria-hidden="true">
                        <span style={{ width: `${progress}%` }} />
                    </div>
                    <p className="member-profile-card__progress-label">{progressLabel}</p>
                </div>
            </div>
        </section>
    );
}

