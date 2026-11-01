import type { EventInput } from "../schemas";

export type CrisisType =
  | "rain"
  | "caterer-cancelled"
  | "guest-surge"
  | "budget-cut"
  | "venue-unavailable";

export interface CrisisPlan {
  type: CrisisType;
  title: string;
  steps: string[];
  adjustedBudgetINR: number;
  adjustedGuestCount: number;
  tradeOff: string;
}

export function planCrisis(input: EventInput, type: CrisisType): CrisisPlan {
  const common = {
    type,
    adjustedBudgetINR: input.budgetINR,
    adjustedGuestCount: input.guestCount,
  };

  switch (type) {
    case "rain":
      return {
        ...common,
        title: "Rain on the day",
        steps: ["Move the ceremony and food to the covered backup space.", "Protect power cables and equipment; assign a floor-safety lead.", "Message guests with the updated entrance and umbrella guidance."],
        adjustedBudgetINR: Math.round(input.budgetINR * 0.05),
        tradeOff: "Set aside 5% of the current budget for cover, transport, and floor protection.",
      };
    case "caterer-cancelled":
      return {
        ...common,
        title: "Caterer cancelled",
        steps: ["Call the venue's approved backup caterers first.", "Switch to a simpler, reliable menu with clearly labeled dietary options.", "Confirm safe delivery, serving staff, and revised headcount in writing."],
        adjustedBudgetINR: Math.round(input.budgetINR * 0.12),
        tradeOff: "Hold up to 12% for replacement catering and urgent delivery; reduce decor before food safety.",
      };
    case "guest-surge":
      return {
        ...common,
        title: "Guest count +50%",
        steps: ["Confirm venue capacity, seating, restrooms, and safe exits.", "Increase food and water orders; preserve dietary portions.", "Contact vendors for written revised quotes and add a check-in team."],
        adjustedBudgetINR: Math.round(input.budgetINR * 1.5),
        adjustedGuestCount: Math.min(5000, Math.ceil(input.guestCount * 1.5)),
        tradeOff: "A 50% guest increase needs roughly 50% more budget to preserve per-guest service.",
      };
    case "budget-cut":
      return {
        ...common,
        title: "Budget -20%",
        steps: ["Protect venue, safe catering, accessibility, and essential staffing.", "Reduce custom decor, printed extras, and nonessential rentals.", "Ask vendors for a lower-scope written option before cancelling."],
        adjustedBudgetINR: Math.round(input.budgetINR * 0.8),
        tradeOff: "Keep venue and catering priorities; scale decor and extras to fit the 20% cut.",
      };
    case "venue-unavailable":
      return {
        ...common,
        title: "Venue unavailable",
        steps: ["Ask the venue for an equivalent-date or partner-space option.", "Check backup community halls and hotel spaces near the original location.", "Confirm accessibility, capacity, transport, and revised setup terms before informing guests."],
        adjustedBudgetINR: Math.round(input.budgetINR * 0.08),
        tradeOff: "Reserve up to 8% for relocation and transport; reuse decor and retain existing vendors where possible.",
      };
  }
}
