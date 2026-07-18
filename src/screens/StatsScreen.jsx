/**
 * StatsScreen — My Journey / Progress
 */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BarChart from "../components/ui/BarChart";
import CircularProgress from "../components/ui/CircularProgress";
import GlassCard from "../components/ui/GlassCard";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";
import { useTheme } from "../context/ThemeContext";
import { useAppStore } from "../store/useAppStore";

const StatCard = ({ icon, label, value, theme, accent }) => (
  <View
    className="flex-1 rounded-[22px] p-4 border items-center"
    style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}
  >
    <View
      className="w-10 h-10 rounded-full items-center justify-center mb-2"
      style={{ backgroundColor: theme.softAccent }}
    >
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={accent || theme.accent}
      />
    </View>
    <Text className="text-xl font-bold" style={{ color: theme.text }}>
      {value}
    </Text>
    <Text
      className="text-[9px] font-bold uppercase tracking-[1px] mt-0.5 text-center"
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
  const favorites = useAppStore((s) => s.favorites);
  const lastSession = useAppStore((s) => s.lastSession);
  const appUsageSecondsByDay = useAppStore((s) => s.appUsageSecondsByDay || {});

  const stats = getStreakStats();
  const chartData = stats.weekly.map((d) => (d.read ? 100 : 0));
  const chartLabels = stats.weekly.map((d) => d.label.toUpperCase());

  const gamification = useMemo(() => {
    const DAILY_GOAL_SECONDS = 5 * 60;
    const WEEKLY_TARGET_DAYS = 5;
    const usageMap = appUsageSecondsByDay || {};
    const today = new Date().toISOString().slice(0, 10);
    const todaySeconds = Number(usageMap[today] || 0);

    const weeklyCompletedDays = stats.weekly.filter((d) => {
      const usage = Number(usageMap[d.key] || 0);
      return d.read || usage >= DAILY_GOAL_SECONDS;
    }).length;

    const weeklyProgress = Math.min(
      1,
      weeklyCompletedDays / WEEKLY_TARGET_DAYS,
    );
    const points =
      (stats.current || 0) * 3 +
      weeklyCompletedDays * 4 +
      Math.min(10, Math.floor(todaySeconds / 30));

    let tier = {
      name: "Starter",
      icon: "seed-outline",
      color: "#10b981",
      nextAt: 20,
    };
    if (points >= 20)
      tier = {
        name: "Bronze",
        icon: "shield-sun-outline",
        color: "#cd7f32",
        nextAt: 40,
      };
    if (points >= 40)
      tier = {
        name: "Silver",
        icon: "shield-star-outline",
        color: "#9ca3af",
        nextAt: 70,
      };
    if (points >= 70)
      tier = {
        name: "Gold",
        icon: "medal-outline",
        color: "#d4af37",
        nextAt: 110,
      };
    if (points >= 110)
      tier = {
        name: "Diamond",
        icon: "diamond-stone",
        color: "#60a5fa",
        nextAt: null,
      };

    return {
      dailyMinutes: Math.floor(todaySeconds / 60),
      dailyGoalMinutes: 5,
      dailyProgress: Math.min(1, todaySeconds / DAILY_GOAL_SECONDS),
      weeklyCompletedDays,
      weeklyTargetDays: WEEKLY_TARGET_DAYS,
      weeklyProgress,
      points,
      tier,
    };
  }, [appUsageSecondsByDay, stats]);

  return (
    <SwipeBackContainer>
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
      >
        <TopBar
          title="My Journey"
          leftIcon="chevron-left"
          onLeftPress={() => router.back()}
        />

        <ScrollView
          className="px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Header */}
          <View className="mt-6 mb-5">
            <Text
              className="text-[10px] font-bold uppercase tracking-[3px] mb-1"
              style={{ color: theme.textSecondary }}
            >
              Your Progress
            </Text>
            <Text
              className="text-3xl font-serif font-bold"
              style={{ color: theme.text }}
            >
              Journey Stats
            </Text>
          </View>

          {/* Streak highlight */}
          <GlassCard
            className="rounded-[28px] p-6 mb-4 flex-row items-center"
            style={{ backgroundColor: theme.cardBackground }}
          >
            <View
              className="w-16 h-16 rounded-full items-center justify-center mr-5"
              style={{ backgroundColor: theme.softAccent }}
            >
              <MaterialCommunityIcons
                name="fire"
                size={32}
                color={theme.accent}
              />
            </View>
            <View className="flex-1">
              <Text
                className="text-4xl font-bold"
                style={{ color: theme.text }}
              >
                {stats.current}
                <Text
                  className="text-lg"
                  style={{ color: theme.textSecondary }}
                >
                  {" "}
                  days
                </Text>
              </Text>
              <Text
                className="text-sm mt-0.5"
                style={{ color: theme.textSecondary }}
              >
                Current streak · Best: {stats.best} days
              </Text>
            </View>
            {stats.current > 0 && (
              <View
                className="rounded-full px-3 py-1"
                style={{ backgroundColor: theme.softAccent }}
              >
                <Text
                  className="text-[10px] font-bold"
                  style={{ color: theme.accent }}
                >
                  🔥 Active
                </Text>
              </View>
            )}
          </GlassCard>

          {/* Stat grid */}
          <View className="flex-row gap-3 mb-4">
            <StatCard
              icon="trophy-outline"
              label="Best Streak"
              value={`${stats.best}d`}
              theme={theme}
            />
            <StatCard
              icon="heart-outline"
              label="Favorites"
              value={favorites.length}
              theme={theme}
            />
            <StatCard
              icon="book-open-variant"
              label="Total Read"
              value={history.length}
              theme={theme}
            />
            <StatCard
              icon="calendar-check"
              label="This Week"
              value={`${gamification.weeklyCompletedDays}/7`}
              theme={theme}
            />
          </View>

          {/* Reward / Badge */}
          <GlassCard
            className="rounded-[28px] p-5 mb-4"
            style={{ backgroundColor: theme.cardBackground }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View
                  className="w-12 h-12 rounded-full items-center justify-center"
                  style={{ backgroundColor: theme.softAccent }}
                >
                  <MaterialCommunityIcons
                    name={gamification.tier.icon}
                    size={24}
                    color={gamification.tier.color}
                  />
                </View>
                <View className="ml-3">
                  <Text
                    className="text-sm font-bold"
                    style={{ color: theme.text }}
                  >
                    {gamification.tier.name} Badge
                  </Text>
                  <Text
                    className="text-xs"
                    style={{ color: theme.textSecondary }}
                  >
                    XP {gamification.points}
                  </Text>
                </View>
              </View>
              {!!gamification.tier.nextAt && (
                <Text
                  className="text-[11px] font-bold"
                  style={{ color: theme.accent }}
                >
                  Next {gamification.tier.nextAt}
                </Text>
              )}
            </View>
          </GlassCard>

          {/* Last reading session */}
          {lastSession && (
            <GlassCard
              className="rounded-[28px] p-5 mb-4 flex-row items-center"
              style={{ backgroundColor: theme.cardBackground }}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: theme.softAccent }}
              >
                <MaterialCommunityIcons
                  name="timer-check-outline"
                  size={24}
                  color={theme.accent}
                />
              </View>
              <View className="flex-1">
                <Text
                  className="text-sm font-bold"
                  style={{ color: theme.text }}
                >
                  Last Reading Session
                </Text>
                <Text
                  className="text-xs mt-0.5"
                  style={{ color: theme.textSecondary }}
                >
                  {lastSession.durationMinutes} min
                  {lastSession.surahName ? ` · ${lastSession.surahName}` : ""}
                  {" · "}
                  {lastSession.date}
                </Text>
              </View>
              <View
                className="rounded-full px-3 py-1"
                style={{ backgroundColor: theme.softAccent }}
              >
                <Text
                  className="text-[10px] font-bold"
                  style={{ color: theme.accent }}
                >
                  ✓ Done
                </Text>
              </View>
            </GlassCard>
          )}

          {/* Weekly bar chart */}
          <GlassCard
            className="rounded-[28px] p-5 mb-4"
            style={{ backgroundColor: theme.cardBackground }}
          >
            <Text
              className="text-sm font-bold mb-4"
              style={{ color: theme.text }}
            >
              This Week
            </Text>
            <BarChart
              data={chartData}
              labels={chartLabels}
              title=""
              target={`${gamification.weeklyCompletedDays}/7 Days`}
            />
          </GlassCard>

          {/* Daily goal */}
          <GlassCard
            className="rounded-[28px] p-5 mb-4"
            style={{ backgroundColor: theme.cardBackground }}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-bold" style={{ color: theme.text }}>
                Daily Goal (5 min)
              </Text>
              <Text
                className="text-xs font-bold"
                style={{ color: theme.accent }}
              >
                {gamification.dailyMinutes}/{gamification.dailyGoalMinutes} min
              </Text>
            </View>
            <View
              className="h-2 w-full overflow-hidden rounded-full mt-3"
              style={{ backgroundColor: theme.softAccent }}
            >
              <View
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(100, gamification.dailyProgress * 100)}%`,
                  backgroundColor: theme.accent,
                }}
              />
            </View>
          </GlassCard>

          {/* Weekly target */}
          <GlassCard
            className="rounded-[28px] p-6 items-center mb-4"
            style={{ backgroundColor: theme.cardBackground }}
          >
            <Text
              className="text-sm font-bold mb-4 self-start"
              style={{ color: theme.text }}
            >
              Weekly Target
            </Text>
            <CircularProgress
              size={180}
              strokeWidth={14}
              progress={gamification.weeklyProgress}
              label={`${gamification.weeklyCompletedDays}/${gamification.weeklyTargetDays}`}
              sublabel="GOAL DAYS"
            />
          </GlassCard>

          {/* Recent history */}
          {history.length > 0 && (
            <View className="mb-4">
              <Text
                className="text-sm font-bold mb-3"
                style={{ color: theme.text }}
              >
                Recently Read
              </Text>
              {history.slice(0, 5).map((item, idx) => (
                <TouchableOpacity
                  key={`${item.id}-${idx}`}
                  onPress={() =>
                    router.push({
                      pathname: "/ayah",
                      params: {
                        surah: item.surahNumber,
                        ayah: item.ayahNumber,
                      },
                    })
                  }
                  className="flex-row items-center rounded-2xl border p-4 mb-2"
                  style={{
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.border,
                  }}
                >
                  <View
                    className="w-9 h-9 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: theme.softAccent }}
                  >
                    <Text
                      className="text-[9px] font-bold"
                      style={{ color: theme.accent }}
                    >
                      {item.surahNumber}:{item.ayahNumber}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text
                      className="text-sm font-bold"
                      style={{ color: theme.text }}
                    >
                      {item.surahName}
                    </Text>
                    <Text
                      className="text-xs mt-0.5"
                      numberOfLines={1}
                      style={{ color: theme.textSecondary }}
                    >
                      {item.translation}
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={18}
                    color={theme.textSecondary}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Quote */}
          <View className="items-center px-4 py-4">
            <Text
              className="text-sm font-serif italic text-center leading-7"
              style={{ color: theme.textSecondary }}
            >
              &quot;The heart that remembers Allah will never be lonely.&quot;
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
