import type { EventInput, VendorKit } from "../schemas";

export type VendorCategory = "venue" | "caterer" | "photographer" | "DJ" | "decorator";

export interface VendorDetails {
  category: VendorCategory;
  checklist: string[];
  questionsToAsk: string[];
  redFlags: string[];
  drafts: Record<EventInput["language"], string>;
}

const WORDS = {
  en: {
    hello: "Hello",
    ask: "I'm planning {title} in {city} on {date} for about {guests} guests.",
    askQuote: "Could you share your availability, package details, and a written quote?",
    budget: "Our current event budget is ₹{budget}.",
    requirements: "Our vibe is {vibe}; dietary needs: {dietary}.",
    close: "Please also share inclusions, payment milestones, cancellation terms, and references. Thank you!",
  },
  hi: {
    hello: "नमस्ते",
    ask: "मैं {city} में {date} को {title} आयोजित कर रहा/रही हूँ। लगभग {guests} मेहमान होंगे।",
    askQuote: "कृपया अपनी उपलब्धता, पैकेज की जानकारी और लिखित अनुमान भेजें।",
    budget: "कार्यक्रम का मौजूदा बजट ₹{budget} है।",
    requirements: "हमारी पसंद {vibe} है; भोजन संबंधी ज़रूरतें: {dietary}।",
    close: "कृपया शामिल सेवाएँ, भुगतान की तारीखें, रद्द करने की शर्तें और संदर्भ भी भेजें। धन्यवाद!",
  },
  hinglish: {
    hello: "Namaste",
    ask: "Main {city} mein {date} ko {title} plan kar raha/rahi hoon, around {guests} guests ke liye.",
    askQuote: "Please apni availability, package details aur written quote share karein.",
    budget: "Event ka current budget ₹{budget} hai.",
    requirements: "Vibe {vibe} hai; dietary needs: {dietary}.",
    close: "Inclusions, payment milestones, cancellation terms aur references bhi bhej dein. Thank you!",
  },
} satisfies Record<EventInput["language"], Record<string, string>>;

const BASE: Array<Omit<VendorDetails, "drafts">> = [
  {
    category: "venue",
    checklist: ["Check capacity, access, power, and accessible facilities", "Confirm setup/cleanup windows and weather backup", "Review taxes, overtime, deposit, and cancellation terms"],
    questionsToAsk: ["What is included in the venue fee?", "Can we visit during setup?", "What is the rain or power-outage plan?"],
    redFlags: ["Unclear extra charges", "No written booking terms", "No safe capacity or weather plan"],
  },
  {
    category: "caterer",
    checklist: ["Confirm menu tasting, headcount deadline, and serving plan", "Get taxes, staffing, water, and cleanup in writing", "Label allergens and dietary dishes clearly"],
    questionsToAsk: ["Can you safely serve the listed dietary needs?", "What is the final headcount deadline?", "How are last-minute guest changes priced?"],
    redFlags: ["Unlabeled allergens", "Unclear per-person price", "No food-safety or backup plan"],
  },
  {
    category: "photographer",
    checklist: ["Review full-event galleries and shot list", "Confirm hours, deliverables, backup, and delivery date", "Agree on image usage and privacy preferences"],
    questionsToAsk: ["Who will photograph the event?", "How many edited images are included?", "What happens if equipment fails?"],
    redFlags: ["No full galleries or written delivery terms", "Unclear overtime fees", "No equipment/data backup"],
  },
  {
    category: "DJ",
    checklist: ["Share schedule, playlist, and no-play list", "Confirm sound limits, setup time, and power needs", "Plan cues with the event host and performers"],
    questionsToAsk: ["Can you handle our language and music requests?", "What backup equipment do you bring?", "How do you manage volume and cues?"],
    redFlags: ["No sample work or references", "No backup equipment", "Unclear overtime pricing"],
  },
  {
    category: "decorator",
    checklist: ["Agree on a layout, materials, and setup/teardown timings", "Confirm reusable items, transport, and cleanup", "Get material substitutions and costs in writing"],
    questionsToAsk: ["Which decor items are rented or reusable?", "Can you work within the venue rules?", "What changes if flowers or materials are unavailable?"],
    redFlags: ["No itemized quote", "Unsafe installations or blocked exits", "Unapproved substitutions"],
  },
];

function fill(template: string, input: EventInput): string {
  const values: Record<string, string> = {
    title: input.title,
    city: input.city,
    date: input.date,
    guests: String(input.guestCount),
    budget: input.budgetINR.toLocaleString("en-IN"),
    vibe: input.vibe,
    dietary: input.dietary.join(", ") || "none specified",
  };
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export function getVendors(input: EventInput): VendorDetails[] {
  return BASE.map((vendor) => {
    return {
      ...vendor,
      drafts: {
        en: fillDraft(input, "en"),
        hi: fillDraft(input, "hi"),
        hinglish: fillDraft(input, "hinglish"),
      },
    };
  });
}

function fillDraft(input: EventInput, language: EventInput["language"]): string {
  const words = WORDS[language];
  return [
    words.hello,
    fill(words.ask, input),
    words.askQuote,
    fill(words.budget, input),
    fill(words.requirements, input),
    words.close,
  ].join("\n\n");
}

export function getVendorKit(input: EventInput): VendorKit {
  return getVendors(input).map(({ category, checklist, questionsToAsk, redFlags }) => ({
    category,
    checklist,
    questionsToAsk,
    redFlags,
  }));
}
