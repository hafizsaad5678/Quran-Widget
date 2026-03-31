export const TRANSLATION_OPTIONS = [
  { key: "sahih", label: "Sahih (Default)" },
  { key: "simple", label: "Simple English" },
  { key: "concise", label: "Concise" },
];

const simplifyText = (text) => {
  return text
    .replace(/\bIndeed,\s*/gi, "")
    .replace(/\bVerily,\s*/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
};

const conciseText = (text) => {
  const simple = simplifyText(text);
  const chunks = simple.split(/[.;]/).filter(Boolean);
  if (chunks.length > 0) {
    return `${chunks[0].trim()}.`;
  }
  return simple;
};

export const applyTranslationProfile = (text, key = "sahih") => {
  if (!text) return "";
  if (key === "simple") return simplifyText(text);
  if (key === "concise") return conciseText(text);
  return text;
};

export const toTranslatedAyah = (ayah, key = "sahih") => {
  if (!ayah) return ayah;
  return {
    ...ayah,
    translation: applyTranslationProfile(ayah.translation, key),
    translationKey: key,
  };
};

const REFLECTION_LINES = [
  "Pause and carry one message from this ayah into your day.",
  "Take one minute to repeat this ayah with presence.",
  "Try to practice one small action inspired by this verse.",
  "Read this ayah again before your next prayer.",
  "Share this ayah with someone who may need it today.",
];

export const getReflectionLine = (ayahId = "1:1") => {
  const hash = ayahId.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return REFLECTION_LINES[hash % REFLECTION_LINES.length];
};
