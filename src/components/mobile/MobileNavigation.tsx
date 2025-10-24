"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, User, BookOpen, Crown, Users, BarChart3, Settings } from "lucide-react";
import { useAnalytics } from "@/providers/AnalyticsProvider";

type MobileNavItem = {
    id: string;
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: string;
    isActive?: boolean;
};

type MobileNavigationProps = {
    memberId: string;
    hasCollectible: boolean;
    level: number;
    roles: string[];
};

const NAV_ICONS = {
    home: <Home className="w-5 h-5" />,
    profile: <User className="w-5 h-5" />,
    recipes: <BookOpen className="w-5 h-5" />,
    collectibles: <Crown className="w-5 h-5" />,
    community: <Users className="w-5 h-5" />,
    analytics: <BarChart3 className="w-5 h-5" />,
    settings: <Settings className="w-5 h-5" />,
};

export default function MobileNavigation({ memberId, hasCollectible, level, roles }: MobileNavigationProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const analytics = useAnalytics();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Close mobile nav when route changes
        setIsOpen(false);
    }, [pathname]);

    const navItems: MobileNavItem[] = [
        {
            id: "home",
            label: "Overview",
            href: "/members",
            icon: NAV_ICONS.home,
            isActive: pathname === "/members",
        },
        {
            id: "recipes",
            label: "Recipes",
            href: "/members/recipes",
            icon: NAV_ICONS.recipes,
            isActive: pathname.startsWith("/members/recipes"),
        },
        {
            id: "collectibles",
            label: "Collectibles",
            href: "/alchemy-collectibles",
            icon: NAV_ICONS.collectibles,
            badge: hasCollectible ? "Verified" : "Locked",
            isActive: pathname.startsWith("/alchemy-collectibles"),
        },
        {
            id: "community",
            label: "Community",
            href: "/forum",
            icon: NAV_ICONS.community,
            isActive: pathname.startsWith("/forum") || pathname.startsWith("/community"),
        },
        {
            id: "analytics",
            label: "Analytics",
            href: "/members/analytics",
            icon: NAV_ICONS.analytics,
            isActive: pathname.startsWith("/members/analytics"),
        },
    ];

    const handleNavClick = (item: MobileNavItem) => {
        analytics.track("mobile_nav_clicked", {
            nav_item: item.id,
            nav_label: item.label,
            member_id: memberId,
        });
    };

    const toggleMobileNav = () => {
        setIsOpen(!isOpen);
        analytics.track("mobile_nav_toggled", {
            is_open: !isOpen,
            member_id: memberId,
        });
    };

    return (
        <>
            {/* Mobile Navigation Toggle */}
            <button
                className={`mobile-nav-toggle ${isScrolled ? "mobile-nav-toggle--scrolled" : ""}`}
                onClick={toggleMobileNav}
                aria-label="Toggle mobile navigation"
                aria-expanded={isOpen}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Navigation Overlay */}
            {isOpen && (
                <div className="mobile-nav-overlay" onClick={toggleMobileNav}>
                    <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="mobile-nav-header">
                            <div className="mobile-nav-user">
                                <div className="mobile-nav-avatar">
                                    <User className="w-6 h-6" />
                                </div>
                                <div className="mobile-nav-user-info">
                                    <h3 className="mobile-nav-user-name">Member Portal</h3>
                                    <p className="mobile-nav-user-level">Level {level}</p>
                                </div>
                            </div>
                            <button
                                className="mobile-nav-close"
                                onClick={toggleMobileNav}
                                aria-label="Close navigation"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <nav className="mobile-nav-content">
                            <div className="mobile-nav-section">
                                <h4 className="mobile-nav-section-title">Navigation</h4>
                                <ul className="mobile-nav-list">
                                    {navItems.map((item) => (
                                        <li key={item.id} className="mobile-nav-item">
                                            <Link
                                                href={item.href}
                                                className={`mobile-nav-link ${item.isActive ? "mobile-nav-link--active" : ""}`}
                                                onClick={() => handleNavClick(item)}
                                            >
                                                <div className="mobile-nav-link-icon">
                                                    {item.icon}
                                                </div>
                                                <span className="mobile-nav-link-label">{item.label}</span>
                                                {item.badge && (
                                                    <span className={`mobile-nav-badge ${item.badge === "Verified" ? "mobile-nav-badge--verified" : "mobile-nav-badge--locked"}`}>
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mobile-nav-section">
                                <h4 className="mobile-nav-section-title">Quick Actions</h4>
                                <div className="mobile-nav-actions">
                                    <Link
                                        href="/contact"
                                        className="mobile-nav-action"
                                        onClick={() => handleNavClick({ id: "contact", label: "Contact", href: "/contact", icon: NAV_ICONS.settings })}
                                    >
                                        <Settings className="w-4 h-4" />
                                        <span>Contact Concierge</span>
                                    </Link>
                                    {!hasCollectible && (
                                        <Link
                                            href="/alchemy-collectibles"
                                            className="mobile-nav-action mobile-nav-action--highlight"
                                            onClick={() => handleNavClick({ id: "unlock", label: "Unlock Collectibles", href: "/alchemy-collectibles", icon: NAV_ICONS.collectibles })}
                                        >
                                            <Crown className="w-4 h-4" />
                                            <span>Unlock Collectibles</span>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="mobile-nav-footer">
                                <div className="mobile-nav-stats">
                                    <div className="mobile-nav-stat">
                                        <span className="mobile-nav-stat-label">Level</span>
                                        <span className="mobile-nav-stat-value">{level}</span>
                                    </div>
                                    <div className="mobile-nav-stat">
                                        <span className="mobile-nav-stat-label">Status</span>
                                        <span className="mobile-nav-stat-value">
                                            {hasCollectible ? "Verified" : "Member"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            )}

            {/* Mobile Bottom Navigation */}
            <div className="mobile-bottom-nav">
                <div className="mobile-bottom-nav-content">
                    {navItems.slice(0, 4).map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`mobile-bottom-nav-item ${item.isActive ? "mobile-bottom-nav-item--active" : ""}`}
                            onClick={() => handleNavClick(item)}
                        >
                            <div className="mobile-bottom-nav-icon">
                                {item.icon}
                            </div>
                            <span className="mobile-bottom-nav-label">{item.label}</span>
                            {item.badge && (
                                <div className={`mobile-bottom-nav-badge ${item.badge === "Verified" ? "mobile-bottom-nav-badge--verified" : "mobile-bottom-nav-badge--locked"}`} />
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
