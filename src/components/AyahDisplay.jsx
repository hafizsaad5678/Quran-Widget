import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Share, Text, TouchableOpacity, View } from "react-native";

/**
 * AyahDisplay - Shows Arabic text, translation, and reference
 * Props:
 *   ayah       - ayah object
 *   className  - extra class names
 *   showShare  - show share button (default false)
 *   showTranslation - show translation block (default true)
 *   fontLoaded - Arabic font availability flag
 */
export const AyahDisplay = ({
  ayah,
  className,
  showShare = false,
  showTranslation = true,
  fontLoaded = false,
}) => {
  const handleShare = async () => {
    if (!ayah) return;
    try {
      await Share.share({
        message: `"${ayah.translation}"\n\n— ${ayah.surahName || ayah.surah} ${ayah.surahNumber}:${ayah.ayahNumber}`,
      });
    } catch (_) {}
  };

  if (!ayah) return null;

  return (
    <View className={`items-center px-4 ${className}`}>
      {/* Arabic Text */}
      <Text
        className="text-center mb-10"
        style={{
          fontSize: 38,
          lineHeight: 64,
          color: "#f5f6f7",
          fontFamily: fontLoaded ? "ScheherazadeNew_400Regular" : undefined,
        }}
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
      {showTranslation && (
        <Text
          className="mt-6 text-center text-xl font-serif italic text-sanctuary-text/80 dark:text-sanctuary-text-dark/80 mb-4"
          style={{
            lineHeight: 36,
            paddingTop: 6,
            includeFontPadding: true,
          }}
        >
          &quot;{ayah.translation || "Translation loading..."}&quot;
        </Text>
      )}

      {/* Reference + optional Share button */}
      <View className="flex-row items-center gap-3 mt-1">
        <Text className="text-[10px] font-bold uppercase tracking-[4px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
          {ayah.surahName || ayah.surah} —{" "}
          {ayah.surahNumber || ayah.numberInSurah}:
          {ayah.ayahNumber || ayah.numberInSurah}
        </Text>

        {showShare && (
          <TouchableOpacity
            onPress={handleShare}
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
