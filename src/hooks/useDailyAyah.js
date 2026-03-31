import { useCallback, useEffect, useMemo, useState } from "react";
import { getCuratedAyat, getDailyAyah } from "../constants/quranCurated";
import { applyTranslationProfile } from "../constants/translations";
import {
    getTranslationKey,
    markReadToday,
    saveAyahToHistory,
} from "../services/userService";
import { saveAyahForWidget } from "../services/widgetProvider";

export const useDailyAyah = () => {
  const curatedList = useMemo(() => getCuratedAyat(), []);

  const initialIndex = useMemo(() => {
    if (curatedList.length === 0) return -1;
    const daily = getDailyAyah() || curatedList[0];
    const idx = curatedList.findIndex((a) => a.id === daily.id);
    return idx >= 0 ? idx : 0;
  }, [curatedList]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [translationKey, setTranslationKey] = useState("sahih");

  useEffect(() => {
    let mounted = true;
    getTranslationKey()
      .then((key) => {
        if (mounted && key) setTranslationKey(key);
      })
      .catch(() => {
        // Keep default translation profile.
      });
    return () => {
      mounted = false;
    };
  }, []);

  const ayah = useMemo(() => {
    if (curatedList.length === 0 || currentIndex < 0) return null;
    const safeIndex =
      ((currentIndex % curatedList.length) + curatedList.length) %
      curatedList.length;
    const targetAyah = curatedList[safeIndex];
    return {
      ...targetAyah,
      text: targetAyah.arabic,
      translation: applyTranslationProfile(
        targetAyah.translation,
        translationKey,
      ),
      surah: targetAyah.surahName,
      numberInSurah: targetAyah.ayahNumber,
    };
  }, [curatedList, currentIndex, translationKey]);

  useEffect(() => {
    if (!ayah) return;
    void saveAyahForWidget(ayah);
    void saveAyahToHistory(ayah);
    void markReadToday();
  }, [ayah]);

  const refreshAyah = useCallback(async () => {
    if (curatedList.length === 0) return;
    const daily = getDailyAyah() || curatedList[0];
    const idx = curatedList.findIndex((a) => a.id === daily.id);
    setCurrentIndex(idx >= 0 ? idx : 0);
  }, [curatedList]);

  const nextAyah = useCallback(() => {
    if (curatedList.length === 0) return;
    setCurrentIndex((prev) => {
      const base = prev >= 0 ? prev : 0;
      return (base + 1) % curatedList.length;
    });
  }, [curatedList]);

  const prevAyah = useCallback(() => {
    if (curatedList.length === 0) return;
    setCurrentIndex((prev) => {
      const base = prev >= 0 ? prev : 0;
      return (base - 1 + curatedList.length) % curatedList.length;
    });
  }, [curatedList]);

  return { ayah, loading: !ayah, refreshAyah, nextAyah, prevAyah };
};
