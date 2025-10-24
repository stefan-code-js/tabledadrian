"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Lock, Star, Clock, Users, ChefHat, Calendar, Sparkles } from "lucide-react";
import { useAnalytics } from "@/providers/AnalyticsProvider";

type ContentItem = {
    id: string;
    title: string;
    description: string;
    type: "recipe" | "event" | "article" | "video" | "guide" | "exclusive";
    category: "wellness" | "culinary" | "lifestyle" | "events" | "exclusive";
    accessLevel: "public" | "member" | "collectible" | "vip";
    isNew: boolean;
    isFeatured: boolean;
    readTime?: number;
    publishDate: Date;
    tags: string[];
    thumbnail?: string;
    author: string;
    views: number;
    likes: number;
    isBookmarked?: boolean;
};

type ContentManagerProps = {
    memberId: string;
    hasCollectible: boolean;
    level: number;
    roles: string[];
};

const CONTENT_ICONS = {
    recipe: <ChefHat className="w-4 h-4" />,
    event: <Calendar className="w-4 h-4" />,
    article: <BookOpen className="w-4 h-4" />,
    video: <BookOpen className="w-4 h-4" />,
    guide: <BookOpen className="w-4 h-4" />,
    exclusive: <Sparkles className="w-4 h-4" />,
};

const ACCESS_LEVELS = {
    public: { label: "Public", color: "bg-green-100 text-green-700", icon: <BookOpen className="w-3 h-3" /> },
    member: { label: "Member", color: "bg-blue-100 text-blue-700", icon: <Users className="w-3 h-3" /> },
    collectible: { label: "Collectible", color: "bg-purple-100 text-purple-700", icon: <Star className="w-3 h-3" /> },
    vip: { label: "VIP", color: "bg-yellow-100 text-yellow-700", icon: <Sparkles className="w-3 h-3" /> },
};

