import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlassCard from "../components/ui/GlassCard";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";
import { TRANSLATION_OPTIONS } from "../constants/translations";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { signOut } from "../services/authService";
import { updateReminderWindow } from "../services/notificationService";
import { useAppStore } from "../store/useAppStore";

const SegmentedControl = ({ options, activeValue, onSelect, theme }) => (
  <View
    className="mt-4 flex-row rounded-2xl p-1"
    style={{ backgroundColor: theme.cardAlternative }}
  >
    {options.map((opt) => {
      const isActive = activeValue === opt.value;
      return (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onSelect(opt.value)}
          className="flex-1 flex-row items-center justify-center rounded-xl py-2.5"
          style={{
            backgroundColor: isActive ? theme.cardBackground : "transparent",
            borderWidth: isActive ? 1 : 0,
            borderColor: isActive ? theme.border : "transparent",
          }}
        >
          <MaterialCommunityIcons
            name={opt.icon}
            size={18}
            color={isActive ? theme.accent : theme.textSecondary}
          />
          <Text
            className="ml-2 text-xs font-bold"
            style={{ color: isActive ? theme.text : theme.textSecondary }}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default function SettingsScreen() {
  const router = useRouter();
  const { themeMode, setThemeMode, theme } = useTheme();
  const { user, displayName } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const translationKey = useAppStore((s) => s.settings.translationKey);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const reminderSettings = useAppStore((s) => s.settings.reminderSettings);

  // Notification time options shown in the picker
  const REMINDER_OPTIONS = [
    { label: "Morning (8:00 AM)", value: "morning", icon: "weather-sunny" },
    { label: "Afternoon (1:00 PM)", value: "afternoon", icon: "weather-partly-cloudy" },
    { label: "Evening (7:00 PM)", value: "evening", icon: "weather-night" },
  ];

  const handleReminderChange = async (window) => {
    updateSettings({ reminderSettings: { ...reminderSettings, window } });
    await updateReminderWindow(window);
  };

  const handleThemeChange = (mode) => {
    setThemeMode(mode);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      Alert.alert("Signed Out", "You have been successfully signed out.");
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <SwipeBackContainer>
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <TopBar
        title="Digital Sanctuary"
        onLeftPress={() => router.back()}
        leftIcon="chevron-left"
      />

      <ScrollView
        className="px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Appearance Section */}
        <View className="mt-8 mb-6">
          <GlassCard
            className="rounded-[40px] p-8 border-none"
            style={{ backgroundColor: theme.cardBackground }}
          >
            <View className="flex-row items-center mb-8">
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: theme.softAccent }}
              >
                <MaterialCommunityIcons
                  name="palette-swatch"
                  size={20}
                  color={theme.accent}
                />
              </View>
              <Text
                className="ml-4 text-xl font-serif font-bold"
                style={{ color: theme.text }}
              >
                Appearance
              </Text>
            </View>

            <View className="mt-8">
              <Text
                className="text-[10px] font-bold uppercase tracking-[2px]"
                style={{ color: theme.textSecondary }}
              >
                Interface Theme
              </Text>
              <SegmentedControl
                options={[
                  {
                    label: "Light",
                    value: "light",
                    icon: "white-balance-sunny",
                  },
                  {
                    label: "Dark",
                    value: "dark",
                    icon: "moon-waning-crescent",
                  },
                  { label: "Auto", value: "auto", icon: "monitor-screenshot" },
                ]}
                activeValue={themeMode}
                onSelect={handleThemeChange}
                theme={theme}
              />
            </View>
          </GlassCard>
        </View>

        {/* Translation Section */}
        <View className="mb-6">
          <GlassCard
            className="rounded-[40px] p-8 border-none"
            style={{ backgroundColor: theme.cardBackground }}
          >
            <View className="flex-row items-center mb-6">
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: theme.softAccent }}
              >
                <MaterialCommunityIcons
                  name="translate"
                  size={20}
                  color={theme.accent}
                />
              </View>
              <Text
                className="ml-4 text-xl font-serif font-bold"
                style={{ color: theme.text }}
              >
                Translation Style
              </Text>
            </View>

            {TRANSLATION_OPTIONS.map((opt) => {
              const isActive = translationKey === opt.key;
              return (
                <TouchableOpacity
                  key={opt.key}
                  onPress={() => updateSettings({ translationKey: opt.key })}
                  className="flex-row items-center justify-between py-3 border-b"
                  style={{ borderBottomColor: theme.border }}
                >
                  <Text
                    className="text-sm font-bold"
                    style={{ color: isActive ? theme.accent : theme.text }}
                  >
                    {opt.label}
                  </Text>
                  {isActive && (
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={20}
                      color={theme.accent}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </GlassCard>
        </View>

        {/* Situations Section */}
        <View className="mb-6">
          <TouchableOpacity onPress={() => router.push("/situations")}>
            <GlassCard
              className="rounded-[40px] p-8 border-none"
              style={{ backgroundColor: theme.cardBackground }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: theme.softAccent }}
                  >
                    <MaterialCommunityIcons
                      name="compass-outline"
                      size={20}
                      color={theme.accent}
                    />
                  </View>
                  <View className="ml-4">
                    <Text
                      className="text-xl font-serif font-bold"
                      style={{ color: theme.text }}
                    >
                      Situations
                    </Text>
                    <Text
                      className="text-[10px] mt-1"
                      style={{ color: theme.textSecondary }}
                    >
                      Find ayahs for your current moment
                    </Text>
                  </View>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={22}
                  color={theme.textSecondary}
                />
              </View>
            </GlassCard>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View className="mb-10">
          <GlassCard
            className="rounded-[40px] p-8 border-none"
            style={{ backgroundColor: theme.cardBackground }}
          >
            <View className="flex-row items-center mb-6">
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: theme.softAccent }}
              >
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={20}
                  color={theme.accent}
                />
              </View>
              <View className="ml-4 flex-1">
                <Text
                  className="text-xl font-serif font-bold"
                  style={{ color: theme.text }}
                >
                  Notifications
                </Text>
                <Text
                  className="text-[10px] mt-1"
                  style={{ color: theme.textSecondary }}
                >
                  Choose your daily reminder time
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#eee", true: "#b0926a" }}
                thumbColor="white"
              />
            </View>

            {notificationsEnabled &&
              REMINDER_OPTIONS.map((opt) => {
                const isActive = reminderSettings.window === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => handleReminderChange(opt.value)}
                    className="flex-row items-center justify-between py-3 border-b"
                    style={{ borderBottomColor: theme.border }}
                  >
                    <View className="flex-row items-center gap-3">
                      <MaterialCommunityIcons
                        name={opt.icon}
                        size={18}
                        color={isActive ? theme.accent : theme.textSecondary}
                      />
                      <Text
                        className="text-sm font-bold"
                        style={{
                          color: isActive ? theme.accent : theme.text,
                        }}
                      >
                        {opt.label}
                      </Text>
                    </View>
                    {isActive && (
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={20}
                        color={theme.accent}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
          </GlassCard>
        </View>

        {/* Footer */}
        <View className="items-center mt-4">
          {user ? (
            <View className="items-center">
              <Text className="text-base font-bold mb-1" style={{ color: theme.text }}>
                {displayName}
              </Text>
              <Text className="text-xs mb-4" style={{ color: theme.textSecondary }}>
                {user.email}
              </Text>
              <TouchableOpacity
                className="flex-row items-center mb-8"
                onPress={handleSignOut}
              >
                <MaterialCommunityIcons
                  name="logout-variant"
                  size={18}
                  color="#b44"
                />
                <Text className="ml-2 text-sm font-bold text-red-600">
                  Sign out of Ayah Connect
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              className="flex-row items-center mb-8"
              onPress={() => router.push("/auth")}
            >
              <MaterialCommunityIcons
                name="login-variant"
                size={18}
                color="#b0926a"
              />
              <Text className="ml-2 text-sm font-bold text-sanctuary-accent">
                Sign into Ayah Connect to Sync
              </Text>
            </TouchableOpacity>
          )}

          <Text className="text-[8px] font-bold text-sanctuary-text-muted uppercase tracking-[3px]">
            Version 2.4.0 • Ayah Connect
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
    </SwipeBackContainer>
  );
}
