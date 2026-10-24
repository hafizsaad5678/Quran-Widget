import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlassCard from "../components/ui/GlassCard";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";

const features = [
  {
    icon: "calendar-check",
    title: "Daily Inspiration",
    description: "A new ayah every day to ground your reflections.",
  },
  {
    icon: "book-open-page-variant-outline",
    title: "The Full Quran, Offline",
    description:
      "All 114 surahs, 10 translations, and a tajweed-coloured Mushaf, with no internet needed.",
  },
  {
    icon: "headphones",
    title: "Recitation",
    description:
      "Listen to Mishary Alafasy, and download surahs to listen offline.",
  },
  {
    icon: "lightbulb-on-outline",
    title: "Situation Guidance",
    description:
      "Ayahs and reflections for moments of patience, anger, stress, gratitude, and sadness.",
  },
  {
    icon: "cellphone",
    title: "Widget Integration",
    description: "Keep Quranic reminders directly on your home screen.",
  },
  {
    icon: "shield-lock-outline",
    title: "Private by Design",
    description:
      "No account needed. Favorites, notes, and history stay on your device.",
  },
];

const CREDITS = [
  {
    title: "Quran text & translations",
    detail:
      "Uthmani text from The Noble Qur'an Encyclopedia (quranenc.com). Translations and transliteration from Tanzil.net and quranenc.com: English (Saheeh International), Urdu (Abul A'la Maududi), Bengali (Muhiuddin Khan), Turkish (Diyanet), Indonesian (Indonesian Ministry of Islamic Affairs), French (Muhammad Hamidullah), Spanish (Muhammad Isa Garcia), Russian (Elmir Kuliev), Swedish (Knut Bernstrom), Chinese (Muhammad Makin). Packaged by quran-json (Risan Bagja Pradana), licensed CC BY-SA 4.0.",
  },
  {
    title: "Tajweed text",
    detail:
      "react-native-quran-tajweed (MIT). Tajweed data derived from the Quran.com API (text_uthmani_tajweed).",
  },
  {
    title: "Mushaf pages, juz & ruku data",
    detail: "quran-meta by Quran Center (MIT).",
  },
  {
    title: "Recitation",
    detail:
      "Mishary Rashid Alafasy, streamed from the Islamic Network CDN (cdn.islamic.network).",
  },
  {
    title: "Fonts",
    detail:
      "Scheherazade New and Amiri, licensed under the SIL Open Font License 1.1.",
  },
];

export default function AboutScreen() {
  const router = useRouter();

  return (
    <SwipeBackContainer>
      <SafeAreaView className="flex-1 bg-sanctuary-background dark:bg-sanctuary-background-dark">
        <TopBar
          title="Our Vision"
          onLeftPress={() => router.back()}
          leftIcon="chevron-left"
        />

        <ScrollView
          className="px-5"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center py-10">
            <View className="h-24 w-24 items-center justify-center rounded-[32px] bg-sanctuary-accent shadow-xl shadow-sanctuary-accent/40">
              <MaterialCommunityIcons name="mosque" size={48} color="#fff" />
            </View>
            <Text className="mt-6 text-2xl font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
              Ayah Connect
            </Text>
            <Text className="mt-1 text-xs italic font-serif text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark tracking-[2px] uppercase">
              Version 1.0.0
            </Text>
          </View>

          <GlassCard className="rounded-[32px] p-8 border-sanctuary-border/30 dark:border-sanctuary-border-dark/30 shadow-sm mb-8">
            <Text className="text-[10px] font-bold uppercase tracking-[2.5px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark mb-4 text-center">
              Mission Statement
            </Text>
            <Text className="text-base italic font-serif leading-7 text-sanctuary-text/80 dark:text-sanctuary-text-dark/80 text-center">
              &quot;We believe in creating a serene digital space for your daily
              spiritual connection. A sanctuary where the Divine Word guides
              your heart through the trials and triumphs of modern life.&quot;
            </Text>
          </GlassCard>

          <Text className="mb-4 mt-2 text-[10px] font-bold uppercase tracking-[2px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark px-1">
            Pillars of Ayah Connect
          </Text>

          {features.map((item) => (
            <GlassCard
              key={item.title}
              className="mb-4 rounded-[28px] p-5 border-sanctuary-border/20 dark:border-sanctuary-border-dark/20"
            >
              <View className="flex-row items-center">
                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-sanctuary-accent/10">
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={22}
                    color="#b0926a"
                  />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-sm font-bold text-sanctuary-text dark:text-sanctuary-text-dark uppercase tracking-[1px]">
                    {item.title}
                  </Text>
                  <Text className="mt-1 text-xs leading-5 text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
                    {item.description}
                  </Text>
                </View>
              </View>
            </GlassCard>
          ))}

          <Text className="mb-4 mt-8 text-[10px] font-bold uppercase tracking-[2px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark px-1">
            Credits &amp; Licenses
          </Text>

          <GlassCard className="mb-4 rounded-[28px] p-5 border-sanctuary-border/20 dark:border-sanctuary-border-dark/20">
            {CREDITS.map((item, idx) => (
              <View key={item.title} className={idx === 0 ? "" : "mt-5"}>
                <Text className="text-xs font-bold text-sanctuary-text dark:text-sanctuary-text-dark uppercase tracking-[1px]">
                  {item.title}
                </Text>
                <Text className="mt-1 text-xs leading-5 text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
                  {item.detail}
                </Text>
              </View>
            ))}
          </GlassCard>

          <View className="mt-10 items-center justify-center pb-10 border-t border-sanctuary-border/10 pt-10">
            <View className="flex-row items-center mb-2">
              <MaterialCommunityIcons
                name="heart-flash"
                size={20}
                color="#b0926a"
              />
              <Text className="ml-2 text-xs font-bold text-sanctuary-accent uppercase tracking-[1.5px]">
                Made for the Ummah
              </Text>
            </View>
            <Text className="text-[10px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark text-center uppercase tracking-[1px]">
              May this project be a source of peace for you.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
