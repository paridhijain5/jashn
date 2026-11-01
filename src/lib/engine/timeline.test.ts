import { describe, expect, it } from "vitest";
import { buildTimeline, exportTimelineICS } from "./timeline";
import type { EventInput } from "../schemas";

const event: EventInput = {
  eventType: "wedding",
  title: "Test Sangeet",
  date: "2026-12-12",
  city: "Jaipur",
  guestCount: 100,
  budgetINR: 100_000,
  vibe: "Royal",
  language: "en",
  dietary: [],
};

describe("timeline", () => {
  it("uses real calendar dates counting back from the event date", () => {
    const timeline = buildTimeline(event);
    expect(timeline[0]).toEqual({
      task: "Book venue",
      daysBefore: 180,
      date: "2026-06-15",
    });
    expect(timeline.at(-1)?.date).toBe("2026-12-11");
  });

  it("exports the timeline as an iCalendar file", async () => {
    const calendar = await exportTimelineICS(event);
    expect(calendar).toContain("BEGIN:VCALENDAR");
    expect(calendar).toContain("Book venue");
    expect(calendar).toContain("END:VCALENDAR");
  });
});
