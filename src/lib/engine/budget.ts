import type { EventInput } from "../schemas";

export type BudgetCategory =
  | "venue"
  | "catering"
  | "decor"
  | "photo"
  | "music"
  | "attire"
  | "activities"
  | "marketing"
  | "permits"
  | "misc";

export interface BudgetLine {
  category: BudgetCategory;
  amount: number;
  percentage: number;
}

export interface BudgetPlan {
  budgetINR: number;
  guestCount: number;
  costPerGuest: number;
  categories: BudgetLine[];
  tradeOffs: string;
}

const SPLITS: Record<EventInput["eventType"], Partial<Record<BudgetCategory, number>>> = {
  wedding: {
    venue: 25,
    catering: 35,
    decor: 15,
    photo: 10,
    music: 7,
    attire: 5,
    misc: 3,
  },
  birthday: {
    venue: 20,
    catering: 30,
    decor: 15,
    photo: 8,
    music: 10,
    activities: 12,
    misc: 5,
  },
  community: {
    venue: 20,
    catering: 25,
    decor: 8,
    photo: 5,
    music: 8,
    activities: 14,
    marketing: 8,
    permits: 7,
    misc: 5,
  },
  other: {
    venue: 23,
    catering: 30,
    decor: 12,
    photo: 8,
    music: 8,
    activities: 7,
    misc: 7,
    permits: 5,
  },
};

function describeTradeOffs(originalBudget: number, budgetINR: number): string {
  if (budgetINR < originalBudget) {
    const change = Math.round((1 - budgetINR / originalBudget) * 100);
    return `Budget -${change}%: keep catering and venue priorities; scale decor and extras.`;
  }
  if (budgetINR > originalBudget) {
    const change = Math.round((budgetINR / originalBudget - 1) * 100);
    return `Budget +${change}%: add guest comfort and a contingency before upgrading decor.`;
  }
  return "Budget unchanged: allocations follow your event type; adjust guest count to compare per-person cost.";
}

export function rebalance(
  input: EventInput,
  changes: Partial<Pick<EventInput, "guestCount" | "budgetINR">> = {},
): BudgetPlan {
  const guestCount = Math.max(1, Math.round(changes.guestCount ?? input.guestCount));
  const budgetINR = Math.max(1, changes.budgetINR ?? input.budgetINR);
  const split = SPLITS[input.eventType];
  const categories = Object.entries(split).map(([category, percentage]) => ({
    category: category as BudgetCategory,
    percentage: percentage ?? 0,
    amount: Math.round((budgetINR * (percentage ?? 0)) / 100),
  }));
  const roundedTotal = categories.reduce((total, category) => total + category.amount, 0);
  if (roundedTotal !== budgetINR && categories.length > 0) {
    categories[0].amount += budgetINR - roundedTotal;
  }

  return {
    budgetINR,
    guestCount,
    costPerGuest: Math.round((budgetINR / guestCount) * 100) / 100,
    categories,
    tradeOffs: describeTradeOffs(input.budgetINR, budgetINR),
  };
}
