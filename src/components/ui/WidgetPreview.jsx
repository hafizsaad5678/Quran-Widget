import React from "react";
import { Platform, Text, View } from "react-native";

const ARABIC_WIDGET_FONT = Platform.select({
  ios: "Geeza Pro",
  default: "serif",
});
const CLEAN_WIDGET_FONT = Platform.select({
  ios: "System",
  default: "sans-serif",
});

const withHexAlpha = (hex, opacity = 1) => {
  const value = String(hex || "#000000").replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value.padEnd(6, "0").slice(0, 6);
  const alpha = Math.round(Math.min(1, Math.max(0, Number(opacity || 1))) * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${alpha}${full}`;
};

export default function WidgetPreview({ data }) {
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
    arabicLines,
    translationLines,
    previewStyle,
    width,
    height,
    glassEnabled,
    glassOpacity,
    borderOpacity,
  } = data || {};

  const isHomePreview = previewStyle === "home";

  const resolveArabicFont = () => {
    if (!data) return ARABIC_WIDGET_FONT;
    const f = data.arabicFont || "platform";
    if (f === "platform") return ARABIC_WIDGET_FONT;
    if (f === "serif") return "serif";
    if (f === "sans") return "sans-serif";
    return f;
  };

  const resolveTranslationFont = () => {
    if (!data) return CLEAN_WIDGET_FONT;
    const f = data.translationFont || "platform";
    if (f === "platform") return CLEAN_WIDGET_FONT;
    if (f === "serif") return "serif";
    if (f === "sans") return "sans-serif";
    return f;
  };

  return (
    <View
      className="w-full overflow-hidden rounded-[32px] border p-5"
      style={{
        backgroundColor:
          glassEnabled === false
            ? backgroundColor || "#4b422f"
            : withHexAlpha(backgroundColor || "#4b422f", glassOpacity ?? 0.78),
        borderColor: withHexAlpha(
          metaColor || "#b0926a",
          borderOpacity ?? 0.28,
        ),
        width: width || undefined,
        height: height || 176,
      }}
    >
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: -14,
          left: -8,
          right: -8,
          height: "48%",
          backgroundColor: "rgba(255,255,255,0.08)",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 10,
          right: 16,
          width: 80,
          height: 14,
          borderRadius: 999,
          backgroundColor: "rgba(255,255,255,0.16)",
          transform: [{ rotate: "-18deg" }],
        }}
      />
      <View className="items-center">
        {!isHomePreview ? (
          <View
            className="mb-4 h-[3px] w-12 rounded-full"
            style={{ backgroundColor: `${metaColor || "#b0926a"}99` }}
          />
        ) : null}
      </View>

      <View className="flex-1 items-center justify-center px-1">
        {isHomePreview ? (
          <Text
            className="mb-2 text-[11px] font-bold"
            style={{ color: metaColor || "#9f947e", letterSpacing: 1.2 }}
          >
            {tag}
          </Text>
        ) : null}
        <Text
          className="text-center font-bold"
          style={{
            color: arabicColor || "#d3b45c",
            fontSize: arabicSize || 24,
            fontFamily: resolveArabicFont(),
            lineHeight: (arabicSize || 24) * 1.35,
          }}
          dir="rtl"
          numberOfLines={arabicLines || 3}
        >
          {title}
        </Text>
        <Text
          className={isHomePreview ? "mt-2 text-center" : "mt-3 text-center"}
          style={{
            color: translationColor || "#ddd7c8",
            fontSize: translationSize || 10,
            fontFamily: resolveTranslationFont(),
            lineHeight: (translationSize || 10) * 1.4,
            fontStyle: isHomePreview ? "italic" : "normal",
          }}
          numberOfLines={translationLines || 3}
        >
          &quot;{translation}&quot;
        </Text>
        {!isHomePreview ? (
          <Text
            className="mt-4 text-center text-[10px] font-bold uppercase tracking-[1.5px]"
            style={{
              color: metaColor || "#9f947e",
              fontFamily: CLEAN_WIDGET_FONT,
            }}
          >
            {tag}
          </Text>
        ) : null}
      </View>

      {!isHomePreview ? (
        <View
          className="items-center border-t pt-3"
          style={{ borderColor: `${metaColor || "#b0926a"}33` }}
        >
          <Text
            className="text-[11px] font-bold uppercase tracking-[1px]"
            style={{
              color: metaColor || "#b0926a",
              fontFamily: CLEAN_WIDGET_FONT,
            }}
          >
            SANCTUARY
          </Text>
        </View>
      ) : null}
    </View>
  );
}
