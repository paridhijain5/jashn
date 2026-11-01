import type { EventInput } from "./schemas";

export type OccasionId =
  | "wedding"
  | "haldi"
  | "birthday"
  | "diwali"
  | "ganesh"
  | "anniversary"
  | "baby"
  | "corporate";

export type ThemeLanguage = "en" | "hi";
export type ThemeTabId = "ideas" | "budget" | "timeline" | "vendors" | "crisis";

export interface OccasionTheme {
  id: OccasionId;
  pattern: "jaali" | "vine" | "confetti" | "rangoli" | "lotus" | "hearts" | "clouds" | "grid";
  shape: "arch" | "floral" | "bubble" | "diya" | "lotus" | "heart" | "cloud" | "clean";
  font: "display" | "playful" | "accent" | "body";
  art: OccasionId;
  icons: { occasion: string; timeline: string; budget: string; crisis: string; crisisOptions: [string, string, string, string, string] };
  colors: {
    main: string;
    deep: string;
    accent: string;
    bright: string;
    pattern: string;
    surface: string;
    surfaceAlt: string;
  };
  copy: Record<ThemeLanguage, {
    headline: string;
    subtitle: string;
    cta: string;
    caption: string;
    tabs: Record<ThemeTabId, { label: string; icon: string }>;
  }>;
  defaults: Record<ThemeLanguage, {
    theme: string;
    description: string;
    checklist: string;
    menuIdea: string;
    musicIdea: string;
  }>;
}

const commonTabs = (ideas: string, budget: string, timeline: string, vendors: string, crisis: string) => ({
  en: {
    ideas: { label: ideas, icon: "✨" },
    budget: { label: budget, icon: "💰" },
    timeline: { label: timeline, icon: "📅" },
    vendors: { label: vendors, icon: "🤝" },
    crisis: { label: crisis, icon: "⚡" },
  },
  hi: {
    ideas: { label: "सुझाव", icon: "✨" },
    budget: { label: "बजट", icon: "💰" },
    timeline: { label: "तैयारी", icon: "📅" },
    vendors: { label: "वेंडर", icon: "🤝" },
    crisis: { label: "प्लान बी", icon: "⚡" },
  },
});

