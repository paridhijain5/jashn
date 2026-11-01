import { describe, expect, it } from "vitest";
import { getVendors } from "./vendors";
import type { EventInput } from "../schemas";

const event: EventInput = {
  eventType: "community",
  title: "Diwali Mela",
  date: "2026-11-08",
  city: "Jaipur",
  guestCount: 500,
  budgetINR: 350_000,
  vibe: "Eco-friendly",
  language: "en",
  dietary: ["vegetarian"],
};

describe("vendor inquiry drafts", () => {
  it("provides all five vendor categories with event details in three languages", () => {
    const vendors = getVendors(event);
    expect(vendors.map(({ category }) => category)).toEqual([
      "venue",
      "caterer",
      "photographer",
      "DJ",
      "decorator",
    ]);

    for (const vendor of vendors) {
      expect(vendor.drafts.en).toContain("Diwali Mela");
      expect(vendor.drafts.en).toContain("500 guests");
      expect(vendor.drafts.hi).toContain("नमस्ते");
      expect(vendor.drafts.hinglish).toContain("Namaste");
    }
  });
});
