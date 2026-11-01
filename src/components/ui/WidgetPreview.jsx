import React from "react";
import { Platform, Text, View } from "react-native";

const CLEAN_WIDGET_FONT = Platform.select({
  ios: "System",
  default: "sans-serif",
});

const FONT_MAP = Platform.select({
  ios: {
    arabic: { platform: "Geeza Pro", serif: "Baghdad", sans: "Al Nile" },
    translation: {
      platform: "System",
      serif: "Georgia",
      sans: "Helvetica Neue",
    },
  },
  default: {
    arabic: { platform: "serif", serif: "serif", sans: "sans-serif" },
    translation: {
      platform: "sans-serif",
      serif: "serif",
      sans: "sans-serif",
    },
  },
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

  // iOS has no "serif"/"sans-serif" families, so use real installed fonts there.
  const resolveArabicFont = () => {
    const f = data?.arabicFont || "platform";
    return FONT_MAP.arabic[f] || FONT_MAP.arabic.platform;
  };

  const resolveTranslationFont = () => {
    const f = data?.translationFont || "platform";
    return FONT_MAP.translation[f] || FONT_MAP.translation.platform;
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
        {isHomePreview ? (
          <Text
            className="mb-1 text-[11px] font-bold"
            numberOfLines={1}
            style={{ color: metaColor || "#9f947e", letterSpacing: 1.2 }}
          >
            {tag}
          </Text>
        ) : (
          <View
            className="mb-4 h-[3px] w-12 rounded-full"
            style={{ backgroundColor: `${metaColor || "#b0926a"}99` }}
          />
        )}
      </View>

      <View
        className="flex-1 items-center justify-center px-1"
        style={{ minHeight: 0 }}
      >
        <Text
          className="text-center font-bold"
          style={{
            flexShrink: 1,
            color: arabicColor || "#d3b45c",
            fontSize: arabicSize || 24,
            fontFamily: resolveArabicFont(),
            lineHeight: (arabicSize || 24) * 1.75,
            paddingTop: 4,
            includeFontPadding: true,
          }}
          dir="rtl"
          numberOfLines={arabicLines || 3}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
        >
          {title}
        </Text>
        <Text
          className={isHomePreview ? "mt-2 text-center" : "mt-3 text-center"}
          style={{
            flexShrink: 1,
            color: translationColor || "#ddd7c8",
            fontSize: translationSize || 10,
            fontFamily: resolveTranslationFont(),
            lineHeight: (translationSize || 10) * 1.4,
            fontStyle: isHomePreview ? "italic" : "normal",
          }}
          numberOfLines={translationLines || 3}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
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
