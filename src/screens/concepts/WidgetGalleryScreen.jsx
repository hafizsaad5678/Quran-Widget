import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/ui/TopBar";
import WidgetPreview from "../../components/ui/WidgetPreview";

const Selector = ({ label, value }) => (
  <View className="flex-1">
    <Text className="text-[10px] font-bold uppercase tracking-[2px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark mb-2">
      {label}
    </Text>
    <TouchableOpacity className="flex-row items-center justify-between bg-white/60 dark:bg-white/5 p-4 rounded-xl">
      <Text className="text-sm font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
        {value}
      </Text>
      <MaterialCommunityIcons name="chevron-down" size={16} color="#b0926a" />
    </TouchableOpacity>
  </View>
);

export default function WidgetGalleryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-sanctuary-background dark:bg-sanctuary-background-dark">
      <TopBar
        title="Widget Gallery"
        onLeftPress={() => router.back()}
        leftIcon="chevron-left"
      />

      <ScrollView
        className="px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Selectors */}
        <View className="flex-row gap-4 mt-8 mb-10">
          <Selector label="Refresh Rate" value="Every 3 Hours" />
          <Selector label="Category" value="Daily Verses" />
        </View>

        {/* Small Form Factor */}
        <View className="mb-10">
          <Text className="text-[10px] font-bold uppercase tracking-[3px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark mb-6 border-t border-sanctuary-border/10 pt-6">
            Small Form Factor
          </Text>
          <View className="flex-row justify-between">
            <WidgetPreview
              type="small"
              data={{
                isDark: false,
                icon: "sparkles",
                title: "ٱلسَّلَٰمُ",
                subtitle: "Peace",
              }}
            />
            <WidgetPreview
              type="small"
              data={{
                isDark: true,
                icon: "book-open-variant",
                title: "ٱلْقُدُّوسُ",
                subtitle: "The Pure",
              }}
            />
          </View>
        </View>

        {/* Medium Dynamic */}
        <View className="mb-10">
          <Text className="text-[10px] font-bold uppercase tracking-[3px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark mb-6 border-t border-sanctuary-border/10 pt-6">
            Medium Dynamic
          </Text>
          <WidgetPreview
            type="medium"
            data={{
              tag: "Surah Al-Baqarah",
              title: "فَٱذْكُرُونِيٓ أَذْكُرْكُمْ",
              translation: '"So remember Me; I will remember you..." (2:152)',
            }}
          />
        </View>

        {/* Reflections Card */}
        <View className="mb-10">
          <WidgetPreview
            type="reflection"
            data={{
              title: "Morning Remembrance",
              subtitle: "A moment of silence before the day begins.",
            }}
          />
        </View>

        {/* Interactive Journey */}
        <View className="mb-10">
          <Text className="text-[10px] font-bold uppercase tracking-[3px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark mb-6 border-t border-sanctuary-border/10 pt-6">
            Interactive Journey
          </Text>
          <WidgetPreview
            type="interactive"
            data={{
              goal: "30 Days of Mindfulness",
              currentDay: 18,
              totalDays: 30,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
