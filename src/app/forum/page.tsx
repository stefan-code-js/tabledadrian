import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/StaticImage";
import { listForumHighlights } from "@/lib/forum";
import { images } from "@/data/images";

export const metadata: Metadata = {
    title: "Forum Salon | Table d'Adrian",
    description:
        "Enter the Alchemist's forum to exchange rituals, uncover collectible privileges, and co-create future salons with peers across the globe.",
};

export default async function ForumPage() {
    const heroImage = images.heroDefault;
    const highlights = await listForumHighlights(6);

    return (
        <article className="space-y-12 pb-20">
            <header className="relative overflow-hidden rounded-[3rem] border border-[var(--line-soft)] bg-paper-soft/80 px-10 py-16 text-center shadow-2xl">
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
                    <span className="text-xs uppercase tracking-[0.45em] text-ink-soft">Alchemist&apos;s Forum</span>
                    <h1 className="text-4xl font-serif text-accent">
                        Where culinary alchemists convene
                    </h1>
                    <p className="text-sm text-ink-soft leading-relaxed">
                        Share tasting intel, unlock digital collectibles, and choreograph residencies with fellow patrons.
                        Each conversation is curated for discretion, velocity, and exquisite detail.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/newsletter" className="btn">
                            Join the newsletter
                        </Link>
                        <a href="https://forum.tabledadrian.com" className="btn ghost" target="_blank" rel="noreferrer">
                            Continue to forum
                        </a>
                    </div>
                </div>
                <div className="relative mx-auto mt-10 h-64 w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-[var(--line-hairline)]">
                    <Image
                        src={heroImage.src}
                        alt={heroImage.alt}
                        width={heroImage.width ?? 2400}
                        height={heroImage.height ?? 1600}
                        className="h-full w-full object-cover"
                        sizes="(min-width: 1024px) 70vw, 100vw"
                    />
                </div>
            </header>

            <section className="community-forum-grid">
                {highlights.length > 0 ? (
                    highlights.map((post) => (
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
                            <h2 className="community-forum-card__title">{post.title}</h2>
                            <p className="community-forum-card__body">{post.body}</p>
                            <div className="community-forum-card__footer">
                                <span>{post.authorEmail}</span>
                                <a href="https://forum.tabledadrian.com" className="community-forum-card__link" target="_blank" rel="noreferrer">
                                    Continue in forum
                                </a>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="rounded-3xl border border-[var(--line-hairline)] bg-paper/40 p-8 text-center text-sm text-ink-soft">
                        <p>New discussions are forming. Start the first thread and set the tone for the atelier.</p>
                    </div>
                )}
            </section>

            <section className="rounded-[2.5rem] border border-dashed border-[var(--line-hairline)] bg-paper/30 p-10 text-center text-sm text-ink-soft">
                <h2 className="text-2xl font-serif text-ink">Align with the atelier</h2>
                <p className="mx-auto mt-3 max-w-2xl">
                    Collectible holders enjoy vaulted channels, live masterclasses, and concierge response within minutes.
                    Join the circle, mint your key, and shape the next season of Table d&apos;Adrian experiences.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <Link href="/alchemy-collectibles" className="btn">
                        Mint your key
                    </Link>
                    <Link href="/auth/register" className="btn ghost">
                        Request invitation
                    </Link>
                </div>
            </section>
        </article>
    );
}
