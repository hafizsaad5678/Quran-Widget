import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

/**
 * InfoRow: list row used for "Recently Read" (Home and Stats).
 * Pass either `icon` (MaterialCommunityIcons name) or `badge` (short text)
 * for the circle on the left. Change the look here, it changes everywhere.
 */
export default function InfoRow({
  theme,
  icon,
  badge,
  title,
  subtitle,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center rounded-2xl border p-4"
      style={{
        borderColor: theme.border,
        backgroundColor: theme.cardBackground,
      }}
    >
      <View
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: theme.softAccent }}
      >
        {badge ? (
          <Text style={{ fontSize: 9, fontWeight: "700", color: theme.accent }}>
            {badge}
          </Text>
        ) : (
          <MaterialCommunityIcons name={icon} size={18} color={theme.accent} />
        )}
      </View>
      <View className="ml-4 flex-1">
        <Text style={{ fontSize: 14, fontWeight: "700", color: theme.accent }}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            numberOfLines={1}
            style={{ marginTop: 2, fontSize: 12, color: theme.textSecondary }}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={theme.textSecondary}
      />
    </TouchableOpacity>
  );
}
