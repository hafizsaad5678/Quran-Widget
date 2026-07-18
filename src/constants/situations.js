const TYPE_META = {
  sabr: {
    subtitle: "Patience brings strength and nearness to Allah.",
    icon: "shield-outline",
  },
  anger: {
    subtitle: "Respond with calm, mercy, and restraint.",
    icon: "emoticon-angry-outline",
  },
  stress: {
    subtitle: "Find relief through remembrance and trust.",
    icon: "water",
  },
  gratitude: {
    subtitle: "Shukr opens doors to more blessings.",
    icon: "hands-pray",
  },
  sadness: {
    subtitle: "Allah sees your pain and never leaves you.",
    icon: "weather-night",
  },
};

export const SITUATIONS = [
  {
    title: "Stay Strong - Allah is with the Patient",
    type: "sabr",
    ayahs: ["2:153", "94:5", "94:6", "3:200", "16:127"],
  },
  {
    title: "Control Anger, Choose Peace",
    type: "anger",
    ayahs: ["3:134", "7:199", "42:37", "41:34", "24:22"],
  },
  {
    title: "Find Peace in Allah",
    type: "stress",
    ayahs: ["13:28", "2:286", "65:3", "20:46", "9:51"],
  },
  {
    title: "Be Grateful - Increase Your Blessings",
    type: "gratitude",
    ayahs: ["14:7", "10:58", "16:18", "2:152", "93:11"],
  },
  {
    title: "Allah Knows Your Pain",
    type: "sadness",
    ayahs: ["93:3", "12:86", "3:139", "94:5", "94:6"],
  },
].map((item) => ({
  ...item,
  key: item.type,
  ayahIds: item.ayahs,
  subtitle:
    TYPE_META[item.type]?.subtitle || "Quranic guidance for your situation.",
  icon: TYPE_META[item.type]?.icon || "book-open-page-variant",
}));

export const findSituation = (situationKey) => {
  return SITUATIONS.find((item) => item.key === situationKey) || null;
};
