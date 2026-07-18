import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React from "react";
import {
  ActivityIndicator,
  InteractionManager,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import {
  COLOR_FIELDS,
  INTERVAL_OPTIONS,
} from "../../constants/widgetSettingsUi";
import WidgetPreview from "./WidgetPreview";

const ICON_TINT = "#8f8675";

const FIELD_SWATCHES = {
  backgroundColor: [
    "#1F1A10",
    "#111111",
    "#2A2417",
    "#312A1A",
    "#3A3322",
    "#242021",
  ],
  arabicColor: [
    "#FFE9A3",
    "#FACC15",
    "#F8E7A1",
    "#EBD38A",
    "#D4AF37",
    "#FFFFFF",
  ],
  translationColor: [
    "#F3E7C8",
    "#EADCB8",
    "#D9CBA0",
    "#CBB98A",
    "#BFAE80",
    "#A79366",
  ],
  metaColor: ["#FFD700", "#E1B94A", "#D4AF37", "#C79A1B", "#A67C00", "#8B6B12"],
};

function SwatchDot({ color, active, onPress, t }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center justify-center"
      style={{
        width: 28,
        height: 28,
        borderRadius: 999,
        backgroundColor: color,
        borderWidth: active ? 3 : 1,
        borderColor: active ? t.accent : t.border,
      }}
    >
      {active ? (
        <MaterialCommunityIcons name="check" size={12} color="#ffffff" />
      ) : null}
    </TouchableOpacity>
  );
}

function Section({ title, icon, note, t, children }) {
  return (
    <View
      className="mt-4 rounded-3xl border p-4"
      style={{ borderColor: t.border, backgroundColor: t.cardBackground }}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className="text-[10px] font-bold uppercase tracking-[2px]"
          style={{ color: t.textSecondary }}
        >
          {title}
        </Text>
        {icon ? (
          <MaterialCommunityIcons name={icon} size={14} color={ICON_TINT} />
        ) : null}
      </View>
      {note ? (
        <Text className="mt-1 text-[11px]" style={{ color: t.textSecondary }}>
          {note}
        </Text>
      ) : null}
      {children}
    </View>
  );
}

