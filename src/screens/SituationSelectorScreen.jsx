import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/ui/TopBar";

const GuidanceCard = ({ title, desc, icon, buttonText, onPress, color }) => (
  <TouchableOpacity
    onPress={onPress}
    className="w-full rounded-[40px] p-8 mb-6 bg-white/5 border border-white/10"
    style={{ backgroundColor: color || "rgba(255,255,255,0.05)" }}
  >
    <View className="w-14 h-14 rounded-2xl bg-black/5 items-center justify-center mb-6">
      <MaterialCommunityIcons name={icon} size={28} color="#b0926a" />
    </View>
    <Text className="text-3xl font-serif font-bold text-sanctuary-text dark:text-sanctuary-text-dark mb-3">
      {title}
    </Text>
    <Text className="text-sm text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark leading-6 mb-8">
      {desc}
    </Text>

    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center ${buttonText === "Seek Calm" ? "bg-sanctuary-accent/60 self-start px-8 py-3 rounded-full" : ""}`}
    >
      <Text
        className={`text-xs font-bold uppercase tracking-widest ${buttonText === "Seek Calm" ? "text-white" : "text-sanctuary-accent"}`}
      >
        {buttonText || "Explore"} {buttonText === "Seek Calm" ? "→" : ">"}
      </Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

export default function SituationSelectorScreen() {
  const router = useRouter();

  const paths = [
    {
      key: "stress",
      title: "Stress",
      desc: "Find tranquility amidst the chaos of daily life with verses and reflections centered on patience and divine ease.",
      icon: "water",
      buttonText: "Seek Calm",
    },
    {
      key: "fear",
      title: "Fear",
      desc: "Courage through tawakkul when the unknown feels overwhelming.",
      icon: "shield-outline",
      buttonText: "Explore",
    },
    {
      key: "rizq",
      title: "Rizq",
      desc: "Abundance and sustenance. Trusting the Provider in times of need.",
      icon: "hand-coin-outline",
      buttonText: "Explore",
    },
    {
      key: "peace",
      title: "Peace",
      desc: "Inner stillness and spiritual contentment for the restless soul.",
      icon: "leaf",
      buttonText: "Explore",
    },
    {
      key: "motivation",
      title: "Motivation",
      desc: "Renewing your purpose and energy through divine wisdom.",
      icon: "lightning-bolt-outline",
      buttonText: "Explore",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-sanctuary-background dark:bg-sanctuary-background-dark">
      <TopBar />

      <ScrollView
        className="px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <View className="mt-8 mb-10 items-center">
          <Text className="text-[10px] font-bold uppercase tracking-[3px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
            Ayah Connect
          </Text>
          <Text className="mt-2 text-4xl font-serif font-bold text-sanctuary-text dark:text-sanctuary-text-dark text-center leading-tight">
            Instant Guidance
          </Text>
          <Text className="mt-4 text-sm text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark text-center leading-6 px-4">
            Choose how you feel right now and receive a focused ayah set,
            reflection prompt, and calming tools.
          </Text>
        </View>

        <View className="mb-8 flex-row gap-3">
          <TouchableOpacity
            className="flex-1 rounded-2xl border border-sanctuary-border/30 bg-white/60 p-4 dark:border-sanctuary-border-dark/30 dark:bg-white/5"
            onPress={() => router.push("/pause")}
          >
            <MaterialCommunityIcons
              name="meditation"
              size={20}
              color="#b0926a"
            />
            <Text className="mt-2 text-xs font-bold uppercase tracking-[1px] text-sanctuary-accent">
              Pause Mode
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 rounded-2xl border border-sanctuary-border/30 bg-white/60 p-4 dark:border-sanctuary-border-dark/30 dark:bg-white/5"
            onPress={() => router.push("/collections")}
          >
            <MaterialCommunityIcons
              name="book-open-variant"
              size={20}
              color="#b0926a"
            />
            <Text className="mt-2 text-xs font-bold uppercase tracking-[1px] text-sanctuary-accent">
              Collections
            </Text>
          </TouchableOpacity>
        </View>

        {paths.map((p) => (
          <GuidanceCard
            key={p.key}
            title={p.title}
            desc={p.desc}
            icon={p.icon}
            buttonText={p.buttonText}
            onPress={() => router.push(`/situation/${p.key}`)}
          />
        ))}

        <View className="mb-12 rounded-[32px] border border-sanctuary-border/30 bg-gradient-to-br from-[#f7ead8] to-[#f3e4cc] p-8 dark:border-sanctuary-border-dark/30 dark:bg-[#2a241d]">
          <Text className="text-[10px] font-bold uppercase tracking-[2px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
            Featured Journey
          </Text>
          <Text className="mt-3 text-2xl font-serif font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
            Morning Calm
          </Text>
          <Text className="mt-2 text-sm leading-6 text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
            Begin your day with patience-centered verses and short breathing
            reflections.
          </Text>
          <TouchableOpacity
            className="mt-5 self-start rounded-full bg-sanctuary-accent px-5 py-2"
            onPress={() => router.push("/situation/peace")}
          >
            <Text className="text-[10px] font-bold uppercase tracking-[1.8px] text-white">
              Start Now
            </Text>
          </TouchableOpacity>
        </View>

        {/* Curated list */}
        <View className="mb-12">
          <Text className="text-3xl font-serif font-bold text-sanctuary-text dark:text-sanctuary-text-dark text-center mb-8">
            Curated for Your Path
          </Text>
          <Text className="text-sm text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark text-center leading-6 mb-10 px-6">
            Every situation is met with specific verses from the Quran and
            authentic Supplications, providing a holistic sanctuary for your
            digital life.
          </Text>

          <View className="gap-4 px-4">
            {[
              "Thematic Quranic Verses",
              "Daily Azhkar & Dua",
              "Spiritual Journaling Prompts",
            ].map((item, idx) => (
              <View key={idx} className="flex-row items-center gap-4">
                <View className="w-6 h-6 rounded-full bg-sanctuary-accent items-center justify-center">
                  <MaterialCommunityIcons
                    name="check"
                    size={14}
                    color="white"
                  />
                </View>
                <Text className="text-sm font-bold text-sanctuary-text/80 dark:text-white/80">
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          className="bg-sanctuary-accent/50 self-center px-10 py-5 rounded-full flex-row items-center shadow-lg"
          onPress={() => router.push("/settings")}
        >
          <MaterialCommunityIcons
            name="cog-outline"
            size={20}
            color="#5C4033"
            className="mr-3"
          />
          <Text className="text-xs font-bold uppercase tracking-widest text-[#5C4033] ml-2">
            Personalize Your Situations
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
