import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AyahDisplay } from "../components/AyahDisplay";
import GlassCard from "../components/ui/GlassCard";
import PillButton from "../components/ui/PillButton";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";
import { findSituation } from "../constants/situations";
import { useAyatLibrary } from "../hooks/useAyatLibrary";
import { getMcqQuestions, submitMcqAttempt } from "../services/mcqService";
import { saveAyahToHistory } from "../services/userService";

export default function SituationDetailScreen() {
  const router = useRouter();
  const { key } = useLocalSearchParams();
  const situation = findSituation(String(key));
  const { ayat } = useAyatLibrary();

  const [selectedId, setSelectedId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [mcqResult, setMcqResult] = useState(null);

  const filteredAyat = useMemo(() => {
    if (!situation) return [];
    const set = new Set(situation.ayahIds);
    return ayat.filter((item) => set.has(item.id));
  }, [ayat, situation]);

  const currentAyah = useMemo(() => {
    return (
      filteredAyat.find((item) => item.id === selectedId) ||
      filteredAyat[0] ||
      null
    );
  }, [filteredAyat, selectedId]);

  useEffect(() => {
    if (filteredAyat[0]?.id) {
      setSelectedId(filteredAyat[0].id);
    }
  }, [filteredAyat]);

  useEffect(() => {
    if (!situation?.key) return;
    getMcqQuestions(situation.key).then((data) => setQuestions(data || []));
  }, [situation?.key]);

  useEffect(() => {
    if (!currentAyah) return;
    void saveAyahToHistory(currentAyah);
  }, [currentAyah]);

  const firstQuestion = questions[0] || null;

  const submit = async () => {
    if (!firstQuestion || !selectedOption) return;
    const option = (firstQuestion.options || []).find(
      (x) => x.id === selectedOption,
    );
    const isCorrect = Boolean(option?.is_correct);
    setMcqResult(isCorrect ? "Correct" : "Try again");
    await submitMcqAttempt({
      questionId: firstQuestion.id,
      optionId: selectedOption,
      isCorrect,
    });
  };

  return (
    <SwipeBackContainer>
      <SafeAreaView className="flex-1 bg-sanctuary-background dark:bg-sanctuary-background-dark">
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
          <GlassCard className="rounded-[32px] bg-sanctuary-card border-sanctuary-border/30 dark:border-sanctuary-border-dark/30 shadow-sm p-6">
            <Text className="text-[10px] font-bold uppercase tracking-[2px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark mb-1">
              Current Situation
            </Text>
            <Text className="text-lg font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
              {situation?.title || "Guidance"}
            </Text>
            <Text className="mt-2 text-sm italic text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
              {situation?.subtitle || "Contextual ayat for reflection"}
            </Text>
          </GlassCard>

          <GlassCard className="mt-5 rounded-[40px] p-8 border-sanctuary-border/30 dark:border-sanctuary-border-dark/30 shadow-lg">
            <AyahDisplay ayah={currentAyah} />
            <View className="mt-8 flex-row gap-3 pt-6 border-t border-sanctuary-border/10">
              <TouchableOpacity
                onPress={() => router.push("/pause")}
                className="flex-1 bg-sanctuary-accent/10 rounded-2xl py-3 items-center"
              >
                <Text className="text-[10px] font-bold text-sanctuary-accent uppercase tracking-wider">
                  Pause Mode
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/countdown")}
                className="flex-1 bg-sanctuary-accent/10 rounded-2xl py-3 items-center"
              >
                <Text className="text-[10px] font-bold text-sanctuary-accent uppercase tracking-wider">
                  Countdown
                </Text>
              </TouchableOpacity>
            </View>
          </GlassCard>

          <View className="mt-6 flex-row flex-wrap gap-2 px-1">
            {filteredAyat.map((item) => (
              <PillButton
                key={item.id}
                label={`${item.surahNumber}:${item.ayahNumber}`}
                active={item.id === currentAyah?.id}
                onPress={() => setSelectedId(item.id)}
              />
            ))}
          </View>

          {firstQuestion ? (
            <GlassCard className="mt-8 rounded-[32px] p-8 border-sanctuary-border/30 dark:border-sanctuary-border-dark/30 shadow-sm mb-10">
              <Text className="text-[10px] font-bold uppercase tracking-[2.5px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark mb-4 text-center">
                Reflection Prompt
              </Text>
              <Text className="text-lg font-bold text-sanctuary-text dark:text-sanctuary-text-dark text-center leading-7">
                {firstQuestion.question_text}
              </Text>

              <View className="mt-8 gap-3">
                {(firstQuestion.options || []).map((opt) => (
                  <TouchableOpacity
                    key={opt.id}
                    onPress={() => setSelectedOption(opt.id)}
                    activeOpacity={0.7}
                    className={`rounded-3xl border p-5 ${
                      selectedOption === opt.id
                        ? "border-sanctuary-accent bg-sanctuary-accent/10"
                        : "border-sanctuary-border/30 bg-white/40 dark:border-sanctuary-border-dark/30 dark:bg-white/5"
                    }`}
                  >
                    <View className="flex-row items-center">
                      <View
                        className={`w-5 h-5 rounded-full border-2 mr-4 items-center justify-center ${selectedOption === opt.id ? "border-sanctuary-accent bg-sanctuary-accent" : "border-sanctuary-border/60"}`}
                      >
                        {selectedOption === opt.id && (
                          <MaterialCommunityIcons
                            name="check"
                            size={12}
                            color="white"
                          />
                        )}
                      </View>
                      <Text
                        className={`flex-1 text-sm ${selectedOption === opt.id ? "font-bold text-sanctuary-text" : "text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark"}`}
                      >
                        {opt.option_text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={submit}
                disabled={!selectedOption}
                className={`mt-8 flex-row items-center justify-center rounded-full py-4 shadow-md shadow-sanctuary-accent/20 ${!selectedOption ? "bg-sanctuary-accent/40" : "bg-sanctuary-accent"}`}
              >
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={18}
                  color="#fff"
                />
                <Text className="ml-2 font-bold text-white uppercase tracking-widest">
                  Submit Reflection
                </Text>
              </TouchableOpacity>

              {mcqResult ? (
                <View
                  className={`mt-4 p-4 rounded-2xl items-center ${mcqResult === "Correct" ? "bg-green-500/10" : "bg-red-500/10"}`}
                >
                  <Text
                    className={`text-sm font-bold ${mcqResult === "Correct" ? "text-green-600" : "text-red-500"}`}
                  >
                    {mcqResult === "Correct"
                      ? "Alhamdulillah, a thoughtful choice."
                      : "Insha'Allah, the next one will resonate more."}
                  </Text>
                </View>
              ) : null}
            </GlassCard>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
