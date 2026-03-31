export const SITUATIONS = [
  {
    key: "stress",
    title: "Stress & Anxiety",
    subtitle: "Find stillness in remembrance",
    icon: "water",
    ayahIds: ["94:5", "94:6", "2:153", "2:286", "2:155"],
  },
  {
    key: "fear",
    title: "Fear & Worry",
    subtitle: "Hold onto trust in Allah",
    icon: "shield-outline",
    ayahIds: ["3:173", "12:87", "3:139", "8:29", "39:53"],
  },
  {
    key: "rizq",
    title: "Rizq & Provision",
    subtitle: "Provision and ease from Allah",
    icon: "hand-coin-outline",
    ayahIds: ["65:3", "16:97", "2:216", "51:56", "67:2"],
  },
  {
    key: "peace",
    title: "Seeking Peace",
    subtitle: "Calm your heart with Quran",
    icon: "leaf",
    ayahIds: ["13:28", "2:186", "7:56", "33:41", "50:16"],
  },
  {
    key: "motivation",
    title: "Motivation",
    subtitle: "Renew your purpose through divine wisdom",
    icon: "lightning-bolt-outline",
    ayahIds: ["29:69", "3:160", "13:11", "103:2", "103:3"],
  },
];

export const findSituation = (situationKey) => {
  return SITUATIONS.find((item) => item.key === situationKey) || null;
};
