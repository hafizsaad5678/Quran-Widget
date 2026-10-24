import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSession } from "../../context/SessionContext";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";

export default function TopBar({
  title,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
}) {
  const { theme } = useTheme();
  const { session, formatted, pauseSession, resumeSession, abandonSession } = useSession() ?? {};
  const { show } = useToast() ?? {};
  const router = useRouter();
  const pathname = usePathname();

  const handleLeft = onLeftPress ?? (() => {
    if (pathname !== "/about") router.push("/about");
  });

  const handleRight = onRightPress ?? (() => {
    if (pathname !== "/settings") router.push("/settings");
  });

  const handleStop = () => {
    show?.({ type: "warning", title: "Session Ended Early", message: "Session ended early." });
    abandonSession?.();
  };

  return (
    <View>
      {/* Main header row */}
      <View className="flex-row items-center justify-between px-4 pb-2 pt-3">
        <TouchableOpacity
          onPress={handleLeft}
          className="h-11 w-11 items-center justify-center rounded-full border"
          style={{ borderColor: theme.border, backgroundColor: theme.cardBackground }}
        >
          <MaterialCommunityIcons
            name={leftIcon ?? "information-outline"}
            size={22}
            color={theme.accent}
          />
        </TouchableOpacity>

        <Text
          className="px-3 text-xl font-semibold flex-1 text-center"
          numberOfLines={1}
          style={{ color: theme.accent }}
        >
          {title ?? "السلام عليكم"}
        </Text>

        <TouchableOpacity
          onPress={handleRight}
          className="h-11 w-11 items-center justify-center rounded-full border"
          style={{ borderColor: theme.border, backgroundColor: theme.cardBackground }}
        >
          <MaterialCommunityIcons
            name={rightIcon ?? "cog-outline"}
            size={22}
            color={theme.accent}
          />
        </TouchableOpacity>
      </View>

      {/* Session timer strip — shown below header when a session is active */}
      {session && !session.abandoned && !session.completed && (
        <View
          className="mx-4 mb-2 flex-row items-center rounded-2xl px-4 py-2"
          style={{ backgroundColor: theme.softAccent, borderWidth: 1, borderColor: theme.accent + "40" }}
        >
          <MaterialCommunityIcons name="timer-outline" size={15} color={theme.accent} />
          <Text style={{ fontSize: 14, fontWeight: "700", color: theme.accent, marginLeft: 6, letterSpacing: 1 }}>
            {formatted}
          </Text>
          {session.surahName ? (
            <Text style={{ fontSize: 11, color: theme.textSecondary, marginLeft: 6, flex: 1 }} numberOfLines={1}>
              · {session.surahName}
            </Text>
          ) : <View style={{ flex: 1 }} />}

          {/* Pause / Resume */}
          <TouchableOpacity
            onPress={session.running ? pauseSession : resumeSession}
            style={{ marginRight: 8 }}
          >
            <MaterialCommunityIcons
              name={session.running ? "pause-circle-outline" : "play-circle-outline"}
              size={20}
              color={theme.accent}
            />
          </TouchableOpacity>

          {/* Stop */}
          <TouchableOpacity onPress={handleStop}>
            <MaterialCommunityIcons name="stop-circle-outline" size={20} color="#f44336" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
