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

const initialWidgetSettings = {
  width: 340,
  height: 170,
  arabicLines: 3,
  translationLines: 3,
  previewStyle: "widget",
  intervalHours: 6,
  arabicSize: 20,
  translationSize: 14,
  lineSpacing: 1.25, // Added line spacing
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
        previewStyle: layout.previewStyle === "home" ? "home" : "widget",
        intervalHours: intervalHours ?? 6,
        arabicSize: fonts.arabicSize ?? 20,
        translationSize: fonts.translationSize ?? 14,
        lineSpacing: fonts.lineSpacing ?? 1.25, // Load line spacing
        arabicFont: fonts.arabicFont ?? "platform",
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
          lineSpacing: widgetSettings.lineSpacing || 1.25, // Save line spacing
          arabicFont: widgetSettings.arabicFont,
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
        type: updated ? "success" : "info",
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
    applyWidgetSettings,
  };
}
