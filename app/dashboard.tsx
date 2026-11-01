"use client";

import { jsPDF } from "jspdf";
import {
  type CSSProperties,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { planCrisis, type CrisisType } from "@/src/lib/engine/crisis";
import { rebalance } from "@/src/lib/engine/budget";
import { generateIdeas } from "@/src/lib/engine/ideas";
import { buildTimeline, exportTimelineICS } from "@/src/lib/engine/timeline";
import { getVendors } from "@/src/lib/engine/vendors";
import {
  PlanResultSchema,
  type EventInput,
  type Ideas,
} from "@/src/lib/schemas";
import {
  PresetIllustration,
  type PresetArtKind,
} from "@/src/components/art/CelebrationArt";
import {
  ThemeBackdrop,
  ThemeDivider,
  ThemeHeroArt,
} from "@/src/components/art/ThemedCelebrationArt";
import { getOccasionTheme } from "@/src/lib/themes";

type Tab = "ideas" | "budget" | "timeline" | "vendors" | "crisis";
type PlanSource = "gemini" | "groq" | "fallback";

const TABS: Array<{ id: Tab; en: string; hi: string; icon: string }> = [
  { id: "ideas", en: "Ideas", hi: "आइडिया", icon: "🪔" },
  { id: "budget", en: "Budget", hi: "बजट", icon: "💰" },
  { id: "timeline", en: "Timeline", hi: "समयरेखा", icon: "📅" },
  { id: "vendors", en: "Vendors", hi: "वेंडर", icon: "🤝" },
  { id: "crisis", en: "Crisis Mode", hi: "संकट योजना", icon: "⚡" },
];

const CRISES: Array<{ id: CrisisType; en: string; hi: string }> = [
  { id: "rain", en: "🌧️ Rain on the day", hi: "🌧️ बारिश" },
  { id: "caterer-cancelled", en: "🍽️ Caterer cancelled", hi: "🍽️ कैटरर रद्द" },
  { id: "guest-surge", en: "👥 Guest count +50%", hi: "👥 मेहमान +50%" },
  { id: "budget-cut", en: "💸 Budget -20%", hi: "💸 बजट -20%" },
  { id: "venue-unavailable", en: "🏛️ Venue unavailable", hi: "🏛️ वेन्यू नहीं" },
];

const INITIAL_EVENT: EventInput = {
  eventType: "wedding",
  title: "Riya & Arjun's Sangeet",
  date: "2026-12-12",
  city: "Jaipur",
  guestCount: 150,
  budgetINR: 900000,
  vibe: "Royal Bollywood",
  language: "en",
  dietary: ["vegetarian"],
  notes: "",
};

const PRESETS: Array<{ id: string; en: string; hi: string; kind: PresetArtKind; note: string; event: EventInput }> = [
  { id: "sangeet", en: "Wedding", hi: "शादी", kind: "wedding", note: "A night of music & magic", event: INITIAL_EVENT },
  {
    id: "haldi",
    en: "Haldi / Mehndi", hi: "हल्दी / मेहंदी", kind: "haldi", note: "Flowers, colour & laughter",
    event: { ...INITIAL_EVENT, eventType: "wedding", title: "Haldi & Mehndi", date: "2026-12-10", guestCount: 100, budgetINR: 350000, vibe: "Haldi Mehndi" },
  },
  {
    id: "birthday",
    en: "Birthday", hi: "जन्मदिन", kind: "birthday", note: "Make a wish, make a memory",
    event: { ...INITIAL_EVENT, eventType: "birthday", title: "Birthday celebration", date: "2026-12-05", guestCount: 40, budgetINR: 120000, vibe: "Retro Bollywood" },
  },
  {
    id: "diwali",
    en: "Diwali Mela", hi: "दिवाली मेला", kind: "diwali", note: "A little light, a lot of joy",
    event: { ...INITIAL_EVENT, eventType: "community", title: "Diwali community mela", date: "2026-11-08", city: "Jaipur", guestCount: 500, budgetINR: 350000, vibe: "Eco-friendly traditional" },
  },
  {
    id: "ganesh",
    en: "Ganesh Utsav", hi: "गणेश उत्सव", kind: "ganesh", note: "Togetherness & blessings",
    event: { ...INITIAL_EVENT, eventType: "community", title: "Ganesh Utsav", date: "2026-09-10", guestCount: 300, budgetINR: 250000, vibe: "Traditional community" },
  },
  {
    id: "anniversary",
    en: "Anniversary", hi: "सालगिरह", kind: "anniversary", note: "Celebrate your always",
    event: { ...INITIAL_EVENT, eventType: "other", title: "Anniversary celebration", date: "2026-12-20", guestCount: 60, budgetINR: 200000, vibe: "Royal romantic" },
  },
  {
    id: "baby",
    en: "Baby Shower", hi: "गोद भराई", kind: "baby", note: "A tiny guest, a huge joy",
    event: { ...INITIAL_EVENT, eventType: "other", title: "Baby shower", date: "2026-12-15", guestCount: 45, budgetINR: 150000, vibe: "Traditional floral" },
  },
  {
    id: "corporate",
    en: "Corporate", hi: "कॉर्पोरेट", kind: "corporate", note: "Good people, great milestones",
    event: { ...INITIAL_EVENT, eventType: "other", title: "Team celebration", date: "2026-12-18", guestCount: 100, budgetINR: 300000, vibe: "Minimalist modern" },
  },
];

const LABELS = {
  en: {
    eyebrow: "YOUR CELEBRATION, IN GOOD HANDS",
    title: "Make room for the magic.",
    intro: "One calm command center for the details, the decisions, and the delightful what-ifs.",
    details: "The gathering",
    eventType: "Celebration",
    titleLabel: "What are we celebrating?",
    date: "Date",
    city: "City",
    guests: "Guest count",
    budget: "Total budget (₹)",
    vibe: "Vibe or theme",
    language: "Plan language",
    dietary: "Food preferences",
    notes: "Anything else to know?",
    notesHint: "Accessibility, timings, or special requests",
    makePlan: "Make my plan",
    saving: "Putting it together…",
    toolkit: "Your celebration toolkit",
    guestsLabel: "guests",
    ideasTitle: "The feeling, figured out.",
    theme: "Your theme",
    decor: "The little details",
    menu: "On the menu",
    music: "Set the soundtrack",
    activities: "Moments to remember",
    perGuest: "per guest",
    cost: "Estimated allocation",
    tradeOff: "A thoughtful trade-off",
    steps: "Your next steps",
    book: "days before",
    vendor: "Choose a vendor",
    copy: "Copy message",
    copied: "Copied!",
    checklist: "Quick checklist",
    questions: "Good questions to ask",
    redFlags: "Keep an eye out",
    crisisTitle: "A little less panic, a little more plan.",
    crisisSubtitle: "Choose a curveball to get a practical next move.",
    adjusted: "Suggested reserve or budget",
    downloadPdf: "Download PDF",
    addCalendar: "Add to calendar",
    smart: "Smart templates",
    enhanced: "AI-enhanced",
    total: "Total",
    change: "Adjust your plan",
    preset: "Start with a little inspiration",
    menuDiet: "Jain", vegetarian: "Vegetarian", halal: "Halal",
  },
  hi: {
    eyebrow: "आपके जश्न की पूरी तैयारी",
    title: "खुशियों के लिए जगह बनाएँ।",
    intro: "तैयारी से लेकर छोटे-छोटे फैसलों तक, सब कुछ एक ही जगह।",
    details: "आपका आयोजन",
    eventType: "जश्न",
    titleLabel: "किस बात का जश्न है?",
    date: "तारीख",
    city: "शहर",
    guests: "मेहमान",
    budget: "कुल बजट (₹)",
    vibe: "थीम या अंदाज़",
    language: "योजना की भाषा",
    dietary: "खाने की पसंद",
    notes: "कुछ और बताना चाहेंगे?",
    notesHint: "सुविधा, समय या खास अनुरोध",
    makePlan: "मेरी योजना बनाएँ",
    saving: "योजना बन रही है…",
    toolkit: "आपके जश्न की तैयारी",
    guestsLabel: "मेहमान",
    ideasTitle: "जश्न का अंदाज़ तय।",
    theme: "आपकी थीम",
    decor: "सजावट के रंग",
    menu: "खाने में",
    music: "संगीत की धुन",
    activities: "यादगार पल",
    perGuest: "प्रति मेहमान",
    cost: "बजट का अनुमान",
    tradeOff: "सोच-समझकर बदलाव",
    steps: "आगे के कदम",
    book: "दिन पहले",
    vendor: "वेंडर चुनें",
    copy: "संदेश कॉपी करें",
    copied: "कॉपी हो गया!",
    checklist: "छोटी सूची",
    questions: "पूछने लायक बातें",
    redFlags: "इन पर ध्यान दें",
    crisisTitle: "घबराहट कम, तैयारी ज़्यादा।",
    crisisSubtitle: "अचानक बदलाव के लिए व्यावहारिक कदम चुनें।",
    adjusted: "सुझाया गया रिज़र्व या बजट",
    downloadPdf: "PDF डाउनलोड",
    addCalendar: "कैलेंडर में जोड़ें",
    smart: "स्मार्ट टेम्पलेट",
    enhanced: "AI से बेहतर",
    total: "कुल",
    change: "योजना बदलें",
    preset: "शुरुआत के लिए एक आइडिया",
    menuDiet: "जैन", vegetarian: "शाकाहारी", halal: "हलाल",
  },
};

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function displayDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function daysUntil(date: string): number {
  const target = new Date(`${date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((target.getTime() - today.getTime()) / 86_400_000));
}

function downloadFile(filename: string, contents: string, type: string): void {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function IconMark() {
  return <span aria-hidden="true" className="brand-mark">🪔</span>;
}

export default function Dashboard() {
  const [event, setEvent] = useState<EventInput>(INITIAL_EVENT);
  const [activeTab, setActiveTab] = useState<Tab>("ideas");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [enhancedIdeas, setEnhancedIdeas] = useState<Ideas | null>(null);
  const [source, setSource] = useState<PlanSource>("fallback");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [crisisType, setCrisisType] = useState<CrisisType | null>(null);
  const [vendorIndex, setVendorIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState("");
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);

  const labels = LABELS[language];
  const theme = getOccasionTheme(event);
  const themeLanguage = language === "hi" ? "hi" : "en";
  const themeCopy = theme.copy[themeLanguage];
  const themeDefaults = theme.defaults[themeLanguage];
  const staticIdeas = useMemo(() => generateIdeas(event), [event]);
  const ideas = enhancedIdeas ?? {
    ...staticIdeas,
    theme: { name: themeDefaults.theme, description: themeDefaults.description },
    menu: event.dietary.includes("jain")
      ? staticIdeas.menu
      : [themeDefaults.menuIdea, ...staticIdeas.menu].slice(0, 20),
    music: [themeDefaults.musicIdea, ...staticIdeas.music].slice(0, 20),
  };
  const budget = useMemo(() => rebalance(event), [event]);
  const timeline = useMemo(() => buildTimeline(event), [event]);
  const vendors = useMemo(() => getVendors(event), [event]);
  const activeCrisis = crisisType ? planCrisis(event, crisisType) : null;
  const activeVendor = vendors[vendorIndex] ?? vendors[0];
  const themeStyle: CSSProperties & { [key: `--${string}`]: string } = {
    "--theme-main": theme.colors.main,
    "--theme-deep": theme.colors.deep,
    "--theme-accent": theme.colors.accent,
    "--theme-bright": theme.colors.bright,
    "--theme-pattern": theme.colors.pattern,
    "--theme-surface": theme.colors.surface,
    "--theme-surface-alt": theme.colors.surfaceAlt,
    "--theme-font-family": `var(--font-${theme.font}), var(--font-body), sans-serif`,
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function updateEvent<K extends keyof EventInput>(key: K, value: EventInput[K]) {
    setEvent((current) => ({ ...current, [key]: value }));
    setEnhancedIdeas(null);
    setSource("fallback");
  }

  function updateLanguage(nextLanguage: "en" | "hi") {
    setLanguage(nextLanguage);
    updateEvent("language", nextLanguage);
  }

  function handleTextChange(
    key: "title" | "city" | "vibe" | "notes" | "date",
    value: string,
  ) {
    updateEvent(key, value);
  }

  function handleSliderChange(eventKey: "guestCount" | "budgetINR", value: string) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      updateEvent(eventKey, parsed);
    }
  }

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setEvent({ ...preset.event });
    setLanguage(preset.event.language === "hi" ? "hi" : "en");
    setEnhancedIdeas(null);
    setSource("fallback");
    setWizardStep(2);
    setNotice(`${preset.en} preset selected.`);
  }

  function chooseOccasion(preset: (typeof PRESETS)[number]) {
    applyPreset(preset);
    setWizardStep(2);
  }

  async function createPlan(submission: FormEvent<HTMLFormElement>) {
    submission.preventDefault();
    setEnhancedIdeas(null);
    setSource("fallback");
    setIsEnhancing(true);
    setNotice("");

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
        signal: AbortSignal.timeout(25_000),
      });
      if (response.ok) {
        const result: unknown = await response.json();
        if (
          typeof result === "object" &&
          result !== null &&
          "ideas" in result &&
          "source" in result
        ) {
          const parsed = PlanResultSchema.safeParse(result);
          if (parsed.success && parsed.data.source !== "fallback") {
            setEnhancedIdeas(parsed.data.ideas);
            setSource(parsed.data.source);
          }
        }
      }
    } catch {
      // The rule-based plan remains available when AI is offline or slow.
    } finally {
      setIsEnhancing(false);
      setActiveTab("ideas");
      document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, tab: Tab) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const currentIndex = TABS.findIndex((item) => item.id === tab);
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = TABS[(currentIndex + direction + TABS.length) % TABS.length];
    setActiveTab(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  }

  function handleDietaryChange(
    checkboxEvent: ChangeEvent<HTMLInputElement>,
    preference: string,
  ) {
    const next = checkboxEvent.target.checked
      ? [...event.dietary, preference]
      : event.dietary.filter((item) => item !== preference);
    updateEvent("dietary", next);
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(activeVendor.drafts[event.language]);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setNotice("Clipboard unavailable. Select and copy the message text.");
    }
  }

  async function downloadCalendar() {
    try {
      const calendar = await exportTimelineICS(event, timeline);
      downloadFile("jashn-timeline.ics", calendar, "text/calendar;charset=utf-8");
    } catch {
      setNotice("Could not create the calendar file. Please try again.");
    }
  }

  async function downloadPdf() {
    const pdf = new jsPDF();
    const margin = 16;
    const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
    let y = 20;

    function writeBlock(text: string, fontSize = 11, gap = 7) {
      pdf.setFontSize(fontSize);
      const lines = pdf.splitTextToSize(text, pageWidth) as string[];
      if (y + lines.length * (fontSize * 0.45) > 280) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(lines, margin, y);
      y += lines.length * (fontSize * 0.45) + gap;
    }

    const titleColor = theme.colors.deep.match(/[0-9a-f]{2}/gi)?.map((value) => Number.parseInt(value, 16)) ?? [66, 18, 29];
    pdf.setFillColor(titleColor[0], titleColor[1], titleColor[2]);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 42, "F");
    pdf.setTextColor(255, 248, 236);
    pdf.setFontSize(18);
    pdf.text(`${theme.copy.en.headline} · JASHN`, margin, 25);
    pdf.setTextColor(43, 27, 23);
    y = 55;
    writeBlock(`${event.title}  ·  ${event.city}  ·  ${displayDate(event.date)}`, 12);
    writeBlock(`${event.guestCount} guests  ·  Budget ${formatINR(event.budgetINR)}  ·  ${formatINR(budget.costPerGuest)} per guest`);
    writeBlock("THEME", 12, 4);
    writeBlock(`${ideas.theme.name}: ${ideas.theme.description}`);
    for (const [heading, items] of [
      ["DECOR", ideas.decor],
      ["MENU", ideas.menu],
      ["MUSIC", ideas.music],
      ["ACTIVITIES", ideas.activities],
    ] as Array<[string, string[]]>) {
      writeBlock(heading, 12, 4);
      writeBlock(items.map((item) => `• ${item}`).join("\n"));
    }
    writeBlock("BUDGET ALLOCATION", 12, 4);
    writeBlock(budget.categories.map((item) => `${item.category}: ${formatINR(item.amount)}`).join("\n"));
    writeBlock("NEXT STEPS", 12, 4);
    writeBlock(timeline.map((item) => `${item.date} · ${item.task}`).join("\n"));
    pdf.save("jashn-celebration-plan.pdf");
  }

  return (
    <div className="jashn-site" data-occasion={theme.id} data-pattern={theme.pattern} data-shape={theme.shape} style={themeStyle}>
      <ThemeBackdrop theme={theme} />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Jashn home">
          <IconMark />
          <span>Jashn<span className="brand-period">.</span></span>
        </a>
        <div className="topbar-right">
          <div className="language-toggle" aria-label="Display language">
            <button type="button" aria-pressed={language === "en"} onClick={() => updateLanguage("en")}>EN</button>
            <button type="button" aria-pressed={language === "hi"} onClick={() => updateLanguage("hi")}>हिं</button>
          </div>
          <button className="button button-primary header-download" type="button" onClick={downloadPdf}>↧ <span>{labels.downloadPdf}</span></button>
        </div>
      </header>

      <main id="main-content" className="page-shell">
        <section className="hero" id="top">
          <div className="hero-scene" aria-hidden="true" key={theme.id}>
            <ThemeHeroArt theme={theme} />
            <span className="hero-confetti confetti-one">✿</span>
            <span className="hero-confetti confetti-two">✦</span>
            <span className="hero-confetti confetti-three">✧</span>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">{theme.icons.occasion} &nbsp;{labels.eyebrow}</p>
            <h1>{themeCopy.headline}</h1>
            <p className="hero-intro">{themeCopy.subtitle}</p>
            <a className="button button-primary hero-cta" href="#occasion">{themeCopy.cta} <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-caption" aria-hidden="true">
            <span>✦</span> {themeCopy.caption} <span>✦</span>
          </div>
        </section>

        <ThemeDivider theme={theme} />

        <section className="planner-card occasion-section" id="occasion" aria-labelledby="event-details-heading">
          <div className="planner-head">
            <div>
              <p className="eyebrow">01 / PICK YOUR JASHN</p>
              <h2 id="event-details-heading">What are we celebrating?</h2>
            </div>
            <div className="wizard-progress" aria-label={`Step ${wizardStep} of 3`}>
              {[1, 2, 3].map((step) => <span key={step} className={wizardStep >= step ? "wizard-dot active" : "wizard-dot"}>{step}</span>)}
            </div>
          </div>

          <form onSubmit={createPlan}>
            {wizardStep === 1 && <div className="preset-grid" role="group" aria-label="Choose an occasion">
              {PRESETS.map((preset) => <button
                type="button"
                key={preset.id}
                className={`preset-card ${event.title === preset.event.title ? "preset-selected" : ""}`}
                onClick={() => chooseOccasion(preset)}
                aria-pressed={event.title === preset.event.title}
              >
                <span className="preset-illustration"><PresetIllustration kind={preset.kind} /></span>
                <span className="preset-card-title">{language === "en" ? preset.en : preset.hi}</span>
                <span className="preset-card-note">{preset.note}</span>
              </button>)}
            </div>}

            {wizardStep === 2 && <div className="form-grid wizard-fields">
              <label className="span-two"><span>{labels.titleLabel}</span><input required maxLength={120} value={event.title} onChange={(e) => handleTextChange("title", e.target.value)} /></label>
              <label><span>{labels.date}</span><input required type="date" value={event.date} onChange={(e) => handleTextChange("date", e.target.value)} /></label>
              <label><span>{labels.city}</span><input required maxLength={100} value={event.city} onChange={(e) => handleTextChange("city", e.target.value)} /></label>
              <label><span>{labels.guests}</span><input required type="number" min={1} max={5000} value={event.guestCount} onChange={(e) => updateEvent("guestCount", Number(e.target.value))} /></label>
              <label><span>{labels.budget}</span><input required type="number" min={1} step={1000} value={event.budgetINR} onChange={(e) => updateEvent("budgetINR", Number(e.target.value))} /></label>
              <label className="span-two"><span>{labels.eventType}</span><select value={event.eventType} onChange={(e) => updateEvent("eventType", e.target.value as EventInput["eventType"])}><option value="wedding">Wedding</option><option value="birthday">Birthday</option><option value="community">Community</option><option value="other">Other</option></select></label>
            </div>}

            {wizardStep === 3 && <div className="form-grid wizard-fields">
              <label><span>{labels.vibe}</span><input required maxLength={160} value={event.vibe} onChange={(e) => handleTextChange("vibe", e.target.value)} /></label>
              <label><span>{labels.language}</span><select value={event.language} onChange={(e) => updateEvent("language", e.target.value as EventInput["language"])}><option value="en">English</option><option value="hi">हिन्दी</option><option value="hinglish">Hinglish</option></select></label>
              <fieldset className="dietary-field span-two"><legend>{labels.dietary}</legend>{[["jain", labels.menuDiet], ["vegetarian", labels.vegetarian], ["halal", labels.halal]].map(([value, name]) => <label className="check-label" key={value}><input type="checkbox" checked={event.dietary.includes(value)} onChange={(e) => handleDietaryChange(e, value)} /><span>{name}</span></label>)}</fieldset>
              <label className="span-two"><span>{labels.notes}</span><textarea maxLength={500} placeholder={labels.notesHint} value={event.notes ?? ""} onChange={(e) => handleTextChange("notes", e.target.value)} rows={3} /></label>
            </div>}

            <div className="planner-actions">
              <p><span aria-hidden="true">✦</span> &nbsp;{wizardStep === 1 ? "Choose an occasion to begin" : `Step ${wizardStep} of 3 · Your details stay on your device`}</p>
              <div className="wizard-actions">
                {wizardStep > 1 && <button type="button" className="button button-quiet" onClick={() => setWizardStep((wizardStep - 1) as 1 | 2)}>← Back</button>}
                {wizardStep < 3
                  ? <button type="button" className="button button-primary" onClick={() => setWizardStep((wizardStep + 1) as 2 | 3)}>Continue <span aria-hidden="true">→</span></button>
                  : <button type="submit" className="button button-primary" disabled={isEnhancing}>{isEnhancing ? labels.saving : labels.makePlan}<span aria-hidden="true"> ↗</span></button>}
              </div>
            </div>
          </form>
        </section>

        <ThemeDivider theme={theme} />
        <section className="dashboard" id="dashboard" aria-labelledby="dashboard-heading">
          <div className="dashboard-heading">
            <div>
              <p className="eyebrow">02 / YOUR PLAN</p>
              <h2 id="dashboard-heading">{labels.toolkit}</h2>
              <p className="event-summary">{event.title} <span>·</span> {displayDate(event.date)} <span>·</span> {event.city} <span>·</span> {event.guestCount} {labels.guestsLabel}</p>
            </div>
            <div className="plan-actions">
              <span className={`plan-badge ${source === "fallback" ? "" : "ai-badge"}`}>
                <span aria-hidden="true">{source === "fallback" ? "✦" : "✧"}</span>
                {source === "fallback" ? labels.smart : labels.enhanced}
              </span>
              <button className="button button-outline" type="button" onClick={downloadPdf}>↧ &nbsp;{labels.downloadPdf}</button>
              <button className="button button-outline" type="button" onClick={downloadCalendar}>＋ &nbsp;{labels.addCalendar}</button>
            </div>
          </div>

          <div className="tab-list" role="tablist" aria-label={labels.toolkit}>
            {TABS.map((tab) => (
              <button
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-controls="dashboard-panel"
                aria-selected={activeTab === tab.id}
                tabIndex={activeTab === tab.id ? 0 : -1}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
              >
                <span aria-hidden="true">{themeCopy.tabs[tab.id].icon}</span>
                {themeCopy.tabs[tab.id].label}
              </button>
            ))}
          </div>

          <div
            className="tab-panel"
            role="tabpanel"
            id="dashboard-panel"
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
          >
            {activeTab === "ideas" && (
              <section className="ideas-view" aria-label={labels.ideasTitle}>
                <div className="ideas-banner">
                  <span className="banner-sparkle" aria-hidden="true">✳</span>
                  <div><p className="eyebrow">{labels.ideasTitle}</p><h3>{ideas.theme.name}</h3><p>{ideas.theme.description}</p></div>
                  <span className="banner-corner" aria-hidden="true">✿</span>
                </div>
                <div className="idea-grid">
                  {[
                    [labels.decor, "decor", ideas.decor, "✿"],
                    [labels.menu, "menu", ideas.menu, "◌"],
                    [labels.music, "music", ideas.music, "♫"],
                    [labels.activities, "activities", ideas.activities, "✧"],
                  ].map(([heading, key, list, icon]) => (
                    <article className="idea-card" key={key as string}>
                      <span className="card-icon" aria-hidden="true">{icon as string}</span>
                      <h3>{heading as string}</h3>
                      <ul>{(list as string[]).map((item) => <li key={item}>{item}</li>)}</ul>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "budget" && (
              <section className="budget-view" aria-label={labels.change}>
                <div className="budget-intro">
                  <p className="eyebrow">{labels.change}</p>
                  <h3>{formatINR(budget.budgetINR)}</h3>
                  <p>{formatINR(budget.costPerGuest)} {labels.perGuest}</p>
                  <span className="budget-celebration-mark" aria-hidden="true">{theme.icons.budget} ₹</span>
                </div>
                <div className="slider-card">
                  <label htmlFor="guest-slider">{labels.guests} <strong>{budget.guestCount.toLocaleString("en-IN")}</strong></label>
                  <input id="guest-slider" type="range" min={1} max={5000} step={1} value={budget.guestCount} onChange={(e) => handleSliderChange("guestCount", e.target.value)} />
                  <label htmlFor="budget-slider">{labels.budget} <strong>{formatINR(budget.budgetINR)}</strong></label>
                  <input id="budget-slider" type="range" min={10000} max={5000000} step={10000} value={Math.min(budget.budgetINR, 5000000)} onChange={(e) => handleSliderChange("budgetINR", e.target.value)} />
                  <p className="tradeoff"><strong>{labels.tradeOff}:</strong> {budget.tradeOffs}</p>
                </div>
                <div className="allocation-card">
                  <div className="section-title-row"><h3>{labels.cost}</h3><span>{labels.total}: {formatINR(budget.budgetINR)}</span></div>
                  <div className="budget-bars">
                    {budget.categories.map((item, index) => {
                      const maxAmount = Math.max(...budget.categories.map((category) => category.amount), 1);
                      return <div className="budget-line" key={item.category}>
                        <div className="budget-line-label"><span><span aria-hidden="true">{theme.icons.budget} </span>{item.category}</span><strong>{formatINR(item.amount)}</strong></div>
                        <div className="bar-track" role="img" aria-label={`${item.category}: ${item.percentage}%`}>
                          <span className={`bar-fill bar-${index % 6}`} style={{ width: `${(item.amount / maxAmount) * 100}%` }} />
                        </div>
                      </div>;
                    })}
                  </div>
                </div>
              </section>
            )}

            {activeTab === "timeline" && (
              <section className="timeline-view" aria-label={labels.steps}>
                <div className="section-title-row"><div><p className="eyebrow">{labels.steps}</p><h3>{displayDate(event.date)}</h3></div><span className="countdown-badge">{theme.icons.timeline} &nbsp;{daysUntil(event.date)} days left</span></div>
                <ol className="timeline-list">
                  {timeline.map((item, index) => <li key={item.task}>
                    <span className="timeline-marker" aria-hidden="true">{index % 2 === 0 ? theme.icons.timeline : theme.icons.occasion}</span>
                    <div className="timeline-content"><h4>{item.task}</h4><p>{displayDate(item.date)} <span>·</span> {item.daysBefore} {labels.book}</p></div>
                  </li>)}
                </ol>
              </section>
            )}

            {activeTab === "vendors" && (
              <section className="vendors-view" aria-label={labels.vendor}>
                <div className="vendor-select">
                  <label htmlFor="vendor-select">{labels.vendor}</label>
                  <select id="vendor-select" value={vendorIndex} onChange={(e) => setVendorIndex(Number(e.target.value))}>
                    {vendors.map((vendor, index) => <option key={vendor.category} value={index}>{vendor.category}</option>)}
                  </select>
                </div>
                <div className="vendor-columns">
                  <article className="vendor-detail-card"><p className="eyebrow">{labels.checklist}</p><ul>{[...activeVendor.checklist, ...(activeVendor.category === "venue" ? [themeDefaults.checklist] : [])].map((line) => <li key={line}>{line}</li>)}</ul><p className="eyebrow sub-eyebrow">{labels.questions}</p><ul>{activeVendor.questionsToAsk.map((line) => <li key={line}>{line}</li>)}</ul><p className="eyebrow sub-eyebrow">{labels.redFlags}</p><ul className="red-flag-list">{activeVendor.redFlags.map((line) => <li key={line}>{line}</li>)}</ul></article>
                  <article className="message-card"><div className="section-title-row"><div><p className="eyebrow">READY WHEN YOU ARE</p><h3>{activeVendor.category} inquiry</h3></div><button className="button button-primary copy-button" type="button" onClick={copyDraft}>{copied ? labels.copied : labels.copy}</button></div><textarea aria-label={`${activeVendor.category} message draft`} readOnly rows={12} value={activeVendor.drafts[event.language]} /></article>
                </div>
              </section>
            )}

            {activeTab === "crisis" && (
              <section className="crisis-view" aria-label={labels.crisisTitle}>
                <div className="crisis-heading"><span className="crisis-icon" aria-hidden="true">{theme.icons.crisis}</span><div><h3>{labels.crisisTitle}</h3><p>{labels.crisisSubtitle}</p></div></div>
                <div className="crisis-options">
                  {CRISES.map((crisis, index) => <button type="button" key={crisis.id} className={crisisType === crisis.id ? "crisis-option selected" : "crisis-option"} aria-pressed={crisisType === crisis.id} onClick={() => setCrisisType(crisis.id)}><span aria-hidden="true">{theme.icons.crisisOptions[index]}</span>{(language === "en" ? crisis.en : crisis.hi).replace(/^\S+\s*/, "")}<span aria-hidden="true">↗</span></button>)}
                </div>
                {activeCrisis && <article className="crisis-result" aria-live="polite">
                  <div className="crisis-result-head"><div><p className="eyebrow">{labels.adjusted}</p><h3>{formatINR(activeCrisis.adjustedBudgetINR)}</h3></div><span>{activeCrisis.adjustedGuestCount.toLocaleString("en-IN")} {labels.guestsLabel}</span></div>
                  <p className="tradeoff">{activeCrisis.tradeOff}</p>
                  <ol>{activeCrisis.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                </article>}
              </section>
            )}
          </div>
        </section>
        <ThemeDivider theme={theme} />
        {notice && <p className="sr-only" role="status">{notice}</p>}
      </main>
      <footer className="page-footer"><span className="footer-bandhanwar" aria-hidden="true">✦　✿　✦　✿　✦　✿　✦　✿　✦　✿　✦</span><IconMark /><span>Made with ❤️ for every jashn</span><span className="footer-right">{source === "fallback" ? labels.smart : labels.enhanced}</span></footer>
    </div>
  );
}
