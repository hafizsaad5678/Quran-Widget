/**
 * StatsScreen - Shows user's reading streak and weekly progress
 * Uses real data from useAppStore
 */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BarChart from "../components/ui/BarChart";
import CircularProgress from "../components/ui/CircularProgress";
import GlassCard from "../components/ui/GlassCard";
import TopBar from "../components/ui/TopBar";
import { useTheme } from "../context/ThemeContext";
import { useAppStore } from "../store/useAppStore";

// Small stat card used in the grid
const StatCard = ({ icon, label, value, theme }) => (
  <View
    className="flex-1 rounded-[24px] p-5 border"
    style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}
  >
    <MaterialCommunityIcons name={icon} size={24} color={theme.accent} />
    <Text className="mt-3 text-2xl font-bold" style={{ color: theme.text }}>
      {value}
    </Text>
    <Text
      className="text-[10px] font-bold uppercase tracking-[1px] mt-1"
      style={{ color: theme.textSecondary }}
    >
      {label}
    </Text>
  </View>
);

export default function StatsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const getStreakStats = useAppStore((s) => s.getStreakStats);
  const history = useAppStore((s) => s.history);

  const stats = getStreakStats();

  // Build bar chart data from weekly read days
  const chartData = stats.weekly.map((d) => (d.read ? 100 : 0));
  const chartLabels = stats.weekly.map((d) => d.label.toUpperCase());

  // Days read this week
  const daysThisWeek = stats.weekly.filter((d) => d.read).length;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
      <TopBar
        title="My Journey"
        onLeftPress={() => router.back()}
        leftIcon="chevron-left"
      />

      <ScrollView
        className="px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="mt-6 mb-8">
          <Text
            className="text-[10px] font-bold uppercase tracking-[3px] mb-2"
            style={{ color: theme.textSecondary }}
          >
            Your Progress
          </Text>
          <Text
            className="text-3xl font-serif font-bold leading-tight"
            style={{ color: theme.text }}
          >
            Journey Stats
          </Text>
        </View>

        {/* Streak Cards */}
        <View className="flex-row gap-3 mb-4">
          <StatCard
            icon="fire"
            label="Current Streak"
            value={`${stats.current}d`}
            theme={theme}
          />
          <StatCard
            icon="trophy-outline"
            label="Best Streak"
            value={`${stats.best}d`}
            theme={theme}
          />
          <StatCard
            icon="book-open-variant"
            label="Total Read"
            value={history.length}
            theme={theme}
          />
        </View>

        {/* Weekly Bar Chart */}
        <GlassCard
          className="rounded-[32px] p-6 mb-4"
          style={{ backgroundColor: theme.cardBackground }}
        >
          <BarChart
            data={chartData}
            labels={chartLabels}
            title="This Week"
            target={`${daysThisWeek}/7 Days`}
          />
        </GlassCard>

        {/* Circular Progress */}
        <GlassCard
          className="rounded-[32px] p-8 items-center mb-6"
          style={{ backgroundColor: theme.cardBackground }}
        >
          <CircularProgress
            size={200}
            strokeWidth={16}
            progress={daysThisWeek / 7}
            label={`${daysThisWeek}/7`}
            sublabel="DAYS THIS WEEK"
          />
        </GlassCard>

        {/* Motivational Quote */}
        <View className="items-center px-4 mt-2">
          <Text
            className="text-base font-serif italic text-center leading-7"
            style={{ color: theme.textSecondary }}
          >
            &quot;The heart that remembers Allah will never be lonely.&quot;
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
