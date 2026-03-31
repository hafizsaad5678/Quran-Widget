import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlassCard from "../components/ui/GlassCard";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";

const quotes = [
  {
    id: 1,
    text: "The best of you are those who are best to their families.",
    author: "Prophet Muhammad (PBUH)",
  },
  {
    id: 3,
    text: "Do not despair of the mercy of Allah.",
    author: "Quran 39:53",
  },
  { id: 4, text: "Verily, with hardship comes ease.", author: "Quran 94:5" },
  {
    id: 6,
    text: "Seek knowledge from the cradle to the grave.",
    author: "Prophet Muhammad (PBUH)",
  },
];

export default function QuotesScreen() {
  const router = useRouter();

  return (
    <SwipeBackContainer>
      <SafeAreaView className="flex-1 bg-sanctuary-background dark:bg-sanctuary-background-dark">
        <TopBar
          title="Divine Wisdom"
          onLeftPress={() => router.back()}
          leftIcon="chevron-left"
        />

        <ScrollView
          className="px-5"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="mb-4 mt-4 text-[10px] font-bold uppercase tracking-[2px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark px-1">
            Inspiring Reflections
          </Text>
          {quotes.map((quote) => (
            <GlassCard
              key={quote.id}
              className="mb-5 rounded-[32px] p-8 border-sanctuary-border/30 dark:border-sanctuary-border-dark/30 shadow-sm"
            >
              <View className="w-10 h-10 rounded-full bg-sanctuary-accent/10 items-center justify-center mb-4">
                <MaterialCommunityIcons
                  name="format-quote-open"
                  size={20}
                  color="#b0926a"
                />
              </View>
              <Text className="text-lg italic font-serif leading-8 text-sanctuary-text dark:text-sanctuary-text-dark">
                {quote.text}
              </Text>
              <View className="mt-6 flex-row items-center">
                <View className="h-px flex-1 bg-sanctuary-border/20" />
                <Text className="mx-4 text-[10px] font-bold uppercase tracking-[2px] text-sanctuary-accent">
                  {quote.author}
                </Text>
                <View className="h-px flex-1 bg-sanctuary-border/20" />
              </View>
            </GlassCard>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
