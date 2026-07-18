import {
  ScheherazadeNew_400Regular,
  useFonts,
} from "@expo-google-fonts/scheherazade-new";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllSurahs } from "../constants/quranCurated";

const API_BASE = "https://api.alquran.cloud/v1/page";
const API_SURAH_BASE = "https://api.alquran.cloud/v1/surah";
const MIN_PAGE = 1;
const MAX_PAGE = 604;

const TAJWEED_COLORS = {
  ghunnah: "#c62828",
  ikhfa: "#2e7d32",
  qalqalah: "#1565c0",
  madd: "#b26a00",
  normal: "#111111",
};

const BISMILLAH = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

function toArabicDigits(value) {
  const digits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(value)
    .split("")
    .map((char) => (char >= "0" && char <= "9" ? digits[Number(char)] : char))
    .join("");
}

function tajweedTagToColor(tag) {
  if (tag === "m") return TAJWEED_COLORS.ghunnah;
  if (tag === "l") return TAJWEED_COLORS.ikhfa;
  if (tag === "p") return TAJWEED_COLORS.qalqalah;
  if (tag === "n") return TAJWEED_COLORS.madd;
  return TAJWEED_COLORS.normal;
}

function parseTajweedText(rawText) {
  const segments = [];
  let i = 0;

  const pushSegment = (text, color) => {
    if (!text) return;
    const last = segments[segments.length - 1];
    if (last && last.color === color) {
      last.text += text;
      return;
    }
    segments.push({ text, color });
  };

  while (i < rawText.length) {
    if (rawText[i] === "[") {
      const match = rawText.slice(i).match(/^\[([a-z])(?::\d+)?\[/i);
      if (match) {
        const code = match[1].toLowerCase();
        i += match[0].length;
        const end = rawText.indexOf("]", i);
        if (end !== -1) {
          const tokenText = rawText.slice(i, end);
          pushSegment(tokenText, tajweedTagToColor(code));
          i = end + 1;
          continue;
        }
      }
    }

    pushSegment(rawText[i], TAJWEED_COLORS.normal);
    i += 1;
  }

  return segments;
}

const AyahLine = React.memo(function AyahLine({
  ayah,
  isRukuStart,
  fontLoaded,
}) {
  const segments = useMemo(
    () => parseTajweedText(ayah.text || ""),
    [ayah.text],
  );

  return (
    <View style={{ position: "relative", paddingRight: 20, marginBottom: 4 }}>
      {isRukuStart && (
        <Text
          style={{
            position: "absolute",
            right: 0,
            top: 8,
            color: "#444",
            fontSize: 14,
            fontWeight: "700",
          }}
        >
          ع
        </Text>
      )}
      <Text
        style={{
          textAlign: "justify",
          writingDirection: "rtl",
          color: TAJWEED_COLORS.normal,
          fontSize: 22,
          lineHeight: 48,
          fontFamily: fontLoaded ? "ScheherazadeNew_400Regular" : undefined,
        }}
      >
        {segments.map((segment, idx) => (
          <Text key={`${ayah.number}-${idx}`} style={{ color: segment.color }}>
            {segment.text}
          </Text>
        ))}
        <Text style={{ color: TAJWEED_COLORS.normal }}>
          {` ﴾${toArabicDigits(ayah.numberInSurah)}﴿`}
        </Text>
      </Text>
    </View>
  );
});

export default function QuranPageReaderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const rawSurahParam = Array.isArray(params?.surah)
    ? params.surah[0]
    : params?.surah;
  const initialSurah = Number(rawSurahParam || 0);
  const [fontsLoaded] = useFonts({ ScheherazadeNew_400Regular });
  const [pageNumber, setPageNumber] = useState(1);
  const [readyToLoad, setReadyToLoad] = useState(!(initialSurah > 0));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageAyahs, setPageAyahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(
    initialSurah > 0 ? initialSurah : null,
  );

  const cacheRef = useRef({});

  const fetchTajweedPage = useCallback(async (page) => {
    const cached = cacheRef.current[page];
    if (cached) return cached;

    const response = await fetch(`${API_BASE}/${page}/quran-tajweed`);
    if (!response.ok) throw new Error("Failed to load Tajweed page.");

    const payload = await response.json();
    const ayahs = payload?.data?.ayahs ?? [];
    if (!Array.isArray(ayahs)) throw new Error("Unexpected Tajweed response.");

    cacheRef.current[page] = ayahs;
    return ayahs;
  }, []);

  const loadPage = useCallback(
    async (page) => {
      setLoading(true);
      setError("");

      try {
        const ayahs = await fetchTajweedPage(page);
        setPageAyahs(ayahs);

        // Warm adjacent pages to reduce wait time on Next/Previous.
        const neighbors = [page - 1, page + 1].filter(
          (candidate) => candidate >= MIN_PAGE && candidate <= MAX_PAGE,
        );
        for (const neighbor of neighbors) {
          if (!cacheRef.current[neighbor]) {
            void fetchTajweedPage(neighbor).catch(() => {});
          }
        }
      } catch (err) {
        setError(err?.message || "Could not load this page.");
        setPageAyahs([]);
      } finally {
        setLoading(false);
      }
    },
    [fetchTajweedPage],
  );

  const findFirstPageForSurah = useCallback(async (surahNumber) => {
    const response = await fetch(
      `${API_SURAH_BASE}/${surahNumber}/quran-tajweed`,
    );
    if (!response.ok) {
      throw new Error("Could not load selected surah quickly.");
    }
    const payload = await response.json();
    const firstAyah = payload?.data?.ayahs?.[0];
    const page = Number(firstAyah?.page || 1);
    return Math.max(MIN_PAGE, Math.min(MAX_PAGE, page));
  }, []);

  useEffect(() => {
    if (!initialSurah || Number.isNaN(initialSurah)) {
      setSelectedSurah(null);
      setReadyToLoad(true);
      return;
    }

    let active = true;

    const jumpToSurahStart = async () => {
      setReadyToLoad(false);
      setLoading(true);
      setError("");
      try {
        const firstPage = await findFirstPageForSurah(initialSurah);
        if (!active) return;
        setSelectedSurah(initialSurah);
        setPageNumber(firstPage);
      } catch (err) {
        if (!active) return;
        setError(err?.message || "Could not locate selected surah.");
      } finally {
        if (active) setReadyToLoad(true);
      }
    };

    void jumpToSurahStart();
    return () => {
      active = false;
    };
  }, [findFirstPageForSurah, initialSurah]);

  useEffect(() => {
    if (!readyToLoad) return;
    void loadPage(pageNumber);
  }, [pageNumber, loadPage, readyToLoad]);

  const surahNames = useMemo(() => {
    const map = {};
    getAllSurahs().forEach((item) => {
      map[item.number] = item.nameArabic;
    });
    return map;
  }, []);

  const visibleAyahs = useMemo(() => {
    if (!selectedSurah) return pageAyahs;
    return pageAyahs.filter(
      (ayah) => Number(ayah?.surah?.number) === Number(selectedSurah),
    );
  }, [pageAyahs, selectedSurah]);

  const headerInfo = useMemo(() => {
    const first = visibleAyahs[0];
    return {
      surah: selectedSurah
        ? surahNames[selectedSurah] || first?.surah?.name || ""
        : first?.surah?.name || "",
      juz: first?.juz || 1,
    };
  }, [visibleAyahs, selectedSurah, surahNames]);

  const renderedBlocks = useMemo(() => {
    const blocks = [];
    let activeSurah = null;
    let activeRuku = null;

    for (const ayah of visibleAyahs) {
      const surahNo = Number(ayah?.surah?.number);
      const surahChanged = surahNo !== activeSurah;

      if (surahChanged) {
        activeSurah = surahNo;
        activeRuku = null;

        blocks.push({
          type: "surah-header",
          key: `surah-${surahNo}`,
          title: ayah?.surah?.name,
        });

        if (surahNo !== 9) {
          blocks.push({
            type: "bismillah",
            key: `bismillah-${surahNo}`,
          });
        }
      }

      const isRukuStart = Number(ayah?.ruku) !== Number(activeRuku);
      activeRuku = ayah?.ruku;

      blocks.push({
        type: "ayah",
        key: `ayah-${ayah.number}`,
        ayah,
        isRukuStart,
      });
    }

    return blocks;
  }, [visibleAyahs]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#ffffff" }}>
      <View
        className="flex-row items-center justify-between px-4 py-3 border-b"
        style={{ borderBottomColor: "#e5e7eb", backgroundColor: "#ffffff" }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center border"
          style={{ borderColor: "#d1d5db", backgroundColor: "#ffffff" }}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={22}
            color="#111827"
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 14, fontWeight: "700", color: "#111827" }}>
          Tajweed Mushaf
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {!readyToLoad || loading || !fontsLoaded ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#111827" />
          <Text style={{ marginTop: 10, color: "#6b7280", fontSize: 13 }}>
            Loading Tajweed page...
          </Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-8">
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={38}
            color="#dc2626"
          />
          <Text
            style={{
              marginTop: 12,
              color: "#111827",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            Could not load page {toArabicDigits(pageNumber)}
          </Text>
          <Text
            style={{
              marginTop: 8,
              color: "#6b7280",
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            {error}
          </Text>
          <TouchableOpacity
            onPress={() => void loadPage(pageNumber)}
            className="mt-5 rounded-full px-6 py-3"
            style={{ backgroundColor: "#111827" }}
          >
            <Text style={{ color: "#ffffff", fontWeight: "700", fontSize: 12 }}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={renderedBlocks}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          initialNumToRender={16}
          maxToRenderPerBatch={20}
          windowSize={7}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingTop: 12,
            paddingBottom: 140,
          }}
          ListHeaderComponent={
            <View
              style={{
                width: "100%",
                maxWidth: 420,
                alignSelf: "center",
                backgroundColor: "#ffffff",
                borderColor: "#d8d8d8",
                borderWidth: 1,
                borderRadius: 6,
                paddingHorizontal: 12,
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{ color: "#333", fontSize: 12, fontWeight: "600" }}
                >
                  الجزء {toArabicDigits(headerInfo.juz)}
                </Text>
                <Text
                  style={{ color: "#111", fontSize: 12, fontWeight: "700" }}
                >
                  {toArabicDigits(pageNumber)}
                </Text>
                <Text
                  style={{ color: "#333", fontSize: 12, fontWeight: "600" }}
                >
                  {headerInfo.surah}
                </Text>
              </View>
            </View>
          }
          renderItem={({ item: block }) => {
            if (block.type === "surah-header") {
              return (
                <View
                  style={{
                    width: "100%",
                    maxWidth: 420,
                    alignSelf: "center",
                    borderWidth: 1,
                    borderColor: "#b8b8b8",
                    borderRadius: 10,
                    paddingVertical: 8,
                    marginTop: 6,
                    marginBottom: 6,
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      color: "#111",
                      fontFamily: "ScheherazadeNew_400Regular",
                    }}
                  >
                    {block.title}
                  </Text>
                </View>
              );
            }

            if (block.type === "bismillah") {
              return (
                <Text
                  style={{
                    width: "100%",
                    maxWidth: 420,
                    alignSelf: "center",
                    textAlign: "center",
                    writingDirection: "rtl",
                    fontSize: 24,
                    lineHeight: 52,
                    color: "#111",
                    fontFamily: "ScheherazadeNew_400Regular",
                  }}
                >
                  {BISMILLAH}
                </Text>
              );
            }

            return (
              <View
                style={{ width: "100%", maxWidth: 420, alignSelf: "center" }}
              >
                <AyahLine
                  ayah={block.ayah}
                  isRukuStart={block.isRukuStart}
                  fontLoaded={fontsLoaded}
                />
              </View>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                width: "100%",
                maxWidth: 420,
                alignSelf: "center",
                marginTop: 10,
                backgroundColor: "#ffffff",
                borderWidth: 1,
                borderColor: "#e0e0e0",
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: "#6b7280",
                  textAlign: "center",
                  marginBottom: 4,
                }}
              >
                Tajweed Legend
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Text style={{ color: TAJWEED_COLORS.ghunnah, fontSize: 12 }}>
                  Ghunnah
                </Text>
                <Text style={{ color: TAJWEED_COLORS.ikhfa, fontSize: 12 }}>
                  Ikhfa / Idgham
                </Text>
                <Text style={{ color: TAJWEED_COLORS.qalqalah, fontSize: 12 }}>
                  Qalqalah
                </Text>
                <Text style={{ color: TAJWEED_COLORS.madd, fontSize: 12 }}>
                  Madd
                </Text>
                <Text style={{ color: TAJWEED_COLORS.normal, fontSize: 12 }}>
                  Normal
                </Text>
              </View>
            </View>
          }
        />
      )}

      <View className="absolute bottom-5 left-4 right-4 flex-row gap-3">
        <TouchableOpacity
          onPress={() => {
            setSelectedSurah(null);
            setPageNumber((prev) => Math.max(MIN_PAGE, prev - 1));
          }}
          disabled={pageNumber <= MIN_PAGE || loading}
          className="flex-1 rounded-full py-3 items-center"
          style={{
            backgroundColor:
              pageNumber <= MIN_PAGE || loading ? "#e5e7eb" : "#111827",
          }}
        >
          <Text
            style={{
              color: pageNumber <= MIN_PAGE || loading ? "#6b7280" : "#ffffff",
              fontWeight: "700",
              fontSize: 12,
            }}
          >
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedSurah(null);
            setPageNumber((prev) => Math.min(MAX_PAGE, prev + 1));
          }}
          disabled={pageNumber >= MAX_PAGE || loading}
          className="flex-1 rounded-full py-3 items-center"
          style={{
            backgroundColor:
              pageNumber >= MAX_PAGE || loading ? "#e5e7eb" : "#111827",
          }}
        >
          <Text
            style={{
              color: pageNumber >= MAX_PAGE || loading ? "#6b7280" : "#ffffff",
              fontWeight: "700",
              fontSize: 12,
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
