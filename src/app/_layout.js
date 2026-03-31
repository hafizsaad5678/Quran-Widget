import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import "../../global.css";
import { ThemeProvider } from "../context/ThemeContext";
import { initializeNotifications } from "../services/notificationService";
import { registerAndroidWidgetBackgroundSync } from "../services/widgetSync";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

function AppTabs() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.cardBackground,
          borderTopWidth: 0,
          height: 60 + insets.bottom,
          paddingTop: 10,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.05,
          shadowRadius: 15,
          elevation: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full items-center justify-center ${focused ? "bg-sanctuary-accent/10" : ""}`}
            >
              <MaterialCommunityIcons
                name={focused ? "home-variant" : "home-variant-outline"}
                color={color}
                size={24}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="situations"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full items-center justify-center ${focused ? "bg-sanctuary-accent/10" : ""}`}
            >
              <MaterialCommunityIcons
                name={focused ? "compass" : "compass-outline"}
                color={color}
                size={24}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ayah"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full items-center justify-center ${focused ? "bg-sanctuary-accent/10" : ""}`}
            >
              <MaterialCommunityIcons
                name={focused ? "widgets" : "widgets-outline"}
                color={color}
                size={24}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full items-center justify-center ${focused ? "bg-sanctuary-accent/10" : ""}`}
            >
              <MaterialCommunityIcons
                name={focused ? "chart-box" : "chart-box-outline"}
                color={color}
                size={24}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full items-center justify-center ${focused ? "bg-sanctuary-accent/10" : ""}`}
            >
              <MaterialCommunityIcons
                name={focused ? "account-settings" : "account-settings-outline"}
                color={color}
                size={24}
              />
            </View>
          ),
        }}
      />
      {/* Hidden sub-screens (navigated to via router.push, not tabs) */}
      <Tabs.Screen name="about" options={{ href: null }} />
      <Tabs.Screen name="auth" options={{ href: null }} />
      <Tabs.Screen name="situation/[key]" options={{ href: null }} />
      <Tabs.Screen name="pause" options={{ href: null }} />
      <Tabs.Screen name="countdown" options={{ href: null }} />
      <Tabs.Screen name="collections" options={{ href: null }} />
      <Tabs.Screen name="widgets" options={{ href: null }} />
    </Tabs>
  );
}

export default function RootLayout() {
  useEffect(() => {
    const cleanup = registerAndroidWidgetBackgroundSync();
    void initializeNotifications();
    return cleanup;
  }, []);

  return (
    <ThemeProvider>
      <AppTabs />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
