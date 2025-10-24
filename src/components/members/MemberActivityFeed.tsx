"use client";

import React, { useState, useEffect } from "react";
import { Calendar, ChefHat, Crown, Sparkles, TrendingUp, Users } from "lucide-react";
import { useAnalytics } from "@/providers/AnalyticsProvider";

type ActivityItem = {
    id: string;
    type: "recipe_view" | "collectible_mint" | "forum_post" | "level_up" | "achievement" | "community_join";
    title: string;
    description: string;
    timestamp: Date;
    icon: React.ReactNode;
    value?: string;
    isNew?: boolean;
};

type MemberActivityFeedProps = {
    memberId: string;
    hasCollectible: boolean;
    level: number;
    roles: string[];
};

const ACTIVITY_ICONS = {
    recipe_view: <ChefHat className="w-4 h-4" />,
    collectible_mint: <Crown className="w-4 h-4" />,
    forum_post: <Users className="w-4 h-4" />,
    level_up: <TrendingUp className="w-4 h-4" />,
    achievement: <Sparkles className="w-4 h-4" />,
    community_join: <Users className="w-4 h-4" />,
};

export default function MemberActivityFeed({ memberId, hasCollectible, level, roles }: MemberActivityFeedProps) {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const analytics = useAnalytics();

    useEffect(() => {
        // Simulate loading member activities
        const mockActivities: ActivityItem[] = [
            {
                id: "1",
                type: "level_up",
                title: "Level Up!",
                description: `Congratulations! You've reached level ${level}`,
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                icon: ACTIVITY_ICONS.level_up,
                value: `Level ${level}`,
                isNew: true,
            },
            {
                id: "2",
                type: "recipe_view",
                title: "Recipe Explored",
                description: "You viewed the Mediterranean Circadian Reset recipe",
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
                icon: ACTIVITY_ICONS.recipe_view,
            },
            {
                id: "3",
                type: "forum_post",
                title: "Forum Contribution",
                description: "You shared insights in the Alchemist's Forum",
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
                icon: ACTIVITY_ICONS.forum_post,
            },
            ...(hasCollectible ? [{
                id: "4",
                type: "collectible_mint" as const,
                title: "Collectible Verified",
                description: "Your Alchemy collectible has been verified",
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                icon: ACTIVITY_ICONS.collectible_mint,
                value: "Alchemy Tier",
            }] : []),
        ];

        // Simulate API call
        setTimeout(() => {
            setActivities(mockActivities);
            setIsLoading(false);
        }, 1000);

        // Track activity feed view
        analytics.track("member_activity_viewed", {
            member_id: memberId,
            has_collectible: hasCollectible,
            level: level,
        });
    }, [memberId, hasCollectible, level, analytics]);

    const formatTimeAgo = (date: Date): string => {
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        
        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`;
        } else if (diffInMinutes < 1440) {
            return `${Math.floor(diffInMinutes / 60)}h ago`;
        } else {
            return `${Math.floor(diffInMinutes / 1440)}d ago`;
        }
    };

    if (isLoading) {
        return (
            <div className="member-activity-feed">
                <div className="member-activity-feed__header">
                    <h3 className="member-activity-feed__title">Recent Activity</h3>
                </div>
                <div className="member-activity-feed__loading">
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="member-activity-feed">
            <div className="member-activity-feed__header">
                <h3 className="member-activity-feed__title">Recent Activity</h3>
                <span className="member-activity-feed__count">{activities.length} activities</span>
            </div>
            <div className="member-activity-feed__list">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className={`member-activity-item ${activity.isNew ? "member-activity-item--new" : ""}`}
                    >
                        <div className="member-activity-item__icon">
                            {activity.icon}
                        </div>
                        <div className="member-activity-item__content">
                            <div className="member-activity-item__header">
                                <h4 className="member-activity-item__title">{activity.title}</h4>
                                {activity.value && (
                                    <span className="member-activity-item__value">{activity.value}</span>
                                )}
                            </div>
                            <p className="member-activity-item__description">{activity.description}</p>
                            <time className="member-activity-item__timestamp">
                                {formatTimeAgo(activity.timestamp)}
                            </time>
                        </div>
                        {activity.isNew && (
                            <div className="member-activity-item__badge">New</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
