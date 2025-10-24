"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Star, Crown, Sparkles, Target, Users, ChefHat, Calendar } from "lucide-react";
import { useAnalytics } from "@/providers/AnalyticsProvider";

type Achievement = {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    category: "collectible" | "community" | "engagement" | "milestone" | "special";
    rarity: "common" | "rare" | "epic" | "legendary";
    points: number;
    isUnlocked: boolean;
    unlockedAt?: Date;
    progress?: number;
    maxProgress?: number;
};

type MemberAchievementsProps = {
    memberId: string;
    hasCollectible: boolean;
    level: number;
    roles: string[];
    totalRecipesViewed?: number;
    forumPosts?: number;
    daysActive?: number;
};

const ACHIEVEMENT_ICONS = {
    collectible: <Crown className="w-6 h-6" />,
    community: <Users className="w-6 h-6" />,
    engagement: <ChefHat className="w-6 h-6" />,
    milestone: <Trophy className="w-6 h-6" />,
    special: <Sparkles className="w-6 h-6" />,
};

const RARITY_COLORS = {
    common: "bg-gray-100 text-gray-700 border-gray-300",
    rare: "bg-blue-100 text-blue-700 border-blue-300",
    epic: "bg-purple-100 text-purple-700 border-purple-300",
    legendary: "bg-yellow-100 text-yellow-700 border-yellow-300",
};

