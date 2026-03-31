import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlassCard from "../../components/ui/GlassCard";
import TopBar from "../../components/ui/TopBar";
import { useAyatLibrary } from "../../hooks/useAyatLibrary";

export default function ChallengeScreen() {
  const router = useRouter();
  const { favorites } = useAyatLibrary();

  const progress = useMemo(() => {
    const done = Math.min(3, favorites.length >= 3 ? 3 : favorites.length);
    return { done, total: 3, percent: Math.round((done / 3) * 100) };
  }, [favorites.length]);

  const tasks = [
    {
      id: "save-ayah",
      title: "Save 3 Ayahs",
      subtitle: "Collect meaningful verses for daily reflection.",
      done: progress.done >= 3,
      icon: "bookmark-check-outline",
    },
    {
      id: "pause",
      title: "Complete Pause Mode",
      subtitle: "Spend one uninterrupted minute with a single ayah.",
      done: false,
      icon: "meditation",
    },
    {
      id: "share",
      title: "Share With a Friend",
      subtitle: "Spread light by sharing one reflection today.",
      done: false,
      icon: "share-variant-outline",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#fff8f2] dark:bg-[#131313]">
      <TopBar title="Daily Challenge" onLeftPress={() => router.back()} leftIcon="chevron-left" />

      <ScrollView className="px-5" contentContainerStyle={{ paddingBottom: 24 }}>
        <GlassCard className="mt-3 rounded-3xl p-5">
          <Text className="text-xs uppercase tracking-[2px] text-[#7c7769] dark:text-white/50">
            Daily Reflections
          </Text>
          <Text className="mt-2 text-2xl font-semibold text-[#231a08] dark:text-white">
            {progress.done} / {progress.total} completed
          </Text>
          <View className="mt-4 h-2 overflow-hidden rounded-full bg-[#eadfcf] dark:bg-white/10">
            <View className="h-full bg-[#b0926a]" style={{ width: `${progress.percent}%` }} />
          </View>
          <Text className="mt-2 text-xs text-[#7c7769] dark:text-white/60">
            Keep building consistency in your spiritual rhythm.
          </Text>
        </GlassCard>

        <View className="mt-4 gap-3">
          {tasks.map((task) => (
            <GlassCard key={task.id} className="rounded-3xl p-4">
              <View className="flex-row items-start">
                <View
                  className={`h-10 w-10 items-center justify-center rounded-full ${
                    task.done ? "bg-[#b0926a]" : "bg-[#fff2e0] dark:bg-white/10"
                  }`}
                >
                  <MaterialCommunityIcons
                    name={task.done ? "check" : task.icon}
                    size={18}
                    color={task.done ? "#fff" : "#574a1e"}
                  />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-sm font-semibold text-[#231a08] dark:text-white">
                    {task.title}
                  </Text>
                  <Text className="mt-1 text-xs leading-5 text-[#7c7769] dark:text-white/60">
                    {task.subtitle}
                  </Text>
                </View>
              </View>
            </GlassCard>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => router.push("/situations")}
          className="mt-5 rounded-full bg-[#574a1e] py-3"
        >
          <Text className="text-center text-sm font-semibold text-white">Continue Reflection</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
