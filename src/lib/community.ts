import { communityEvents, type CommunityEvent } from "@/data/community";

export type EventRegion = CommunityEvent["region"];

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
