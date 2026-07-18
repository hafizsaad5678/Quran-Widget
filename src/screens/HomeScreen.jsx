import {
  ScheherazadeNew_400Regular,
  useFonts,
} from "@expo-google-fonts/scheherazade-new";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  PanResponder,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FavoriteButton from "../components/FavoriteButton";
import GlassCard from "../components/ui/GlassCard";
import TopBar from "../components/ui/TopBar";
import { useTheme } from "../context/ThemeContext";
import { useAyatLibrary } from "../hooks/useAyatLibrary";
import { useDailyAyah } from "../hooks/useDailyAyah";
import { getHistory, getStreakStats } from "../services/userService";
import { useAppStore } from "../store/useAppStore";

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [fontLoaded] = useFonts({ ScheherazadeNew_400Regular });
  const { ayah, nextAyah, prevAyah } = useDailyAyah({
    autoRotateEveryHour: true,
  });
  const { favorites, toggleFavorite } = useAyatLibrary();
  const collections = useAppStore((s) => s.collections);
  const lastSession = useAppStore((s) => s.lastSession);
  const appUsageSecondsByDay = useAppStore((s) => s.appUsageSecondsByDay);
  // Get font settings from store for home page display
  const fontSettings = useAppStore((s) => s.settings.widgetFontSettings || {
    arabicSize: 31,
    translationSize: 14,
    lineSpacing: 1.25,
  });

  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState({ current: 0, best: 0, weekly: [] });
  const [refreshing, setRefreshing] = useState(false);

  // Load history + streak on mount and on pull-to-refresh
  const loadData = useCallback(async () => {
    const [hist, strk] = await Promise.all([getHistory(), getStreakStats()]);
    setHistory((hist || []).slice(0, 4));
    setStreak(strk || { current: 0, best: 0, weekly: [] });
  }, []);

  const smartGoals = useMemo(() => {
    const DAILY_GOAL_SECONDS = 5 * 60;
    const WEEKLY_TARGET_DAYS = 5;
    const today = new Date().toISOString().slice(0, 10);
    const usageMap = appUsageSecondsByDay || {};
    const todaySeconds = Number(usageMap[today] || 0);

    const weeklyCompletedDays = (streak.weekly || []).filter((day) => {
      const daySeconds = Number(usageMap[day.key] || 0);
      return Boolean(day.read) || daySeconds >= DAILY_GOAL_SECONDS;
    }).length;

    const weeklyProgress = Math.min(
      1,
      weeklyCompletedDays / WEEKLY_TARGET_DAYS,
    );
    const points =
      (streak.current || 0) * 3 +
      weeklyCompletedDays * 4 +
      Math.min(10, Math.floor(todaySeconds / 30));

    let badge = {
      id: "starter",
      label: "Starter",
      icon: "seed-outline",
      color: "#10b981",
      nextAt: 20,
    };
    if (points >= 20)
      badge = {
        id: "bronze",
        label: "Bronze",
        icon: "shield-sun-outline",
        color: "#cd7f32",
        nextAt: 40,
      };
    if (points >= 40)
      badge = {
        id: "silver",
        label: "Silver",
        icon: "shield-star-outline",
        color: "#9ca3af",
        nextAt: 70,
      };
    if (points >= 70)
      badge = {
        id: "gold",
        label: "Gold",
        icon: "medal-outline",
        color: "#d4af37",
        nextAt: 110,
      };
    if (points >= 110)
      badge = {
        id: "diamond",
        label: "Diamond",
        icon: "diamond-stone",
        color: "#60a5fa",
        nextAt: null,
      };

    return {
      points,
      daily: {
        seconds: todaySeconds,
        goalSeconds: DAILY_GOAL_SECONDS,
        done: todaySeconds >= DAILY_GOAL_SECONDS,
        progress: Math.min(1, todaySeconds / DAILY_GOAL_SECONDS),
      },
      weekly: {
        targetDays: WEEKLY_TARGET_DAYS,
        completedDays: weeklyCompletedDays,
        progress: weeklyProgress,
      },
      badge,
    };
  }, [appUsageSecondsByDay, streak]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  // Swipe left/right on hero card to change ayah
  const swipePan = useRef(new Animated.Value(0)).current;
  const swipeResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 15 && Math.abs(g.dy) < 40,
      onPanResponderMove: (_, g) => swipePan.setValue(g.dx),
      onPanResponderRelease: (_, g) => {
        if (g.dx < -60) nextAyah();
        else if (g.dx > 60) prevAyah();
        Animated.spring(swipePan, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <TopBar
        title="Connect with Quran"
        onLeftPress={() => router.push("/about")}
        leftIcon="menu"
        rightIcon="account"
        onRightPress={() => router.push("/settings")}
      />

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#b0926a"
          />
        }
      >
        <View className="mt-6 mb-6 px-2">
          <Text
            style={{
              fontSize: 20,
              fontStyle: "italic",
              fontFamily: "serif",
              color: theme.text,
            }}
          >
            Today for you
          </Text>
        </View>

        {/* Hero Ayah Card — swipe or tap arrows to change ayah */}
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={prevAyah}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: theme.softAccent }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={22}
              color={theme.accent}
            />
          </TouchableOpacity>

          <Animated.View
            style={{ flex: 1, transform: [{ translateX: swipePan }] }}
          >
            <GlassCard
              className="rounded-[32px] border p-4"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.cardBackground,
              }}
              {...swipeResponder.panHandlers}
            >
              <View className="mb-3 flex-row items-center justify-between">
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    letterSpacing: 2,
                    color: theme.accent,
                    opacity: 0.75,
                  }}
                >
                  {ayah?.surahName} {ayah?.surahNumber}:{ayah?.ayahNumber}
                </Text>
                <FavoriteButton
                  isFavorite={favorites.includes(ayah?.id)}
                  onPress={() => toggleFavorite(ayah?.id)}
                  className="bg-white/40 dark:bg-white/5"
                />
              </View>

              {/* Arabic - Uses font settings from widget config */}
              <Text
                className="mb-3 text-right"
                style={{
                  color: theme.text,
                  fontFamily: fontLoaded
                    ? "ScheherazadeNew_400Regular"
                    : undefined,
                  fontSize: fontSettings.arabicSize || 31,
                  lineHeight: (fontSettings.arabicSize || 31) * (fontSettings.lineSpacing || 1.75),
                }}
                numberOfLines={3}
              >
                {ayah?.arabic || ayah?.text}
              </Text>

              {/* Translation - Uses font settings from widget config */}
              <Text
                className="font-serif italic"
                style={{ 
                  color: theme.textSecondary,
                  fontSize: fontSettings.translationSize || 14,
                  lineHeight: (fontSettings.translationSize || 14) * 1.5,
                }}
                numberOfLines={3}
              >
                &quot;{ayah?.translation}&quot;
              </Text>
            </GlassCard>
          </Animated.View>

          <TouchableOpacity
            onPress={nextAyah}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: theme.softAccent }}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color={theme.accent}
            />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View className="flex-row gap-3 mt-4">
          <TouchableOpacity
            className="flex-1 rounded-[24px] p-6 border"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            }}
            onPress={() => router.push("/ayah")}
          >
            <MaterialCommunityIcons
              name="book-open-variant"
              size={24}
              color={theme.accent}
            />
            <Text
              style={{
                marginTop: 16,
                fontSize: 10,
                fontWeight: "700",
                letterSpacing: 1,
                color: theme.accent,
                opacity: 0.75,
              }}
            >
              Daily Verse
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontSize: 18,
                fontWeight: "700",
                color: theme.text,
              }}
            >
              {streak.current} Day Streak
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 rounded-[24px] p-6 border"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            }}
            onPress={() => router.push("/collections")}
          >
            <MaterialCommunityIcons
              name="bookmark-multiple-outline"
              size={24}
              color={theme.accent}
            />
            <Text
              style={{
                marginTop: 16,
                fontSize: 10,
                fontWeight: "700",
                letterSpacing: 1,
                color: theme.accent,
                opacity: 0.75,
              }}
            >
              Collections
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontSize: 18,
                fontWeight: "700",
                color: theme.text,
              }}
            >
              {collections.length} Saved
            </Text>
          </TouchableOpacity>
        </View>

        {/* Journey Progress */}
        <View
          className="mt-4 rounded-[24px] border p-6"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.cardBackground,
          }}
        >
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  letterSpacing: 1,
                  color: theme.accent,
                  opacity: 0.75,
                }}
              >
                Your Journey
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.textSecondary,
                  marginTop: 2,
                }}
              >
                {streak.current} Day Spiritual Streak
              </Text>
            </View>
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: theme.softAccent }}
            >
              <MaterialCommunityIcons
                name="trending-up"
                size={20}
                color={theme.accent}
              />
            </View>
          </View>

          {/* Last session badge */}
          {lastSession && (
            <View
              className="flex-row items-center gap-2 mb-4 rounded-2xl px-4 py-2.5"
              style={{ backgroundColor: theme.softAccent }}
            >
              <MaterialCommunityIcons
                name="timer-check-outline"
                size={16}
                color={theme.accent}
              />
              <Text
                style={{ fontSize: 12, fontWeight: "700", color: theme.text }}
              >
                Last session: {lastSession.durationMinutes} min
                {lastSession.surahName ? ` · ${lastSession.surahName}` : ""}
              </Text>
            </View>
          )}

          {!!smartGoals && (
            <>
              <View
                className="mb-3 rounded-2xl px-4 py-3 border"
                style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.border,
                }}
              >
                <View className="flex-row items-center justify-between">
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      color: theme.text,
                    }}
                  >
                    Daily Goal
                  </Text>
                  <View
                    className="rounded-full px-2 py-1"
                    style={{ backgroundColor: theme.softAccent }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: theme.accent,
                      }}
                    >
                      {smartGoals.daily.done ? "Done" : "In Progress"}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 11,
                    color: theme.textSecondary,
                  }}
                >
                  {Math.floor(smartGoals.daily.seconds / 60)} min /{" "}
                  {Math.floor(smartGoals.daily.goalSeconds / 60)} min app time
                  today
                </Text>

                <View
                  className="mt-2 h-2 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: theme.softAccent }}
                >
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, smartGoals.daily.progress * 100)}%`,
                      backgroundColor: theme.accent,
                    }}
                  />
                </View>
              </View>

              <View
                className="mb-4 rounded-2xl px-4 py-3 border"
                style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.border,
                }}
              >
                <View className="flex-row items-center justify-between">
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      color: theme.text,
                    }}
                  >
                    Weekly Target
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "700",
                      color: theme.accent,
                    }}
                  >
                    {smartGoals.weekly.completedDays}/
                    {smartGoals.weekly.targetDays} days
                  </Text>
                </View>
                <View
                  className="mt-2 h-2 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: theme.softAccent }}
                >
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, smartGoals.weekly.progress * 100)}%`,
                      backgroundColor: theme.accent,
                    }}
                  />
                </View>

                <View
                  className="mt-3 flex-row items-center justify-between rounded-xl px-3 py-2"
                  style={{ backgroundColor: theme.softAccent }}
                >
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name={smartGoals.badge.icon}
                      size={18}
                      color={smartGoals.badge.color}
                    />
                    <Text
                      style={{
                        marginLeft: 6,
                        fontSize: 11,
                        fontWeight: "700",
                        color: theme.text,
                      }}
                    >
                      {smartGoals.badge.label} Badge
                    </Text>
                  </View>
                  <Text style={{ fontSize: 10, color: theme.textSecondary }}>
                    XP {smartGoals.points}
                  </Text>
                </View>
              </View>
            </>
          )}

          <View className="flex-row justify-between mb-3">
            {(streak.weekly || []).map((day) => (
              <View key={day.key} className="items-center gap-1">
                <View
                  className="w-7 h-7 rounded-full items-center justify-center"
                  style={{
                    backgroundColor: day.read ? theme.accent : theme.softAccent,
                  }}
                >
                  {day.read && (
                    <MaterialCommunityIcons
                      name="check"
                      size={14}
                      color="#fff"
                    />
                  )}
                </View>
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: "700",
                    color: theme.textSecondary,
                  }}
                >
                  {day.label}
                </Text>
              </View>
            ))}
          </View>

          <View
            className="h-2 w-full overflow-hidden rounded-full"
            style={{ backgroundColor: theme.softAccent }}
          >
            <View
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, ((streak.current || 0) / 7) * 100)}%`,
                backgroundColor: theme.accent,
              }}
            />
          </View>
          <Text
            style={{
              marginTop: 8,
              textAlign: "right",
              fontSize: 10,
              fontWeight: "700",
              color: theme.accent,
              opacity: 0.75,
            }}
          >
            {streak.current || 0}/7 DAYS THIS WEEK
          </Text>
        </View>

        {/* Recently Read */}
        <View className="mt-6 mb-2 px-2 flex-row items-center justify-between">
          <Text
            style={{
              fontSize: 13,
              fontWeight: "700",
              letterSpacing: 1,
              color: theme.text,
            }}
          >
            Recently Read
          </Text>
          <TouchableOpacity onPress={() => router.push("/stats")}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: theme.accent,
                opacity: 0.75,
              }}
            >
              View Stats
            </Text>
          </TouchableOpacity>
        </View>

        <View className="gap-2">
          {history.length ? (
            history.map((item, idx) => (
              <TouchableOpacity
                key={`${item.id}-${idx}`}
                onPress={() =>
                  router.push({
                    pathname: "/ayah",
                    params: { surah: item.surahNumber, ayah: item.ayahNumber },
                  })
                }
                className="flex-row items-center rounded-2xl border p-4"
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.cardBackground,
                }}
              >
                <View
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: theme.softAccent }}
                >
                  <MaterialCommunityIcons
                    name="book-open-variant"
                    size={18}
                    color={theme.accent}
                  />
                </View>
                <View className="ml-4 flex-1">
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      color: theme.text,
                    }}
                  >
                    {item.surahName}
                  </Text>
                  <Text style={{ fontSize: 12, color: theme.textSecondary }}>
                    Ayah {item.ayahNumber}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: theme.textSecondary,
                paddingVertical: 16,
              }}
            >
              Your spiritual journey starts here.
            </Text>
          )}
        </View>

        {/* Quran Reader entry */}
        <TouchableOpacity
          className="mt-4 overflow-hidden rounded-[28px] border p-5"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.cardBackground,
          }}
          onPress={() => router.push("/quran-offline")}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  letterSpacing: 1.5,
                  color: theme.accent,
                  opacity: 0.75,
                }}
              >
                Full Quran
              </Text>
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 13,
                  color: theme.textSecondary,
                }}
              >
                Read any of the 114 Surahs offline
              </Text>
            </View>
            <View
              className="h-12 w-12 items-center justify-center rounded-2xl"
              style={{ backgroundColor: theme.softAccent }}
            >
              <MaterialCommunityIcons
                name="book-open-page-variant-outline"
                size={24}
                color={theme.accent}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* Widget Settings */}
        <TouchableOpacity
          className="mt-4 mb-3 overflow-hidden rounded-[28px] border p-5"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.cardBackground,
          }}
          onPress={() => router.push("/widget-settings")}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  letterSpacing: 1.5,
                  color: theme.accent,
                  opacity: 0.75,
                }}
              >
                Widget Settings
              </Text>
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 13,
                  color: theme.textSecondary,
                }}
              >
                Read any of the 114 Surahs offline
              </Text>
            </View>
            <View
              className="h-12 w-12 items-center justify-center rounded-2xl"
              style={{ backgroundColor: theme.softAccent }}
            >
              <MaterialCommunityIcons
                name="view-grid-plus-outline"
                size={24}
                color={theme.accent}
              />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
