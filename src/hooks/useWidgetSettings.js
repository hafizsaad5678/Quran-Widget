import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import {
    getWidgetFontSettings,
    getWidgetInterval,
    getWidgetLayoutSettings,
    getWidgetStyleSettings,
    saveWidgetFontSettings,
    saveWidgetInterval,
    saveWidgetLayoutSettings,
    saveWidgetStyleName,
    saveWidgetStyleSettings,
} from "../services/userService";
import {
    setWidgetLayout,
    setWidgetStyle,
    setWidgetUpdateInterval,
    WIDGET_STYLES,
} from "../services/widgetProvider";

const MIRROR_GLASS = {
  glassEnabled: true,
  glassOpacity: 0.74,
  borderOpacity: 0.34,
};

// Text colors that stay readable on the chosen background.
const isLightColor = (hex) => {
  const v = String(hex || "#000000").replace("#", "");
  const full = v.length === 3 ? v.split("").map((c) => c + c).join("") : v.padEnd(6, "0");
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62;
};

export const textColorsFor = (backgroundColor) =>
  isLightColor(backgroundColor)
    ? { arabicColor: "#1F1A10", translationColor: "#3B3426", metaColor: "#7A5C00" }
    : {
        arabicColor: WIDGET_STYLES.nightGold.arabicColor,
        translationColor: WIDGET_STYLES.nightGold.translationColor,
        metaColor: WIDGET_STYLES.nightGold.metaColor,
      };

const initialWidgetSettings = {
  width: 340,
  height: 170,
  arabicLines: 3,
  translationLines: 3,
  previewStyle: "home", // simple, Home-like preview
  intervalHours: 6,
  arabicSize: 20,
  translationSize: 14,
  lineSpacing: 1.9,
  arabicFont: "platform",       // Font family for Arabic
  translationFont: "platform",  // Font family for translation
  backgroundColor: WIDGET_STYLES.nightGold.backgroundColor,
  arabicColor: WIDGET_STYLES.nightGold.arabicColor,
  translationColor: WIDGET_STYLES.nightGold.translationColor,
  metaColor: WIDGET_STYLES.nightGold.metaColor,
  ...MIRROR_GLASS,
};

export function useWidgetSettings() {
  const toast = useToast();
  const [savingWidget, setSavingWidget] = useState(false);
  const [widgetSettings, setWidgetSettings] = useState(initialWidgetSettings);
  // Once the user picks a text color, changing the background no longer overrides it.
  const [textColorChosen, setTextColorChosen] = useState(false);

  useEffect(() => {
    const loadWidgetConfig = async () => {
      const [fonts, layout, intervalHours, styleSettings] = await Promise.all([
        getWidgetFontSettings(),
        getWidgetLayoutSettings(),
        getWidgetInterval(),
        getWidgetStyleSettings(),
      ]);

      console.log('Loading font settings:', fonts); // Debug log

      const baseStyle = WIDGET_STYLES.nightGold;
      setWidgetSettings((prev) => ({
        ...prev,
        width: layout.width,
        height: layout.height,
        arabicLines: layout.arabicLines ?? 3,
        translationLines: layout.translationLines ?? 3,
        previewStyle: "home",
        intervalHours: intervalHours ?? 6,
        arabicSize: fonts.arabicSize ?? 20,
        translationSize: fonts.translationSize ?? 14,
        lineSpacing: Math.max(fonts.lineSpacing ?? 1.9, 1.9),
        arabicFont: "platform", // Arabic always uses the platform font
        translationFont: fonts.translationFont ?? "platform",
        backgroundColor:
          styleSettings?.backgroundColor || baseStyle.backgroundColor,
        arabicColor: styleSettings?.arabicColor || baseStyle.arabicColor,
        translationColor:
          styleSettings?.translationColor || baseStyle.translationColor,
        metaColor: styleSettings?.metaColor || baseStyle.metaColor,
        ...MIRROR_GLASS,
      }));
    };

    void loadWidgetConfig();
  }, []);

  const adjustSetting = (field, delta, min, max) => {
    setWidgetSettings((prev) => ({
      ...prev,
      [field]: Math.min(max, Math.max(min, Number(prev[field] || 0) + delta)),
    }));
  };

  const setColorSetting = (field, color) => {
    setWidgetSettings((prev) => ({ ...prev, [field]: color }));
  };

  // Set several fields at once (used by sliders).
  const updateSettings = (partial) => {
    setWidgetSettings((prev) => ({ ...prev, ...partial }));
  };

  // Background: text follows it automatically until the user picks a text color.
  const setBackgroundColor = (color) => {
    setWidgetSettings((prev) => ({
      ...prev,
      backgroundColor: color,
      ...(textColorChosen ? {} : textColorsFor(color)),
    }));
  };

  // One color for all widget text (Arabic, translation and reference).
  const setTextColor = (color) => {
    setTextColorChosen(true);
    setWidgetSettings((prev) => ({
      ...prev,
      arabicColor: color,
      translationColor: color,
      metaColor: color,
    }));
  };

  const applyWidgetSettings = async () => {
    setSavingWidget(true);
    try {
      await Promise.all([
        saveWidgetStyleName("nightGold"),
        saveWidgetStyleSettings({
          backgroundColor: widgetSettings.backgroundColor,
          arabicColor: widgetSettings.arabicColor,
          translationColor: widgetSettings.translationColor,
          metaColor: widgetSettings.metaColor,
          ...MIRROR_GLASS,
        }),
        saveWidgetFontSettings({
          arabicSize: widgetSettings.arabicSize,
          translationSize: widgetSettings.translationSize,
          lineSpacing: Math.max(widgetSettings.lineSpacing || 1.9, 1.9), // Arabic needs tall lines
          arabicFont: "platform",
          translationFont: widgetSettings.translationFont,
        }),
        saveWidgetLayoutSettings({
          width: widgetSettings.width,
          height: widgetSettings.height,
          arabicLines: widgetSettings.arabicLines,
          translationLines: widgetSettings.translationLines,
          previewStyle: widgetSettings.previewStyle,
        }),
        saveWidgetInterval(widgetSettings.intervalHours),
      ]);

      const updated = await setWidgetStyle({
        backgroundColor: widgetSettings.backgroundColor,
        arabicColor: widgetSettings.arabicColor,
        translationColor: widgetSettings.translationColor,
        metaColor: widgetSettings.metaColor,
        arabicSize: widgetSettings.arabicSize,
        translationSize: widgetSettings.translationSize,
        metaSize: 12,
        ...MIRROR_GLASS,
      });

      await setWidgetLayout({
        width: widgetSettings.width,
        height: widgetSettings.height,
        arabicLines: widgetSettings.arabicLines,
        translationLines: widgetSettings.translationLines,
        previewStyle: widgetSettings.previewStyle,
      });
      await setWidgetUpdateInterval(widgetSettings.intervalHours);

      toast?.show({
        title: updated ? "Widget Applied" : "Settings Saved",
        message: updated
          ? "Widget style updated successfully."
          : "Saved. Install APK to see widget changes.",
        type: "success",
      });

      return true;
    } catch (error) {
      toast?.showAlert({
        title: "Error",
        message: error?.message || "Failed to save widget settings.",
        type: "error",
      });
      return false;
    } finally {
      setSavingWidget(false);
    }
  };

  return {
    savingWidget,
    widgetSettings,
    adjustSetting,
    setColorSetting,
    updateSettings,
    setBackgroundColor,
    setTextColor,
    applyWidgetSettings,
  };
}