export default function ContentManager({ memberId, hasCollectible, level, roles }: ContentManagerProps) {
    const [content, setContent] = useState<ContentItem[]>([]);
    const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedAccessLevel, setSelectedAccessLevel] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const analytics = useAnalytics();

    useEffect(() => {
        const generateContent = (): ContentItem[] => {
            const mockContent: ContentItem[] = [
                {
                    id: "1",
                    title: "Mediterranean Circadian Reset",
                    description: "A comprehensive guide to aligning your eating patterns with natural circadian rhythms using Mediterranean techniques.",
                    type: "recipe",
                    category: "wellness",
                    accessLevel: "member",
                    isNew: true,
                    isFeatured: true,
                    readTime: 12,
                    publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                    tags: ["circadian", "mediterranean", "wellness"],
                    author: "Chef Adrian",
                    views: 245,
                    likes: 18,
                },
                {
                    id: "2",
                    title: "Monaco Midnight Atelier",
                    description: "Exclusive event for collectible holders featuring nocturnal tasting experiences and restorative tonics.",
                    type: "event",
                    category: "exclusive",
                    accessLevel: "collectible",
                    isNew: false,
                    isFeatured: true,
                    readTime: 5,
                    publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                    tags: ["monaco", "exclusive", "tasting"],
                    author: "Dr. Antonia",
                    views: 89,
                    likes: 12,
                },
                {
                    id: "3",
                    title: "Molecular Gastronomy Fundamentals",
                    description: "Advanced techniques for modernist cuisine and molecular gastronomy applications in fine dining.",
                    type: "guide",
                    category: "culinary",
                    accessLevel: "member",
                    isNew: false,
                    isFeatured: false,
                    readTime: 25,
                    publishDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    tags: ["molecular", "gastronomy", "techniques"],
                    author: "Chef Adrian",
                    views: 156,
                    likes: 23,
                },
                {
                    id: "4",
                    title: "Yacht Residency Blueprint",
                    description: "Complete guide to hosting luxury culinary experiences aboard private yachts in the Mediterranean.",
                    type: "exclusive",
                    category: "lifestyle",
                    accessLevel: "vip",
                    isNew: true,
                    isFeatured: false,
                    readTime: 18,
                    publishDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                    tags: ["yacht", "residency", "luxury"],
                    author: "Concierge Team",
                    views: 67,
                    likes: 8,
                },
                {
                    id: "5",
                    title: "Seasonal Ingredient Mastery",
                    description: "Understanding seasonal ingredients and their optimal preparation methods for maximum flavor and nutrition.",
                    type: "article",
                    category: "culinary",
                    accessLevel: "public",
                    isNew: false,
                    isFeatured: false,
                    readTime: 15,
                    publishDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                    tags: ["seasonal", "ingredients", "nutrition"],
                    author: "Chef Adrian",
                    views: 312,
                    likes: 31,
                },
                {
                    id: "6",
                    title: "Dubai Culinary Residency",
                    description: "Exclusive residency program in Dubai featuring Middle Eastern fusion techniques and luxury hospitality.",
                    type: "event",
                    category: "events",
                    accessLevel: "collectible",
                    isNew: false,
                    isFeatured: true,
                    readTime: 8,
                    publishDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                    tags: ["dubai", "residency", "fusion"],
                    author: "Dr. Antonia",
                    views: 134,
                    likes: 19,
                },
            ];

            return mockContent;
        };

        // Simulate API call
        setTimeout(() => {
            const contentData = generateContent();
            setContent(contentData);
            setFilteredContent(contentData);
            setIsLoading(false);
        }, 1000);

        // Track content manager view
        analytics.track("content_manager_viewed", {
            member_id: memberId,
            has_collectible: hasCollectible,
            level: level,
        });
    }, [memberId, hasCollectible, level, analytics]);

    useEffect(() => {
        let filtered = content;

        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Filter by access level
        if (selectedAccessLevel !== "all") {
            filtered = filtered.filter(item => item.accessLevel === selectedAccessLevel);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredContent(filtered);
    }, [content, selectedCategory, selectedAccessLevel, searchQuery]);

    const handleContentClick = (contentItem: ContentItem) => {
        analytics.track("content_item_clicked", {
            content_id: contentItem.id,
            content_title: contentItem.title,
            content_type: contentItem.type,
            access_level: contentItem.accessLevel,
        });
    };

    const handleBookmarkToggle = (contentId: string) => {
        setContent(prev => prev.map(item => 
            item.id === contentId 
                ? { ...item, isBookmarked: !item.isBookmarked }
                : item
        ));
        
        analytics.track("content_bookmark_toggled", {
            content_id: contentId,
        });
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatReadTime = (minutes: number): string => {
        return `${minutes} min read`;
    };

    if (isLoading) {
        return (
            <div className="content-manager">
                <div className="content-manager__header">
                    <h3 className="content-manager__title">Content Library</h3>
                </div>
                <div className="content-manager__loading">
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="content-card">
                                <div className="flex items-start space-x-3">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
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
        <div className="content-manager">
            <div className="content-manager__header">
                <h3 className="content-manager__title">Content Library</h3>
                <div className="content-manager__stats">
                    <span className="content-manager__count">{filteredContent.length} items</span>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="content-manager__filters">
                <div className="content-manager__search">
                    <input
                        type="text"
                        placeholder="Search content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="content-manager__search-input"
                    />
                </div>
                
                <div className="content-manager__filter-group">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="content-manager__filter-select"
                        aria-label="Filter by category"
                    >
                        <option value="all">All Categories</option>
                        <option value="wellness">Wellness</option>
                        <option value="culinary">Culinary</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="events">Events</option>
                        <option value="exclusive">Exclusive</option>
                    </select>

                    <select
                        value={selectedAccessLevel}
                        onChange={(e) => setSelectedAccessLevel(e.target.value)}
                        className="content-manager__filter-select"
                        aria-label="Filter by access level"
                    >
                        <option value="all">All Access Levels</option>
                        <option value="public">Public</option>
                        <option value="member">Member</option>
                        <option value="collectible">Collectible</option>
                        <option value="vip">VIP</option>
                    </select>
                </div>
            </div>

            {/* Content Grid */}
            <div className="content-manager__grid">
                {filteredContent.map((item) => (
                    <div
                        key={item.id}
                        className={`content-card ${item.isFeatured ? "content-card--featured" : ""} ${item.isNew ? "content-card--new" : ""}`}
                        onClick={() => handleContentClick(item)}
                    >
                        <div className="content-card__header">
                            <div className="content-card__icon">
                                {CONTENT_ICONS[item.type]}
                            </div>
                            <div className="content-card__access">
                                <span className={`content-card__access-badge ${ACCESS_LEVELS[item.accessLevel].color}`}>
                                    {ACCESS_LEVELS[item.accessLevel].icon}
                                    {ACCESS_LEVELS[item.accessLevel].label}
                                </span>
                            </div>
                            {item.isNew && (
                                <div className="content-card__badge">New</div>
                            )}
                        </div>

                        <div className="content-card__content">
                            <h4 className="content-card__title">{item.title}</h4>
                            <p className="content-card__description">{item.description}</p>
                            
                            <div className="content-card__meta">
                                <div className="content-card__author">
                                    <span>By {item.author}</span>
                                </div>
                                <div className="content-card__stats">
                                    <span className="content-card__views">{item.views} views</span>
                                    <span className="content-card__likes">{item.likes} likes</span>
                                </div>
                            </div>

                            <div className="content-card__footer">
                                <div className="content-card__tags">
                                    {item.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="content-card__tag">#{tag}</span>
                                    ))}
                                </div>
                                <div className="content-card__actions">
                                    <button
                                        className={`content-card__bookmark ${item.isBookmarked ? "content-card__bookmark--active" : ""}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleBookmarkToggle(item.id);
                                        }}
                                        aria-label={item.isBookmarked ? "Remove bookmark" : "Add bookmark"}
                                        title={item.isBookmarked ? "Remove bookmark" : "Add bookmark"}
                                    >
                                        <Star className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="content-card__info">
                                <span className="content-card__date">{formatDate(item.publishDate)}</span>
                                {item.readTime && (
                                    <span className="content-card__read-time">
                                        <Clock className="w-3 h-3" />
                                        {formatReadTime(item.readTime)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredContent.length === 0 && (
                <div className="content-manager__empty">
                    <p>No content found matching your filters.</p>
                </div>
            )}
        </div>
    );
}
