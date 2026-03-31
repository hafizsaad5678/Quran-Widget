import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BarChart from "../../components/ui/BarChart";
import CircularProgress from "../../components/ui/CircularProgress";
import GlassCard from "../../components/ui/GlassCard";
import TopBar from "../../components/ui/TopBar";

const weeklyData = [20, 45, 60, 75, 85, 100, 30]; // Matches the growth pattern in Image 1
const labels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function StatsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-sanctuary-background dark:bg-sanctuary-background-dark">
      <TopBar
        title="Digital Sanctuary"
        onLeftPress={() => router.back()}
        leftIcon="chevron-left"
      />

      <ScrollView
        className="px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="mt-8 mb-10">
          <Text className="text-[10px] font-bold text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark uppercase tracking-[3px] mb-2">
            My Journey
          </Text>
          <Text className="text-4xl font-serif font-bold text-sanctuary-text dark:text-sanctuary-text-dark leading-tight">
            Journey Progress
          </Text>
          <Text className="mt-2 text-sm text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark leading-6">
            A quiet reflection on your path of knowledge and devotion.
          </Text>
        </View>

        {/* Daily Ayahs Card */}
        <GlassCard className="rounded-[40px] p-8 border-none bg-white/60 dark:bg-white/5 shadow-sm mb-6">
          <BarChart
            data={weeklyData}
            labels={labels}
            title="Daily Ayahs"
            target="12 Ayahs"
          />
        </GlassCard>

        {/* Circular Progress Section */}
        <View className="items-center justify-center mt-2">
          <GlassCard className="rounded-[40px] p-10 items-center justify-center border-none bg-white/60 dark:bg-white/5 shadow-sm w-full">
            <CircularProgress
              size={220}
              strokeWidth={18}
              progress={5 / 7}
              label="5/7"
              sublabel="DAYS"
            />
          </GlassCard>
        </View>

        {/* Contextual Quote */}
        <View className="mt-10 items-center">
          <Text className="text-xl font-serif italic text-sanctuary-text/80 text-center leading-relaxed">
            &quot;The heart that remembers Allah will never be lonely.&quot;
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
