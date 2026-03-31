import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AyahDisplay } from "../../components/AyahDisplay";
import GlassCard from "../../components/ui/GlassCard";
import TopBar from "../../components/ui/TopBar";
import { useDailyAyah } from "../../hooks/useDailyAyah";

export default function HomeGlowScreen() {
  const router = useRouter();
  const { ayah } = useDailyAyah();

  return (
    <SafeAreaView className="flex-1 bg-[#131313]">
      <TopBar title="Home Glow" onLeftPress={() => router.back()} leftIcon="chevron-left" />

      <ScrollView className="px-5" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="mt-2 rounded-3xl border border-[#2f2f2f] bg-[#1a1a1a] p-5">
          <Text className="text-xs uppercase tracking-[2px] text-[#a69076]">Golden Glow Experience</Text>
          <Text className="mt-2 text-sm text-[#d1c4b7]">
            A darker immersive variant from app.md focused on deep reading.
          </Text>
        </View>

        <GlassCard className="mt-4 rounded-3xl border-[#3c3122] bg-[#1f1a12]/80 p-5">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-xs uppercase tracking-[2px] text-[#a69076]">Today&apos;s Verse</Text>
            <MaterialCommunityIcons name="star-four-points" size={18} color="#e3c196" />
          </View>
          <AyahDisplay ayah={ayah} />
        </GlassCard>

        <View className="mt-4 flex-row gap-3">
          <GlassCard className="flex-1 rounded-3xl border-[#3c3122] bg-[#1f1a12]/80 p-4">
            <Text className="text-xs uppercase tracking-[2px] text-[#a69076]">Journey</Text>
            <Text className="mt-2 text-2xl font-bold text-[#e3c196]">312</Text>
            <Text className="text-xs text-[#b5a391]">Day streak</Text>
          </GlassCard>
          <GlassCard className="flex-1 rounded-3xl border-[#3c3122] bg-[#1f1a12]/80 p-4">
            <Text className="text-xs uppercase tracking-[2px] text-[#a69076]">Collections</Text>
            <Text className="mt-2 text-2xl font-bold text-[#e3c196]">8</Text>
            <Text className="text-xs text-[#b5a391]">Saved themes</Text>
          </GlassCard>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/pause")}
          className="mt-5 rounded-full border border-[#4d3d2d] bg-[#2f2418] py-3"
        >
          <Text className="text-center text-sm font-semibold text-[#f5e1a7]">Enter Pause Mode</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
