import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import "../../global.css";
import { AuthProvider } from "../context/AuthContext";
import { SessionProvider } from "../context/SessionContext";
import { ThemeProvider } from "../context/ThemeContext";
import { ToastProvider } from "../context/ToastContext";
import { initializeNotifications } from "../services/notificationService";
import { registerAndroidWidgetBackgroundSync } from "../services/widgetSync";
import { useAppStore } from "../store/useAppStore";

// COMMENTED OUT: Auth gate disabled - app now works without login/signup
// function AuthGate() {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const segments = useSegments();
//   const rootNavState = useRootNavigationState();

//   useEffect(() => {
//     if (loading || !rootNavState?.key) return;

//     const inOnboarding = segments[0] === "onboarding";
//     const inAuth = segments[0] === "auth";

//     if (!user) {
//       if (!isSupabaseConfigured) {
//         return;
//       }

//       if (!inOnboarding && !inAuth) {
//         router.replace("/onboarding");
//       }
//       return;
//     }

//     if (inOnboarding || inAuth) {
//       router.replace("/(tabs)/");
//     }
//   }, [user, loading, segments, router, rootNavState?.key]);

//   return null;
// }

// COMMENTED OUT: Startup mask disabled since auth is disabled
// function StartupMask() {
//   const { loading } = useAuth();
//   const { theme } = useTheme();

//   if (!loading) return null;

//   return (
//     <View
//       pointerEvents="none"
//       style={[styles.startupMask, { backgroundColor: theme.background }]}
//     />
//   );
// }

function AppUsageTracker() {
  const addAppUsageSeconds = useAppStore((s) => s.addAppUsageSeconds);
  const timerRef = useRef(null);

  useEffect(() => {
    const startTimer = () => {
      if (timerRef.current) return;
      timerRef.current = setInterval(() => {
        addAppUsageSeconds(60);
      }, 60000);
    };

    const stopTimer = () => {
      if (!timerRef.current) return;
      clearInterval(timerRef.current);
      timerRef.current = null;
    };

    if (AppState.currentState === "active") {
      startTimer();
    }

    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") startTimer();
      else stopTimer();
    });

    return () => {
      stopTimer();
      subscription.remove();
    };
  }, [addAppUsageSeconds]);

  return null;
}

export default function RootLayout() {
  useEffect(() => {
    const cleanup = registerAndroidWidgetBackgroundSync();
    void initializeNotifications();
    // COMMENTED OUT: Cloud sync disabled - all data stays local
    // startNetworkSyncListener();
    return cleanup;
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <SessionProvider>
          <ToastProvider>
            {/* AppUsageTracker enabled for local streak tracking */}
            <AppUsageTracker />
            <Stack
              initialRouteName="(tabs)"
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            >
              {/* COMMENTED OUT: Onboarding and Auth screens disabled */}
              {/* <Stack.Screen
                name="onboarding"
                options={{ gestureEnabled: false }}
              />
              <Stack.Screen name="auth" options={{ gestureEnabled: false }} /> */}
              <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
              <Stack.Screen name="about" />
              <Stack.Screen name="settings" />
              <Stack.Screen name="qibla" />
              <Stack.Screen name="collections" />
              <Stack.Screen name="situation/[key]" />
              <Stack.Screen name="quran" />
              <Stack.Screen name="quran-page" />
              <Stack.Screen name="quran-page-reader" />
              <Stack.Screen name="widget-settings" />
              <Stack.Screen name="surah/[number]" />
              <Stack.Screen name="reading-session" />
              <Stack.Screen name="morning-calm" />
            </Stack>
            {/* Global floating session timer — visible on every screen */}
            <StatusBar style="auto" />
          </ToastProvider>
        </SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
