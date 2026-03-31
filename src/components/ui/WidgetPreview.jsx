import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Animated,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const WIDGET_PRESET_KEYS = [
  "goldClassic",
  "minimalLight",
  "nightGold",
  "emerald",
  "sapphire",
];

const COLOR_PRESETS = [
  "#FFF7E0",
  "#1F1A10",
  "#EEF5FF",
  "#EAF8EF",
  "#FFFFFF",
  "#10274D",
  "#3D2B00",
  "#444444",
  "#FFD700",
];

const SIZE_CONTROLS = [
  {
    label: "Width",
    field: "width",
    min: 220,
    max: 400,
    step: 10,
  },
  {
    label: "Height",
    field: "height",
    min: 130,
    max: 260,
    step: 10,
  },
  {
    label: "Arabic Text Size",
    field: "arabicSize",
    min: 14,
    max: 32,
    step: 1,
  },
  {
    label: "Translation Text Size",
    field: "translationSize",
    min: 12,
    max: 26,
    step: 1,
  },
];

const COLOR_FIELDS = [
  { key: "backgroundColor", label: "Background" },
  { key: "arabicColor", label: "Arabic Text" },
  { key: "translationColor", label: "Translation Text" },
];

const WidgetPreview = ({ type, data }) => {
  if (type === "small") {
    const { isDark, icon, title, subtitle } = data;
    return (
      <View
        className={`w-[140px] h-[140px] rounded-[32px] p-5 justify-between ${isDark ? "bg-sanctuary-accent dark:bg-sanctuary-accent" : "bg-white/60"}`}
      >
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={isDark ? "white" : "#b0926a"}
        />
        <View>
          <Text
            className={`text-right text-xl font-bold ${isDark ? "text-white" : "text-sanctuary-text"}`}
            dir="rtl"
          >
            {title}
          </Text>
          <Text
            className={`mt-1 text-[8px] font-bold uppercase tracking-wider ${isDark ? "text-white/60" : "text-sanctuary-text-muted"}`}
          >
            {subtitle}
          </Text>
        </View>
      </View>
    );
  }

  if (type === "medium") {
    const {
      tag,
      title,
      translation,
      backgroundColor,
      arabicColor,
      translationColor,
      metaColor,
      arabicSize,
      translationSize,
      width,
      height,
    } = data;

    return (
      <View
        className="w-full overflow-hidden rounded-[40px] border p-6"
        style={{
          backgroundColor: backgroundColor || "#4b422f",
          borderColor: `${metaColor || "#b0926a"}50`,
          width: width || undefined,
          height: height || 176,
        }}
      >
        <View className="absolute inset-0">
          <View
            className="absolute -right-8 -top-10 h-36 w-36 rounded-full"
            style={{ backgroundColor: `${metaColor || "#b0926a"}1E` }}
          />
          <View
            className="absolute -left-10 -bottom-12 h-40 w-40 rounded-full"
            style={{ backgroundColor: `${metaColor || "#b0926a"}18` }}
          />
        </View>

        <View className="items-center">
          <View
            className="mb-5 h-[3px] w-12 rounded-full"
            style={{ backgroundColor: `${metaColor || "#b0926a"}99` }}
          />
        </View>

        <View className="flex-1 items-center justify-center px-1">
          <Text
            className="text-center font-bold"
            style={{
              color: arabicColor || "#d3b45c",
              fontSize: arabicSize || 24,
            }}
            dir="rtl"
          >
            {title}
          </Text>
          <Text
            className="mt-3 text-center italic"
            style={{
              color: translationColor || "#ddd7c8",
              fontSize: translationSize || 10,
            }}
          >
            &quot;{translation}&quot;
          </Text>
          <Text
            className="mt-4 text-center text-[10px] font-bold uppercase tracking-[2px]"
            style={{ color: metaColor || "#9f947e" }}
          >
            {tag}
          </Text>
        </View>

        <View
          className="items-center border-t pt-3"
          style={{ borderColor: `${metaColor || "#b0926a"}33` }}
        >
          <Text
            className="text-[11px] font-bold uppercase tracking-[1px]"
            style={{ color: metaColor || "#b0926a" }}
          >
            SANCTUARY
          </Text>
        </View>
      </View>
    );
  }

  if (type === "reflection") {
    const { title, subtitle } = data;
    return (
      <View className="w-full h-40 rounded-[40px] overflow-hidden">
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1542640244-7e672d6cef21?q=80&w=2070&auto=format&fit=crop",
          }}
          className="flex-1 p-6 justify-between"
        >
          <View className="flex-row justify-between items-start">
            <Text className="text-[8px] font-bold uppercase tracking-widest text-white/80">
              Reflections
            </Text>
            <MaterialCommunityIcons name="bookmark" size={20} color="white" />
          </View>
          <View>
            <Text className="text-2xl font-bold text-white font-serif">
              {title}
            </Text>
            <Text className="text-[10px] text-white/80">{subtitle}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  if (type === "interactive") {
    const { goal, currentDay, totalDays } = data;
    return (
      <View className="w-full h-40 rounded-[40px] bg-white/60 p-8 justify-between border border-white/20">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-sanctuary-accent items-center justify-center">
            <MaterialCommunityIcons name="star" size={20} color="white" />
          </View>
          <View className="ml-4">
            <Text className="text-[8px] font-bold uppercase tracking-widest text-sanctuary-text-muted">
              Current Goal
            </Text>
            <Text className="text-sm font-bold text-sanctuary-text">
              {goal}
            </Text>
          </View>
        </View>
        <View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-[8px] font-bold uppercase tracking-widest text-sanctuary-text-muted">
              Progress
            </Text>
            <Text className="text-[8px] font-bold uppercase tracking-widest text-sanctuary-text-muted">
              Day {currentDay} / {totalDays}
            </Text>
          </View>
          <View className="h-2 bg-sanctuary-accent/10 rounded-full overflow-hidden">
            <View
              className="h-full bg-sanctuary-accent rounded-full"
              style={{ width: `${(currentDay / totalDays) * 100}%` }}
            />
          </View>
        </View>
      </View>
    );
  }

  return null;
};

