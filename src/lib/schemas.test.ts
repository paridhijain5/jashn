import { describe, expect, it } from "vitest";
import { EventInputSchema, IdeasSchema, PlanResultSchema } from "./schemas";

const validEvent = {
  eventType: "wedding",
  title: "Test Sangeet",
  date: "2026-12-12",
  city: "Jaipur",
  guestCount: 100,
  budgetINR: 100_000,
  vibe: "Royal",
  language: "hinglish",
  dietary: ["vegetarian"],
};

describe("EventInputSchema", () => {
  it("accepts valid event input", () => {
    expect(EventInputSchema.safeParse(validEvent).success).toBe(true);
  });

  it.each([
    { guestCount: 0 },
    { guestCount: 5001 },
    { budgetINR: 0 },
    { language: "fr" },
    { date: "12-12-2026" },
    { notes: "n".repeat(501) },
  ])("rejects invalid event field overrides", (override) => {
    expect(EventInputSchema.safeParse({ ...validEvent, ...override }).success).toBe(
      false,
    );
  });
});

describe("plan schemas", () => {
  it("rejects AI ideas with a missing section", () => {
    expect(
      IdeasSchema.safeParse({
        theme: { name: "A", description: "B" },
        decor: [],
        menu: [],
        music: [],
      }).success,
    ).toBe(false);
  });

  it("validates the final plan source", () => {
    const plan = {
      ideas: {
        theme: { name: "A", description: "B" },
        decor: [],
        menu: [],
        music: [],
        activities: [],
      },
      vendorKit: [
        { category: "venue", checklist: [], questionsToAsk: [], redFlags: [] },
      ],
      source: "fallback",
    };
    expect(PlanResultSchema.safeParse(plan).success).toBe(true);
  });
});
