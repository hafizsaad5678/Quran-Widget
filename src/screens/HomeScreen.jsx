import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Modal,
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
import { WidgetSettingsSheet } from "../components/ui/WidgetPreview";
import { useTheme } from "../context/ThemeContext";
import { useAyatLibrary } from "../hooks/useAyatLibrary";
import { useDailyAyah } from "../hooks/useDailyAyah";
import {
  getHistory,
  getStreakStats,
  getWidgetFontSettings,
  getWidgetLayoutSettings,
  getWidgetStyleName,
  saveWidgetFontSettings,
  saveWidgetLayoutSettings,
  saveWidgetStyleName,
} from "../services/userService";
import { setWidgetStyle, WIDGET_STYLES } from "../services/widgetProvider";
import { useAppStore } from "../store/useAppStore";

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { ayah, nextAyah, prevAyah } = useDailyAyah();
  const { favorites, toggleFavorite } = useAyatLibrary();
  const collections = useAppStore((s) => s.collections);
  const lastSession = useAppStore((s) => s.lastSession);

  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState({ current: 0, best: 0, weekly: [] });
  const [refreshing, setRefreshing] = useState(false);
  const [showWidgetSettings, setShowWidgetSettings] = useState(false);
  const [savingWidget, setSavingWidget] = useState(false);
  const [widgetPreset, setWidgetPreset] = useState("goldClassic");
  const [widgetSettings, setWidgetSettings] = useState({
    width: 340,
    height: 170,
    arabicSize: 20,
    translationSize: 14,
    backgroundColor: WIDGET_STYLES.goldClassic.backgroundColor,
    arabicColor: WIDGET_STYLES.goldClassic.arabicColor,
    translationColor: WIDGET_STYLES.goldClassic.translationColor,
    metaColor: WIDGET_STYLES.goldClassic.metaColor,
  });
  const modalTranslateY = useRef(new Animated.Value(0)).current;

  const closeWidgetModal = () => setShowWidgetSettings(false);

  // Load history + streak on mount and on pull-to-refresh
  const loadData = useCallback(async () => {
    const [hist, strk] = await Promise.all([getHistory(), getStreakStats()]);
    setHistory((hist || []).slice(0, 4));
    setStreak(strk || { current: 0, best: 0, weekly: [] });
  }, []);

  useEffect(() => { void loadData(); }, [loadData]);

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
        Animated.spring(swipePan, { toValue: 0, useNativeDriver: true }).start();
      },
    }),
  ).current;

  useEffect(() => {
    const loadWidgetConfig = async () => {
      const [fonts, layout, styleName] = await Promise.all([
        getWidgetFontSettings(),
        getWidgetLayoutSettings(),
        getWidgetStyleName(),
      ]);
      const baseStyle = WIDGET_STYLES[styleName] || WIDGET_STYLES.goldClassic;
      setWidgetPreset(styleName || "goldClassic");
      setWidgetSettings((prev) => ({
        ...prev,
        width: layout.width,
        height: layout.height,
        arabicSize: fonts.arabicSize,
        translationSize: fonts.translationSize,
        backgroundColor: baseStyle.backgroundColor,
        arabicColor: baseStyle.arabicColor,
        translationColor: baseStyle.translationColor,
        metaColor: baseStyle.metaColor,
      }));
    };
    void loadWidgetConfig();
  }, []);

  useEffect(() => {
    if (showWidgetSettings) modalTranslateY.setValue(0);
  }, [showWidgetSettings, modalTranslateY]);

  const modalPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_e, g) =>
        Math.abs(g.dy) > 6 && Math.abs(g.dx) < 30,
      onMoveShouldSetPanResponderCapture: (_e, g) =>
        Math.abs(g.dy) > 6 && Math.abs(g.dx) < 30,
      onPanResponderMove: (_e, g) => {
        if (g.dy > -4) modalTranslateY.setValue(g.dy);
      },
      onPanResponderRelease: (_e, g) => {
        if (g.dy > 70 || g.vy > 0.9) { closeWidgetModal(); return; }
        Animated.spring(modalTranslateY, {
          toValue: 0, useNativeDriver: true, bounciness: 6,
        }).start();
      },
      onPanResponderTerminate: () => {
        Animated.spring(modalTranslateY, {
          toValue: 0, useNativeDriver: true, bounciness: 6,
        }).start();
      },
    }),
  ).current;

  const adjustSetting = (field, delta, min, max) => {
    setWidgetSettings((prev) => ({
      ...prev,
      [field]: Math.min(max, Math.max(min, Number(prev[field] || 0) + delta)),
    }));
  };

  const setColorSetting = (field, color) =>
    setWidgetSettings((prev) => ({ ...prev, [field]: color }));

  const pickPreset = (presetKey) => {
    const style = WIDGET_STYLES[presetKey] || WIDGET_STYLES.goldClassic;
    setWidgetPreset(presetKey);
    setWidgetSettings((prev) => ({
      ...prev,
      backgroundColor: style.backgroundColor,
      arabicColor: style.arabicColor,
      translationColor: style.translationColor,
      metaColor: style.metaColor,
    }));
  };

  const applyWidgetSettings = async () => {
    setSavingWidget(true);
    try {
      await Promise.all([
        saveWidgetStyleName(widgetPreset),
        saveWidgetFontSettings({
          arabicSize: widgetSettings.arabicSize,
          translationSize: widgetSettings.translationSize,
          lineSpacing: 1.25,
        }),
        saveWidgetLayoutSettings({
          width: widgetSettings.width,
          height: widgetSettings.height,
        }),
      ]);
      const updated = await setWidgetStyle({
        backgroundColor: widgetSettings.backgroundColor,
        arabicColor: widgetSettings.arabicColor,
        translationColor: widgetSettings.translationColor,
        metaColor: widgetSettings.metaColor,
        arabicSize: widgetSettings.arabicSize,
        translationSize: widgetSettings.translationSize,
        metaSize: 12,
      });
      Alert.alert(
        updated ? "Applied" : "Settings Saved",
        updated
          ? "Widget style updated successfully."
          : "Saved. Install APK to see widget changes.",
      );
      closeWidgetModal();
    } catch (error) {
      Alert.alert("Error", error?.message || "Failed to save widget settings.");
    } finally {
      setSavingWidget(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-sanctuary-background dark:bg-sanctuary-background-dark">
      <TopBar
        title="Digital Sanctuary"
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
          <Text style={{ fontSize: 20, fontStyle: "italic", fontFamily: "serif", color: theme.accent }}>
            Today for you
          </Text>
        </View>

        {/* Hero Ayah Card — swipe or tap arrows to change ayah */}
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={prevAyah}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(176,146,106,0.12)" }}
          >
            <MaterialCommunityIcons name="chevron-left" size={22} color="#b0926a" />
          </TouchableOpacity>

          <Animated.View style={{ flex: 1, transform: [{ translateX: swipePan }] }}>
            <GlassCard
              className="rounded-[32px] p-4 border-sanctuary-border/30 dark:border-sanctuary-border-dark/30"
              {...swipeResponder.panHandlers}
            >
              <View className="mb-3 flex-row items-center justify-between">
                <Text style={{ fontSize: 11, fontWeight: "700", letterSpacing: 2, color: theme.accent }}>
                  {ayah?.surahName} {ayah?.surahNumber}:{ayah?.ayahNumber}
                </Text>
                <FavoriteButton
                  isFavorite={favorites.includes(ayah?.id)}
                  onPress={() => toggleFavorite(ayah?.id)}
                  className="bg-white/40 dark:bg-white/5"
                />
              </View>

              {/* Arabic */}
              <Text
                className="text-right text-2xl leading-10 font-bold text-sanctuary-text dark:text-sanctuary-text-dark mb-3"
                numberOfLines={3}
              >
                {ayah?.arabic || ayah?.text}
              </Text>

              {/* Translation */}
              <Text
                className="text-sm font-serif italic text-sanctuary-text/70 dark:text-sanctuary-text-dark/70 leading-6"
                numberOfLines={3}
              >
                "{ayah?.translation}"
              </Text>
            </GlassCard>
          </Animated.View>

          <TouchableOpacity
            onPress={nextAyah}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(176,146,106,0.12)" }}
          >
            <MaterialCommunityIcons name="chevron-right" size={22} color="#b0926a" />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View className="flex-row gap-3 mt-4">
          <TouchableOpacity
            className="flex-1 rounded-[24px] p-6 border"
            style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}
            onPress={() => router.push("/ayah")}
          >
            <MaterialCommunityIcons name="book-open-variant" size={24} color={theme.accent} />
            <Text style={{ marginTop: 16, fontSize: 10, fontWeight: "700", letterSpacing: 1, color: theme.accent }}>
              Daily Verse
            </Text>
            <Text style={{ marginTop: 4, fontSize: 18, fontWeight: "700", color: theme.accent }}>
              {streak.current} Day Streak
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 rounded-[24px] p-6 border"
            style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}
            onPress={() => router.push("/collections")}
          >
            <MaterialCommunityIcons name="bookmark-multiple-outline" size={24} color={theme.accent} />
            <Text style={{ marginTop: 16, fontSize: 10, fontWeight: "700", letterSpacing: 1, color: theme.accent }}>
              Collections
            </Text>
            <Text style={{ marginTop: 4, fontSize: 18, fontWeight: "700", color: theme.accent }}>
              {collections.length} Saved
            </Text>
          </TouchableOpacity>
        </View>

        {/* Journey Progress */}
        <View className="mt-4 rounded-[24px] border p-6" style={{ borderColor: theme.border, backgroundColor: theme.cardBackground }}>
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 1, color: theme.accent }}>
                Your Journey
              </Text>
              <Text style={{ fontSize: 12, color: theme.accent, opacity: 0.7, marginTop: 2 }}>
                {streak.current} Day Spiritual Streak
              </Text>
            </View>
            <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: theme.softAccent }}>
              <MaterialCommunityIcons name="trending-up" size={20} color={theme.accent} />
            </View>
          </View>

          {/* Last session badge */}
          {lastSession && (
            <View className="flex-row items-center gap-2 mb-4 rounded-2xl px-4 py-2.5" style={{ backgroundColor: theme.softAccent }}>
              <MaterialCommunityIcons name="timer-check-outline" size={16} color={theme.accent} />
              <Text style={{ fontSize: 12, fontWeight: "700", color: theme.accent }}>
                Last session: {lastSession.durationMinutes} min
                {lastSession.surahName ? ` · ${lastSession.surahName}` : ""}
              </Text>
            </View>
          )}

          <View className="flex-row justify-between mb-3">
            {(streak.weekly || []).map((day) => (
              <View key={day.key} className="items-center gap-1">
                <View
                  className="w-7 h-7 rounded-full items-center justify-center"
                  style={{ backgroundColor: day.read ? theme.accent : theme.softAccent }}
                >
                  {day.read && <MaterialCommunityIcons name="check" size={14} color="#fff" />}
                </View>
                <Text style={{ fontSize: 8, fontWeight: "700", color: theme.textSecondary }}>
                  {day.label}
                </Text>
              </View>
            ))}
          </View>

          <View className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: theme.softAccent }}>
            <View
              className="h-full rounded-full"
              style={{ width: `${Math.min(100, ((streak.current || 0) / 7) * 100)}%`, backgroundColor: theme.accent }}
            />
          </View>
          <Text style={{ marginTop: 8, textAlign: "right", fontSize: 10, fontWeight: "700", color: theme.accent }}>
            {streak.current || 0}/7 DAYS THIS WEEK
          </Text>
        </View>

        {/* Recently Read */}
        <View className="mt-6 mb-2 px-2 flex-row items-center justify-between">
          <Text style={{ fontSize: 13, fontWeight: "700", letterSpacing: 1, color: theme.accent }}>
            Recently Read
          </Text>
          <TouchableOpacity onPress={() => router.push("/stats")}>
            <Text style={{ fontSize: 12, fontWeight: "700", color: theme.accent }}>
              View Stats
            </Text>
          </TouchableOpacity>
        </View>

        <View className="gap-2">
          {history.length ? (
            history.map((item, idx) => (
              <TouchableOpacity
                key={`${item.id}-${idx}`}
                onPress={() => router.push({ pathname: "/ayah", params: { surah: item.surahNumber, ayah: item.ayahNumber } })}
                className="flex-row items-center rounded-2xl border p-4"
                style={{ borderColor: theme.border, backgroundColor: theme.cardBackground }}
              >
                <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: theme.softAccent }}>
                  <MaterialCommunityIcons name="book-open-variant" size={18} color={theme.accent} />
                </View>
                <View className="ml-4 flex-1">
                  <Text style={{ fontSize: 14, fontWeight: "700", color: theme.accent }}>
                    {item.surahName}
                  </Text>
                  <Text style={{ fontSize: 12, color: theme.textSecondary }}>
                    Ayah {item.ayahNumber}
                  </Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={theme.textSecondary} />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ fontSize: 12, textAlign: "center", color: theme.textSecondary, paddingVertical: 16 }}>
              Your spiritual journey starts here.
            </Text>
          )}
        </View>

        {/* Quran Reader entry */}
        <TouchableOpacity
          className="mt-4 overflow-hidden rounded-[28px] border p-5"
          style={{ borderColor: theme.border, backgroundColor: theme.cardBackground }}
          onPress={() => router.push("/quran")}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 1.5, color: theme.accent }}>
                Full Quran
              </Text>
              <Text style={{ marginTop: 4, fontSize: 13, color: theme.accent, opacity: 0.6 }}>
                Read any of the 114 Surahs offline
              </Text>
            </View>
            <View className="h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: theme.softAccent }}>
              <MaterialCommunityIcons name="book-open-page-variant-outline" size={24} color={theme.accent} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Widget Settings */}
        <TouchableOpacity
          className="mt-4 mb-3 overflow-hidden rounded-[28px] border p-5"
          style={{ borderColor: theme.border, backgroundColor: theme.cardBackground }}
          onPress={() => setShowWidgetSettings(true)}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 1.5, color: theme.accent }}>
                Widget Settings
              </Text>
              <Text style={{ marginTop: 4, fontSize: 13, color: theme.accent, opacity: 0.6 }}>
                Width, height, text, and background style
              </Text>
            </View>
            <View className="h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: theme.softAccent }}>
              <MaterialCommunityIcons name="view-grid-plus-outline" size={24} color={theme.accent} />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showWidgetSettings} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/40 px-4 pb-6">
          <WidgetSettingsSheet
            modalTranslateY={modalTranslateY}
            panHandlers={modalPanResponder.panHandlers}
            ayah={ayah}
            widgetPreset={widgetPreset}
            widgetSettings={widgetSettings}
            savingWidget={savingWidget}
            onPickPreset={pickPreset}
            onAdjustSetting={adjustSetting}
            onSetColor={setColorSetting}
            onCancel={closeWidgetModal}
            onApply={applyWidgetSettings}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
