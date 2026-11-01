import { describe, expect, it } from "vitest";
import { getOccasionTheme, OCCASION_THEMES } from "./themes";

describe("occasion themes", () => {
  it.each([
    ["wedding", "Riya & Arjun's Sangeet", "Royal"],
    ["haldi", "Haldi & Mehndi", "Flowers"],
    ["birthday", "Birthday celebration", "Retro"],
    ["diwali", "Diwali community mela", "Traditional"],
    ["ganesh", "Ganesh Utsav", "Traditional"],
    ["anniversary", "Anniversary celebration", "Romantic"],
    ["baby", "Baby shower", "Floral"],
    ["corporate", "Team celebration", "Modern"],
  ] as const)("resolves the %s occasion", (expected, title, vibe) => {
    const eventType = expected === "wedding"
      ? "wedding"
      : expected === "birthday"
        ? "birthday"
        : expected === "diwali" || expected === "ganesh"
          ? "community"
          : "other";
    expect(getOccasionTheme({ eventType, title, vibe }).id).toBe(expected);
  });

  it("provides complete localized copy and visual tokens for every occasion", () => {
    for (const theme of Object.values(OCCASION_THEMES)) {
      expect(theme.copy.en.headline).toBeTruthy();
      expect(theme.copy.hi.headline).toBeTruthy();
      expect(theme.copy.en.tabs).toHaveProperty("crisis");
      expect(theme.copy.hi.tabs).toHaveProperty("timeline");
      expect(theme.defaults.en.checklist).toBeTruthy();
      expect(theme.defaults.hi.musicIdea).toBeTruthy();
    }
  });
});