export const OCCASION_THEMES: Record<OccasionId, OccasionTheme> = {
  wedding: {
    id: "wedding", pattern: "jaali", shape: "arch", font: "display", art: "wedding", icons: { occasion: "💍", timeline: "🌹", budget: "💎", crisis: "🥁", crisisOptions: ["🌧️", "🍽️", "👥", "💸", "🏛️"] },
    colors: { main: "#7a1f2b", deep: "#42121d", accent: "#fadadd", bright: "#d4af37", pattern: "#d4af37", surface: "#fff8ec", surfaceAlt: "#f8e9ed" },
    copy: {
      en: { headline: "A wedding woven with wonder.", subtitle: "From the first marigold to the last dance, bring every beautiful detail together.", cta: "Plan your wedding", caption: "A little tradition, a lot of forever", tabs: commonTabs("Wedding ideas", "Wedding budget", "Wedding timeline", "Wedding vendors", "Wedding Plan B").en },
      hi: { headline: "शादी, यादों के नाम।", subtitle: "पहले फूल से आख़िरी नाच तक, हर प्यारी तैयारी एक जगह।", cta: "शादी की तैयारी", caption: "रिवाज़ भी, हमेशा का साथ भी", tabs: commonTabs("", "", "", "", "").hi },
    },
    defaults: {
      en: { theme: "Mandap under the stars", description: "A floral mandap, warm brass and a joyful family sangeet.", checklist: "Confirm the mandap sightlines and ceremony sound check.", menuIdea: "Saffron paneer, dal makhani and rose kulfi.", musicIdea: "Open with a shehnai welcome, then build to a family sangeet set." },
      hi: { theme: "सितारों के नीचे मंडप", description: "फूलों का मंडप, पीतल की चमक और परिवार के संगीत से सजी शाम।", checklist: "मंडप की बैठने की जगह और समारोह का साउंड चेक तय करें।", menuIdea: "केसर पनीर, दाल मखनी और गुलाब कुल्फ़ी।", musicIdea: "शहनाई से शुरुआत करें, फिर परिवार के संगीत पर आएँ।" },
    },
  },
  haldi: {
    id: "haldi", pattern: "vine", shape: "floral", font: "accent", art: "haldi", icons: { occasion: "🌼", timeline: "🌼", budget: "🥣", crisis: "🌿", crisisOptions: ["🌦️", "🥘", "👥", "💰", "🌿"] },
    colors: { main: "#1e8a5c", deep: "#15583d", accent: "#bfebd3", bright: "#fff3b0", pattern: "#c9e265", surface: "#fff8ec", surfaceAlt: "#f0f8e8" },
    copy: {
      en: { headline: "A little haldi, a lot of happiness.", subtitle: "Plan a sunshine-filled gathering with flowers, laughter and lovely details.", cta: "Plan your haldi", caption: "Good vibes, golden days", tabs: commonTabs("Haldi ideas", "Celebration budget", "Prep calendar", "Find your team", "Plan B").en },
      hi: { headline: "हल्दी की धूप, खुशियों के रंग।", subtitle: "फूलों, हँसी और अपनों के साथ हर प्यारी तैयारी करें।", cta: "हल्दी सजाएँ", caption: "रंग भी, रौनक भी", tabs: commonTabs("", "", "", "", "").hi },
    },
    defaults: {
      en: { theme: "Marigold sunshine", description: "A breezy mehndi courtyard dressed in marigolds and fresh green.", checklist: "Set up a shaded, washable haldi area with a water station.", menuIdea: "Kesar lassi, dhokla and fresh seasonal fruit.", musicIdea: "Mix dhol beats with easy-going folk and family favourites." },
      hi: { theme: "गेंदे की धूप", description: "गेंदे और हरी बेलों से सजा खुला-खुला मेहंदी आँगन।", checklist: "छायादार, आसानी से साफ़ होने वाली हल्दी जगह और पानी रखें।", menuIdea: "केसर लस्सी, ढोकला और ताज़े मौसमी फल।", musicIdea: "ढोल के साथ लोकगीत और परिवार के पसंदीदा गाने मिलाएँ।" },
    },
  },
  birthday: {
    id: "birthday", pattern: "confetti", shape: "bubble", font: "playful", art: "birthday", icons: { occasion: "🎂", timeline: "🎈", budget: "🎁", crisis: "🎉", crisisOptions: ["🌧️", "🍰", "🎈", "💸", "🎪"] },
    colors: { main: "#0e7c9b", deep: "#07566d", accent: "#fadadd", bright: "#ffdcc2", pattern: "#d9c2f0", surface: "#fff8ec", surfaceAlt: "#eef8ff" },
    copy: {
      en: { headline: "Birthday bash, made brilliantly yours.", subtitle: "Big wishes, bright ideas and a party plan that feels like you.", cta: "Plan the birthday bash", caption: "Make a wish. Make a memory.", tabs: commonTabs("Party ideas", "Party budget", "Countdown", "Party crew", "Plan B").en },
      hi: { headline: "जन्मदिन, खूब धमाल के साथ।", subtitle: "बड़ी शुभकामनाएँ, रंगीन सुझाव और आपके अंदाज़ की पार्टी।", cta: "पार्टी सजाएँ", caption: "इच्छा करें, याद बनाएँ", tabs: commonTabs("", "", "", "", "").hi },
    },
    defaults: {
      en: { theme: "Confetti & cake", description: "A bright, playful birthday with a wish-making moment and room to dance.", checklist: "Confirm cake delivery, candle count and allergy-safe servings.", menuIdea: "Mini chaat cups, paneer sliders and a fruit-forward birthday cake.", musicIdea: "Start with a birthday sing-along and finish with the guest's playlist." },
      hi: { theme: "केक और रंगीन कंफ़ेटी", description: "विशेष शुभकामना और मस्ती भरे डांस के साथ रंगीन जन्मदिन।", checklist: "केक की डिलीवरी, मोमबत्तियाँ और एलर्जी-सुरक्षित सर्विंग तय करें।", menuIdea: "मिनी चाट, पनीर स्लाइडर और फलों वाला जन्मदिन केक।", musicIdea: "जन्मदिन के गीत से शुरू करें और पसंदीदा गानों पर ख़त्म करें।" },
    },
  },
  diwali: {
    id: "diwali", pattern: "rangoli", shape: "diya", font: "accent", art: "diwali", icons: { occasion: "🪔", timeline: "🪔", budget: "✨", crisis: "🕯️", crisisOptions: ["🌧️", "🍽️", "🪔", "💸", "🏛️"] },
    colors: { main: "#2346a0", deep: "#172f70", accent: "#ff7a1a", bright: "#fff3b0", pattern: "#d4af37", surface: "#fff8ec", surfaceAlt: "#f0f3ff" },
    copy: {
      en: { headline: "Diwali mela, glowing with good ideas.", subtitle: "Bring neighbours together for a bright, welcoming and thoughtful festival.", cta: "Plan the mela", caption: "Light shared is joy multiplied", tabs: commonTabs("Mela ideas", "Mela budget", "Festival countdown", "Mela partners", "Festival Plan B").en },
      hi: { headline: "दीवाली मेला, रोशनी और रौनक।", subtitle: "पड़ोसियों के साथ एक सुरक्षित, सुंदर और यादगार त्योहार सजाएँ।", cta: "मेला सजाएँ", caption: "मिलकर बाँटें, खुशियाँ बढ़ाएँ", tabs: commonTabs("", "", "", "", "").hi },
    },
    defaults: {
      en: { theme: "A mindful night of lights", description: "Warm diyas, joyful rangoli and a community-first festival evening.", checklist: "Use stable diya stands, clear walkways and low-smoke lighting.", menuIdea: "Sattvic chaat, vegetable pulao and small mithai portions.", musicIdea: "Blend festive instrumental welcomes with a family-friendly dance set." },
      hi: { theme: "रोशनी की सुंदर शाम", description: "दीयों, रंगोली और साथ मिलकर मनाए त्योहार की शाम।", checklist: "दीयों के सुरक्षित स्टैंड, खुले रास्ते और कम धुएँ वाली रोशनी रखें।", menuIdea: "सात्विक चाट, सब्ज़ियों का पुलाव और छोटी मिठाई।", musicIdea: "वाद्य स्वागत संगीत के बाद परिवार के साथ नाचने वाले गीत रखें।" },
    },
  },
  ganesh: {
    id: "ganesh", pattern: "lotus", shape: "lotus", font: "accent", art: "ganesh", icons: { occasion: "🐘", timeline: "🔔", budget: "🌺", crisis: "🚩", crisisOptions: ["🌧️", "🍽️", "🐘", "💸", "🚩"] },
    colors: { main: "#1e8a5c", deep: "#15583d", accent: "#ff7a1a", bright: "#ffdcc2", pattern: "#c9e265", surface: "#fff8ec", surfaceAlt: "#f1f8eb" },
    copy: {
      en: { headline: "Ganesh Utsav, planned with devotion.", subtitle: "Make room for community, tradition and a celebration everyone can enjoy.", cta: "Plan the Utsav", caption: "Together in joy, together in devotion", tabs: commonTabs("Utsav ideas", "Utsav budget", "Utsav schedule", "Utsav team", "Plan B").en },
      hi: { headline: "गणेश उत्सव, मिलकर मनाएँ।", subtitle: "परंपरा, समुदाय और सबके लिए आनंदमय तैयारी।", cta: "उत्सव सजाएँ", caption: "भक्ति भी, एकता भी", tabs: commonTabs("", "", "", "", "").hi },
    },
    defaults: {
      en: { theme: "A welcoming Ganesh mandap", description: "A saffron-and-floral gathering designed around community and care.", checklist: "Confirm accessible darshan routes, volunteer shifts and safe sound levels.", menuIdea: "Steamed modak, lemon rice and refreshing nimbu pani.", musicIdea: "Use devotional welcomes and a gentle community dhol finale." },
      hi: { theme: "अपना गणेश मंडप", description: "केसरिया रंग और फूलों से सजा, सबको साथ लाने वाला उत्सव।", checklist: "सुगम दर्शन मार्ग, स्वयंसेवकों की पाली और सुरक्षित ध्वनि तय करें।", menuIdea: "भाप वाले मोदक, नींबू चावल और ताज़ा नींबू पानी।", musicIdea: "भक्ति संगीत से स्वागत करें और हल्के सामुदायिक ढोल से समापन।" },
    },
  },
  anniversary: {
    id: "anniversary", pattern: "hearts", shape: "heart", font: "display", art: "anniversary", icons: { occasion: "💞", timeline: "🌹", budget: "💍", crisis: "🕯️", crisisOptions: ["🌧️", "🍽️", "💞", "💸", "🏛️"] },
    colors: { main: "#6a4b91", deep: "#493267", accent: "#fadadd", bright: "#bdede8", pattern: "#d9c2f0", surface: "#fff8ec", surfaceAlt: "#f7f0ff" },
    copy: {
      en: { headline: "Celebrate your always.", subtitle: "A thoughtful anniversary plan for the stories, little rituals and love you share.", cta: "Plan your anniversary", caption: "Here's to every chapter", tabs: commonTabs("Romantic ideas", "Dinner budget", "Countdown", "Your helpers", "Plan B").en },
      hi: { headline: "साथ के हर साल का जश्न।", subtitle: "आपकी कहानी, प्यारी आदतों और साथ के नाम एक खूबसूरत शाम।", cta: "सालगिरह सजाएँ", caption: "हर नए अध्याय के नाम", tabs: commonTabs("", "", "", "", "").hi },
    },
    defaults: {
      en: { theme: "The story of us", description: "A rose-lit evening that celebrates shared memories and new beginnings.", checklist: "Gather a few favourite photographs and confirm a quiet toast moment.", menuIdea: "A shared seasonal thali, rose lemonade and a small dessert for two.", musicIdea: "Build a short playlist around meaningful songs from each chapter." },
      hi: { theme: "हमारी कहानी", description: "यादों और नए सपनों के नाम गुलाबों से सजी शाम।", checklist: "पसंदीदा तस्वीरें इकट्ठा करें और शुभकामना का शांत पल रखें।", menuIdea: "मौसमी थाली, गुलाब शिकंजी और दो लोगों के लिए छोटी मिठाई।", musicIdea: "साथ के हर पड़ाव के खास गानों की छोटी प्लेलिस्ट बनाएँ।" },
    },
  },
  baby: {
    id: "baby", pattern: "clouds", shape: "cloud", font: "playful", art: "baby", icons: { occasion: "🍼", timeline: "⭐", budget: "🧸", crisis: "☁️", crisisOptions: ["🌧️", "🍼", "👶", "💸", "☁️"] },
    colors: { main: "#0e7c9b", deep: "#07566d", accent: "#cfe8fa", bright: "#bfebd3", pattern: "#fadadd", surface: "#fff8ec", surfaceAlt: "#effaff" },
    copy: {
      en: { headline: "A tiny guest, a whole lot of joy.", subtitle: "Plan a gentle, welcoming baby shower full of sweet details and easy moments.", cta: "Plan the shower", caption: "Little arrival, lovely memories", tabs: commonTabs("Sweet ideas", "Shower budget", "Countdown", "Your helpers", "Plan B").en },
      hi: { headline: "नन्हे मेहमान की प्यारी तैयारी।", subtitle: "प्यार, आराम और छोटी-छोटी खुशियों से भरी गोद भराई।", cta: "गोद भराई सजाएँ", caption: "नन्ही खुशी, प्यारी यादें", tabs: commonTabs("", "", "", "", "").hi },
    },
    defaults: {
      en: { theme: "Clouds, cuddles & wishes", description: "Soft pastels, comfortable seating and a relaxed welcome for every guest.", checklist: "Provide comfortable seating, a quiet rest space and step-free access.", menuIdea: "Mini idli, mild paneer bites and fresh fruit with dairy-free options.", musicIdea: "Keep a soft acoustic playlist at conversation-friendly volume." },
      hi: { theme: "बादल, दुलार और दुआएँ", description: "हल्के रंग, आरामदायक बैठने की जगह और सबका प्यारा स्वागत।", checklist: "आरामदायक कुर्सियाँ, शांत विश्राम जगह और बिना सीढ़ियों का रास्ता रखें।", menuIdea: "मिनी इडली, हल्के पनीर स्नैक्स और ताज़े फल; बिना दूध के विकल्प भी।", musicIdea: "बातचीत के अनुकूल धीमी acoustic प्लेलिस्ट रखें।" },
    },
  },
  corporate: {
    id: "corporate", pattern: "grid", shape: "clean", font: "body", art: "corporate", icons: { occasion: "🏆", timeline: "📊", budget: "📈", crisis: "🔧", crisisOptions: ["🌧️", "🍽️", "👥", "💸", "🏢"] },
    colors: { main: "#2346a0", deep: "#172f70", accent: "#bdede8", bright: "#a8c3a0", pattern: "#5bb8f5", surface: "#fff8ec", surfaceAlt: "#eff6ff" },
    copy: {
      en: { headline: "Good people. Great moments. Well planned.", subtitle: "A clear, inclusive plan for celebrating milestones and the people behind them.", cta: "Plan the team event", caption: "A better way to celebrate together", tabs: commonTabs("Event ideas", "Event budget", "Run of show", "Event partners", "Contingencies").en },
      hi: { headline: "टीम की उपलब्धि, साथ मिलकर।", subtitle: "लोगों और उपलब्धियों के जश्न के लिए साफ़ और सबको साथ रखने वाली योजना।", cta: "टीम इवेंट बनाएँ", caption: "साथ मनाएँ, आगे बढ़ें", tabs: commonTabs("", "", "", "", "").hi },
    },
    defaults: {
      en: { theme: "Milestones & momentum", description: "A polished, accessible gathering that celebrates the whole team.", checklist: "Confirm step-free access, dietary labels, AV checks and a clear run of show.", menuIdea: "Clearly labelled vegetarian buffet with inclusive allergy-aware options.", musicIdea: "Choose an upbeat arrival playlist and keep speeches easy to hear." },
      hi: { theme: "उपलब्धि और नई ऊर्जा", description: "पूरी टीम के लिए सलीकेदार, सहज और सबको साथ रखने वाला आयोजन।", checklist: "सुगम रास्ता, भोजन लेबल, AV जाँच और स्पष्ट कार्यक्रम तय करें।", menuIdea: "स्पष्ट लेबल वाला शाकाहारी बुफ़े और एलर्जी का ध्यान रखने वाले विकल्प।", musicIdea: "आगमन के लिए उत्साही संगीत रखें और भाषण साफ़ सुनाई दें।" },
    },
  },
};

export function getOccasionTheme(input: Pick<EventInput, "eventType" | "title" | "vibe">): OccasionTheme {
  const text = `${input.title} ${input.vibe}`.toLocaleLowerCase();
  if (/haldi|mehndi|मेहंदी|हल्दी/.test(text)) return OCCASION_THEMES.haldi;
  if (/baby shower|god bharai|गोद भराई/.test(text)) return OCCASION_THEMES.baby;
  if (/anniversary|सालगिरह/.test(text)) return OCCASION_THEMES.anniversary;
  if (/ganesh|गणेश|utsav/.test(text)) return OCCASION_THEMES.ganesh;
  if (/corporate|team celebration|कॉर्पोरेट|team event/.test(text)) return OCCASION_THEMES.corporate;
  if (input.eventType === "birthday" || /birthday|जन्मदिन/.test(text)) return OCCASION_THEMES.birthday;
  if (input.eventType === "wedding" || /wedding|sangeet|shaadi|शादी/.test(text)) return OCCASION_THEMES.wedding;
  if (input.eventType === "community" || /diwali|दीवाली|दीपावली|mela|festival|मेला/.test(text)) return OCCASION_THEMES.diwali;
  return OCCASION_THEMES.corporate;
}
