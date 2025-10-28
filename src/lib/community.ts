import {
    communityEnclaves,
    communityEvents,
    memberStories,
    type CommunityEnclave,
    type CommunityEvent,
    type MemberStory,
} from "@/data/community";

export type EventRegion = CommunityEvent["region"];

export type CommunityAtlasEntry = CommunityEnclave & {
    upcomingEvent?: CommunityEvent | null;
};

export function sortEvents(events: CommunityEvent[]): CommunityEvent[] {
    return [...events].sort(
        (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
}

export function getUpcomingEvents(reference = new Date()): CommunityEvent[] {
    return sortEvents(
        communityEvents.filter((event) => new Date(event.startDate).getTime() >= reference.getTime()),
    );
}

export function getPastEvents(reference = new Date()): CommunityEvent[] {
    return sortEvents(
        communityEvents.filter((event) => new Date(event.startDate).getTime() < reference.getTime()),
    );
}

export function listRegions(events: CommunityEvent[] = communityEvents): EventRegion[] {
    const unique = new Set<EventRegion>();
    events.forEach((event) => unique.add(event.region));
    return Array.from(unique);
}

export function summarizeEventsByRegion(events: CommunityEvent[] = communityEvents): Record<EventRegion, number> {
    return events.reduce<Record<EventRegion, number>>((acc, event) => {
        acc[event.region] = (acc[event.region] ?? 0) + 1;
        return acc;
    }, {} as Record<EventRegion, number>);
}

function findEventForEnclave(
    enclave: CommunityEnclave,
    upcoming: CommunityEvent[],
    past: CommunityEvent[],
): CommunityEvent | null {
    if (enclave.upcomingEventId) {
        const direct = upcoming.find((event) => event.id === enclave.upcomingEventId);
        if (direct) {
            return direct;
        }
    }
    const byRegion = upcoming.find((event) => event.region === enclave.region);
    if (byRegion) {
        return byRegion;
    }
    return past
        .slice()
        .reverse()
        .find((event) => event.region === enclave.region) ?? null;
}

export function buildCommunityAtlas(reference = new Date()): CommunityAtlasEntry[] {
    const upcoming = getUpcomingEvents(reference);
    const past = getPastEvents(reference);
    return communityEnclaves.map((enclave) => ({
        ...enclave,
        upcomingEvent: findEventForEnclave(enclave, upcoming, past),
    }));
}

export function listMemberStories(limit = memberStories.length): MemberStory[] {
    return memberStories.slice(0, Math.max(0, limit));
}
