/**
 * Fully offline Mushaf pages.
 *  - quran-meta  -> which ayahs are on each of the 604 Madani pages (+ juz, ruku)
 *  - react-native-quran-tajweed -> tajweed-coloured text for every ayah
 * No network, no downloads, no cache needed.
 */
import {
  findJuzByAyahId,
  findRukuByAyahId,
  findSurahAyahByAyahId,
  getPageMeta,
} from "quran-meta/hafs";
import { getAyahSegments } from "react-native-quran-tajweed";
import { getAllSurahs } from "../constants/quranCurated";

let surahNameArabic = null;
const arabicName = (surahNumber) => {
  if (!surahNameArabic) {
    surahNameArabic = {};
    getAllSurahs().forEach((s) => {
      surahNameArabic[s.number] = s.nameArabic;
    });
  }
  return surahNameArabic[surahNumber] || "";
};

const pageCache = new Map();

/** Ayahs on a Mushaf page (1..604), each with tajweed segments. */
export const getPageAyahs = (page) => {
  const key = Number(page);
  if (pageCache.has(key)) return pageCache.get(key);

  const { firstAyahId, lastAyahId } = getPageMeta(key);
  const ayahs = [];
  for (let id = firstAyahId; id <= lastAyahId; id += 1) {
    const [surah, ayah] = findSurahAyahByAyahId(id);
    ayahs.push({
      number: id,
      numberInSurah: ayah,
      surah: { number: surah, name: arabicName(surah) },
      juz: findJuzByAyahId(id),
      ruku: findRukuByAyahId(id),
      segments: getAyahSegments(surah, ayah) ?? [],
    });
  }

  if (pageCache.size > 40) pageCache.delete(pageCache.keys().next().value);
  pageCache.set(key, ayahs);
  return ayahs;
};
