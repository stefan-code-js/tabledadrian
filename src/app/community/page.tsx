import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { getUpcomingEvents, listRegions } from "@/lib/community";
import { communityEvents, memberStories } from "@/data/community";
import { badgeDefinitions } from "@/data/badges";
import EventsExplorer from "@/components/community/EventsExplorer";
import MemberStories from "@/components/community/MemberStories";
import BadgeShowcase from "@/components/community/BadgeShowcase";
import NewsletterSignup from "@/components/NewsletterSignup";
import { listForumHighlights } from "@/lib/forum";

export const metadata: Metadata = {
    title: "Community Conclave | Table d'Adrian",
    description:
        "Discover salons, residencies, and the Alchemist's forum. Unlock badges, join events, and deepen the Table d'Adrian experience.",
};

const forumBaseUrl = process.env.DISCOURSE_BASE_URL ?? "https://forum.tabledadrian.com";

export default async function CommunityPage() {
    const session = await auth();
    const upcoming = getUpcomingEvents();
    const regions = listRegions();
    const isAuthenticated = Boolean(session?.user?.email);
    const forumHighlights = await listForumHighlights(3);

    return (
        <article className="space-y-12 pb-20">
            <header className="rounded-[3rem] border border-[var(--line-soft)] bg-paper-soft/70 px-10 py-14 shadow-2xl">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <div className="space-y-6">
                        <p className="text-xs uppercase tracking-[0.45em] text-ink-soft">Alchemist's Conclave</p>
                        <h1 className="text-4xl font-serif text-accent leading-snug">
                            Join the circle where gastronomy, technology, and wellness conspire.
                        </h1>
                        <p className="max-w-2xl text-sm text-ink-soft leading-relaxed">
                            Salons, residencies, forums, and collectible badges converge here. Members exchange rituals,
                            collaborate on residencies, and earn distinctions that unlock bespoke privileges across the world.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={forumBaseUrl}
                                className="btn text-xs uppercase tracking-[0.35em]"
                                prefetch={false}
                            >
                                Enter the forum
                            </Link>
                            <Link
                                href="/community/charter"
                                className="btn ghost text-xs uppercase tracking-[0.35em]"
                            >
                                Review community charter
                            </Link>
                            {!isAuthenticated ? (
                                <Link
                                    href="/auth/login?callbackUrl=%2Fcommunity"
                                    className="btn ghost text-xs uppercase tracking-[0.35em]"
                                >
                                    Sign in for member perks
                                </Link>
                            ) : null}
                        </div>
                        <div className="community-quote">
                            <p>
                                Your forum session handshakes with Auth.js during the first visit so no redundant logins
                                interrupt the exchange. Collectible holders receive priority invitations and complete vault access.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/40 blur-3xl" />
                        <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--line-soft)]">
                            <Image
                                src="/gallery/IMG_3520.webp"
                                alt="Cinematic members salon"
                                width={720}
                                height={720}
                                className="h-full w-full object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </header>

            <EventsExplorer events={upcoming} regions={regions} />
            <MemberStories stories={memberStories} />
            <BadgeShowcase badges={badgeDefinitions} />

            <section className="community-forum-grid">
                {forumHighlights.map((post) => (
                    <article key={post.id} className="community-forum-card">
                        <div className="community-forum-card__meta">
                            <span className="community-pill">Forum dispatch</span>
                            <time dateTime={post.createdAt}>
                                {new Date(post.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </time>
                        </div>
                        <h3 className="community-forum-card__title">{post.title}</h3>
                        <p className="community-forum-card__body">{post.body}</p>
                        <div className="community-forum-card__footer">
                            <span>{post.authorEmail}</span>
                            <Link href={forumBaseUrl} className="community-forum-card__link">
                                Continue in forum
                            </Link>
                        </div>
                    </article>
                ))}
            </section>

            <section className="rounded-[2.5rem] border border-dashed border-[var(--line-hairline)] bg-paper/30 p-8 text-sm text-ink-soft">
                <div className="community-salon">
                    <div className="community-salon__copy">
                        <h2 className="text-xl font-serif text-ink">Request a bespoke salon</h2>
                        <p>
                            Share your vision with the concierge and we will choreograph programming, wellness rituals, and collectible
                            unlocks tailored to your household.
                        </p>
                        <div className="community-salon__actions">
                            <Link href="/contact?context=community" className="btn text-xs uppercase tracking-[0.35em]">
                                Contact concierge
                            </Link>
                            <Link href="/auth/register" className="btn ghost text-xs uppercase tracking-[0.35em]">
                                Request access kit
                            </Link>
                        </div>
                    </div>
                    <NewsletterSignup />
                </div>
            </section>
        </article>
    );
}
