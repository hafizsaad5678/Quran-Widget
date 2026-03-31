import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "../../global.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { SessionProvider } from "../context/SessionContext";
import { ThemeProvider } from "../context/ThemeContext";
import { ToastProvider } from "../context/ToastContext";
import { startNetworkSyncListener } from "../services/cloudSyncService";
import { initializeNotifications } from "../services/notificationService";
import { registerAndroidWidgetBackgroundSync } from "../services/widgetSync";

function AuthGate() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;
    const inAuthGroup = segments[0] === "auth" || segments[0] === "onboarding";
    if (!user && !inAuthGroup) {
      router.replace("/onboarding");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)/");
    }
  }, [user, loading, segments]);

  return null;
}

export default function RootLayout() {
  useEffect(() => {
    const cleanup = registerAndroidWidgetBackgroundSync();
    void initializeNotifications();
    startNetworkSyncListener();
    return cleanup;
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <SessionProvider>
          <ToastProvider>
            <AuthGate />
            <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
              <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
              <Stack.Screen name="auth" options={{ gestureEnabled: false }} />
              <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
              <Stack.Screen name="about" />
              <Stack.Screen name="collections" />
              <Stack.Screen name="situation/[key]" />
              <Stack.Screen name="quran" />
              <Stack.Screen name="surah/[number]" />
              <Stack.Screen name="reading-session" />
            </Stack>
            {/* Global floating session timer — visible on every screen */}
            <StatusBar style="auto" />
          </ToastProvider>
        </SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
