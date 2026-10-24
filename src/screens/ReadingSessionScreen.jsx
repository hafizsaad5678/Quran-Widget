import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import { useSession } from "../context/SessionContext";
import { useTheme } from "../context/ThemeContext";
import { useSurahList } from "../hooks/useSurah";

const PRESETS = [
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "15 min", seconds: 900 },
  { label: "20 min", seconds: 1200 },
  { label: "30 min", seconds: 1800 },
];

export default function ReadingSessionScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { startSession } = useSession();
  const surahs = useSurahList();

  const [step, setStep] = useState("timer"); // "timer" | "surah"
  const [selected, setSelected] = useState(600);
  const [custom, setCustom] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [surahQuery, setSurahQuery] = useState("");

  const filteredSurahs = surahs.filter((s) => {
    const q = surahQuery.toLowerCase();
    return (
      !q || s.name.toLowerCase().includes(q) || String(s.number).includes(q)
    );
  });

  const handleNext = () => {
    if (useCustom) {
      const mins = parseInt(custom, 10);
      if (!mins || mins < 1 || mins > 120) {
        Alert.alert("Invalid", "Enter a duration between 1 and 120 minutes.");
        return;
      }
    }
    setStep("surah");
  };

  const handleStart = (surah) => {
    const duration = useCustom ? parseInt(custom, 10) * 60 : selected;
    startSession(duration, surah.name, surah.number);
    router.replace(`/surah/${surah.number}`);
  };

  if (step === "surah") {
    return (
      <SwipeBackContainer>
        <SafeAreaView
          className="flex-1"
          style={{ backgroundColor: theme.background }}
        >
          <View
            className="flex-row items-center px-4 py-3 border-b"
            style={{ borderBottomColor: theme.border }}
          >
            <TouchableOpacity
              onPress={() => setStep("timer")}
              className="w-10 h-10 rounded-full items-center justify-center border mr-3"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.cardBackground,
              }}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={22}
                color={theme.accent}
              />
            </TouchableOpacity>
            <Text
              className="text-lg font-bold flex-1"
              style={{ color: theme.accent }}
            >
              Choose Starting Surah
            </Text>
          </View>

          <View className="px-4 py-3">
            <View
              className="flex-row items-center rounded-2xl border px-4 py-3"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              }}
            >
              <MaterialCommunityIcons
                name="magnify"
                size={18}
                color={theme.textSecondary}
              />
              <TextInput
                value={surahQuery}
                onChangeText={setSurahQuery}
                placeholder="Search surah..."
                placeholderTextColor={theme.textSecondary}
                className="flex-1 ml-2 text-sm"
                style={{ color: theme.text }}
              />
            </View>
          </View>

          <FlatList
            data={filteredSurahs}
            keyExtractor={(s) => String(s.number)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleStart(item)}
                className="flex-row items-center px-5 py-4 border-b"
                style={{ borderBottomColor: theme.border }}
              >
                <View
                  className="w-9 h-9 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: theme.softAccent }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "700",
                      color: theme.accent,
                    }}
                  >
                    {item.number}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      color: theme.accent,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 11, color: theme.textSecondary }}>
                    {item.totalVerses} ayahs
                  </Text>
                </View>
                <Text style={{ fontSize: 18, color: theme.accent }}>
                  {item.nameArabic}
                </Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </SwipeBackContainer>
    );
  }

  return (
    <SwipeBackContainer>
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
      >
        <View className="flex-row items-center px-4 py-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full items-center justify-center border mr-3"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.cardBackground,
            }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={22}
              color={theme.accent}
            />
          </TouchableOpacity>
          <Text className="text-xl font-bold" style={{ color: theme.accent }}>
            Morning Calm
          </Text>
        </View>

        <View className="flex-1 px-6 justify-center">
          <View className="items-center mb-8">
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: theme.softAccent }}
            >
              <MaterialCommunityIcons
                name="timer-outline"
                size={48}
                color={theme.accent}
              />
            </View>
            <Text
              className="text-2xl font-serif font-bold text-center"
              style={{ color: theme.accent }}
            >
              Set Your Reading Time
            </Text>
            <Text
              className="text-sm text-center mt-2 leading-6"
              style={{ color: theme.textSecondary }}
            >
              Stay focused until the timer completes.
            </Text>
          </View>

          {/* Preset buttons */}
          <View className="flex-row flex-wrap gap-3 justify-center mb-6">
            {PRESETS.map((p) => {
              const active = !useCustom && selected === p.seconds;
              return (
                <TouchableOpacity
                  key={p.seconds}
                  onPress={() => {
                    setSelected(p.seconds);
                    setUseCustom(false);
                  }}
                  className="rounded-2xl px-5 py-3 border"
                  style={{
                    backgroundColor: active
                      ? theme.accent
                      : theme.cardBackground,
                    borderColor: active ? theme.accent : theme.border,
                  }}
                >
                  <Text
                    className="font-bold text-sm"
                    style={{ color: active ? theme.onAccent : theme.text }}
                  >
                    {p.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Custom input */}
          <TouchableOpacity
            onPress={() => setUseCustom((v) => !v)}
            className="flex-row items-center mb-3"
          >
            <View
              className="w-5 h-5 rounded border mr-2 items-center justify-center"
              style={{
                borderColor: theme.accent,
                backgroundColor: useCustom ? theme.accent : "transparent",
              }}
            >
              {useCustom && (
                <MaterialCommunityIcons name="check" size={12} color={theme.onAccent} />
              )}
            </View>
            <Text className="text-sm" style={{ color: theme.textSecondary }}>
              Custom duration
            </Text>
          </TouchableOpacity>

          {useCustom && (
            <View
              className="flex-row items-center rounded-2xl border px-4 mb-6"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              }}
            >
              <TextInput
                value={custom}
                onChangeText={setCustom}
                placeholder="Minutes (1–120)"
                placeholderTextColor={theme.textSecondary}
                keyboardType="number-pad"
                className="flex-1 py-3 text-base"
                style={{ color: theme.text }}
              />
              <Text style={{ color: theme.textSecondary }}>min</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handleNext}
            className="rounded-2xl py-4 items-center mt-2"
            style={{ backgroundColor: theme.accent }}
          >
            <Text className="text-base font-bold" style={{ color: theme.onAccent }}>
              Next — Choose Surah
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
