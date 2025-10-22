import React from "react";
import type { MemberStory } from "@/data/community";

type Props = {
    stories: MemberStory[];
};

export default function MemberStories({ stories }: Props) {
    return (
        <section className="rounded-[2.5rem] border border-[var(--line-soft)] bg-paper-soft/70 p-8 shadow-xl">
            <p className="text-xs uppercase tracking-[0.45em] text-ink-soft">Member narratives</p>
            <h2 className="mt-2 text-3xl font-serif text-accent">How patrons transmute gatherings</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
                {stories.map((story) => (
                    <article
                        key={story.id}
                        className="flex h-full flex-col justify-between rounded-3xl border border-[var(--line-hairline)] bg-paper/40 p-6"
                    >
                        <div>
                            <h3 className="text-xl font-serif text-ink">{story.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-ink-soft">“{story.excerpt}”</p>
                        </div>
                        <footer className="mt-6 text-xs uppercase tracking-[0.3em] text-ink-soft">
                            {story.member}
                            <span className="block text-[0.65rem] uppercase tracking-[0.35em] text-ink-muted">
                                {story.role}
                            </span>
                        </footer>
                    </article>
                ))}
            </div>
        </section>
    );
}
