import { ScheherazadeNew_400Regular, useFonts } from "@expo-google-fonts/scheherazade-new";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";
import { getAyah } from "../constants/quranCurated";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { saveAyahNote, saveAyahToHistory } from "../services/userService";

const STEPS = [
  {
    title: "Open with Surah Al-Fatiha",
    prompt: "Begin by asking Allah for guidance and a steady heart.",
    ayah: [1, 1],
  },
  {
    title: "Read a verse on ease",
    prompt: "Let the promise of ease soften the pressure you are carrying.",
    ayah: [94, 5],
  },
  {
    title: "Reflect in silence",
    prompt: "Take a quiet breath and write one thing you place in Allah's care.",
    ayah: [13, 28],
  },
];

export default function MorningCalmScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { show } = useToast();
  const [fontsLoaded] = useFonts({ ScheherazadeNew_400Regular });
  const [step, setStep] = useState(0);
  const [reflection, setReflection] = useState("");
  const [saved, setSaved] = useState(false);

  const current = useMemo(() => {
    const item = STEPS[step];
    return item ? getAyah(item.ayah[0], item.ayah[1]) : null;
  }, [step]);
  const item = STEPS[step];

  const continueJourney = async () => {
    if (!current) return;
    await saveAyahToHistory(current);
    if (reflection.trim()) await saveAyahNote(current.id, reflection.trim());
    setReflection("");
    setSaved(false);
    if (step === STEPS.length - 1) {
      show({ type: "success", title: "Morning Calm complete", message: "Your reflection was saved on this device." });
      router.replace("/(tabs)/situations");
      return;
    }
    setStep((value) => value + 1);
  };

  const saveCurrentReflection = async () => {
    if (!current || !reflection.trim()) return;
    await saveAyahNote(current.id, reflection.trim());
    setSaved(true);
    show({ type: "success", message: "Reflection saved." });
  };

  return (
    <SwipeBackContainer>
      <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
        <TopBar title="Morning Calm" leftIcon="chevron-left" onLeftPress={() => router.back()} />
        <ScrollView className="px-5" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <View className="mt-5 mb-5">
            <Text className="text-[10px] font-bold uppercase tracking-[3px]" style={{ color: theme.textSecondary }}>
              Step {step + 1} of {STEPS.length}
            </Text>
            <Text className="text-2xl font-serif font-bold mt-2" style={{ color: theme.accent }}>
              {item.title}
            </Text>
            <Text className="text-sm leading-6 mt-2" style={{ color: theme.textSecondary }}>
              {item.prompt}
            </Text>
          </View>

          <View className="rounded-[30px] border p-6" style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}>
            <Text className="text-xs font-bold mb-4" style={{ color: theme.accent }}>
              {current?.surahName} {current?.surahNumber}:{current?.ayahNumber}
            </Text>
            <Text
              className="text-right mb-5"
              style={{
                color: theme.text,
                fontFamily: fontsLoaded ? "ScheherazadeNew_400Regular" : undefined,
                fontSize: 29,
                lineHeight: 54,
              }}
            >
              {current?.arabic}
            </Text>
            <View className="h-px mb-4" style={{ backgroundColor: theme.border }} />
            <Text className="text-base italic leading-7" style={{ color: theme.textSecondary }}>
              “{current?.translation}”
            </Text>
          </View>

          <TextInput
            multiline
            value={reflection}
            onChangeText={(value) => { setReflection(value); setSaved(false); }}
            placeholder="Write a short reflection (optional)..."
            placeholderTextColor={theme.textSecondary}
            className="rounded-2xl border p-4 mt-4"
            style={{ color: theme.text, borderColor: theme.border, backgroundColor: theme.cardBackground, minHeight: 110, textAlignVertical: "top" }}
          />
          <TouchableOpacity
            onPress={saveCurrentReflection}
            disabled={!reflection.trim() || saved}
            className="self-end flex-row items-center mt-3 rounded-full px-4 py-2"
            style={{ backgroundColor: reflection.trim() && !saved ? theme.softAccent : theme.cardAlternative }}
          >
            <MaterialCommunityIcons name={saved ? "check" : "content-save-outline"} size={16} color={theme.accent} />
            <Text className="ml-2 text-xs font-bold" style={{ color: theme.accent }}>{saved ? "Saved" : "Save reflection"}</Text>
          </TouchableOpacity>

          <View className="flex-row gap-3 mt-6">
            {step > 0 && (
              <TouchableOpacity onPress={() => setStep((value) => value - 1)} className="flex-1 items-center rounded-2xl border py-4" style={{ borderColor: theme.border }}>
                <Text className="font-bold" style={{ color: theme.textSecondary }}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={continueJourney} className="flex-1 items-center rounded-2xl py-4" style={{ backgroundColor: theme.accent }}>
              <Text className="font-bold" style={{ color: theme.onAccent }}>{step === STEPS.length - 1 ? "Finish Journey" : "Continue"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