export const WidgetSettingsSheet = ({
  modalTranslateY,
  panHandlers,
  ayah,
  widgetPreset,
  widgetSettings,
  savingWidget,
  onPickPreset,
  onAdjustSetting,
  onSetColor,
  onCancel,
  onApply,
}) => (
  <Animated.View
    className="rounded-[30px] border border-sanctuary-border/40 bg-sanctuary-background p-5 shadow-2xl shadow-black/20 dark:border-sanctuary-border-dark/40 dark:bg-sanctuary-background-dark"
    style={{ transform: [{ translateY: modalTranslateY }] }}
  >
    <View className="mb-3 items-center rounded-xl py-2" {...panHandlers}>
      <View className="h-1.5 w-16 rounded-full bg-sanctuary-border/70" />
      <Text className="mt-2 text-[10px] font-bold uppercase tracking-[2px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
        Drag down here to close
      </Text>
    </View>

    <View className="mt-1 flex-row items-center rounded-2xl border border-sanctuary-border/25 bg-white/40 px-3 py-2 dark:border-sanctuary-border-dark/30 dark:bg-white/5">
      <View className="h-10 w-10 items-center justify-center rounded-xl bg-sanctuary-accent/15">
        <MaterialCommunityIcons
          name="view-grid-plus-outline"
          size={20}
          color="#b0926a"
        />
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-lg font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
          Widget Settings
        </Text>
        <Text className="text-xs text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
          Adjust style, dimensions, and readability
        </Text>
      </View>
    </View>

    <ScrollView
      className="mt-4 max-h-[520px]"
      showsVerticalScrollIndicator={false}
    >
      <View className="rounded-3xl border border-sanctuary-border/30 bg-white/50 p-3 dark:border-sanctuary-border-dark/30 dark:bg-white/5">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-[10px] font-bold uppercase tracking-[2px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
            Live Preview
          </Text>
          <MaterialCommunityIcons name="cellphone" size={14} color="#8f8675" />
        </View>
        <View className="items-center">
          <WidgetPreview
            type="medium"
            data={{
              tag: `${ayah?.surahName || "Surah"} ${ayah?.surahNumber || ""}:${ayah?.ayahNumber || ""}`,
              title: ayah?.arabic || "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
              translation:
                ayah?.translation || "Indeed, with hardship comes ease.",
              backgroundColor: widgetSettings.backgroundColor,
              arabicColor: widgetSettings.arabicColor,
              translationColor: widgetSettings.translationColor,
              metaColor: widgetSettings.metaColor,
              arabicSize: widgetSettings.arabicSize,
              translationSize: widgetSettings.translationSize,
              width: Math.min(widgetSettings.width, 340),
              height: Math.min(widgetSettings.height, 220),
            }}
          />
        </View>
      </View>

      <View className="mt-4 rounded-3xl border border-sanctuary-border/30 bg-white/50 p-4 dark:border-sanctuary-border-dark/30 dark:bg-white/5">
        <View className="flex-row items-center justify-between">
          <Text className="text-[10px] font-bold uppercase tracking-[2px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
            Presets
          </Text>
          <MaterialCommunityIcons
            name="palette-swatch-variant"
            size={14}
            color="#8f8675"
          />
        </View>
        <View className="mt-2 flex-row flex-wrap gap-2">
          {WIDGET_PRESET_KEYS.map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => onPickPreset(key)}
              className="rounded-full border px-3 py-2"
              style={{
                borderColor: widgetPreset === key ? "#b0926a" : "#cdc6b6",
                backgroundColor:
                  widgetPreset === key ? "#f5e1a7" : "rgba(255,255,255,0.75)",
              }}
            >
              <Text className="text-[10px] font-bold tracking-[0.6px] text-[#574a1e]">
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="mt-4 rounded-3xl border border-sanctuary-border/30 bg-white/50 p-4 dark:border-sanctuary-border-dark/30 dark:bg-white/5">
        <View className="flex-row items-center justify-between">
          <Text className="text-[10px] font-bold uppercase tracking-[2px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
            Dimensions & Text
          </Text>
          <MaterialCommunityIcons
            name="format-size"
            size={14}
            color="#8f8675"
          />
        </View>

        {SIZE_CONTROLS.map((item) => (
          <View
            key={item.field}
            className="mt-3 rounded-2xl border border-sanctuary-border/30 bg-white/70 p-3 dark:border-sanctuary-border-dark/30 dark:bg-white/5"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-xs font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
                {item.label}
              </Text>
              <Text className="text-[10px] font-bold uppercase tracking-[1px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
                {item.min} - {item.max}
              </Text>
            </View>
            <View className="mt-2 flex-row items-center justify-between">
              <TouchableOpacity
                className="h-9 w-9 items-center justify-center rounded-full border border-sanctuary-border bg-white/70 dark:bg-white/10"
                onPress={() =>
                  onAdjustSetting(item.field, -item.step, item.min, item.max)
                }
              >
                <MaterialCommunityIcons
                  name="minus"
                  size={18}
                  color="#574a1e"
                />
              </TouchableOpacity>
              <Text className="min-w-[72px] rounded-full bg-sanctuary-accent/15 px-3 py-1 text-center text-sm font-bold text-sanctuary-accent">
                {widgetSettings[item.field]}
              </Text>
              <TouchableOpacity
                className="h-9 w-9 items-center justify-center rounded-full border border-sanctuary-border bg-white/70 dark:bg-white/10"
                onPress={() =>
                  onAdjustSetting(item.field, item.step, item.min, item.max)
                }
              >
                <MaterialCommunityIcons name="plus" size={18} color="#574a1e" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View className="mt-4 rounded-3xl border border-sanctuary-border/30 bg-white/50 p-4 dark:border-sanctuary-border-dark/30 dark:bg-white/5">
        <View className="flex-row items-center justify-between">
          <Text className="text-[10px] font-bold uppercase tracking-[2px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
            Colors
          </Text>
          <MaterialCommunityIcons
            name="eyedropper-variant"
            size={14}
            color="#8f8675"
          />
        </View>
        {COLOR_FIELDS.map((field) => (
          <View
            key={field.key}
            className="mt-3 rounded-2xl border border-sanctuary-border/30 bg-white/70 p-3 dark:border-sanctuary-border-dark/30 dark:bg-white/5"
          >
            <Text className="text-xs font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
              {field.label}
            </Text>
            <View className="mt-2 flex-row flex-wrap gap-2">
              {COLOR_PRESETS.map((color) => (
                <TouchableOpacity
                  key={`${field.key}-${color}`}
                  className="h-8 w-8 items-center justify-center rounded-full border"
                  style={{
                    backgroundColor: color,
                    borderColor:
                      widgetSettings[field.key] === color ? "#000" : "#d4d4d4",
                    borderWidth: widgetSettings[field.key] === color ? 2 : 1,
                  }}
                  onPress={() => onSetColor(field.key, color)}
                >
                  {widgetSettings[field.key] === color ? (
                    <MaterialCommunityIcons
                      name="check"
                      size={14}
                      color={color === "#FFFFFF" ? "#111" : "#fff"}
                    />
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>

    <View className="mt-4 flex-row gap-3">
      <TouchableOpacity
        className="flex-1 rounded-full border border-sanctuary-border bg-white/60 py-3 dark:border-sanctuary-border-dark/40 dark:bg-white/5"
        onPress={onCancel}
        disabled={savingWidget}
      >
        <Text className="text-center font-bold text-sanctuary-text-muted">
          Cancel
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 rounded-full bg-sanctuary-accent py-3 shadow-lg shadow-sanctuary-accent/25"
        onPress={onApply}
        disabled={savingWidget}
      >
        {savingWidget ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-center font-bold text-white">Apply</Text>
        )}
      </TouchableOpacity>
    </View>
  </Animated.View>
);

export default WidgetPreview;
