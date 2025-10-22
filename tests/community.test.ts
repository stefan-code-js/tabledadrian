import { describe, expect, it } from "vitest";
import { communityEvents } from "@/data/community";
import { getUpcomingEvents, getPastEvents, listRegions } from "@/lib/community";

describe("community events helpers", () => {
    it("returns upcoming events sorted chronologically", () => {
        const reference = new Date("2025-10-01T00:00:00Z");
        const events = getUpcomingEvents(reference);
        expect(events.length).toBeGreaterThan(0);
        for (let index = 1; index < events.length; index += 1) {
            const prev = new Date(events[index - 1].startDate).getTime();
            const current = new Date(events[index].startDate).getTime();
            expect(current).toBeGreaterThanOrEqual(prev);
        }
    });

    it("returns past events relative to reference date", () => {
        const reference = new Date("2030-01-01T00:00:00Z");
        const past = getPastEvents(reference);
        expect(past.length).toBe(communityEvents.length);
    });

    it("lists unique regions", () => {
        const regions = listRegions();
        expect(new Set(regions).size).toBe(regions.length);
        expect(regions).toContain("Monaco");
        expect(regions).toContain("Global");
    });
});
