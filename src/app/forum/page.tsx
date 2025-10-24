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
        <article className="editorial-page">
            <header className="page-cover">
                <div className="page-cover__body">
                    <span className="page-eyebrow">Alchemist&apos;s Forum</span>
                    <h1 className="page-heading">Where culinary alchemists convene</h1>
                    <p className="page-subheading">
                        Share tasting intel, unlock digital collectibles, and choreograph residencies with fellow patrons.
                        Each conversation is curated for discretion, velocity, and exquisite detail.
                    </p>
                    <div className="page-actions">
                        <Link href="/newsletter" className="btn">
                            Join the newsletter
                        </Link>
                        <a href="https://forum.tabledadrian.com" className="btn ghost" target="_blank" rel="noreferrer">
                            Continue to forum
                        </a>
                    </div>
                </div>
                <figure className="page-cover__media" aria-hidden="true">
                    <Image
                        src={heroImage.src}
                        alt={heroImage.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 70vw, 100vw"
                    />
                </figure>
            </header>

            <section className="page-surface">
                <div className="community-forum-grid">
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
                        <div className="page-card page-card--center">
                            <p className="page-card__body">
                                New discussions are forming. Start the first thread and set the tone for the atelier.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className="page-surface page-surface--center">
                <h2 className="page-heading">Align with the atelier</h2>
                <p className="page-subheading">
                    Collectible holders enjoy vaulted channels, live masterclasses, and concierge response within minutes.
                    Join the circle, mint your key, and shape the next season of Table d&apos;Adrian experiences.
                </p>
                <div className="page-actions">
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
