"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Users, Eye, Heart, Clock, Target, BarChart3, PieChart } from "lucide-react";
import { useAnalytics } from "@/providers/AnalyticsProvider";

type AnalyticsMetric = {
    id: string;
    label: string;
    value: number;
    change: number;
    changeType: "increase" | "decrease" | "neutral";
    icon: React.ReactNode;
    format: "number" | "percentage" | "time";
};

type EngagementData = {
    totalViews: number;
    totalLikes: number;
    totalBookmarks: number;
    averageSessionTime: number;
    contentEngagement: number;
    communityParticipation: number;
    achievementProgress: number;
    levelProgress: number;
};

type MemberAnalyticsProps = {
    memberId: string;
    hasCollectible: boolean;
    level: number;
    roles: string[];
};

export default function MemberAnalytics({ memberId, hasCollectible, level, roles }: MemberAnalyticsProps) {
    const [analytics, setAnalytics] = useState<AnalyticsMetric[]>([]);
    const [engagementData, setEngagementData] = useState<EngagementData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">("30d");
    const analyticsProvider = useAnalytics();

    useEffect(() => {
        const generateAnalytics = (): AnalyticsMetric[] => {
            const baseMetrics = [
                {
                    id: "content-views",
                    label: "Content Views",
                    value: hasCollectible ? 245 : 156,
                    change: hasCollectible ? 12.5 : 8.3,
                    changeType: "increase" as const,
                    icon: <Eye className="w-5 h-5" />,
                    format: "number" as const,
                },
                {
                    id: "engagement-rate",
                    label: "Engagement Rate",
                    value: hasCollectible ? 78.5 : 65.2,
                    change: hasCollectible ? 5.2 : 2.1,
                    changeType: "increase" as const,
                    icon: <Heart className="w-5 h-5" />,
                    format: "percentage" as const,
                },
                {
                    id: "session-time",
                    label: "Avg Session Time",
                    value: hasCollectible ? 18.5 : 12.3,
                    change: hasCollectible ? 15.8 : 8.7,
                    changeType: "increase" as const,
                    icon: <Clock className="w-5 h-5" />,
                    format: "time" as const,
                },
                {
                    id: "community-score",
                    label: "Community Score",
                    value: hasCollectible ? 92 : 67,
                    change: hasCollectible ? 8.3 : 12.5,
                    changeType: "increase" as const,
                    icon: <Users className="w-5 h-5" />,
                    format: "number" as const,
                },
                {
                    id: "achievement-rate",
                    label: "Achievement Rate",
                    value: hasCollectible ? 85.7 : 42.9,
                    change: hasCollectible ? 12.1 : 18.3,
                    changeType: "increase" as const,
                    icon: <Target className="w-5 h-5" />,
                    format: "percentage" as const,
                },
                {
                    id: "level-progress",
                    label: "Level Progress",
                    value: level,
                    change: 0,
                    changeType: "neutral" as const,
                    icon: <TrendingUp className="w-5 h-5" />,
                    format: "number" as const,
                },
            ];

            return baseMetrics;
        };

        const generateEngagementData = (): EngagementData => {
            return {
                totalViews: hasCollectible ? 1247 : 892,
                totalLikes: hasCollectible ? 156 : 89,
                totalBookmarks: hasCollectible ? 34 : 18,
                averageSessionTime: hasCollectible ? 18.5 : 12.3,
                contentEngagement: hasCollectible ? 78.5 : 65.2,
                communityParticipation: hasCollectible ? 92 : 67,
                achievementProgress: hasCollectible ? 85.7 : 42.9,
                levelProgress: (level / 30) * 100,
            };
        };

        // Simulate API call
        setTimeout(() => {
            setAnalytics(generateAnalytics());
            setEngagementData(generateEngagementData());
            setIsLoading(false);
        }, 1200);

        // Track analytics view
        analyticsProvider.track("member_analytics_viewed", {
            member_id: memberId,
            has_collectible: hasCollectible,
            level: level,
            time_range: timeRange,
        });
    }, [memberId, hasCollectible, level, timeRange, analyticsProvider]);

    const handleTimeRangeChange = (newTimeRange: "7d" | "30d" | "90d" | "all") => {
        setTimeRange(newTimeRange);
        analyticsProvider.track("analytics_time_range_changed", {
            member_id: memberId,
            time_range: newTimeRange,
        });
    };

    const formatValue = (value: number, format: string): string => {
        switch (format) {
            case "percentage":
                return `${value.toFixed(1)}%`;
            case "time":
                return `${value.toFixed(1)}m`;
            case "number":
            default:
                return value.toLocaleString();
        }
    };

    const formatChange = (change: number, changeType: string): string => {
        const sign = changeType === "increase" ? "+" : changeType === "decrease" ? "-" : "";
        return `${sign}${change.toFixed(1)}%`;
    };

    if (isLoading) {
        return (
            <div className="member-analytics">
                <div className="member-analytics__header">
                    <h3 className="member-analytics__title">Analytics & Insights</h3>
                </div>
                <div className="member-analytics__loading">
                    <div className="animate-pulse space-y-4">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="analytics-metric">
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
            </div>
        );
    }

    return (
        <div className="member-analytics">
            <div className="member-analytics__header">
                <h3 className="member-analytics__title">Analytics & Insights</h3>
                <div className="member-analytics__controls">
                    <div className="member-analytics__time-range">
                        <select
                            value={timeRange}
                            onChange={(e) => handleTimeRangeChange(e.target.value as "7d" | "30d" | "90d" | "all")}
                            className="member-analytics__time-select"
                            aria-label="Select time range"
                        >
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                            <option value="90d">Last 90 days</option>
                            <option value="all">All time</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="member-analytics__metrics">
                {analytics.map((metric) => (
                    <div key={metric.id} className="analytics-metric">
                        <div className="analytics-metric__icon">
                            {metric.icon}
                        </div>
                        <div className="analytics-metric__content">
                            <div className="analytics-metric__header">
                                <h4 className="analytics-metric__label">{metric.label}</h4>
                                <span className={`analytics-metric__change analytics-metric__change--${metric.changeType}`}>
                                    {formatChange(metric.change, metric.changeType)}
                                </span>
                            </div>
                            <div className="analytics-metric__value">
                                {formatValue(metric.value, metric.format)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Engagement Overview */}
            {engagementData && (
                <div className="member-analytics__engagement">
                    <h4 className="member-analytics__section-title">Engagement Overview</h4>
                    <div className="member-analytics__engagement-grid">
                        <div className="engagement-card">
                            <div className="engagement-card__icon">
                                <Eye className="w-5 h-5" />
                            </div>
                            <div className="engagement-card__content">
                                <h5 className="engagement-card__title">Total Views</h5>
                                <p className="engagement-card__value">{engagementData.totalViews.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="engagement-card">
                            <div className="engagement-card__icon">
                                <Heart className="w-5 h-5" />
                            </div>
                            <div className="engagement-card__content">
                                <h5 className="engagement-card__title">Total Likes</h5>
                                <p className="engagement-card__value">{engagementData.totalLikes.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="engagement-card">
                            <div className="engagement-card__icon">
                                <Target className="w-5 h-5" />
                            </div>
                            <div className="engagement-card__content">
                                <h5 className="engagement-card__title">Bookmarks</h5>
                                <p className="engagement-card__value">{engagementData.totalBookmarks.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="engagement-card">
                            <div className="engagement-card__icon">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div className="engagement-card__content">
                                <h5 className="engagement-card__title">Avg Session</h5>
                                <p className="engagement-card__value">{engagementData.averageSessionTime.toFixed(1)}m</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Progress Bars */}
            <div className="member-analytics__progress">
                <h4 className="member-analytics__section-title">Progress Tracking</h4>
                <div className="member-analytics__progress-grid">
                    <div className="progress-item">
                        <div className="progress-item__header">
                            <span className="progress-item__label">Content Engagement</span>
                            <span className="progress-item__value">{engagementData?.contentEngagement.toFixed(1)}%</span>
                        </div>
                        <div className="progress-item__bar">
                            <div 
                                className="progress-item__fill"
                                style={{ width: `${engagementData?.contentEngagement || 0}%` }}
                            />
                        </div>
                    </div>

                    <div className="progress-item">
                        <div className="progress-item__header">
                            <span className="progress-item__label">Community Participation</span>
                            <span className="progress-item__value">{engagementData?.communityParticipation.toFixed(1)}%</span>
                        </div>
                        <div className="progress-item__bar">
                            <div 
                                className="progress-item__fill"
                                style={{ width: `${engagementData?.communityParticipation || 0}%` }}
                            />
                        </div>
                    </div>

                    <div className="progress-item">
                        <div className="progress-item__header">
                            <span className="progress-item__label">Achievement Progress</span>
                            <span className="progress-item__value">{engagementData?.achievementProgress.toFixed(1)}%</span>
                        </div>
                        <div className="progress-item__bar">
                            <div 
                                className="progress-item__fill"
                                style={{ width: `${engagementData?.achievementProgress || 0}%` }}
                            />
                        </div>
                    </div>

                    <div className="progress-item">
                        <div className="progress-item__header">
                            <span className="progress-item__label">Level Progress</span>
                            <span className="progress-item__value">{engagementData?.levelProgress.toFixed(1)}%</span>
                        </div>
                        <div className="progress-item__bar">
                            <div 
                                className="progress-item__fill"
                                style={{ width: `${engagementData?.levelProgress || 0}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Insights */}
            <div className="member-analytics__insights">
                <h4 className="member-analytics__section-title">Personalized Insights</h4>
                <div className="member-analytics__insights-list">
                    <div className="insight-card">
                        <div className="insight-card__icon">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div className="insight-card__content">
                            <h5 className="insight-card__title">Engagement Trending Up</h5>
                            <p className="insight-card__description">
                                Your content engagement has increased by {hasCollectible ? "12.5%" : "8.3%"} this month. 
                                {hasCollectible ? " Collectible holders show higher engagement rates." : " Consider verifying a collectible to unlock exclusive content."}
                            </p>
                        </div>
                    </div>

                    <div className="insight-card">
                        <div className="insight-card__icon">
                            <Users className="w-5 h-5" />
                        </div>
                        <div className="insight-card__content">
                            <h5 className="insight-card__title">Community Impact</h5>
                            <p className="insight-card__description">
                                You're in the top {hasCollectible ? "15%" : "35%"} of community members. 
                                {hasCollectible ? " Your contributions are highly valued by the community." : " Increase your participation to unlock more exclusive features."}
                            </p>
                        </div>
                    </div>

                    <div className="insight-card">
                        <div className="insight-card__icon">
                            <Target className="w-5 h-5" />
                        </div>
                        <div className="insight-card__content">
                            <h5 className="insight-card__title">Achievement Progress</h5>
                            <p className="insight-card__description">
                                You've completed {hasCollectible ? "85.7%" : "42.9%"} of available achievements. 
                                {hasCollectible ? " Excellent progress! You're on track to unlock VIP status." : " Focus on community participation and content exploration to unlock more achievements."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
