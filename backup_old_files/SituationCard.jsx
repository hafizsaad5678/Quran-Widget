import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import GlassCard from "../ui/GlassCard";

export default function SituationCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} className="flex-1">
      <GlassCard className="min-h-[160px] justify-between rounded-[28px] p-6 border-sanctuary-border/30 dark:border-sanctuary-border-dark/30 shadow-sm">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-sanctuary-accent/10 mb-4">
          <MaterialCommunityIcons name={item.icon} size={24} color="#b0926a" />
        </View>
        <View>
          <Text className="text-base font-bold text-sanctuary-text dark:text-sanctuary-text-dark uppercase tracking-[0.5px]">
            {item.title}
          </Text>
          <Text className="text-[10px] italic text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark mt-1">
            {item.subtitle}
          </Text>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}
