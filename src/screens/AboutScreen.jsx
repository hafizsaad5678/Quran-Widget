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
    icon: "cellphone-widgets",
    title: "Widget Integration",
    description: "Keep Quranic reminders directly on your home screen.",
  },
  {
    icon: "cloud-sync-outline",
    title: "Supabase Sync",
    description: "Favorites, notes, and streak data can sync to cloud backend.",
  },
  {
    icon: "lightbulb-on-outline",
    title: "Situation Guidance",
    description: "Contextual ayat and MCQ prompts for real-life moments.",
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
