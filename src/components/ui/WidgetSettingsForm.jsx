import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  FONT_OPTIONS,
  INTERVAL_OPTIONS,
} from "../../constants/widgetSettingsUi";

// One universal palette, used for both background and text.
const SWATCHES = [
  "#111111",
  "#1F1A10",
  "#2A2417",
  "#3D2B00",
  "#8B6B12",
  "#A67C00",
  "#C79A1B",
  "#D4AF37",
  "#FFD700",
  "#FFE9A3",
  "#FACC15",
  "#F3E7C8",
  "#FFFFFF",
];

const isLight = (hex) => {
  const v = String(hex || "#000000").replace("#", "");
  const full = v.length === 3 ? v.split("").map((c) => c + c).join("") : v.padEnd(6, "0");
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62;
};

// "Text size" drives Arabic and translation together.
const ARABIC_RANGE = [16, 28];
const TRANSLATION_RANGE = [11, 18];
const toPercent = (value, [min, max]) =>
  Math.round(((Number(value) - min) / (max - min)) * 100);
const fromPercent = (percent, [min, max]) =>
  Math.round(min + (percent / 100) * (max - min));

function Section({ title, icon, t, children }) {
  return (
    <View
      className="mt-3 rounded-3xl border p-4"
      style={{ borderColor: t.border, backgroundColor: t.cardBackground }}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className="text-[10px] font-bold uppercase tracking-[2px]"
          style={{ color: t.textSecondary }}
        >
          {title}
        </Text>
        <MaterialCommunityIcons name={icon} size={14} color={t.accent} />
      </View>
      {children}
    </View>
  );
}

function SliderRow({ title, valueText, value, onChange, t }) {
  return (
    <View className="mt-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-xs font-bold" style={{ color: t.accent }}>
          {title}
        </Text>
        <Text className="text-[10px] font-bold" style={{ color: t.textSecondary }}>
          {valueText}
        </Text>
      </View>
      <Slider
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={value}
        minimumTrackTintColor={t.accent}
        maximumTrackTintColor={t.border}
        thumbTintColor={t.accent}
        onValueChange={onChange}
      />
    </View>
  );
}

function Chip({ label, active, onPress, t }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-full border px-4 py-2"
      style={{
        borderColor: active ? t.accent : t.border,
        backgroundColor: active ? t.softAccent : "transparent",
      }}
    >
      <Text
        className="text-[11px] font-bold"
        style={{ color: active ? t.accent : t.textSecondary }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function Swatch({ color, active, onPress, t }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center justify-center"
      style={{
        width: 34,
        height: 34,
        borderRadius: 999,
        backgroundColor: color,
        borderWidth: active ? 3 : 1,
        borderColor: active ? t.accent : t.border,
      }}
    >
      {active ? (
        <MaterialCommunityIcons
          name="check"
          size={14}
          color={isLight(color) ? "#1F1A10" : "#FFFFFF"}
        />
      ) : null}
    </TouchableOpacity>
  );
}

function PaletteRow({ value, onPick, t }) {
  return (
    <View className="mt-3 flex-row flex-wrap" style={{ gap: 10 }}>
      {SWATCHES.map((swatch) => (
        <Swatch
          key={swatch}
          color={swatch}
          active={String(value || "").toLowerCase() === swatch.toLowerCase()}
          onPress={() => onPick(swatch)}
          t={t}
        />
      ))}
    </View>
  );
}

/** Compact widget settings: size, refresh, background and text color. */
export default function WidgetSettingsForm({
  widgetSettings,
  onUpdate,
  onSetBackground,
  onSetText,
  theme: t,
}) {
  const sizePercent = Math.round(
    ((Number(widgetSettings.width) - 220) / 180) * 100,
  );
  const textPercent = toPercent(widgetSettings.arabicSize, ARABIC_RANGE);

  return (
    <View>
      <Section title="Size" icon="resize" t={t}>
        <SliderRow
          title="Widget size"
          valueText={`${widgetSettings.width} x ${widgetSettings.height}`}
          value={sizePercent}
          onChange={(v) =>
            onUpdate({
              width: Math.round((220 + (v / 100) * 180) / 10) * 10,
              height: Math.round((130 + (v / 100) * 130) / 10) * 10,
            })
          }
          t={t}
        />
        <SliderRow
          title="Text size"
          valueText={`${widgetSettings.arabicSize}pt`}
          value={textPercent}
          onChange={(v) =>
            onUpdate({
              arabicSize: fromPercent(v, ARABIC_RANGE),
              translationSize: fromPercent(v, TRANSLATION_RANGE),
            })
          }
          t={t}
        />
      </Section>

      <Section title="Translation font" icon="format-font" t={t}>
        <Text className="mt-3 text-xs font-bold" style={{ color: t.accent }}>
          Translation
        </Text>
        <View className="mt-2 flex-row flex-wrap gap-2">
          {FONT_OPTIONS.translation.map((font) => (
            <Chip
              key={`translation-${font.key}`}
              label={font.label}
              active={
                (widgetSettings.translationFont || "platform") === font.key
              }
              onPress={() => onUpdate({ translationFont: font.key })}
              t={t}
            />
          ))}
        </View>
      </Section>

      <Section title="Refresh" icon="clock-outline" t={t}>
        <View className="mt-3 flex-row flex-wrap gap-2">
          {INTERVAL_OPTIONS.map((hours) => (
            <Chip
              key={`interval-${hours}`}
              label={`${hours}h`}
              active={Number(widgetSettings.intervalHours) === hours}
              onPress={() => onUpdate({ intervalHours: hours })}
              t={t}
            />
          ))}
        </View>
      </Section>

      <Section title="Background" icon="palette-outline" t={t}>
        <PaletteRow
          value={widgetSettings.backgroundColor}
          onPick={onSetBackground}
          t={t}
        />
      </Section>

      <Section title="Text color" icon="format-color-text" t={t}>
        <Text className="mt-1 text-[11px]" style={{ color: t.textSecondary }}>
          One color for all widget text.
        </Text>
        <PaletteRow
          value={widgetSettings.arabicColor}
          onPick={onSetText}
          t={t}
        />
      </Section>

    </View>
  );
}
