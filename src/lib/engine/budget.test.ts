import { describe, expect, it } from "vitest";
import { rebalance } from "./budget";
import type { EventInput } from "../schemas";

const wedding: EventInput = {
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

describe("rebalance", () => {
  it("allocates a wedding budget by the specified percentages", () => {
    const result = rebalance(wedding);
    expect(result.categories.map(({ percentage }) => percentage)).toEqual([
      25, 35, 15, 10, 7, 5, 3,
    ]);
    expect(result.categories.reduce((sum, item) => sum + item.amount, 0)).toBe(
      wedding.budgetINR,
    );
    expect(result.costPerGuest).toBe(1000);
  });

  it("updates cost per guest and explains budget cuts", () => {
    const result = rebalance(wedding, { guestCount: 125, budgetINR: 80_000 });
    expect(result.guestCount).toBe(125);
    expect(result.costPerGuest).toBe(640);
    expect(result.tradeOffs).toContain("Budget -20%");
    expect(result.categories.reduce((sum, item) => sum + item.amount, 0)).toBe(
      80_000,
    );
  });

  it("uses a distinct birthday allocation", () => {
    const result = rebalance({ ...wedding, eventType: "birthday" });
    expect(result.categories.find((item) => item.category === "activities")?.percentage).toBe(12);
  });

  it.each(["wedding", "birthday", "community", "other"] as const)(
    "keeps the %s allocation at exactly 100 percent",
    (eventType) => {
      const result = rebalance({ ...wedding, eventType });
      expect(result.categories.reduce((sum, item) => sum + item.percentage, 0)).toBe(100);
    },
  );
});
