/**
 * SituationSelectorScreen — "Instant Guidance"
 * Lets users pick how they feel right now (stressed, fearful, etc.)
 * and get a focused set of Quranic ayahs + reflections for that situation.
 */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";
import { useTheme } from "../context/ThemeContext";

const PATHS = [
  {
    key: "stress",
    title: "Stress & Anxiety",
    desc: "Find tranquility amidst chaos with verses on patience and divine ease.",
    icon: "water",
  },
  {
    key: "fear",
    title: "Fear & Worry",
    desc: "Courage through tawakkul when the unknown feels overwhelming.",
    icon: "shield-outline",
  },
  {
    key: "rizq",
    title: "Rizq & Provision",
    desc: "Trusting the Provider in times of financial or material need.",
    icon: "hand-coin-outline",
  },
  {
    key: "peace",
    title: "Seeking Peace",
    desc: "Inner stillness and spiritual contentment for the restless soul.",
    icon: "leaf",
  },
  {
    key: "motivation",
    title: "Motivation",
    desc: "Renewing your purpose and energy through divine wisdom.",
    icon: "lightning-bolt-outline",
  },
];

const GuidanceCard = ({ item, onPress, theme }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.75}
    className="w-full rounded-[28px] p-6 mb-4 flex-row items-center border"
    style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}
  >
    <View
      className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
      style={{ backgroundColor: theme.softAccent }}
    >
      <MaterialCommunityIcons name={item.icon} size={24} color={theme.accent} />
    </View>
    <View className="flex-1">
      <Text className="text-base font-bold" style={{ color: theme.text }}>
        {item.title}
      </Text>
      <Text
        className="text-xs mt-1 leading-5"
        numberOfLines={2}
        style={{ color: theme.textSecondary }}
      >
        {item.desc}
      </Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={20} color={theme.textSecondary} />
  </TouchableOpacity>
);

export default function SituationSelectorScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SwipeBackContainer>
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
      <TopBar title="Instant Guidance" />

      <ScrollView
        className="px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header */}
        <View className="mb-6 mt-4">
          <Text
            className="text-[10px] font-bold uppercase tracking-[3px] mb-2"
            style={{ color: theme.textSecondary }}
          >
            How are you feeling?
          </Text>
          <Text
            className="text-2xl font-serif font-bold leading-tight"
            style={{ color: theme.text }}
          >
            Choose your situation and receive a focused set of ayahs and reflections.
          </Text>
        </View>

        {/* Quick nav */}
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity
            className="flex-1 rounded-2xl border p-4"
            style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}
            onPress={() => router.push("/stats")}
          >
            <MaterialCommunityIcons name="chart-box-outline" size={20} color={theme.accent} />
            <Text className="mt-2 text-xs font-bold uppercase tracking-[1px]" style={{ color: theme.accent }}>
              My Stats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 rounded-2xl border p-4"
            style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}
            onPress={() => router.push("/collections")}
          >
            <MaterialCommunityIcons name="bookmark-multiple-outline" size={20} color={theme.accent} />
            <Text className="mt-2 text-xs font-bold uppercase tracking-[1px]" style={{ color: theme.accent }}>
              Collections
            </Text>
          </TouchableOpacity>
        </View>

        {/* Featured journey — Morning Calm */}
        <View
          className="mb-6 rounded-[28px] border p-6"
          style={{ backgroundColor: theme.softAccent, borderColor: theme.border }}
        >
          <Text
            className="text-[10px] font-bold uppercase tracking-[2px] mb-2"
            style={{ color: theme.textSecondary }}
          >
            Featured Journey
          </Text>
          <Text className="text-xl font-serif font-bold mb-2" style={{ color: theme.text }}>
            Morning Calm
          </Text>
          <Text className="text-sm leading-6 mb-3" style={{ color: theme.textSecondary }}>
            Begin your day with peace-centered verses and short breathing reflections.
          </Text>
          <View className="gap-2 mb-4">
            {["Open with Surah Al-Fatiha", "Read 3 verses on peace & tawakkul", "Reflect for 2 minutes in silence"].map((step, i) => (
              <View key={i} className="flex-row items-center gap-3">
                <View className="w-5 h-5 rounded-full items-center justify-center" style={{ backgroundColor: theme.accent }}>
                  <Text className="text-[9px] font-bold text-white">{i + 1}</Text>
                </View>
                <Text className="text-xs" style={{ color: theme.textSecondary }}>{step}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            className="self-start rounded-full px-5 py-2"
            style={{ backgroundColor: theme.accent }}
            onPress={() => router.push("/reading-session")}
          >
            <Text className="text-[10px] font-bold uppercase tracking-[1.8px] text-white">
              Start Now
            </Text>
          </TouchableOpacity>
        </View>

        {/* Situation cards */}
        {PATHS.map((p) => (
          <GuidanceCard
            key={p.key}
            item={p}
            theme={theme}
            onPress={() => router.push(`/situation/${p.key}`)}
          />
        ))}

        {/* Motivation ayah */}
        <View
          className="mb-6 rounded-[28px] border p-6"
          style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}
        >
          <Text
            className="text-[10px] font-bold uppercase tracking-[2px] mb-3"
            style={{ color: theme.textSecondary }}
          >
            Verse of Motivation
          </Text>
          <Text className="text-base font-serif italic leading-7 mb-2" style={{ color: theme.text }}>
            "Verily, with hardship comes ease."
          </Text>
          <Text className="text-xs" style={{ color: theme.textSecondary }}>
            Surah Ash-Sharh 94:6
          </Text>
          <TouchableOpacity
            className="mt-4 self-start rounded-full px-4 py-2 border"
            style={{ borderColor: theme.border }}
            onPress={() => router.push("/situation/motivation")}
          >
            <Text className="text-[10px] font-bold uppercase tracking-wider" style={{ color: theme.accent }}>
              Explore Motivation →
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    </SwipeBackContainer>
  );
}
