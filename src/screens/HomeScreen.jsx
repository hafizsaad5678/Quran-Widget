import NavCard from "../components/ui/NavCard";
import InfoRow from "../components/ui/InfoRow";
import { STREAK_ENABLED } from "../constants/features";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Animated,
  PanResponder,
  RefreshControl,
  ScrollView,
  Text,
  Platform,
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
import { getGregorianText, getHijriDate } from "../utils/hijri";

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { ayah, nextAyah, prevAyah } = useDailyAyah({
    autoRotateEveryHour: true,
  });
  const { favorites, toggleFavorite } = useAyatLibrary();
  const collections = useAppStore((s) => s.collections);
  const lastSession = useAppStore((s) => s.lastSession);
  const lastRead = useAppStore((s) => s.lastRead);
  const hijri = useMemo(() => getHijriDate(), []);
  const gregorian = useMemo(() => getGregorianText(), []);
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
    // Load persisted local stats after the first render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  // Swipe left/right on hero card to change ayah
  const [swipePan] = useState(() => new Animated.Value(0));
  const swipeResponder = useMemo(
    () => PanResponder.create({
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
    [nextAyah, prevAyah, swipePan],
  );

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <TopBar
        title="Connect with Quran"
        onLeftPress={() => router.push("/about")}
        leftIcon="menu"
        rightIcon="cog-outline"
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
        <View className="mt-6 mb-6 px-2 flex-row items-center justify-between">
          <View className="flex-1">
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
            <Text
              style={{
                marginTop: 4,
                fontSize: 12,
                fontWeight: "700",
                color: theme.accent,
              }}
            >
              {hijri.text}
              <Text style={{ color: theme.textSecondary, fontWeight: "400" }}>
                {`  ·  ${gregorian}`}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/qibla")}
            accessibilityRole="button"
            accessibilityLabel="Qibla compass"
            className="h-11 w-11 items-center justify-center rounded-full border"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.cardBackground,
            }}
          >
            <MaterialCommunityIcons
              name="compass-outline"
              size={22}
              color={theme.accent}
            />
          </TouchableOpacity>
        </View>

        {/* Hero Ayah Card — swipe or tap arrows to change ayah */}
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={prevAyah}
            accessibilityRole="button"
            accessibilityLabel="Previous ayah"
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
                  // Platform Arabic font (system default).
                  fontFamily: Platform.select({
                    ios: "Geeza Pro",
                    default: undefined,
                  }),
                  fontSize: fontSettings.arabicSize || 31,
                  // Arabic diacritics need tall lines or the top gets cut off.
                  lineHeight:
                    (fontSettings.arabicSize || 31) *
                    Math.max(fontSettings.lineSpacing || 1.9, 1.9),
                  paddingTop: 6,
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
            accessibilityRole="button"
            accessibilityLabel="Next ayah"
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

        {/* Quick links */}
        <View className="flex-row gap-3 mt-4">
          <NavCard
            theme={theme}
            icon="book-open-variant"
            label="Daily Verse"
            subtitle={
              STREAK_ENABLED ? `${streak.current} Day Streak` : "Today's Ayah"
            }
            onPress={() => router.push("/ayah")}
          />
          <NavCard
            theme={theme}
            icon="bookmark-multiple-outline"
            label="Saved"
            subtitle={`${collections.length} Collections`}
            onPress={() => router.push("/collections")}
          />
        </View>

        <View className="flex-row gap-3 mt-3">
          <NavCard
            theme={theme}
            icon="book-open-page-variant-outline"
            label="Full Quran"
            subtitle="114 Surahs"
            onPress={() => router.push("/quran-offline")}
          />
          <NavCard
            theme={theme}
            icon="view-grid-plus-outline"
            label="Widget"
            subtitle="Customize"
            onPress={() => router.push("/widget-settings")}
          />
        </View>

        {/* Continue reading: only shown once the user has read something */}
        {lastRead ? (
          <View className="mt-4">
            <InfoRow
              theme={theme}
              icon="book-open-page-variant-outline"
              title="Continue reading"
              subtitle={
                lastRead.type === "page"
                  ? `${lastRead.surahName || "Quran"} · Page ${lastRead.page}`
                  : `${lastRead.surahName || "Quran"}${lastRead.ayah ? ` · Ayah ${lastRead.ayah}` : ""}`
              }
              onPress={() =>
                lastRead.type === "page"
                  ? router.push({
                      pathname: "/quran-page-reader",
                      params: { page: lastRead.page },
                    })
                  : router.push({
                      pathname: `/surah/${lastRead.surah}`,
                      params: lastRead.ayah ? { ayah: lastRead.ayah } : {},
                    })
              }
            />
          </View>
        ) : null}

        {/* Journey Progress */}
          {STREAK_ENABLED && (
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
          )}

          {/* Recently Read */}
        <View className="mt-6 mb-2 px-2 flex-row items-center justify-between">
          <Text
            style={{
              fontSize: 13,
              fontWeight: "700",
              letterSpacing: 1,
              color: theme.accent,
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
              <InfoRow
                key={`${item.id}-${idx}`}
                theme={theme}
                icon="book-open-variant"
                title={item.surahName}
                subtitle={`Ayah ${item.ayahNumber}`}
                onPress={() =>
                  router.push({
                    pathname: "/ayah",
                    params: { surah: item.surahNumber, ayah: item.ayahNumber },
                  })
                }
              />
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

      </ScrollView>
    </SafeAreaView>
  );
}
