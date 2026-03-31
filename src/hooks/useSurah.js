import { useMemo } from "react";
import { getAllSurahs, getSurah } from "../constants/quranCurated";

/**
 * Returns all ayahs for a given surah number (offline, from quran-json).
 */
export const useSurah = (surahNumber) => {
    const ayahs = useMemo(() => {
        if (!surahNumber) return [];
        return getSurah(Number(surahNumber));
    }, [surahNumber]);

    const meta = useMemo(() => {
        if (!surahNumber) return null;
        const all = getAllSurahs();
        return all[Number(surahNumber) - 1] ?? null;
    }, [surahNumber]);

    return { ayahs, meta };
};

/**
 * Returns the full list of 114 surahs with metadata.
 */
export const useSurahList = () => {
    return useMemo(() => getAllSurahs(), []);
};
