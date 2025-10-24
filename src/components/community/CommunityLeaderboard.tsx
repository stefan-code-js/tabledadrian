"use client";

import React, { useState, useEffect } from "react";
import { Crown, Trophy, Star, TrendingUp, Users, ChefHat } from "lucide-react";
import { useAnalytics } from "@/providers/AnalyticsProvider";

type LeaderboardEntry = {
    id: string;
    name: string;
    avatar?: string;
    level: number;
    points: number;
    rank: number;
    badges: string[];
    isCurrentUser: boolean;
    achievements: number;
    recipesViewed: number;
    forumPosts: number;
    hasCollectible: boolean;
};

type CommunityLeaderboardProps = {
    memberId: string;
    currentUserLevel: number;
    currentUserPoints: number;
};

const RANK_ICONS = {
    1: <Crown className="w-5 h-5 text-yellow-500" />,
    2: <Trophy className="w-5 h-5 text-gray-400" />,
    3: <Trophy className="w-5 h-5 text-amber-600" />,
};

const BADGE_ICONS = {
    "collectible": <Crown className="w-3 h-3" />,
    "chef": <ChefHat className="w-3 h-3" />,
    "community": <Users className="w-3 h-3" />,
    "veteran": <Star className="w-3 h-3" />,
};

export default function CommunityLeaderboard({ memberId, currentUserLevel, currentUserPoints }: CommunityLeaderboardProps) {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [timeframe, setTimeframe] = useState<"all" | "month" | "week">("all");
    const analytics = useAnalytics();

    useEffect(() => {
        const generateLeaderboard = (): LeaderboardEntry[] => {
            const mockEntries: LeaderboardEntry[] = [
                {
                    id: "1",
                    name: "Chef Adrian",
                    level: 30,
                    points: 1250,
                    rank: 1,
                    badges: ["collectible", "chef", "veteran"],
                    isCurrentUser: false,
                    achievements: 12,
                    recipesViewed: 45,
                    forumPosts: 8,
                    hasCollectible: true,
                },
                {
                    id: "2",
                    name: "Dr. Antonia",
                    level: 28,
                    points: 1180,
                    rank: 2,
                    badges: ["collectible", "chef", "community"],
                    isCurrentUser: false,
                    achievements: 10,
                    recipesViewed: 38,
                    forumPosts: 12,
                    hasCollectible: true,
                },
                {
                    id: "3",
                    name: "Monaco Elite",
                    level: 25,
                    points: 1050,
                    rank: 3,
                    badges: ["collectible", "veteran"],
                    isCurrentUser: false,
                    achievements: 8,
                    recipesViewed: 32,
                    forumPosts: 5,
                    hasCollectible: true,
                },
                {
                    id: memberId,
                    name: "You",
                    level: currentUserLevel,
                    points: currentUserPoints,
                    rank: 4,
                    badges: ["community"],
                    isCurrentUser: true,
                    achievements: 5,
                    recipesViewed: 15,
                    forumPosts: 3,
                    hasCollectible: false,
                },
                {
                    id: "5",
                    name: "Dubai Connoisseur",
                    level: 22,
                    points: 920,
                    rank: 5,
                    badges: ["collectible"],
                    isCurrentUser: false,
                    achievements: 6,
                    recipesViewed: 28,
                    forumPosts: 7,
                    hasCollectible: true,
                },
                {
                    id: "6",
                    name: "NYC Foodie",
                    level: 20,
                    points: 850,
                    rank: 6,
                    badges: ["community"],
                    isCurrentUser: false,
                    achievements: 4,
                    recipesViewed: 22,
                    forumPosts: 9,
                    hasCollectible: false,
                },
                {
                    id: "7",
                    name: "London Gourmet",
                    level: 18,
                    points: 780,
                    rank: 7,
                    badges: ["veteran"],
                    isCurrentUser: false,
                    achievements: 3,
                    recipesViewed: 18,
                    forumPosts: 2,
                    hasCollectible: false,
                },
                {
                    id: "8",
                    name: "Paris Epicurean",
                    level: 16,
                    points: 720,
                    rank: 8,
                    badges: ["chef"],
                    isCurrentUser: false,
                    achievements: 2,
                    recipesViewed: 14,
                    forumPosts: 4,
                    hasCollectible: false,
                },
            ];

            return mockEntries.sort((a, b) => b.points - a.points).map((entry, index) => ({
                ...entry,
                rank: index + 1,
            }));
        };

        // Simulate API call
        setTimeout(() => {
            setLeaderboard(generateLeaderboard());
            setIsLoading(false);
        }, 1200);

        // Track leaderboard view
        analytics.track("community_leaderboard_viewed", {
            member_id: memberId,
            timeframe: timeframe,
        });
    }, [memberId, currentUserLevel, currentUserPoints, timeframe, analytics]);

    const handleTimeframeChange = (newTimeframe: "all" | "month" | "week") => {
        setTimeframe(newTimeframe);
        analytics.track("leaderboard_timeframe_changed", {
            member_id: memberId,
            timeframe: newTimeframe,
        });
    };

    const handleMemberClick = (member: LeaderboardEntry) => {
        analytics.track("leaderboard_member_clicked", {
            member_id: member.id,
            member_name: member.name,
            member_rank: member.rank,
            is_current_user: member.isCurrentUser,
        });
    };

    if (isLoading) {
        return (
            <div className="community-leaderboard">
                <div className="community-leaderboard__header">
                    <h3 className="community-leaderboard__title">Community Leaderboard</h3>
                </div>
                <div className="community-leaderboard__loading">
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="leaderboard-entry">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                    <div className="w-12 h-6 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="community-leaderboard">
            <div className="community-leaderboard__header">
                <h3 className="community-leaderboard__title">Community Leaderboard</h3>
                <div className="community-leaderboard__filters">
                    <button
                        className={`community-leaderboard__filter ${timeframe === "all" ? "community-leaderboard__filter--active" : ""}`}
                        onClick={() => handleTimeframeChange("all")}
                    >
                        All Time
                    </button>
                    <button
                        className={`community-leaderboard__filter ${timeframe === "month" ? "community-leaderboard__filter--active" : ""}`}
                        onClick={() => handleTimeframeChange("month")}
                    >
                        This Month
                    </button>
                    <button
                        className={`community-leaderboard__filter ${timeframe === "week" ? "community-leaderboard__filter--active" : ""}`}
                        onClick={() => handleTimeframeChange("week")}
                    >
                        This Week
                    </button>
                </div>
            </div>

            <div className="community-leaderboard__list">
                {leaderboard.map((member) => (
                    <div
                        key={member.id}
                        className={`leaderboard-entry ${member.isCurrentUser ? "leaderboard-entry--current" : ""}`}
                        onClick={() => handleMemberClick(member)}
                    >
                        <div className="leaderboard-entry__rank">
                            {member.rank <= 3 ? RANK_ICONS[member.rank as keyof typeof RANK_ICONS] : (
                                <span className="leaderboard-entry__rank-number">{member.rank}</span>
                            )}
                        </div>
                        
                        <div className="leaderboard-entry__avatar">
                            <div className="leaderboard-entry__avatar-circle">
                                {member.name.charAt(0)}
                            </div>
                        </div>

                        <div className="leaderboard-entry__info">
                            <div className="leaderboard-entry__header">
                                <h4 className="leaderboard-entry__name">{member.name}</h4>
                                <div className="leaderboard-entry__badges">
                                    {member.badges.map((badge) => (
                                        <div key={badge} className="leaderboard-entry__badge" title={badge}>
                                            {BADGE_ICONS[badge as keyof typeof BADGE_ICONS]}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="leaderboard-entry__stats">
                                <span className="leaderboard-entry__level">Level {member.level}</span>
                                <span className="leaderboard-entry__achievements">{member.achievements} achievements</span>
                            </div>
                        </div>

                        <div className="leaderboard-entry__points">
                            <span className="leaderboard-entry__points-value">{member.points}</span>
                            <span className="leaderboard-entry__points-label">points</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="community-leaderboard__footer">
                <p className="community-leaderboard__note">
                    Rankings are updated daily. Points are earned through community engagement, recipe exploration, and collectible verification.
                </p>
            </div>
        </div>
    );
}
