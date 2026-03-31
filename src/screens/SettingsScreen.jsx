import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
import TopBar from "../components/ui/TopBar";
import { useTheme } from "../context/ThemeContext";
import {
  getCurrentUser,
  onAuthStateChange,
  signOut,
} from "../services/authService";

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
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [user, setUser] = useState(null);

  const translationKey = useAppStore((s) => s.settings.translationKey);
  const updateSettings = useAppStore((s) => s.updateSettings);

  useEffect(() => {
    let mounted = true;
    getCurrentUser().then((u) => {
      if (mounted) setUser(u);
    });

    const {
      data: { subscription },
    } = onAuthStateChange((event, session) => {
      if (mounted) setUser(session?.user || null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

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
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <TopBar
        title="Digital Sanctuary"
        onLeftPress={() => router.back()}
        leftIcon="chevron-left"
        rightIcon="account"
        onRightPress={() => (!user ? router.push("/auth") : null)}
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
        <View className="mb-10">          <GlassCard className="rounded-[40px] p-8 border-none bg-white/60 dark:bg-white/5 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-sanctuary-accent/10 items-center justify-center">
                  <MaterialCommunityIcons
                    name="bell-outline"
                    size={20}
                    color="#b0926a"
                  />
                </View>
                <View className="ml-4">
                  <Text className="text-xl font-serif font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
                    Notifications
                  </Text>
                  <Text className="text-[10px] text-sanctuary-text-muted mt-1">
                    Daily reminder for reflections
                  </Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#eee", true: "#b0926a" }}
                thumbColor="white"
              />
            </View>
          </GlassCard>
        </View>

        {/* Footer */}
        <View className="items-center mt-4">
          {user ? (
            <View className="items-center">
              <Text className="text-xs text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark mb-4">
                Signed in as {user.email}
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
  );
}
