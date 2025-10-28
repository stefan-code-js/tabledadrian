import Link from "next/link";
import Image from "@/components/StaticImage";
import type { CommunityAtlasEntry, EventRegion } from "@/lib/community";

type Props = {
    entries: CommunityAtlasEntry[];
    regionCounts: Record<EventRegion, number>;
};

export default function CommunityAtlas({ entries, regionCounts }: Props) {
    const totalRegions = Object.keys(regionCounts).length;
    const totalEvents = Object.values(regionCounts).reduce((sum, value) => sum + value, 0);

    return (
        <section className="community-atlas" aria-labelledby="community-atlas-heading">
            <header className="community-atlas__header">
                <div>
                    <p className="community-atlas__eyebrow">Global enclaves</p>
                    <h2 id="community-atlas-heading" className="community-atlas__title">
                        Where the guild convenes
                    </h2>
                    <p className="community-atlas__lead">
                        Each enclave is curated for discretion, sensory storytelling, and concierge-grade service. Atlas entries
                        surface the next salon, signature highlight, and concierge pathways for collectors.
                    </p>
                </div>
                <aside className="community-atlas__stats" aria-label="Atlas statistics">
                    <div className="community-atlas__stat">
                        <span className="community-atlas__stat-value">{totalRegions}</span>
                        <span className="community-atlas__stat-label">Regions</span>
                    </div>
                    <div className="community-atlas__stat">
                        <span className="community-atlas__stat-value">{totalEvents}</span>
                        <span className="community-atlas__stat-label">Salon moments catalogued</span>
                    </div>
                    <ul className="community-atlas__regions">
                        {Object.entries(regionCounts).map(([region, count]) => (
                            <li key={region}>
                                <span>{region}</span>
                                <span aria-hidden="true">•</span>
                                <span>{count}</span>
                            </li>
                        ))}
                    </ul>
                </aside>
            </header>

            <div className="community-atlas__grid">
                {entries.map((entry) => {
                    const event = entry.upcomingEvent;
                    return (
                        <article
                            key={entry.id}
                            className="community-atlas__card"
                            data-analytics-region={entry.region}
                            data-analytics-id={`community-atlas-${entry.id}`}
                        >
                            <div className="community-atlas__media" aria-hidden="true">
                                <Image
                                    src={entry.image}
                                    alt={entry.title}
                                    fill
                                    sizes="(min-width: 1024px) 320px, 100vw"
                                    className="community-atlas__image"
                                />
                            </div>
                            <div className="community-atlas__body">
                                <p className="community-atlas__region">{entry.region}</p>
                                <h3 className="community-atlas__card-title">{entry.title}</h3>
                                <p className="community-atlas__summary">{entry.summary}</p>
                                <p className="community-atlas__highlight">{entry.highlight}</p>
                                <p className="community-atlas__note">{entry.conciergeNote}</p>
                                {event ? (
                                    <div className="community-atlas__event">
                                        <span className="community-atlas__event-label">Next salon</span>
                                        <div className="community-atlas__event-details">
                                            <time dateTime={event.startDate}>
                                                {new Date(event.startDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </time>
                                            <span>{event.title}</span>
                                        </div>
                                        <Link href="/community/passport" className="community-atlas__event-link">
                                            View passport
                                        </Link>
                                    </div>
                                ) : null}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
