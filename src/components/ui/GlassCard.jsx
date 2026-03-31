import React from "react";
import { View } from "react-native";

export default function GlassCard({ children, className = "", style }) {
  return (
    <View
      className={`rounded-3xl border border-white/30 bg-white/55 p-4 dark:border-white/10 dark:bg-white/10 ${className}`}
      style={style}
    >
      {children}
    </View>
  );
}
