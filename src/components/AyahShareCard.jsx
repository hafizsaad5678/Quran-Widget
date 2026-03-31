import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const AyahShareCard = React.forwardRef(({ ayah }, ref) => {
  if (!ayah) return null;

  return (
    <View
      ref={ref}
      collapsable={false}
      className="w-[350px] p-10 rounded-[40px] bg-sanctuary-background dark:bg-sanctuary-background-dark border border-sanctuary-border/20 items-center justify-center"
    >
      <View className="items-center justify-center w-full">
        {/* Quote Icon */}
        <View className="w-10 h-10 rounded-full bg-sanctuary-accent/10 items-center justify-center mb-6">
          <MaterialCommunityIcons
            name="format-quote-open"
            size={20}
            color="#b0926a"
          />
        </View>

        <Text className="text-center text-2xl leading-[42px] font-serif text-sanctuary-accent mb-6">
          {ayah.arabic || ayah.text}
        </Text>

        <View className="h-[1px] w-[30%] bg-sanctuary-border/30 my-6" />

        <Text className="text-center text-base italic font-serif leading-6 text-sanctuary-text dark:text-sanctuary-text-dark">
          {ayah.translation}
        </Text>

        <View className="mt-8 pt-6 border-t border-sanctuary-border/20 w-full items-center">
          <Text className="text-[10px] font-bold uppercase tracking-[2px] text-sanctuary-accent">
            {ayah.surahName || ayah.surah} •{" "}
            {ayah.ayahNumber || ayah.numberInSurah}
          </Text>
          <Text className="text-[8px] font-bold uppercase tracking-[1px] text-sanctuary-text-muted mt-2">
            Quran Daily Ayah
          </Text>
        </View>
      </View>
    </View>
  );
});

AyahShareCard.displayName = "AyahShareCard";

export default AyahShareCard;
