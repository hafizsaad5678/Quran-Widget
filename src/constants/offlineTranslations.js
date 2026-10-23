/**
 * Offline translations (from quran-json), shipped as compact assets instead of
 * JS modules so they do not bloat the JS bundle. A language file is loaded the
 * first time it is selected (no internet needed) and cached in memory.
 *
 * File format: JSON array [surah][ayah] = translation text.
 */
import { Asset } from "expo-asset";
import { File } from "expo-file-system";
import { useEffect, useState } from "react";

const SOURCES = {
  ur: require("../../assets/translations/ur.qtr"),
  bn: require("../../assets/translations/bn.qtr"),
  tr: require("../../assets/translations/tr.qtr"),
  id: require("../../assets/translations/id.qtr"),
  fr: require("../../assets/translations/fr.qtr"),
  es: require("../../assets/translations/es.qtr"),
  ru: require("../../assets/translations/ru.qtr"),
  sv: require("../../assets/translations/sv.qtr"),
  zh: require("../../assets/translations/zh.qtr"),
};

// "offline-en" is the built-in English (already part of quranCurated).
export const OFFLINE_LANGUAGES = [
  { key: "offline-en", label: "English" },
  { key: "ur", label: "Urdu" },
  { key: "bn", label: "Bengali" },
  { key: "tr", label: "Turkish" },
  { key: "id", label: "Indonesian" },
  { key: "fr", label: "French" },
  { key: "es", label: "Spanish" },
  { key: "ru", label: "Russian" },
  { key: "sv", label: "Swedish" },
  { key: "zh", label: "Chinese" },
];

const cache = {};
const pending = {};

export const loadTranslation = (lang) => {
  if (cache[lang]) return Promise.resolve(cache[lang]);
  if (!SOURCES[lang]) return Promise.resolve(null);
  if (!pending[lang]) {
    pending[lang] = (async () => {
      const asset = Asset.fromModule(SOURCES[lang]);
      await asset.downloadAsync();
      const text = await new File(asset.localUri || asset.uri).text();
      cache[lang] = JSON.parse(text);
      return cache[lang];
    })().finally(() => {
      delete pending[lang];
    });
  }
  return pending[lang];
};

/** { data, loading } for a language key. English needs no loading. */
export const useTranslationData = (lang) => {
  const [loaded, setLoaded] = useState({ lang: null, data: null });

  useEffect(() => {
    if (!SOURCES[lang] || cache[lang]) return undefined;
    let active = true;
    loadTranslation(lang)
      .then((data) => active && setLoaded({ lang, data }))
      .catch(() => active && setLoaded({ lang, data: null }));
    return () => {
      active = false;
    };
  }, [lang]);

  if (!SOURCES[lang]) return { data: null, loading: false };
  if (cache[lang]) return { data: cache[lang], loading: false };
  return { data: null, loading: loaded.lang !== lang };
};

/** { [ayahNumber]: text } for one surah from loaded data. */
export const surahTranslationMap = (data, surahNumber) => {
  const map = {};
  (data?.[Number(surahNumber) - 1] ?? []).forEach((text, idx) => {
    map[idx + 1] = text;
  });
  return map;
};

export const ayahTranslation = (data, surahNumber, ayahNumber) =>
  data?.[Number(surahNumber) - 1]?.[Number(ayahNumber) - 1] || "";
