import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useShareAyah } from "../hooks/useShareAyah";

/**
 * AyahDisplay - Shows Arabic text, translation, and reference
 * Props:
 *   ayah       - ayah object
 *   className  - extra class names
 *   showShare  - show share button (default false)
 */
export const AyahDisplay = ({ ayah, className, showShare = false }) => {
  const { shareAyah } = useShareAyah();

  if (!ayah) return null;

  return (
    <View className={`items-center px-4 ${className}`}>
      {/* Arabic Text */}
      <Text
        className="text-center text-4xl leading-[60px] text-sanctuary-text dark:text-sanctuary-text-dark font-bold mb-10"
        dir="rtl"
      >
        {ayah.arabic || ayah.text}
      </Text>

      {/* Ornament */}
      <View className="mb-10">
        <MaterialCommunityIcons
          name="white-balance-sunny"
          size={24}
          color="#b0926a"
          style={{ opacity: 0.3 }}
        />
      </View>

      {/* Translation */}
      <Text className="text-center text-xl font-serif italic text-sanctuary-text/80 dark:text-sanctuary-text-dark/80 leading-8 mb-4">
        &quot;{ayah.translation || "Translation loading..."}&quot;
      </Text>

      {/* Reference + optional Share button */}
      <View className="flex-row items-center gap-3 mt-1">
        <Text className="text-[10px] font-bold uppercase tracking-[4px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
          {ayah.surahName || ayah.surah} —{" "}
          {ayah.surahNumber || ayah.numberInSurah}:
          {ayah.ayahNumber || ayah.numberInSurah}
        </Text>

        {showShare && (
          <TouchableOpacity
            onPress={() => shareAyah(ayah)}
            className="w-8 h-8 rounded-full bg-sanctuary-accent/10 items-center justify-center"
            accessibilityLabel="Share this ayah"
          >
            <MaterialCommunityIcons
              name="share-variant-outline"
              size={16}
              color="#b0926a"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
