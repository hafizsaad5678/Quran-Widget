import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

/**
 * NavCard: the square-ish tile used for quick links (Daily Verse, Saved,
 * Full Quran, Widget). Change the look here and it changes everywhere.
 */
export default function NavCard({ theme, icon, label, subtitle, onPress }) {
  return (
    <TouchableOpacity
      className="flex-1 rounded-[24px] p-6 border"
      style={{
        backgroundColor: theme.cardBackground,
        borderColor: theme.border,
      }}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={icon} size={24} color={theme.accent} />
      <Text
        style={{
          marginTop: 16,
          fontSize: 10,
          fontWeight: "700",
          letterSpacing: 1,
          color: theme.accent,
          opacity: 0.75,
        }}
      >
        {label}
      </Text>
      {subtitle ? (
        <Text
          style={{ marginTop: 4, fontSize: 13, color: theme.textSecondary }}
        >
          {subtitle}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}
