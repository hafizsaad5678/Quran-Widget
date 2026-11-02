import {
  ScheherazadeNew_400Regular,
  useFonts,
} from "@expo-google-fonts/scheherazade-new";
import { Audio } from "../services/audioCompat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AyahDisplay } from "../components/AyahDisplay";
import GlassCard from "../components/ui/GlassCard";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";
import { findSituation } from "../constants/situations";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { useAyatLibrary } from "../hooks/useAyatLibrary";
import {
  OFFLINE_LANGUAGES,
  ayahTranslation,
  useTranslationData,
} from "../constants/offlineTranslations";
import { getLocalAudioUri, resolveAudioSource } from "../services/audioStore";
import * as Network from "expo-network";
import { saveAyahToHistory } from "../services/userService";

const LANGUAGE_OPTIONS = OFFLINE_LANGUAGES;

export default function SituationDetailScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { key } = useLocalSearchParams();
  const situation = findSituation(String(key));
  const { ayat } = useAyatLibrary();
  const { show } = useToast();

  const [selectedId, setSelectedId] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioAyahId, setAudioAyahId] = useState(null);
  const [sound, setSound] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("offline-en");
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [fontsLoaded] = useFonts({ ScheherazadeNew_400Regular });

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
      // Initialize selection when the route's bundled situation data becomes available.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedId(filteredAyat[0].id);
    }
  }, [filteredAyat]);

  useEffect(() => {
    if (!currentAyah) return;
    void saveAyahToHistory(currentAyah);
  }, [currentAyah]);

  // Audio streams directly from the CDN (needs internet); no API round trip.
  const onlineAudioUrls = useMemo(() => {
    const urls = {};
    filteredAyat.forEach((ayah) => {
      if (ayah?.globalAyahNumber) {
        urls[ayah.id] = resolveAudioSource(ayah.globalAyahNumber);
      }
    });
    return urls;
  }, [filteredAyat]);

  // Translations ship inside the app (assets), loaded on demand: works offline.
  const { data: translationData, loading: translationLoading } =
    useTranslationData(selectedLanguage);
  const onlineTranslations = useMemo(() => {
    if (!translationData) return {};
    const next = {};
    filteredAyat.forEach((ayah) => {
      const [surah, num] = String(ayah.id).split(":");
      next[ayah.id] =
        ayahTranslation(translationData, surah, num) || ayah.translation;
    });
    return next;
  }, [filteredAyat, translationData]);

  useEffect(() => {
    return () => {
      if (sound) {
        void sound.unloadAsync();
      }
    };
  }, [sound]);

  const displayAyah = useMemo(() => {
    if (!currentAyah) return null;
    return {
      ...currentAyah,
      translation:
        selectedLanguage === "offline-en"
          ? currentAyah.translation
          : onlineTranslations[currentAyah.id] || currentAyah.translation,
    };
  }, [currentAyah, onlineTranslations, selectedLanguage]);

  const selectedLanguageLabel = useMemo(() => {
    return (
      LANGUAGE_OPTIONS.find((opt) => opt.key === selectedLanguage)?.label ||
      "English"
    );
  }, [selectedLanguage]);

  const togglePlayAudio = async () => {
    if (!currentAyah) return;
    const audioUrl = onlineAudioUrls[currentAyah.id];
    if (!audioUrl) return;

    try {
      if (!getLocalAudioUri(currentAyah.globalAyahNumber)) {
        const network = await Network.getNetworkStateAsync();
        if (network.isConnected === false || network.isInternetReachable === false) {
          show({ type: "warning", title: "Audio needs internet", message: "Download this surah from the reader before going offline." });
          return;
        }
      }
      if (isPlayingAudio && audioAyahId === currentAyah.id && sound) {
        await sound.pauseAsync();
        setIsPlayingAudio(false);
        return;
      }

      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      const { sound: createdSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true },
      );

      createdSound.setOnPlaybackStatusUpdate((status) => {
        if (status?.didJustFinish && !status?.isLooping) {
          setIsPlayingAudio(false);
        }
      });

      setSound(createdSound);
      setAudioAyahId(currentAyah.id);
      setIsPlayingAudio(true);
    } catch (_error) {
      setIsPlayingAudio(false);
      show({ type: "error", message: "Could not load this recitation. Check your connection or download it for offline use." });
    }
  };

  const stopAudio = async () => {
    try {
      if (!sound) return;
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    } catch (_) {
      // Ignore audio cleanup issues.
    } finally {
      setIsPlayingAudio(false);
      setAudioAyahId(null);
    }
  };

  return (
    <SwipeBackContainer>
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
      >
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
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: "700",
                letterSpacing: 2,
                color: theme.accent,
                marginBottom: 4,
              }}
            >
              Current Situation
            </Text>
            <Text
              style={{ fontSize: 18, fontWeight: "700", color: theme.accent }}
            >
              {situation?.title || "Guidance"}
            </Text>
            <Text
              style={{
                marginTop: 6,
                fontSize: 13,
                fontStyle: "italic",
                color: theme.textSecondary,
              }}
            >
              {situation?.subtitle || "Contextual ayat for reflection"}
            </Text>
          </GlassCard>

          {/* Ayah display */}
          <GlassCard
            className="mt-4 rounded-[32px] p-6"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            }}
          >
            <AyahDisplay
              ayah={displayAyah || currentAyah}
              showShare
              showTranslation
              fontLoaded={fontsLoaded}
            />

            <View className="mt-5">
              <View className="flex-row items-center justify-between">
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    letterSpacing: 1,
                    color: theme.textSecondary,
                  }}
                >
                  {currentAyah
                    ? `AYAH ${currentAyah.surahNumber}:${currentAyah.ayahNumber}`
                    : ""}
                </Text>

                <TouchableOpacity
                  onPress={() => setShowLanguageModal(true)}
                  className="flex-row items-center rounded-full px-3 py-2 border"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.cardBackground,
                  }}
                >
                  <MaterialCommunityIcons
                    name="translate"
                    size={14}
                    color={theme.accent}
                  />
                  <Text
                    style={{
                      marginLeft: 6,
                      fontSize: 11,
                      fontWeight: "700",
                      color: theme.accent,
                    }}
                  >
                    {translationLoading ? "Loading..." : selectedLanguageLabel}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-3 flex-row items-center gap-3">
                <TouchableOpacity
                  onPress={togglePlayAudio}
                  disabled={!onlineAudioUrls[currentAyah?.id]}
                  className="flex-1 flex-row items-center justify-center rounded-full py-3"
                  style={{
                    backgroundColor: onlineAudioUrls[currentAyah?.id]
                      ? theme.accent
                      : theme.border,
                  }}
                >
                  <MaterialCommunityIcons
                    name={
                      isPlayingAudio && audioAyahId === currentAyah?.id
                        ? "pause"
                        : "play"
                    }
                    size={18}
                    color={theme.onAccent}
                  />
                  <Text
                    style={{
                      marginLeft: 6,
                      color: theme.onAccent,
                      fontSize: 12,
                      fontWeight: "700",
                    }}
                  >
                    {isPlayingAudio && audioAyahId === currentAyah?.id
                      ? "Pause"
                      : "Listen"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={stopAudio}
                  disabled={!sound}
                  className="h-11 w-11 items-center justify-center rounded-full border"
                  style={{
                    borderColor: sound ? theme.accent : theme.border,
                    backgroundColor: theme.cardBackground,
                    opacity: sound ? 1 : 0.4,
                  }}
                >
                  <MaterialCommunityIcons
                    name="stop"
                    size={20}
                    color={theme.accent}
                  />
                </TouchableOpacity>
              </View>
            </View>
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
                    backgroundColor: active
                      ? theme.accent
                      : theme.cardBackground,
                    borderColor: active ? theme.accent : theme.border,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "700",
                      color: active ? theme.onAccent : theme.accent,
                    }}
                  >
                    {item.surahNumber}:{item.ayahNumber}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={showLanguageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowLanguageModal(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.35)",
            justifyContent: "center",
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "#000000",
              borderRadius: 14,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: "#ffffff",
                marginBottom: 4,
              }}
            >
              Translation Language
            </Text>
            {LANGUAGE_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.key}
                onPress={() => {
                  setSelectedLanguage(opt.key);
                  setShowLanguageModal(false);
                }}
                style={{
                  paddingVertical: 7,
                  paddingHorizontal: 8,
                  borderRadius: 8,
                  backgroundColor:
                    selectedLanguage === opt.key ? "#1f2937" : "transparent",
                  marginBottom: 1,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 12,
                    fontWeight: selectedLanguage === opt.key ? "700" : "500",
                  }}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SwipeBackContainer>
  );
}