function BubbleChip({ label, active, onPress, t }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-full border px-3 py-2"
      style={{
        borderColor: active ? t.accent : t.border,
        backgroundColor: active ? t.softAccent : t.cardBackground,
      }}
    >
      <Text
        className="text-[10px] font-bold tracking-[0.6px]"
        style={{ color: active ? t.accent : t.textSecondary }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function SliderRow({ title, valueText, value, min, max, step, onChange, t }) {
  return (
    <View
      className="mt-3 rounded-2xl border p-3"
      style={{ borderColor: t.border, backgroundColor: t.cardBackground }}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-xs font-bold" style={{ color: t.text }}>
          {title}
        </Text>
        <Text
          className="text-[10px] font-bold uppercase tracking-[1px]"
          style={{ color: t.textSecondary }}
        >
          {valueText}
        </Text>
      </View>
      <Slider
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        minimumTrackTintColor={t.accent}
        maximumTrackTintColor={t.border}
        thumbTintColor={t.accent}
        onValueChange={onChange}
      />
    </View>
  );
}

function ColorRow({ field, value, swatches, onQuickPick, onEdit, t }) {
  return (
    <View
      className="mt-3 rounded-2xl border p-3"
      style={{ borderColor: t.border, backgroundColor: t.cardBackground }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View
            className="h-8 w-8 rounded-full border"
            style={{ backgroundColor: value, borderColor: t.border }}
          />
          <View className="ml-3">
            <Text className="text-xs font-bold" style={{ color: t.text }}>
              {field.label}
            </Text>
            <Text
              className="text-[10px] font-semibold uppercase tracking-[1px]"
              style={{ color: t.textSecondary }}
            >
              {value}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={onEdit}
          className="rounded-full border px-3 py-1.5"
          style={{ borderColor: t.border, backgroundColor: t.softAccent }}
        >
          <Text style={{ fontSize: 10, fontWeight: "700", color: t.accent }}>
            Tune
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-3 flex-row flex-wrap" style={{ gap: 8 }}>
        {swatches.map((swatch) => (
          <SwatchDot
            key={`${field.key}-${swatch}`}
            color={swatch}
            active={value?.toLowerCase() === swatch.toLowerCase()}
            onPress={() => onQuickPick(swatch)}
            t={t}
          />
        ))}
      </View>
    </View>
  );
}

export default function WidgetSettingsForm({
  ayah,
  widgetSettings,
  savingWidget,
  onAdjustSetting,
  onSetColor,
  onCancel,
  onApply,
  theme,
}) {
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const [renderColorPicker, setRenderColorPicker] = React.useState(false);
  const [activeColorField, setActiveColorField] = React.useState(null);
  const [selectedColor, setSelectedColor] = React.useState("#3b82f6");

  const t = theme || {
    background: "#F0F0F5",
    cardBackground: "rgba(255,255,255,0.6)",
    text: "#000000",
    textSecondary: "rgba(0,0,0,0.5)",
    accent: "#D4AF37",
    softAccent: "rgba(212,175,55,0.15)",
    border: "rgba(0,0,0,0.08)",
    buttonBackground: "#000000",
    buttonText: "#FFFFFF",
  };

  const openColorPicker = (fieldKey) => {
    setActiveColorField(fieldKey);
    setSelectedColor(widgetSettings[fieldKey] || "#3b82f6");
    setRenderColorPicker(false);
    setPickerVisible(true);
  };

  const closeColorPicker = () => {
    setPickerVisible(false);
    setRenderColorPicker(false);
    setActiveColorField(null);
  };

  React.useEffect(() => {
    if (!pickerVisible) return;
    const task = InteractionManager.runAfterInteractions(() => {
      setRenderColorPicker(true);
    });

    return () => {
      task?.cancel?.();
    };
  }, [pickerVisible]);

  const applyColorLive = (nextColor) => {
    setSelectedColor(nextColor);
    if (activeColorField) {
      onSetColor(activeColorField, nextColor);
    }
  };

  const activeColorLabel =
    COLOR_FIELDS.find((item) => item.key === activeColorField)?.label ||
    "Color";
  const swatches = FIELD_SWATCHES[activeColorField] || [];

  return (
    <>
      <View
        className="rounded-[30px] p-5 shadow-2xl shadow-black/20"
        style={{
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.background,
        }}
      >
        <View
          className="mt-1 flex-row items-center rounded-2xl border px-3 py-2"
          style={{ borderColor: t.border, backgroundColor: t.cardBackground }}
        >
          <View
            className="h-10 w-10 items-center justify-center rounded-xl"
            style={{ backgroundColor: t.softAccent }}
          >
            <MaterialCommunityIcons
              name="view-grid-plus-outline"
              size={20}
              color={t.accent}
            />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-lg font-bold" style={{ color: t.text }}>
              Widget Settings
            </Text>
            <Text className="text-xs" style={{ color: t.textSecondary }}>
              NightGold is fixed. Use size, text, preview style, and colors.
            </Text>
          </View>
        </View>

        <View className="mt-4">
          <Section
            title="Live Preview"
            icon="cellphone"
            note="Preview updates instantly as you change options."
            t={t}
          >
            <View className="mt-2 items-center">
              <WidgetPreview
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
                  arabicLines: widgetSettings.arabicLines,
                  translationLines: widgetSettings.translationLines,
                  previewStyle: widgetSettings.previewStyle,
                  width: widgetSettings.width,
                  height: widgetSettings.height,
                  glassEnabled: widgetSettings.glassEnabled,
                  glassOpacity: widgetSettings.glassOpacity,
                  borderOpacity: widgetSettings.borderOpacity,
                }}
              />
            </View>
          </Section>

          <Section
            title="Size & Text"
            icon="format-size"
            note="Control layout and typography. Changes also apply to Home screen."
            t={t}
          >
            <SliderRow
              title="Layout Size"
              valueText={`${widgetSettings.width} x ${widgetSettings.height}`}
              value={Math.round(
                ((Number(widgetSettings.width) - 220) / 180) * 100,
              )}
              min={0}
              max={100}
              step={1}
              onChange={(v) => {
                const nextWidth = Math.round((220 + (v / 100) * 180) / 10) * 10;
                const nextHeight =
                  Math.round((130 + (v / 100) * 130) / 10) * 10;
                onSetColor("width", nextWidth);
                onSetColor("height", nextHeight);
              }}
              t={t}
            />

            <SliderRow
              title="Arabic Font Size"
              valueText={`${widgetSettings.arabicSize}pt`}
              value={Number(widgetSettings.arabicSize) || 20}
              min={14}
              max={40}
              step={1}
              onChange={(v) => {
                onSetColor("arabicSize", Math.round(v));
              }}
              t={t}
            />

            <SliderRow
              title="Translation Font Size"
              valueText={`${widgetSettings.translationSize}pt`}
              value={Number(widgetSettings.translationSize) || 14}
              min={10}
              max={24}
              step={1}
              onChange={(v) => {
                onSetColor("translationSize", Math.round(v));
              }}
              t={t}
            />

            <SliderRow
              title="Line Spacing"
              valueText={`${Number(widgetSettings.lineSpacing || 1.25).toFixed(2)}x`}
              value={Number(widgetSettings.lineSpacing || 1.25)}
              min={1.0}
              max={2.0}
              step={0.05}
              onChange={(v) => {
                onSetColor("lineSpacing", Number(v.toFixed(2)));
              }}
              t={t}
            />
          </Section>

          <Section
            title="Preview Style"
            icon="view-dashboard-outline"
            note="Choose how ayah content is arranged inside widget."
            t={t}
          >
            <View className="mt-2 flex-row gap-2">
              <BubbleChip
                label="Widget Style"
                active={widgetSettings.previewStyle === "widget"}
                onPress={() => onSetColor("previewStyle", "widget")}
                t={t}
              />
              <BubbleChip
                label="Home Like"
                active={widgetSettings.previewStyle === "home"}
                onPress={() => onSetColor("previewStyle", "home")}
                t={t}
              />
            </View>
          </Section>

          <Section
            title="Refresh Interval"
            icon="clock-outline"
            note="Choose how often widget content updates."
            t={t}
          >
            <View className="mt-2 flex-row flex-wrap gap-2">
              {INTERVAL_OPTIONS.map((hours) => (
                <BubbleChip
                  key={`interval-${hours}`}
                  label={`${hours}h`}
                  active={Number(widgetSettings.intervalHours) === hours}
                  onPress={() =>
                    onAdjustSetting(
                      "intervalHours",
                      hours - Number(widgetSettings.intervalHours || 6),
                      1,
                      24,
                    )
                  }
                  t={t}
                />
              ))}
            </View>
          </Section>

          <Section
            title="Colors"
            icon="eyedropper-variant"
            note="Tap a swatch for instant change. Use Tune only when you need custom shade."
            t={t}
          >
            {COLOR_FIELDS.map((field) => (
              <ColorRow
                key={field.key}
                field={field}
                value={widgetSettings[field.key]}
                swatches={FIELD_SWATCHES[field.key] || []}
                onQuickPick={(color) => onSetColor(field.key, color)}
                onEdit={() => openColorPicker(field.key)}
                t={t}
              />
            ))}
          </Section>
        </View>

        <View className="mt-4 flex-row gap-3">
          <TouchableOpacity
            className="flex-1 rounded-full border py-3"
            style={{ borderColor: t.border, backgroundColor: t.cardBackground }}
            onPress={onCancel}
            disabled={savingWidget}
          >
            <Text
              className="text-center font-bold"
              style={{ color: t.textSecondary }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 rounded-full py-3"
            style={{ backgroundColor: t.buttonBackground }}
            onPress={onApply}
            disabled={savingWidget}
          >
            {savingWidget ? (
              <ActivityIndicator color={t.buttonText} />
            ) : (
              <Text
                className="text-center font-bold"
                style={{ color: t.buttonText }}
              >
                Apply
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
        onRequestClose={closeColorPicker}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.55)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 360,
              borderRadius: 18,
              backgroundColor: t.background,
              borderWidth: 1,
              borderColor: t.border,
              padding: 14,
            }}
          >
            <Text
              style={{
                color: t.text,
                fontSize: 14,
                fontWeight: "700",
                marginBottom: 8,
              }}
            >
              Select {activeColorLabel}
            </Text>
            <TouchableOpacity
              onPress={closeColorPicker}
              className="absolute right-3 top-3 h-8 w-8 items-center justify-center rounded-full"
              style={{
                backgroundColor: t.cardBackground,
                borderWidth: 1,
                borderColor: t.border,
              }}
            >
              <MaterialCommunityIcons
                name="close"
                size={16}
                color={t.textSecondary}
              />
            </TouchableOpacity>

            <View
              className="mb-3 rounded-xl border p-3"
              style={{
                borderColor: t.border,
                backgroundColor: t.cardBackground,
              }}
            >
              <Text
                style={{
                  color: t.textSecondary,
                  fontSize: 10,
                  fontWeight: "700",
                  marginBottom: 8,
                }}
              >
                RECOMMENDED
              </Text>
              <View className="flex-row flex-wrap" style={{ gap: 8 }}>
                {swatches.map((swatch) => (
                  <SwatchDot
                    key={swatch}
                    color={swatch}
                    active={
                      selectedColor?.toLowerCase() === swatch.toLowerCase()
                    }
                    onPress={() => applyColorLive(swatch)}
                    t={t}
                  />
                ))}
              </View>
            </View>

            <View
              style={{
                height: 200,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {renderColorPicker ? (
                <ColorPicker
                  color={selectedColor}
                  onColorChange={(color) => setSelectedColor(color)}
                  onColorChangeComplete={(color) => applyColorLive(color)}
                  thumbSize={28}
                  sliderSize={18}
                  swatches={false}
                  noSnap
                  row={false}
                />
              ) : (
                <ActivityIndicator color={t.accent} />
              )}
            </View>

            <View
              style={{
                marginTop: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  backgroundColor: selectedColor,
                  borderWidth: 1,
                  borderColor: t.border,
                }}
              />
              <Text
                style={{
                  color: t.text,
                  marginLeft: 10,
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {selectedColor}
              </Text>
            </View>

            <Text
              style={{ color: t.textSecondary, marginTop: 12, fontSize: 11 }}
            >
              Color saves instantly. Tap X to close.
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}
