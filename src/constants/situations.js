export const SITUATIONS = [
  {
    key: "stress",
    title: "Stress",
    subtitle: "Find stillness in remembrance",
    icon: "brain",
    ayahIds: ["94:5", "94:6", "13:28", "2:153", "2:286"],
  },
  {
    key: "fear",
    title: "Fear",
    subtitle: "Hold onto trust in Allah",
    icon: "shield-outline",
    ayahIds: ["3:173", "65:3", "12:87", "3:139", "8:29"],
  },
  {
    key: "rizq",
    title: "Rizq",
    subtitle: "Provision and ease from Allah",
    icon: "cash-multiple",
    ayahIds: ["65:3", "16:97", "2:216", "51:56", "67:2"],
  },
  {
    key: "peace",
    title: "Peace",
    subtitle: "Calm your heart with Quran",
    icon: "leaf",
    ayahIds: ["13:28", "2:186", "7:56", "33:41", "50:16"],
  },
];

export const findSituation = (situationKey) => {
  return SITUATIONS.find((item) => item.key === situationKey) || null;
};
