import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/StaticImage";
import CommunityAtlas from "@/components/community/CommunityAtlas";
import EventsExplorer from "@/components/community/EventsExplorer";
import MemberStories from "@/components/community/MemberStories";
import { images } from "@/data/images";
import {
    buildCommunityAtlas,
    getUpcomingEvents,
    listMemberStories,
    listRegions,
    summarizeEventsByRegion,
} from "@/lib/community";

export const metadata: Metadata = {
    title: "Community Guild | Table d'Adrian",
    description:
        "Explore the global salons, residencies, and member stories that shape the Table d'Adrian mastermind guild across Monaco, Dubai, New York, London, and beyond.",
};

export default function CommunityPage() {
    const atlas = buildCommunityAtlas();
    const regionCounts = summarizeEventsByRegion();
    const upcomingEvents = getUpcomingEvents();
    const regions = listRegions(upcomingEvents);
    const stories = listMemberStories(3);
    const heroImage = images.heroDefault;

    return (
        <article className="editorial-page">
            <header className="page-cover">
                <div className="page-cover__body">
                    <span className="page-eyebrow">Community Guild</span>
                    <h1 className="page-heading">A mastermind circle for culinary futurists</h1>
                    <p className="page-subheading">
                        Align with peers orchestrating Riviera villas, desert majlis residencies, Midtown salons, and digital vault drops. Every chapter is curated for discretion, velocity, and sensory storytelling.
                    </p>
                    <div className="page-actions">
                        <Link href="/community/passport" className="btn">
                            View the passport
                        </Link>
                        <Link href="/forum" className="btn ghost">
                            Enter the forum
                        </Link>
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
                <CommunityAtlas entries={atlas} regionCounts={regionCounts} />
            </section>

            <section className="page-surface">
                <EventsExplorer events={upcomingEvents} regions={regions} />
            </section>

            <section className="page-surface">
                <MemberStories stories={stories} />
            </section>

            <section className="page-surface page-surface--center community-salon">
                <div className="community-salon__copy">
                    <h2 className="page-heading">Claim your key to every salon</h2>
                    <p>
                        Collectors unlock five-minute concierge response times, private residencies across the Riviera, Emirates, and Manhattan, and cinematic vault drops tailored to their entourage.
                    </p>
                </div>
                <div className="community-salon__actions">
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
