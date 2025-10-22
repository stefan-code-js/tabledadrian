"use client";

import React, { useMemo, useState } from "react";
import Image from "@/components/StaticImage";
import type { CommunityEvent } from "@/data/community";
import type { EventRegion } from "@/lib/community";

type Props = {
    events: CommunityEvent[];
    regions: EventRegion[];
};

const ALL = "All";

export default function EventsExplorer({ events, regions }: Props) {
    const [region, setRegion] = useState<EventRegion | typeof ALL>(ALL);

    const filtered = useMemo(() => {
        if (region === ALL) return events;
        return events.filter((event) => event.region === region);
    }, [events, region]);

    return (
        <section className="rounded-[2.5rem] border border-[var(--line-soft)] bg-paper-soft/70 p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.45em] text-ink-soft">Upcoming salons</p>
                    <h2 className="mt-2 text-3xl font-serif text-accent">Curated experiences calendar</h2>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="region-filter" className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                        Region
                    </label>
                    <select
                        id="region-filter"
                        className="rounded-xl border border-[var(--line-hairline)] bg-paper px-3 py-2 text-xs uppercase tracking-[0.3em] text-ink focus-visible:outline-accent"
                        value={region}
                        onChange={(event) => setRegion(event.target.value as EventRegion | typeof ALL)}
                    >
                        <option value={ALL}>All regions</option>
                        {regions.map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
                {filtered.map((event) => (
                    <article
                        key={event.id}
                        className="flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--line-hairline)] bg-paper/40"
                    >
                        <div className="relative h-48 w-full">
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 320px, 100vw"
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-4 p-6">
                            <div className="flex flex-wrap items-center justify-between text-xs uppercase tracking-[0.3em] text-ink-soft">
                                <span>{event.region}</span>
                                <span>
                                    {new Date(event.startDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            <h3 className="text-2xl font-serif text-ink">{event.title}</h3>
                            <p className="text-sm text-ink-soft">{event.summary}</p>
                            <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">{event.location}</p>
                            <div className="flex flex-wrap gap-2 text-[0.7rem] uppercase tracking-[0.3em]">
                                {event.tags.map((tag) => (
                                    <span
                                        key={`${event.id}-${tag}`}
                                        className="rounded-full border border-[var(--line-hairline)] bg-paper/50 px-3 py-1 text-ink-soft"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {event.requiresCollectible ? (
                                <p className="text-xs text-accent">
                                    Collectible holders receive priority admission and bespoke enhancements.
                                </p>
                            ) : null}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
