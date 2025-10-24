"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChefHat, Crown, Users, Sparkles, Calendar, TrendingUp } from "lucide-react";
import { useAnalytics } from "@/providers/AnalyticsProvider";

type Recommendation = {
    id: string;
    type: "recipe" | "collectible" | "forum" | "event" | "community" | "achievement";
    title: string;
    description: string;
    actionText: string;
    href: string;
    priority: "high" | "medium" | "low";
    icon: React.ReactNode;
    value?: string;
    isNew?: boolean;
};

type PersonalizedRecommendationsProps = {
    memberId: string;
    hasCollectible: boolean;
    level: number;
    roles: string[];
    preferences?: {
        cuisineTypes?: string[];
        dietaryRestrictions?: string[];
        interests?: string[];
    };
};

const RECOMMENDATION_ICONS = {
    recipe: <ChefHat className="w-5 h-5" />,
    collectible: <Crown className="w-5 h-5" />,
    forum: <Users className="w-5 h-5" />,
    event: <Calendar className="w-5 h-5" />,
    community: <Users className="w-5 h-5" />,
    achievement: <Sparkles className="w-5 h-5" />,
};

export default function PersonalizedRecommendations({ 
    memberId, 
    hasCollectible, 
    level, 
    roles,
    preferences = {}
}: PersonalizedRecommendationsProps) {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const analytics = useAnalytics();

    useEffect(() => {
        // Generate personalized recommendations based on member profile
        const generateRecommendations = (): Recommendation[] => {
            const recs: Recommendation[] = [];

            // Recipe recommendations based on level and collectible status
            if (level >= 5) {
                recs.push({
                    id: "recipe-1",
                    type: "recipe",
                    title: "Advanced Molecular Gastronomy",
                    description: "Unlock the secrets of modernist cuisine with Chef Adrian's signature techniques",
                    actionText: "Explore Recipe",
                    href: "/members/recipes",
                    priority: "high",
                    icon: RECOMMENDATION_ICONS.recipe,
                    isNew: true,
                });
            }

            // Collectible recommendations
            if (!hasCollectible) {
                recs.push({
                    id: "collectible-1",
                    type: "collectible",
                    title: "Unlock Full Recipe Vault",
                    description: "Verify an Alchemy collectible to access exclusive recipes and salon invitations",
                    actionText: "View Collectibles",
                    href: "/alchemy-collectibles",
                    priority: "high",
                    icon: RECOMMENDATION_ICONS.collectible,
                    value: "Limited Supply",
                });
            }

            // Forum engagement
            recs.push({
                id: "forum-1",
                type: "forum",
                title: "Join the Alchemist's Discussion",
                description: "Connect with fellow culinary enthusiasts and share your experiences",
                actionText: "Visit Forum",
                href: "/forum",
                priority: "medium",
                icon: RECOMMENDATION_ICONS.forum,
            });

            // Community features
            if (level >= 10) {
                recs.push({
                    id: "community-1",
                    type: "community",
                    title: "Host a Private Salon",
                    description: "Invite friends for an exclusive culinary experience in your home",
                    actionText: "Learn More",
                    href: "/community",
                    priority: "medium",
                    icon: RECOMMENDATION_ICONS.community,
                });
            }

            // Achievement tracking
            recs.push({
                id: "achievement-1",
                type: "achievement",
                title: "Complete Your Profile",
                description: "Add dietary preferences and culinary interests for better recommendations",
                actionText: "Update Profile",
                href: "/members",
                priority: "low",
                icon: RECOMMENDATION_ICONS.achievement,
            });

            return recs.sort((a, b) => {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            });
        };

        // Simulate API call
        setTimeout(() => {
            setRecommendations(generateRecommendations());
            setIsLoading(false);
        }, 800);

        // Track recommendations view
        analytics.track("member_recommendations_viewed", {
            member_id: memberId,
            has_collectible: hasCollectible,
            level: level,
            recommendation_count: recommendations.length,
        });
    }, [memberId, hasCollectible, level, analytics]);

    const handleRecommendationClick = (recommendation: Recommendation) => {
        analytics.track("member_recommendation_clicked", {
            recommendation_id: recommendation.id,
            recommendation_type: recommendation.type,
            priority: recommendation.priority,
        });
    };

    if (isLoading) {
        return (
            <div className="personalized-recommendations">
                <div className="personalized-recommendations__header">
                    <h3 className="personalized-recommendations__title">For You</h3>
                </div>
                <div className="personalized-recommendations__loading">
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="recommendation-card">
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
        <div className="personalized-recommendations">
            <div className="personalized-recommendations__header">
                <h3 className="personalized-recommendations__title">For You</h3>
                <span className="personalized-recommendations__count">{recommendations.length} recommendations</span>
            </div>
            <div className="personalized-recommendations__list">
                {recommendations.map((recommendation) => (
                    <div
                        key={recommendation.id}
                        className={`recommendation-card recommendation-card--${recommendation.priority} ${
                            recommendation.isNew ? "recommendation-card--new" : ""
                        }`}
                    >
                        <div className="recommendation-card__icon">
                            {recommendation.icon}
                        </div>
                        <div className="recommendation-card__content">
                            <div className="recommendation-card__header">
                                <h4 className="recommendation-card__title">{recommendation.title}</h4>
                                {recommendation.value && (
                                    <span className="recommendation-card__value">{recommendation.value}</span>
                                )}
                            </div>
                            <p className="recommendation-card__description">{recommendation.description}</p>
                            <Link
                                href={recommendation.href}
                                className="recommendation-card__action"
                                onClick={() => handleRecommendationClick(recommendation)}
                            >
                                {recommendation.actionText}
                            </Link>
                        </div>
                        {recommendation.isNew && (
                            <div className="recommendation-card__badge">New</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
