import { useMemo } from "react";
import { getCuratedAyat } from "../constants/quranCurated";
import { applyTranslationProfile } from "../constants/translations";
import { useAppStore } from "../store/useAppStore";

export const useAyatLibrary = () => {
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const translationKey = useAppStore((state) => state.settings.translationKey);

  const ayat = useMemo(() => {
    const raw = getCuratedAyat();
    return raw.map((a) => ({
      ...a,
      text: a.arabic,
      translation: applyTranslationProfile(a.translation, translationKey),
      surah: a.surahName,
      numberInSurah: a.ayahNumber,
    }));
  }, [translationKey]);

  // Maintain same return signature for compatibility. Since Zustand is sync in memory, loading is false.
  return { ayat, favorites, toggleFavorite, loading: false, refresh: () => {} };
};
