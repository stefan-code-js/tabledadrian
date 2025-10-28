import { describe, expect, it } from "vitest";
import {
    buildCommunityAtlas,
    getUpcomingEvents,
    listMemberStories,
    summarizeEventsByRegion,
} from "@/lib/community";
import { communityEnclaves, communityEvents, memberStories } from "@/data/community";

describe("community atlas helpers", () => {
    it("summarises events by region", () => {
        const summary = summarizeEventsByRegion();
        const total = communityEvents.length;
        const counted = Object.values(summary).reduce((acc, value) => acc + value, 0);
        expect(counted).toBe(total);
        expect(summary).toMatchObject({ Monaco: expect.any(Number), Dubai: expect.any(Number) });
    });

    it("builds atlas entries with event matches", () => {
        const atlas = buildCommunityAtlas();
        expect(atlas).toHaveLength(communityEnclaves.length);
        const riviera = atlas.find((entry) => entry.id === "riviera-summit");
        expect(riviera).toBeTruthy();
        expect(riviera?.upcomingEvent?.id).toBe("monaco-midnight-salon");
    });

    it("falls back to past events if no upcoming match", () => {
        const futureDate = new Date("2030-01-01T00:00:00Z");
        const atlas = buildCommunityAtlas(futureDate);
        const digitalVault = atlas.find((entry) => entry.id === "digital-vault");
        expect(digitalVault).toBeTruthy();
        // Should still attach the latest known event even if considered past relative to the reference
        expect(digitalVault?.upcomingEvent).toBeTruthy();
    });

    it("limits member stories when requested", () => {
        const slice = listMemberStories(2);
        expect(slice).toHaveLength(2);
        expect(slice[0]).toEqual(memberStories[0]);
    });

    it("respects upcoming events reference date", () => {
        const today = new Date();
        const upcoming = getUpcomingEvents(today);
        upcoming.forEach((event) => {
            expect(new Date(event.startDate).getTime()).toBeGreaterThanOrEqual(today.getTime());
        });
    });
});
