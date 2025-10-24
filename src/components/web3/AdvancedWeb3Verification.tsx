"use client";

import React, { useState, useEffect } from "react";
import { Shield, Key, Lock, CheckCircle, AlertCircle, ExternalLink, Zap, Crown } from "lucide-react";
import { useAnalytics } from "@/providers/AnalyticsProvider";

type VerificationStatus = {
    id: string;
    name: string;
    description: string;
    status: "verified" | "pending" | "failed" | "not_connected";
    icon: React.ReactNode;
    priority: "high" | "medium" | "low";
    benefits: string[];
    actionRequired?: string;
    lastChecked?: Date;
};

type Web3Feature = {
    id: string;
    name: string;
    description: string;
    isUnlocked: boolean;
    requirements: string[];
    benefits: string[];
    icon: React.ReactNode;
    actionText: string;
    actionHref: string;
};

type AdvancedWeb3VerificationProps = {
    memberId: string;
    hasCollectible: boolean;
    level: number;
    roles: string[];
    walletAddress?: string | null;
};

const VERIFICATION_ICONS = {
    wallet: <Key className="w-5 h-5" />,
    collectible: <Crown className="w-5 h-5" />,
    unlock: <Lock className="w-5 h-5" />,
    poap: <Shield className="w-5 h-5" />,
    nft: <Crown className="w-5 h-5" />,
};

const FEATURE_ICONS = {
    exclusive_content: <Lock className="w-5 h-5" />,
    vip_access: <Crown className="w-5 h-5" />,
    concierge_services: <Zap className="w-5 h-5" />,
    community_privileges: <Shield className="w-5 h-5" />,
};

