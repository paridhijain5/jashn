import type { EventInput, Ideas } from "../schemas";

type Language = EventInput["language"];
type IdeaTemplate = Omit<Ideas, "menu"> & { menu: Record<string, string[]> };

const COPY: Record<string, Record<Language, IdeaTemplate>> = {
  royal: {
    en: {
      theme: { name: "Royal Garden", description: "A regal evening of jewel tones, brass details, and warm hospitality." },
      decor: ["Jewel-tone fabrics and brass accents", "Marigold welcome arch", "Candlelit tables with fresh flowers"],
      menu: {},
      music: ["Live instrumental welcome", "Bollywood classics for the dance floor", "A relaxed closing playlist"],
      activities: ["Family toast and welcome", "Photo corner with festive props", "Short dance performances"],
    },
    hi: {
      theme: { name: "शाही बाग़", description: "गहरे रंगों, पीतल की सजावट और गर्मजोशी से भरी शाही शाम।" },
      decor: ["गहरे रंग के कपड़े और पीतल के सजावटी सामान", "गेंदे के फूलों का स्वागत द्वार", "फूलों और दीयों से सजी मेज़ें"],
      menu: {},
      music: ["स्वागत के लिए लाइव वाद्य संगीत", "डांस के लिए बॉलीवुड क्लासिक्स", "शांत समापन प्लेलिस्ट"],
      activities: ["परिवार का स्वागत और शुभकामनाएँ", "रंगीन फोटो कॉर्नर", "छोटी डांस प्रस्तुतियाँ"],
    },
    hinglish: {
      theme: { name: "Royal Garden", description: "Jewel tones, brass details aur warm hospitality ke saath ek shahi shaam." },
      decor: ["Jewel-tone fabrics aur brass accents", "Marigold welcome arch", "Flowers aur diyas se saji tables"],
      menu: {},
      music: ["Welcome ke liye live instrumental music", "Dance floor par Bollywood classics", "Relaxed closing playlist"],
      activities: ["Family welcome aur wishes", "Festive props wala photo corner", "Short dance performances"],
    },
  },
  minimalist: {
    en: {
      theme: { name: "Less, but Lovely", description: "A calm celebration with thoughtful details, natural light, and uncluttered spaces." },
      decor: ["Reusable fabric runners", "A few seasonal flowers in simple vases", "Warm string lights and clear signage"],
      menu: {},
      music: ["Acoustic welcome set", "Easy-listening favorites", "A short upbeat dance set"],
      activities: ["Message cards for the hosts", "Simple group photo", "Conversation-friendly seating"],
    },
    hi: {
      theme: { name: "सादगी में सुंदरता", description: "सुकून भरा जश्न, सोच-समझकर चुनी सजावट और खुली जगहों के साथ।" },
      decor: ["दोबारा इस्तेमाल होने वाले कपड़े के रनर", "साधारण फूलदानों में मौसमी फूल", "हल्की झालर और साफ़ संकेत"],
      menu: {},
      music: ["स्वागत के लिए acoustic संगीत", "सुकून भरे पसंदीदा गाने", "छोटा upbeat डांस सेट"],
      activities: ["शुभकामना संदेश कार्ड", "सामूहिक फोटो", "बातचीत के लिए आरामदायक बैठने की जगह"],
    },
    hinglish: {
      theme: { name: "Less, but Lovely", description: "Thoughtful details, natural light aur uncluttered spaces ke saath calm celebration." },
      decor: ["Reusable fabric runners", "Simple vases mein seasonal flowers", "Warm string lights aur clear signs"],
      menu: {},
      music: ["Acoustic welcome set", "Easy-listening favorites", "Short upbeat dance set"],
      activities: ["Hosts ke liye message cards", "Simple group photo", "Conversation-friendly seating"],
    },
  },
  retro: {
    en: {
      theme: { name: "Retro Bollywood Night", description: "A playful throwback with colorful details, familiar songs, and a lively dance floor." },
      decor: ["Vintage-film poster-inspired signs", "Bright scarves and colorful table accents", "Disco lights for the dance floor"],
      menu: {},
      music: ["A retro Hindi film sing-along", "Decade-spanning Bollywood dance medley", "Guest-request finale"],
      activities: ["Guess the song intro", "Best retro-inspired outfit", "Group hook-step challenge"],
    },
    hi: {
      theme: { name: "रेट्रो बॉलीवुड रात", description: "रंगीन सजावट, पुराने पसंदीदा गानों और मस्ती भरे डांस फ्लोर के साथ।" },
      decor: ["पुरानी फ़िल्मों से प्रेरित पोस्टर", "रंगीन स्कार्फ़ और मेज़ की सजावट", "डांस फ्लोर के लिए डिस्को लाइट"],
      menu: {},
      music: ["रेट्रो हिंदी फ़िल्मों के गाने", "हर दौर के बॉलीवुड डांस गाने", "मेहमानों की पसंद का आख़िरी सेट"],
      activities: ["गाने की शुरुआत पहचानें", "रेट्रो पहनावे का पुरस्कार", "ग्रुप हुक-स्टेप चैलेंज"],
    },
    hinglish: {
      theme: { name: "Retro Bollywood Night", description: "Colorful details, familiar songs aur lively dance floor ke saath throwback party." },
      decor: ["Vintage-film poster-inspired signs", "Bright scarves aur colorful table accents", "Dance floor par disco lights"],
      menu: {},
      music: ["Retro Hindi film sing-along", "Bollywood dance medley", "Guest-request finale"],
      activities: ["Song intro guess karo", "Best retro-inspired outfit", "Group hook-step challenge"],
    },
  },
  eco: {
    en: {
      theme: { name: "Earth & Celebration", description: "A welcoming gathering that favors local makers, reusable decor, and low-waste choices." },
      decor: ["Potted plants that guests can take home", "Reusable cloth signage and tableware", "Locally grown seasonal flowers"],
      menu: {},
      music: ["Acoustic local performers", "Feel-good community favorites", "A low-volume outdoor playlist"],
      activities: ["Plantable-seed favors", "Community gratitude wall", "Refill-water station"],
    },
    hi: {
      theme: { name: "धरती के रंग", description: "स्थानीय कलाकारों, दोबारा इस्तेमाल की सजावट और कम कचरे वाला अपनापन भरा जश्न।" },
      decor: ["मेहमानों के लिए घर ले जाने वाले पौधे", "कपड़े के संकेत और दोबारा इस्तेमाल के बर्तन", "स्थानीय मौसमी फूल"],
      menu: {},
      music: ["स्थानीय कलाकारों का acoustic संगीत", "समुदाय के पसंदीदा गाने", "हल्की आवाज़ वाली आउटडोर प्लेलिस्ट"],
      activities: ["बीज वाले छोटे उपहार", "आभार संदेश की दीवार", "पानी भरने का स्टेशन"],
    },
    hinglish: {
      theme: { name: "Earth & Celebration", description: "Local makers, reusable decor aur low-waste choices ke saath warm gathering." },
      decor: ["Guests ke liye ghar le jaane wale plants", "Reusable cloth signs aur tableware", "Locally grown seasonal flowers"],
      menu: {},
      music: ["Acoustic local performers", "Feel-good community favorites", "Low-volume outdoor playlist"],
      activities: ["Seed-paper favors", "Community gratitude wall", "Refill-water station"],
    },
  },
  traditional: {
    en: {
      theme: { name: "Aangan Utsav", description: "A heartfelt celebration rooted in family traditions, shared food, and joyful rituals." },
      decor: ["Rangoli welcome design", "Marigold torans and brass diyas", "Family heirlooms as table accents"],
      menu: {},
      music: ["Regional folk welcome", "Family-requested classics", "A joyful group-dance finale"],
      activities: ["A family blessing or toast", "Traditional games for all ages", "Shared family photo moment"],
    },
    hi: {
      theme: { name: "आँगन उत्सव", description: "परिवार की परंपराओं, साथ के भोजन और खुशियों से जुड़ा अपनापन भरा जश्न।" },
      decor: ["रंगोली से सजा स्वागत द्वार", "गेंदे के तोरण और पीतल के दीये", "मेज़ पर परिवार की यादगार चीज़ें"],
      menu: {},
      music: ["स्वागत के लिए क्षेत्रीय लोक संगीत", "परिवार के पसंदीदा क्लासिक्स", "खुशनुमा ग्रुप डांस"],
      activities: ["परिवार का आशीर्वाद या शुभकामना", "हर उम्र के लिए पारंपरिक खेल", "परिवार की सामूहिक फोटो"],
    },
    hinglish: {
      theme: { name: "Aangan Utsav", description: "Family traditions, shared food aur joyful rituals se juda apnapan bhara celebration." },
      decor: ["Rangoli welcome design", "Marigold torans aur brass diyas", "Family heirlooms as table accents"],
      menu: {},
      music: ["Regional folk welcome", "Family-requested classics", "Joyful group-dance finale"],
      activities: ["Family blessing ya toast", "Har age ke liye traditional games", "Family photo moment"],
    },
  },
};

