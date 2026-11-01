import type { PlanResult } from "../schemas";

export const FALLBACK_PLAN: PlanResult = {
  source: "fallback",
  ideas: {
    theme: {
      name: "Rang Barse Sangeet",
      description:
        "A joyful Indian wedding sangeet with jewel tones, marigold accents, and an easy flow from family performances to an open dance floor.",
    },
    decor: [
      "Marigold and fairy-light stage backdrop",
      "Jewel-tone table runners with brass accents",
      "Welcome sign with the couple's names and event schedule",
      "Comfortable lounge seating near the dance floor",
    ],
    menu: [
      "Chaat counter with pani puri and dahi bhalla",
      "Paneer tikka and seasonal grilled vegetables",
      "Dal makhani, jeera rice, and assorted breads",
      "Gulab jamun and a seasonal fruit dessert",
    ],
    music: [
      "A warm Bollywood family-dance opener",
      "A mix of Hindi film classics and current dance tracks",
      "A dedicated set for regional-language favorites",
      "A softer closing set for all-ages participation",
    ],
    activities: [
      "Short, pre-planned family dance performances",
      "A couple trivia round hosted by a friend",
      "A beginner-friendly group dance lesson",
      "A photo corner with reusable festive props",
    ],
  },
  vendorKit: [
    {
      category: "Venue and catering",
      checklist: [
        "Confirm guest capacity, event timings, and setup access",
        "Get the menu, per-person pricing, and taxes in writing",
        "Confirm dietary labels and a safe serving plan",
        "Agree on cleanup, overtime, and cancellation terms",
      ],
      questionsToAsk: [
        "Which items and services are included in the quoted price?",
        "Can you accommodate the listed dietary requirements?",
        "When is the final guest count and payment due?",
        "Who is the on-site contact during the event?",
      ],
      redFlags: [
        "Refusal to provide a written quote or contract",
        "Unclear extra charges or cancellation terms",
        "No plan for dietary needs or food safety",
      ],
    },
    {
      category: "DJ and sound",
      checklist: [
        "Share a run-of-show and the performance playlist",
        "Check sound limits, power, and equipment backup",
        "Confirm setup time and a named event-day contact",
      ],
      questionsToAsk: [
        "Can you handle Hindi and regional-language requests?",
        "What backup equipment do you bring?",
        "How do you coordinate cues with performers?",
      ],
      redFlags: [
        "No sample work or references",
        "Unclear overtime charges",
        "No backup plan for equipment failure",
      ],
    },
  ],
};

export function getFallbackPlan(): PlanResult {
  return FALLBACK_PLAN;
}