export default function AdvancedWeb3Verification({ 
    memberId, 
    hasCollectible, 
    level, 
    roles,
    walletAddress 
}: AdvancedWeb3VerificationProps) {
    const [verifications, setVerifications] = useState<VerificationStatus[]>([]);
    const [web3Features, setWeb3Features] = useState<Web3Feature[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVerifying, setIsVerifying] = useState(false);
    const analytics = useAnalytics();

    useEffect(() => {
        const generateVerifications = (): VerificationStatus[] => {
            return [
                {
                    id: "wallet-connection",
                    name: "Wallet Connection",
                    description: "Connect your Web3 wallet to access exclusive features",
                    status: walletAddress ? "verified" : "not_connected",
                    icon: VERIFICATION_ICONS.wallet,
                    priority: "high",
                    benefits: ["Access to member portal", "Secure authentication", "Transaction capabilities"],
                    lastChecked: walletAddress ? new Date(Date.now() - 2 * 60 * 60 * 1000) : undefined,
                },
                {
                    id: "collectible-verification",
                    name: "Collectible Verification",
                    description: "Verify ownership of Alchemy collectibles for premium access",
                    status: hasCollectible ? "verified" : "pending",
                    icon: VERIFICATION_ICONS.collectible,
                    priority: "high",
                    benefits: ["Full recipe vault access", "Exclusive events", "VIP concierge services"],
                    lastChecked: hasCollectible ? new Date(Date.now() - 1 * 60 * 60 * 1000) : undefined,
                },
                {
                    id: "unlock-protocol",
                    name: "Unlock Protocol",
                    description: "Verify Unlock Protocol membership for community access",
                    status: "pending",
                    icon: VERIFICATION_ICONS.unlock,
                    priority: "medium",
                    benefits: ["Community forum access", "Member-only content", "Special privileges"],
                    actionRequired: "Connect wallet and verify membership",
                },
                {
                    id: "poap-attendance",
                    name: "POAP Attendance",
                    description: "Verify attendance at Table d'Adrian events",
                    status: "pending",
                    icon: VERIFICATION_ICONS.poap,
                    priority: "low",
                    benefits: ["Event history tracking", "Attendance rewards", "Community recognition"],
                    actionRequired: "Attend an event to receive POAP",
                },
            ];
        };

        const generateWeb3Features = (): Web3Feature[] => {
            return [
                {
                    id: "exclusive_content",
                    name: "Exclusive Content Access",
                    description: "Unlock premium recipes, guides, and culinary secrets",
                    isUnlocked: hasCollectible,
                    requirements: ["Collectible verification", "Wallet connection"],
                    benefits: ["Premium recipes", "Chef techniques", "Exclusive guides"],
                    icon: FEATURE_ICONS.exclusive_content,
                    actionText: hasCollectible ? "Access Content" : "Verify Collectible",
                    actionHref: hasCollectible ? "/members/recipes" : "/alchemy-collectibles",
                },
                {
                    id: "vip_access",
                    name: "VIP Member Access",
                    description: "Access to exclusive events, tastings, and private salons",
                    isUnlocked: hasCollectible && level >= 20,
                    requirements: ["Collectible verification", "Level 20+", "Community participation"],
                    benefits: ["Private events", "VIP tastings", "Concierge services"],
                    icon: FEATURE_ICONS.vip_access,
                    actionText: hasCollectible && level >= 20 ? "Access VIP Portal" : "Level Up Required",
                    actionHref: hasCollectible && level >= 20 ? "/members/vip" : "/members",
                },
                {
                    id: "concierge_services",
                    name: "Concierge Services",
                    description: "Personalized culinary experiences and event planning",
                    isUnlocked: hasCollectible,
                    requirements: ["Collectible verification", "Active membership"],
                    benefits: ["Personal chef consultations", "Event planning", "Custom menus"],
                    icon: FEATURE_ICONS.concierge_services,
                    actionText: hasCollectible ? "Book Consultation" : "Verify Collectible",
                    actionHref: hasCollectible ? "/contact" : "/alchemy-collectibles",
                },
                {
                    id: "community_privileges",
                    name: "Community Privileges",
                    description: "Enhanced community features and member benefits",
                    isUnlocked: level >= 10,
                    requirements: ["Level 10+", "Community participation"],
                    benefits: ["Forum moderation", "Member recognition", "Special badges"],
                    icon: FEATURE_ICONS.community_privileges,
                    actionText: level >= 10 ? "Access Privileges" : "Level Up Required",
                    actionHref: level >= 10 ? "/community" : "/members",
                },
            ];
        };

        // Simulate API call
        setTimeout(() => {
            setVerifications(generateVerifications());
            setWeb3Features(generateWeb3Features());
            setIsLoading(false);
        }, 1000);

        // Track Web3 verification view
        analytics.track("web3_verification_viewed", {
            member_id: memberId,
            has_collectible: hasCollectible,
            level: level,
            wallet_connected: !!walletAddress,
        });
    }, [memberId, hasCollectible, level, walletAddress, analytics]);

    const handleVerificationClick = (verification: VerificationStatus) => {
        analytics.track("web3_verification_clicked", {
            verification_id: verification.id,
            verification_name: verification.name,
            current_status: verification.status,
        });
    };

    const handleFeatureClick = (feature: Web3Feature) => {
        analytics.track("web3_feature_clicked", {
            feature_id: feature.id,
            feature_name: feature.name,
            is_unlocked: feature.isUnlocked,
        });
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "verified":
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case "pending":
                return <AlertCircle className="w-4 h-4 text-yellow-500" />;
            case "failed":
                return <AlertCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Lock className="w-4 h-4 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "verified":
                return "bg-green-100 text-green-700 border-green-300";
            case "pending":
                return "bg-yellow-100 text-yellow-700 border-yellow-300";
            case "failed":
                return "bg-red-100 text-red-700 border-red-300";
            default:
                return "bg-gray-100 text-gray-700 border-gray-300";
        }
    };

    if (isLoading) {
        return (
            <div className="advanced-web3-verification">
                <div className="advanced-web3-verification__header">
                    <h3 className="advanced-web3-verification__title">Web3 Verification</h3>
                </div>
                <div className="advanced-web3-verification__loading">
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="verification-card">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="advanced-web3-verification">
            <div className="advanced-web3-verification__header">
                <h3 className="advanced-web3-verification__title">Web3 Verification</h3>
                <div className="advanced-web3-verification__status">
                    <span className="advanced-web3-verification__status-text">
                        {verifications.filter(v => v.status === "verified").length}/{verifications.length} verified
                    </span>
                </div>
            </div>

            {/* Verification Status */}
            <div className="advanced-web3-verification__section">
                <h4 className="advanced-web3-verification__section-title">Verification Status</h4>
                <div className="advanced-web3-verification__verifications">
                    {verifications.map((verification) => (
                        <div
                            key={verification.id}
                            className={`verification-card verification-card--${verification.priority}`}
                            onClick={() => handleVerificationClick(verification)}
                        >
                            <div className="verification-card__icon">
                                {verification.icon}
                            </div>
                            <div className="verification-card__content">
                                <div className="verification-card__header">
                                    <h4 className="verification-card__title">{verification.name}</h4>
                                    <div className="verification-card__status">
                                        {getStatusIcon(verification.status)}
                                        <span className={`verification-card__status-badge ${getStatusColor(verification.status)}`}>
                                            {verification.status.replace("_", " ")}
                                        </span>
                                    </div>
                                </div>
                                <p className="verification-card__description">{verification.description}</p>
                                
                                {verification.benefits.length > 0 && (
                                    <div className="verification-card__benefits">
                                        <h5 className="verification-card__benefits-title">Benefits:</h5>
                                        <ul className="verification-card__benefits-list">
                                            {verification.benefits.map((benefit, index) => (
                                                <li key={index} className="verification-card__benefit">
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {verification.actionRequired && (
                                    <div className="verification-card__action">
                                        <p className="verification-card__action-text">{verification.actionRequired}</p>
                                    </div>
                                )}

                                {verification.lastChecked && (
                                    <div className="verification-card__meta">
                                        <span className="verification-card__last-checked">
                                            Last checked: {verification.lastChecked.toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Web3 Features */}
            <div className="advanced-web3-verification__section">
                <h4 className="advanced-web3-verification__section-title">Unlocked Features</h4>
                <div className="advanced-web3-verification__features">
                    {web3Features.map((feature) => (
                        <div
                            key={feature.id}
                            className={`web3-feature-card ${feature.isUnlocked ? "web3-feature-card--unlocked" : "web3-feature-card--locked"}`}
                            onClick={() => handleFeatureClick(feature)}
                        >
                            <div className="web3-feature-card__icon">
                                {feature.icon}
                            </div>
                            <div className="web3-feature-card__content">
                                <div className="web3-feature-card__header">
                                    <h4 className="web3-feature-card__title">{feature.name}</h4>
                                    <div className="web3-feature-card__status">
                                        {feature.isUnlocked ? (
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Lock className="w-4 h-4 text-gray-400" />
                                        )}
                                    </div>
                                </div>
                                <p className="web3-feature-card__description">{feature.description}</p>
                                
                                <div className="web3-feature-card__requirements">
                                    <h5 className="web3-feature-card__requirements-title">Requirements:</h5>
                                    <ul className="web3-feature-card__requirements-list">
                                        {feature.requirements.map((requirement, index) => (
                                            <li key={index} className="web3-feature-card__requirement">
                                                {requirement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="web3-feature-card__benefits">
                                    <h5 className="web3-feature-card__benefits-title">Benefits:</h5>
                                    <ul className="web3-feature-card__benefits-list">
                                        {feature.benefits.map((benefit, index) => (
                                            <li key={index} className="web3-feature-card__benefit">
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="web3-feature-card__action">
                                    <a
                                        href={feature.actionHref}
                                        className={`web3-feature-card__action-button ${feature.isUnlocked ? "web3-feature-card__action-button--unlocked" : "web3-feature-card__action-button--locked"}`}
                                    >
                                        {feature.actionText}
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Web3 Integration Health */}
            <div className="advanced-web3-verification__section">
                <h4 className="advanced-web3-verification__section-title">Integration Health</h4>
                <div className="advanced-web3-verification__health">
                    <div className="health-status-card">
                        <div className="health-status-card__icon">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div className="health-status-card__content">
                            <h5 className="health-status-card__title">Web3 Services</h5>
                            <p className="health-status-card__description">
                                All Web3 integrations are operational and ready for verification.
                            </p>
                            <div className="health-status-card__status">
                                <span className="health-status-card__status-indicator health-status-card__status-indicator--healthy">
                                    Healthy
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