const MENU: Record<Language, Record<string, string[]>> = {
  en: {
    default: ["Seasonal snacks and fresh lemonade", "A balanced main course with local favorites", "A dessert featuring seasonal fruit"],
    jain: ["Jain-friendly chaat without root vegetables", "Paneer and seasonal non-root vegetables", "Fruit-based dessert; confirm ingredients with the caterer"],
    vegetarian: ["Chaat counter with pani puri and dahi bhalla", "Paneer tikka and seasonal vegetable mains", "Gulab jamun and a seasonal fruit dessert"],
    halal: ["Halal-certified kebab or grilled vegetable station", "Rice, fresh salads, and clearly labeled mains", "Dessert with ingredients confirmed by the caterer"],
  },
  hi: {
    default: ["मौसमी स्नैक्स और ताज़ा नींबू पानी", "स्थानीय पसंद के साथ संतुलित मुख्य भोजन", "मौसमी फलों की मिठाई"],
    jain: ["जैन चाट, बिना कंद-मूल की सब्ज़ियों के", "पनीर और मौसमी गैर-कंद सब्ज़ियाँ", "फलों की मिठाई; सामग्री कैटरर से ज़रूर जाँचें"],
    vegetarian: ["पानी पूरी और दही भल्ले का चाट काउंटर", "पनीर टिक्का और मौसमी सब्ज़ियाँ", "गुलाब जामुन और मौसमी फल"],
    halal: ["हलाल-प्रमाणित कबाब या ग्रिल्ड सब्ज़ियाँ", "चावल, ताज़ा सलाद और साफ़ लेबल वाला भोजन", "कैटरर से सामग्री की पुष्टि के बाद मिठाई"],
  },
  hinglish: {
    default: ["Seasonal snacks aur fresh nimbu paani", "Local favorites ke saath balanced main course", "Seasonal fruit dessert"],
    jain: ["Jain-friendly chaat, bina root vegetables ke", "Paneer aur seasonal non-root sabziyan", "Fruit dessert; caterer se ingredients confirm karein"],
    vegetarian: ["Pani puri aur dahi bhalla chaat counter", "Paneer tikka aur seasonal vegetable mains", "Gulab jamun aur seasonal fruit dessert"],
    halal: ["Halal-certified kebab ya grilled vegetable station", "Rice, fresh salads aur clearly labeled mains", "Caterer se ingredients confirm karke dessert"],
  },
};

function pickTemplate(vibe: string): string {
  const value = vibe.toLowerCase();
  if (value.includes("royal") || value.includes("शाही")) return "royal";
  if (value.includes("minimal") || value.includes("सादगी")) return "minimalist";
  if (value.includes("retro") || value.includes("bollywood") || value.includes("रेट्रो")) return "retro";
  if (value.includes("eco") || value.includes("green") || value.includes("धरती")) return "eco";
  return "traditional";
}

function menuFor(input: EventInput): string[] {
  const options = MENU[input.language];
  const dietary = input.dietary.map((item) => item.toLowerCase());
  const key = dietary.some((item) => item.includes("jain"))
    ? "jain"
    : dietary.some((item) => item.includes("halal"))
      ? "halal"
      : dietary.some((item) => item.includes("vegetarian") || item.includes("veg"))
        ? "vegetarian"
        : "default";
  return options[key];
}

export function generateIdeas(input: EventInput): Ideas {
  const template = COPY[pickTemplate(input.vibe)][input.language];
  return {
    theme: { ...template.theme },
    decor: [...template.decor],
    menu: menuFor(input),
    music: [...template.music],
    activities: [...template.activities],
  };
}