export default function MemberAchievements({ 
    memberId, 
    hasCollectible, 
    level, 
    roles,
    totalRecipesViewed = 0,
    forumPosts = 0,
    daysActive = 0
}: MemberAchievementsProps) {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const analytics = useAnalytics();

    useEffect(() => {
        const generateAchievements = (): Achievement[] => {
            const allAchievements: Achievement[] = [
                {
                    id: "first-login",
                    title: "Welcome to the Atelier",
                    description: "Complete your first login to the member portal",
                    icon: ACHIEVEMENT_ICONS.milestone,
                    category: "milestone",
                    rarity: "common",
                    points: 10,
                    isUnlocked: true,
                    unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
                },
                {
                    id: "collectible-holder",
                    title: "Digital Alchemist",
                    description: "Verify ownership of an Alchemy collectible",
                    icon: ACHIEVEMENT_ICONS.collectible,
                    category: "collectible",
                    rarity: "rare",
                    points: 50,
                    isUnlocked: hasCollectible,
                    unlockedAt: hasCollectible ? new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) : undefined,
                },
                {
                    id: "recipe-explorer",
                    title: "Culinary Explorer",
                    description: "View 10 different recipes in the vault",
                    icon: ACHIEVEMENT_ICONS.engagement,
                    category: "engagement",
                    rarity: "common",
                    points: 25,
                    isUnlocked: totalRecipesViewed >= 10,
                    progress: Math.min(totalRecipesViewed, 10),
                    maxProgress: 10,
                },
                {
                    id: "forum-contributor",
                    title: "Community Voice",
                    description: "Make your first post in the Alchemist's Forum",
                    icon: ACHIEVEMENT_ICONS.community,
                    category: "community",
                    rarity: "common",
                    points: 15,
                    isUnlocked: forumPosts > 0,
                    unlockedAt: forumPosts > 0 ? new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) : undefined,
                },
                {
                    id: "level-master",
                    title: "Level Master",
                    description: "Reach level 20 in the member system",
                    icon: ACHIEVEMENT_ICONS.milestone,
                    category: "milestone",
                    rarity: "epic",
                    points: 100,
                    isUnlocked: level >= 20,
                    progress: Math.min(level, 20),
                    maxProgress: 20,
                },
                {
                    id: "veteran-member",
                    title: "Veteran Member",
                    description: "Be an active member for 30 days",
                    icon: ACHIEVEMENT_ICONS.special,
                    category: "special",
                    rarity: "rare",
                    points: 75,
                    isUnlocked: daysActive >= 30,
                    progress: Math.min(daysActive, 30),
                    maxProgress: 30,
                },
                {
                    id: "concierge-client",
                    title: "Concierge Client",
                    description: "Submit your first concierge brief",
                    icon: ACHIEVEMENT_ICONS.special,
                    category: "special",
                    rarity: "epic",
                    points: 60,
                    isUnlocked: false, // This would be tracked via API
                    progress: 0,
                    maxProgress: 1,
                },
                {
                    id: "forum-champion",
                    title: "Forum Champion",
                    description: "Make 25 posts in the community forum",
                    icon: ACHIEVEMENT_ICONS.community,
                    category: "community",
                    rarity: "rare",
                    points: 40,
                    isUnlocked: forumPosts >= 25,
                    progress: Math.min(forumPosts, 25),
                    maxProgress: 25,
                },
            ];

            return allAchievements;
        };

        // Simulate API call
        setTimeout(() => {
            setAchievements(generateAchievements());
            setIsLoading(false);
        }, 1000);

        // Track achievements view
        analytics.track("member_achievements_viewed", {
            member_id: memberId,
            has_collectible: hasCollectible,
            level: level,
        });
    }, [memberId, hasCollectible, level, analytics, totalRecipesViewed, forumPosts, daysActive]);

    const unlockedAchievements = achievements.filter(a => a.isUnlocked);
    const lockedAchievements = achievements.filter(a => !a.isUnlocked);
    const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0);

    const handleAchievementClick = (achievement: Achievement) => {
        analytics.track("member_achievement_clicked", {
            achievement_id: achievement.id,
            achievement_title: achievement.title,
            is_unlocked: achievement.isUnlocked,
            rarity: achievement.rarity,
        });
    };

    if (isLoading) {
        return (
            <div className="member-achievements">
                <div className="member-achievements__header">
                    <h3 className="member-achievements__title">Achievements</h3>
                </div>
                <div className="member-achievements__loading">
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="achievement-card">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
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
        <div className="member-achievements">
            <div className="member-achievements__header">
                <h3 className="member-achievements__title">Achievements</h3>
                <div className="member-achievements__stats">
                    <span className="member-achievements__points">{totalPoints} points</span>
                    <span className="member-achievements__count">
                        {unlockedAchievements.length}/{achievements.length}
                    </span>
                </div>
            </div>

            <div className="member-achievements__content">
                {/* Unlocked Achievements */}
                {unlockedAchievements.length > 0 && (
                    <div className="member-achievements__section">
                        <h4 className="member-achievements__section-title">Unlocked</h4>
                        <div className="member-achievements__list">
                            {unlockedAchievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className={`achievement-card achievement-card--unlocked achievement-card--${achievement.rarity}`}
                                    onClick={() => handleAchievementClick(achievement)}
                                >
                                    <div className="achievement-card__icon">
                                        {achievement.icon}
                                    </div>
                                    <div className="achievement-card__content">
                                        <div className="achievement-card__header">
                                            <h4 className="achievement-card__title">{achievement.title}</h4>
                                            <span className="achievement-card__points">+{achievement.points}</span>
                                        </div>
                                        <p className="achievement-card__description">{achievement.description}</p>
                                        {achievement.unlockedAt && (
                                            <time className="achievement-card__date">
                                                Unlocked {achievement.unlockedAt.toLocaleDateString()}
                                            </time>
                                        )}
                                    </div>
                                    <div className="achievement-card__badge">
                                        <Trophy className="w-4 h-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Locked Achievements */}
                {lockedAchievements.length > 0 && (
                    <div className="member-achievements__section">
                        <h4 className="member-achievements__section-title">In Progress</h4>
                        <div className="member-achievements__list">
                            {lockedAchievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className={`achievement-card achievement-card--locked achievement-card--${achievement.rarity}`}
                                    onClick={() => handleAchievementClick(achievement)}
                                >
                                    <div className="achievement-card__icon achievement-card__icon--locked">
                                        {achievement.icon}
                                    </div>
                                    <div className="achievement-card__content">
                                        <div className="achievement-card__header">
                                            <h4 className="achievement-card__title">{achievement.title}</h4>
                                            <span className="achievement-card__points">+{achievement.points}</span>
                                        </div>
                                        <p className="achievement-card__description">{achievement.description}</p>
                                        {achievement.progress !== undefined && achievement.maxProgress && (
                                            <div className="achievement-card__progress">
                                                <div className="achievement-card__progress-bar">
                                                    <div 
                                                        className="achievement-card__progress-fill"
                                                        style={{ 
                                                            width: `${(achievement.progress / achievement.maxProgress) * 100}%` 
                                                        }}
                                                    />
                                                </div>
                                                <span className="achievement-card__progress-text">
                                                    {achievement.progress}/{achievement.maxProgress}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
