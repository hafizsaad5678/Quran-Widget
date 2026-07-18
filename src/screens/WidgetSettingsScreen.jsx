import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    adjustSetting,
    setColorSetting,
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
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: 999,
            backgroundColor: theme.softAccent,
            top: -40,
            right: -60,
          }}
        />
        <View
          style={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: 999,
            backgroundColor: theme.softAccent,
            bottom: 120,
            left: -70,
            opacity: 0.65,
          }}
        />

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
              Customize widget look and behavior
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
              backgroundColor: theme.buttonBackground,
              borderWidth: 1,
              borderColor: theme.border,
              paddingHorizontal: 14,
            }}
          >
            <Text
              style={{
                color: theme.buttonText,
                fontWeight: "800",
                fontSize: 12,
              }}
            >
              {savingWidget ? "Saving" : "Apply"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 28 }}
          showsVerticalScrollIndicator={false}
        >
          <WidgetSettingsForm
            ayah={ayah}
            theme={theme}
            widgetSettings={widgetSettings}
            savingWidget={savingWidget}
            onAdjustSetting={adjustSetting}
            onSetColor={setColorSetting}
            onCancel={() => router.back()}
            onApply={handleApply}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
