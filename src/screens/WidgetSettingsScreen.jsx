import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WidgetPreview from "../components/ui/WidgetPreview";
import WidgetSettingsForm from "../components/ui/WidgetSettingsForm";
import { useTheme } from "../context/ThemeContext";
import { useDailyAyah } from "../hooks/useDailyAyah";
import { useWidgetSettings } from "../hooks/useWidgetSettings";

export default function WidgetSettingsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { ayah } = useDailyAyah();
  const {
    savingWidget,
    widgetSettings,
    updateSettings,
    setBackgroundColor,
    setTextColor,
    applyWidgetSettings,
  } = useWidgetSettings();

  const handleApply = async () => {
    const ok = await applyWidgetSettings();
    if (ok) {
      router.replace("/(tabs)/");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.cardBackground,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={22}
              color={theme.accent}
            />
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                color: theme.text,
                fontSize: 18,
                fontWeight: "800",
                letterSpacing: 0.6,
              }}
            >
              Widget Studio
            </Text>
            <Text
              style={{ color: theme.textSecondary, fontSize: 11, opacity: 0.9 }}
            >
              Size, refresh and background
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleApply}
            disabled={savingWidget}
            style={{
              minWidth: 72,
              height: 44,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.accent,
              paddingHorizontal: 14,
              opacity: savingWidget ? 0.6 : 1,
            }}
          >
            <Text
              style={{
                color: theme.onAccent,
                fontWeight: "800",
                fontSize: 12,
              }}
            >
              {savingWidget ? "Saving" : "Apply"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pinned preview: stays in place while the settings scroll below */}
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 14,
            paddingBottom: 12,
          }}
        >
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
              previewStyle: "home",
              width: widgetSettings.width,
              height: widgetSettings.height,
              glassEnabled: widgetSettings.glassEnabled,
              glassOpacity: widgetSettings.glassOpacity,
              borderOpacity: widgetSettings.borderOpacity,
              arabicFont: widgetSettings.arabicFont,
              translationFont: widgetSettings.translationFont,
            }}
          />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 28 }}
          showsVerticalScrollIndicator={false}
        >
          <WidgetSettingsForm
            theme={theme}
            widgetSettings={widgetSettings}
            onUpdate={updateSettings}
            onSetBackground={setBackgroundColor}
            onSetText={setTextColor}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
