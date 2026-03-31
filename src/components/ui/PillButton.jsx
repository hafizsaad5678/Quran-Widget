import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function PillButton({
  label,
  active = false,
  onPress,
  className = "",
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`rounded-full border px-5 py-2.5 ${
        active
          ? "border-sanctuary-accent bg-sanctuary-accent"
          : "border-sanctuary-border/30 bg-white/40 dark:border-sanctuary-border-dark/30 dark:bg-white/5"
      } ${className}`}
    >
      <Text
        className={`text-[10px] font-bold uppercase tracking-wider ${
          active
            ? "text-white"
            : "text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
