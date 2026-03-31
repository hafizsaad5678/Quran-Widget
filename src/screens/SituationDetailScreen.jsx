import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AyahDisplay } from "../components/AyahDisplay";
import GlassCard from "../components/ui/GlassCard";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";
import { findSituation } from "../constants/situations";
import { useTheme } from "../context/ThemeContext";
import { useAyatLibrary } from "../hooks/useAyatLibrary";
import { saveAyahToHistory } from "../services/userService";

export default function SituationDetailScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { key } = useLocalSearchParams();
  const situation = findSituation(String(key));
  const { ayat } = useAyatLibrary();

  const [selectedId, setSelectedId] = useState(null);

  const filteredAyat = useMemo(() => {
    if (!situation) return [];
    const set = new Set(situation.ayahIds);
    return ayat.filter((item) => set.has(item.id));
  }, [ayat, situation]);

  const currentAyah = useMemo(() => {
    return filteredAyat.find((item) => item.id === selectedId) || filteredAyat[0] || null;
  }, [filteredAyat, selectedId]);

  useEffect(() => {
    if (filteredAyat[0]?.id) setSelectedId(filteredAyat[0].id);
  }, [filteredAyat]);

  useEffect(() => {
    if (!currentAyah) return;
    void saveAyahToHistory(currentAyah);
  }, [currentAyah]);

  return (
    <SwipeBackContainer>
      <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
        <TopBar
          title="Divine Sanctuary"
          onLeftPress={() => router.back()}
          leftIcon="chevron-left"
        />

        <ScrollView
          className="px-5"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Situation info card */}
          <GlassCard
            className="rounded-[28px] p-5"
            style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}
          >
            <Text style={{ fontSize: 10, fontWeight: "700", letterSpacing: 2, color: theme.accent, marginBottom: 4 }}>
              Current Situation
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "700", color: theme.accent }}>
              {situation?.title || "Guidance"}
            </Text>
            <Text style={{ marginTop: 6, fontSize: 13, fontStyle: "italic", color: theme.textSecondary }}>
              {situation?.subtitle || "Contextual ayat for reflection"}
            </Text>
          </GlassCard>

          {/* Ayah display */}
          <GlassCard
            className="mt-4 rounded-[32px] p-6"
            style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}
          >
            <AyahDisplay ayah={currentAyah} showShare />
          </GlassCard>

          {/* Ayah selector pills */}
          <View className="mt-5 flex-row flex-wrap gap-2 px-1">
            {filteredAyat.map((item) => {
              const active = item.id === currentAyah?.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedId(item.id)}
                  className="rounded-full px-4 py-2 border"
                  style={{
                    backgroundColor: active ? theme.accent : theme.cardBackground,
                    borderColor: active ? theme.accent : theme.border,
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: "700", color: active ? "#fff" : theme.accent }}>
                    {item.surahNumber}:{item.ayahNumber}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
