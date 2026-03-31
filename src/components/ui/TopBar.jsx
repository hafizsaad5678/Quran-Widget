import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function TopBar() {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const goToAbout = () => {
    if (pathname !== "/about") {
      router.push("/about");
    }
  };

  const goToSettings = () => {
    if (pathname !== "/settings") {
      router.push("/settings");
    }
  };

  return (
    <View className="flex-row items-center justify-between px-4 pb-2 pt-3">
      <TouchableOpacity
        onPress={goToAbout}
        className="h-11 w-11 items-center justify-center rounded-full border"
        style={{
          borderColor: theme.border,
          backgroundColor: theme.cardBackground,
        }}
      >
        <MaterialCommunityIcons
          name="information-outline"
          size={22}
          color={theme.accent}
        />
      </TouchableOpacity>
      <Text
        className="px-3 text-xl font-semibold"
        style={{ color: theme.accent }}
      >
        السلام عليكم
      </Text>
      <TouchableOpacity
        onPress={goToSettings}
        className="h-11 w-11 items-center justify-center rounded-full border"
        style={{
          borderColor: theme.border,
          backgroundColor: theme.cardBackground,
        }}
      >
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={22}
          color={theme.accent}
        />
      </TouchableOpacity>
    </View>
  );
}
