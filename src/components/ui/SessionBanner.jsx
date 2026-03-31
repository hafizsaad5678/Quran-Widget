import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSession } from "../../context/SessionContext";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";

export default function SessionBanner() {
  const { session, formatted, pauseSession, resumeSession, abandonSession, clearSession } = useSession();
  const { show } = useToast();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const slideY = React.useRef(new Animated.Value(-80)).current;

  const visible = Boolean(session && !session.abandoned);

  useEffect(() => {
    Animated.spring(slideY, {
      toValue: visible ? 0 : -80,
      useNativeDriver: true,
      speed: 18,
      bounciness: 4,
    }).start();
  }, [visible]);

  // Show toast on natural completion
  useEffect(() => {
    if (!session?.completed) return;
    show({
      type: "success",
      title: "Session Complete 🌙",
      message: `MashaAllah! ${Math.round(session.durationSeconds / 60)} min session done. Streak updated.`,
      duration: 5000,
    });
    clearSession();
  }, [session?.completed]);

  if (!session) return null;

  const handleStop = () => {
    show({
      type: "warning",
      title: "Session Ended Early",
      message: "Streak not counted — complete the full session to earn your streak.",
      duration: 4000,
    });
    abandonSession();
  };

  const handleTap = () => {
    // Navigate back to the surah reader if not already there
    router.push({ pathname: "/surah/[number]", params: { number: 1 } });
  };

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: insets.top + 4,
        left: 12,
        right: 12,
        zIndex: 1000,
        transform: [{ translateY: slideY }],
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.cardBackground,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: theme.accent,
          paddingHorizontal: 14,
          paddingVertical: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
          elevation: 10,
          gap: 10,
        }}
      >
        {/* Timer icon + time */}
        <TouchableOpacity
          onPress={session.running ? pauseSession : resumeSession}
          style={{ flexDirection: "row", alignItems: "center", gap: 6, flex: 1 }}
        >
          <MaterialCommunityIcons
            name={session.running ? "pause-circle" : "play-circle"}
            size={22}
            color={theme.accent}
          />
          <Text style={{ fontSize: 16, fontWeight: "700", color: theme.accent, letterSpacing: 1 }}>
            {formatted}
          </Text>
          {session.surahName ? (
            <Text style={{ fontSize: 11, color: theme.textSecondary }} numberOfLines={1}>
              · {session.surahName}
            </Text>
          ) : null}
        </TouchableOpacity>

        {/* Stop button */}
        <TouchableOpacity
          onPress={handleStop}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            backgroundColor: "rgba(244,67,54,0.1)",
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <MaterialCommunityIcons name="stop-circle-outline" size={16} color="#f44336" />
          <Text style={{ fontSize: 11, fontWeight: "700", color: "#f44336" }}>End</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
