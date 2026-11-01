import { describe, expect, it } from "vitest";
import { planCrisis, type CrisisType } from "./crisis";
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

describe("planCrisis", () => {
  it("returns steps and an adjusted budget for every crisis", () => {
    const cases: Array<[CrisisType, number]> = [
      ["rain", 5_000],
      ["caterer-cancelled", 12_000],
      ["guest-surge", 150_000],
      ["budget-cut", 80_000],
      ["venue-unavailable", 8_000],
    ];

    for (const [type, adjustedBudgetINR] of cases) {
      const plan = planCrisis(event, type);
      expect(plan.steps.length).toBeGreaterThan(0);
      expect(plan.adjustedBudgetINR).toBe(adjustedBudgetINR);
      expect(plan.tradeOff).toBeTruthy();
    }
  });

  it("increases guest count by 50% for the surge scenario", () => {
    expect(planCrisis(event, "guest-surge").adjustedGuestCount).toBe(150);
  });
});
