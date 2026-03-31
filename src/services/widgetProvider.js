/**
 * Save ayah data and update Android widget
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { NativeModules, Platform } from "react-native";
import { applyTranslationProfile } from "../constants/translations";
import {
    getTranslationKey,
    getWidgetFontSettings,
    getWidgetMode,
    resolveWidgetAyah,
} from "./userService";

const { AyahWidgetModule } = NativeModules;
const isExpoGo =
  Constants?.appOwnership === "expo" ||
  Constants?.executionEnvironment === "storeClient";
let hasLoggedMissingWidgetModule = false;

export const WIDGET_STYLES = {
  goldClassic: {
    backgroundColor: "#FFF7E0",
    arabicColor: "#3D2B00",
    translationColor: "#5F4A1B",
    metaColor: "#8B6B12",
    arabicSize: 20,
    translationSize: 14,
    metaSize: 12,
  },
  minimalLight: {
    backgroundColor: "#FFFFFF",
    arabicColor: "#111111",
    translationColor: "#444444",
    metaColor: "#777777",
    arabicSize: 20,
    translationSize: 14,
    metaSize: 12,
  },
  nightGold: {
    backgroundColor: "#1F1A10",
    arabicColor: "#FFE9A3",
    translationColor: "#E7D9B0",
    metaColor: "#FFD700",
    arabicSize: 20,
    translationSize: 14,
    metaSize: 12,
  },
  emerald: {
    backgroundColor: "#EAF8EF",
    arabicColor: "#0E3A22",
    translationColor: "#2B5E44",
    metaColor: "#1A7A4D",
    arabicSize: 20,
    translationSize: 14,
    metaSize: 12,
  },
  sapphire: {
    backgroundColor: "#EEF5FF",
    arabicColor: "#10274D",
    translationColor: "#2F4972",
    metaColor: "#255FA8",
    arabicSize: 20,
    translationSize: 14,
    metaSize: 12,
  },
};

export const setWidgetStyle = async (style) => {
  if (Platform.OS !== "android") return false;
  if (
    !AyahWidgetModule ||
    typeof AyahWidgetModule.updateWidgetStyle !== "function"
  ) {
    return false;
  }

  const fontSettings = await getWidgetFontSettings();
  const merged = {
    ...WIDGET_STYLES.goldClassic,
    ...(style || {}),
    arabicSize: Number(fontSettings.arabicSize || style?.arabicSize || 16),
    translationSize: Number(
      fontSettings.translationSize || style?.translationSize || 11,
    ),
  };

  try {
    await AyahWidgetModule.updateWidgetStyle(
      merged.backgroundColor,
      merged.arabicColor,
      merged.translationColor,
      merged.metaColor,
      Number(merged.arabicSize),
      Number(merged.translationSize),
      Number(merged.metaSize),
    );
    return true;
  } catch (error) {
    console.warn("⚠️ Widget style update failed:", error?.message || error);
    return false;
  }
};

/**
 * Save ayah to AsyncStorage and update widget
 * @param {Object} ayah - Ayah object with arabic, translation, surah info
 * @returns {Promise<boolean>} Success status
 */
export const saveAyahForWidget = async (ayah) => {
  if (!ayah) {
    console.error("No ayah provided to save");
    return false;
  }

  try {
    // Prepare ayah data with defaults
    const arabic = ayah.arabic || "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
    const translationKey = await getTranslationKey();
    const translation =
      applyTranslationProfile(ayah.translation, translationKey) ||
      "In the name of Allah, the Most Gracious, the Most Merciful";
    const surahName = ayah.surahName || ayah.surah || "Al-Fatiha";
    const surahNumber = (ayah.surahNumber || "1").toString();
    const ayahNumber = (ayah.ayahNumber || ayah.ayah || "1").toString();

    // Create widget data object
    const widgetData = {
      arabic,
      translation,
      surahName,
      surahNumber,
      ayahNumber,
      timestamp: new Date().toISOString(),
    };

    // Save to AsyncStorage
    await AsyncStorage.setItem("currentAyah", JSON.stringify(ayah));
    await AsyncStorage.setItem("widgetData", JSON.stringify(widgetData));
    await AsyncStorage.setItem("lastAyahUpdate", widgetData.timestamp);

    const updateAndroidWidget = async () => {
      if (
        !AyahWidgetModule ||
        typeof AyahWidgetModule.updateWidget !== "function"
      ) {
        throw new Error("AyahWidgetModule.updateWidget is unavailable");
      }

      // Try new native signature first (includes surahNumber).
      try {
        await AyahWidgetModule.updateWidget(
          arabic,
          translation,
          surahName,
          ayahNumber,
          surahNumber,
        );
      } catch (_error) {
        // Fallback for older installed dev builds that still use 4 args.
        await AyahWidgetModule.updateWidget(
          arabic,
          translation,
          surahName,
          ayahNumber,
        );
      }

      if (typeof AyahWidgetModule.refreshWidget === "function") {
        await AyahWidgetModule.refreshWidget();
      }
    };

    // Update Android widget
    if (Platform.OS === "android") {
      if (AyahWidgetModule && AyahWidgetModule.updateWidget) {
        try {
          await updateAndroidWidget();
          console.log("✅ Widget updated:", `${surahName} : ${ayahNumber}`);
        } catch (widgetError) {
          console.warn("⚠️ Widget update failed:", widgetError.message);
          // Don't fail the whole operation if widget update fails
        }
      } else {
        if (!hasLoggedMissingWidgetModule) {
          if (isExpoGo) {
            console.log(
              "ℹ️ Widget native module is unavailable in Expo Go; use a development build/APK to test widget updates.",
            );
          } else {
            console.warn(
              "⚠️ AyahWidgetModule not available. Ensure you are running a development build/APK with native module linked.",
            );
          }
          hasLoggedMissingWidgetModule = true;
        }
      }
    }

    return true;
  } catch (error) {
    console.error("❌ Error saving ayah:", error);
    return false;
  }
};

export const applyWidgetModeAyah = async (allAyat) => {
  const mode = await getWidgetMode();
  const resolved = await resolveWidgetAyah(allAyat || []);
  if (!resolved) return null;
  await AsyncStorage.setItem("widgetMode", mode);
  await saveAyahForWidget(resolved);
  return resolved;
};

export const setWidgetTapAction = async (tapAction) => {
  if (Platform.OS !== "android") return false;
  if (
    !AyahWidgetModule ||
    typeof AyahWidgetModule.setTapAction !== "function"
  ) {
    return false;
  }
  try {
    await AyahWidgetModule.setTapAction(
      tapAction === "current" ? "current" : "home",
    );
    return true;
  } catch (error) {
    console.warn(
      "⚠️ Widget tap action update failed:",
      error?.message || error,
    );
    return false;
  }
};
