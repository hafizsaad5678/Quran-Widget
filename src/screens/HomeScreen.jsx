import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    Modal,
    PanResponder,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AyahDisplay } from "../components/AyahDisplay";
import FavoriteButton from "../components/FavoriteButton";
import GlassCard from "../components/ui/GlassCard";
import TopBar from "../components/ui/TopBar";
import { WidgetSettingsSheet } from "../components/ui/WidgetPreview";
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

export default function HomeScreen() {
  const router = useRouter();
  const { ayah } = useDailyAyah();
  const { favorites, toggleFavorite } = useAyatLibrary();

  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState({ current: 0, best: 0 });
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

  const closeWidgetModal = () => {
    setShowWidgetSettings(false);
  };

  useEffect(() => {
    const load = async () => {
      const [hist, strk] = await Promise.all([getHistory(), getStreakStats()]);
      setHistory((hist || []).slice(0, 4));
      setStreak(strk || { current: 0, best: 0 });
    };
    void load();
  }, []);

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
    if (showWidgetSettings) {
      modalTranslateY.setValue(0);
    }
  }, [showWidgetSettings, modalTranslateY]);

  const modalPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_evt, gesture) =>
        Math.abs(gesture.dy) > 6 && Math.abs(gesture.dx) < 30,
      onMoveShouldSetPanResponderCapture: (_evt, gesture) =>
        Math.abs(gesture.dy) > 6 && Math.abs(gesture.dx) < 30,
      onPanResponderMove: (_evt, gesture) => {
        if (gesture.dy > -4) {
          modalTranslateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_evt, gesture) => {
        if (gesture.dy > 70 || gesture.vy > 0.9) {
          closeWidgetModal();
          return;
        }

        Animated.spring(modalTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 6,
        }).start();
      },
      onPanResponderTerminate: () => {
        Animated.spring(modalTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 6,
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

  const setColorSetting = (field, color) => {
    setWidgetSettings((prev) => ({ ...prev, [field]: color }));
  };

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

      if (!updated) {
        Alert.alert(
          "Settings Saved",
          "Widget settings saved successfully. To apply on Android home widget, test with a development build/APK.",
        );
      } else {
        Alert.alert("Applied", "Widget style updated successfully.");
      }
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
      >
        {/* Welcome Text */}
        <View className="mt-6 mb-6 px-2">
          <Text className="text-xl italic font-serif text-sanctuary-text/60 dark:text-sanctuary-text-dark/60">
            Today for you
          </Text>
        </View>

        {/* Hero Ayah Card */}
        <GlassCard className="rounded-[40px] p-8 border-sanctuary-border/30 dark:border-sanctuary-border-dark/30 shadow-2xl shadow-sanctuary-accent/10">
          <View className="mb-6 items-center">
            <Text className="text-[12px] font-bold uppercase tracking-[2px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
              {ayah?.surahName || "SURAH AL-IMRAN"} {ayah?.surahNumber || "3"}:
              {ayah?.ayahNumber || "159"}
            </Text>
          </View>

          <AyahDisplay ayah={ayah} className="mb-6" showShare />

          <View className="mt-8 border-t border-sanctuary-border/20 pt-6 items-center">
            <Text className="text-sm italic text-sanctuary-text/70 dark:text-sanctuary-text-dark/70 text-center mb-1">
              &quot;Trust in the process of your journey.&quot;
            </Text>
            <Text className="text-[10px] font-bold uppercase tracking-[1px] text-sanctuary-text-muted/40">
              Swipe for more
            </Text>
            <MaterialCommunityIcons
              name="chevron-double-down"
              size={16}
              color="#cdc6b6"
              className="mt-1"
            />
          </View>

          <View className="absolute top-6 right-6">
            <FavoriteButton
              isFavorite={favorites.includes(ayah?.id)}
              onPress={() => toggleFavorite(ayah?.id)}
              className="bg-white/40 dark:bg-white/5"
            />
          </View>
        </GlassCard>

        {/* Stats Row */}
        <View className="flex-row gap-3 mt-4">
          <TouchableOpacity
            className="flex-1 rounded-[24px] bg-sanctuary-card dark:bg-sanctuary-card-dark p-6 border border-sanctuary-border/40 dark:border-sanctuary-border-dark/40"
            onPress={() => router.push("/ayah")}
          >
            <MaterialCommunityIcons
              name="book-open-variant"
              size={24}
              color="#b0926a"
            />
            <Text className="mt-4 text-[10px] font-bold uppercase tracking-[1px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
              Daily Verse
            </Text>
            <Text className="mt-1 text-lg font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
              {streak.current} Day Streak
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 rounded-[24px] bg-sanctuary-card dark:bg-sanctuary-card-dark p-6 border border-sanctuary-border/40 dark:border-sanctuary-border-dark/40"
            onPress={() => router.push("/collections")}
          >
            <MaterialCommunityIcons
              name="comment-question-outline"
              size={24}
              color="#b0926a"
            />
            <Text className="mt-4 text-[10px] font-bold uppercase tracking-[1px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
              Reflections
            </Text>
            <Text className="mt-1 text-lg font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
              12 Unread
            </Text>
          </TouchableOpacity>
        </View>

        {/* Journey Progress */}
        <View className="mt-4 rounded-[24px] border border-sanctuary-border/40 bg-white/50 p-6 dark:border-sanctuary-border-dark/40 dark:bg-white/5">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-[12px] font-bold uppercase tracking-[1px] text-sanctuary-accent">
                Your Journey
              </Text>
              <Text className="text-xs text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
                7 Day Spiritual Streak
              </Text>
            </View>
            <View className="w-10 h-10 rounded-full bg-sanctuary-accent/10 items-center justify-center">
              <MaterialCommunityIcons
                name="trending-up"
                size={20}
                color="#b0926a"
              />
            </View>
          </View>

          <Text className="text-[10px] font-bold uppercase tracking-[1px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark mb-2">
            Current Milestone: The Path of Gratitude
          </Text>
          <View className="h-2 w-full overflow-hidden rounded-full bg-sanctuary-accent/10">
            <View className="h-full w-[65%] rounded-full bg-sanctuary-accent" />
          </View>
          <Text className="mt-2 text-right text-[10px] font-bold text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
            65% COMPLETED
          </Text>
        </View>

        {/* Recent Activity Mini List */}
        <View className="mt-6 mb-2 px-2 flex-row items-center justify-between">
          <Text className="text-sm font-bold uppercase tracking-[1px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
            Recently Read
          </Text>
          <TouchableOpacity onPress={() => router.push("/stats")}>
            <Text className="text-xs font-bold text-sanctuary-accent uppercase">
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
                className="flex-row items-center rounded-2xl border border-sanctuary-border/30 bg-white/40 p-4 dark:border-sanctuary-border-dark/30 dark:bg-white/5"
              >
                <View className="w-10 h-10 rounded-full bg-sanctuary-accent/10 items-center justify-center">
                  <MaterialCommunityIcons
                    name="book-open-variant"
                    size={18}
                    color="#b0926a"
                  />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-sm font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
                    {item.surahName}
                  </Text>
                  <Text className="text-xs text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
                    Ayah {item.ayahNumber}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color="#cdc6b6"
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-xs text-center text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark py-4">
              Your spiritual journey starts here.
            </Text>
          )}
        </View>

        <TouchableOpacity
          className="mt-8 mb-3 overflow-hidden rounded-[28px] border border-sanctuary-border/40 bg-white/70 p-5 shadow-xl shadow-sanctuary-accent/10 dark:border-sanctuary-border-dark/40 dark:bg-white/5"
          onPress={() => setShowWidgetSettings(true)}
        >
          <View className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-sanctuary-accent/10" />
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs font-bold uppercase tracking-[1.5px] text-sanctuary-accent">
                Widget Settings
              </Text>
              <Text className="mt-1 text-sm text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
                Width, height, text, and background style
              </Text>
            </View>
            <View className="h-12 w-12 items-center justify-center rounded-2xl border border-sanctuary-border/30 bg-sanctuary-accent/10 dark:border-sanctuary-border-dark/30">
              <MaterialCommunityIcons
                name="view-grid-plus-outline"
                size={24}
                color="#b0926a"
              />
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
