import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

/**
 * SurahHeader — displays surah name (Arabic + English) and ayah count.
 * Reusable across SurahReaderScreen, SurahListScreen, etc.
 */
export default function SurahHeader({ meta, ayahCount }) {
  const { theme } = useTheme();
  if (!meta) return null;

  return (
    <View
      className="items-center py-6 px-6 border-b"
      style={{ borderBottomColor: theme.border }}
    >
      {/* Arabic name */}
      <Text
        style={{ fontSize: 28, color: theme.accent, fontWeight: "700", marginBottom: 4 }}
      >
        {meta.nameArabic}
      </Text>

      {/* English transliteration */}
      <Text
        style={{ fontSize: 18, fontWeight: "600", color: theme.text, marginBottom: 6 }}
      >
        {meta.name}
      </Text>

      {/* Meta row */}
      <View className="flex-row items-center gap-3 mt-1">
        <View
          className="rounded-full px-3 py-1"
          style={{ backgroundColor: theme.softAccent }}
        >
          <Text style={{ fontSize: 11, fontWeight: "700", color: theme.accent }}>
            {ayahCount ?? meta.totalVerses} Ayahs
          </Text>
        </View>
        <View
          className="rounded-full px-3 py-1"
          style={{ backgroundColor: theme.softAccent }}
        >
          <Text style={{ fontSize: 11, fontWeight: "700", color: theme.accent }}>
            {meta.revelationType === "Meccan" ? "Makkiyah" : "Madaniyah"}
          </Text>
        </View>
        <View
          className="rounded-full px-3 py-1"
          style={{ backgroundColor: theme.softAccent }}
        >
          <Text style={{ fontSize: 11, fontWeight: "700", color: theme.accent }}>
            Surah {meta.number}
          </Text>
        </View>
      </View>

      {/* Bismillah — shown for all surahs except At-Tawbah (9) and Al-Fatiha (1) */}
      {meta.number !== 9 && meta.number !== 1 && (
        <Text
          style={{
            fontSize: 22,
            color: theme.textSecondary,
            marginTop: 16,
            letterSpacing: 1,
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </Text>
      )}
    </View>
  );
}
