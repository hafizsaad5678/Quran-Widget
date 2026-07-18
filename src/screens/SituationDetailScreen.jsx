import {
  ScheherazadeNew_400Regular,
  useFonts,
} from "@expo-google-fonts/scheherazade-new";
import { Audio } from "expo-av";
import * as Network from "expo-network";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AyahDisplay } from "../components/AyahDisplay";
import GlassCard from "../components/ui/GlassCard";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";
import { findSituation } from "../constants/situations";
import { useTheme } from "../context/ThemeContext";
import { useAyatLibrary } from "../hooks/useAyatLibrary";
import { saveAyahToHistory } from "../services/userService";

const API_BASE = "https://api.alquran.cloud/v1/ayah";
const LANGUAGE_OPTIONS = [
  { key: "offline-en", label: "English (Offline)", edition: null },
  { key: "ur.jalandhry", label: "Urdu", edition: "ur.jalandhry" },
  { key: "hi.hindi", label: "Hindi", edition: "hi.hindi" },
  { key: "it.piccardo", label: "Italian", edition: "it.piccardo" },
  { key: "de.bubenheim", label: "German", edition: "de.bubenheim" },
  { key: "fr.hamidullah", label: "French", edition: "fr.hamidullah" },
];

export default function SituationDetailScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { key } = useLocalSearchParams();
  const situation = findSituation(String(key));
  const { ayat } = useAyatLibrary();

  const [selectedId, setSelectedId] = useState(null);
  const [onlineTranslations, setOnlineTranslations] = useState({});
  const [onlineAudioUrls, setOnlineAudioUrls] = useState({});
  const [loadingOnline, setLoadingOnline] = useState(false);
  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioAyahId, setAudioAyahId] = useState(null);
  const [sound, setSound] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("offline-en");
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [fontsLoaded] = useFonts({ ScheherazadeNew_400Regular });
  const translationCacheRef = useRef({});

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
    if (filteredAyat[0]?.id) setSelectedId(filteredAyat[0].id);
  }, [filteredAyat]);

  useEffect(() => {
    if (!currentAyah) return;
    void saveAyahToHistory(currentAyah);
  }, [currentAyah]);

  useEffect(() => {
    let active = true;

    const fetchAudioData = async () => {
      if (!filteredAyat.length) return;
      setLoadingOnline(true);

      const nextAudio = {};

      await Promise.all(
        filteredAyat.map(async (ayah) => {
          try {
            const audioRes = await fetch(`${API_BASE}/${ayah.id}/ar.alafasy`);

            if (audioRes.ok) {
              const audioPayload = await audioRes.json();
              nextAudio[ayah.id] = audioPayload?.data?.audio || null;
            }
          } catch (_error) {
            // Keep offline fallback silently.
          }
        }),
      );

      if (!active) return;
      setOnlineAudioUrls(nextAudio);
      setLoadingOnline(false);
    };

    void fetchAudioData();
    return () => {
      active = false;
    };
  }, [filteredAyat]);

  useEffect(() => {
    let active = true;

    const loadTranslation = async () => {
      const option = LANGUAGE_OPTIONS.find(
        (item) => item.key === selectedLanguage,
      );
      if (!option?.edition) {
        if (active) {
          setOnlineTranslations({});
          setLoadingTranslation(false);
        }
        return;
      }

      const cacheKey = `${String(key)}:${option.edition}`;
      const cached = translationCacheRef.current[cacheKey];
      if (cached) {
        if (active) {
          setOnlineTranslations(cached);
          setLoadingTranslation(false);
        }
        return;
      }

      try {
        if (active) setLoadingTranslation(true);

        const net = await Network.getNetworkStateAsync();
        const isOnline =
          net.isConnected !== false && net.isInternetReachable !== false;
        if (!isOnline) {
          throw new Error("No internet connection.");
        }

        const nextTranslations = {};
        await Promise.all(
          filteredAyat.map(async (ayah) => {
            try {
              const translationRes = await fetch(
                `${API_BASE}/${ayah.id}/${option.edition}`,
              );
              if (!translationRes.ok) return;
              const translationPayload = await translationRes.json();
              nextTranslations[ayah.id] =
                translationPayload?.data?.text || ayah.translation;
            } catch (_error) {
              // Keep offline translation as fallback.
            }
          }),
        );

        translationCacheRef.current[cacheKey] = nextTranslations;
        if (active) {
          setOnlineTranslations(nextTranslations);
        }
      } catch (_error) {
        if (active) {
          setOnlineTranslations({});
          setSelectedLanguage("offline-en");
        }
      } finally {
        if (active) setLoadingTranslation(false);
      }
    };

    void loadTranslation();

    return () => {
      active = false;
    };
  }, [filteredAyat, key, selectedLanguage]);

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
      "English (Offline)"
    );
  }, [selectedLanguage]);

  const togglePlayAudio = async () => {
    if (!currentAyah) return;
    const audioUrl = onlineAudioUrls[currentAyah.id];
    if (!audioUrl) return;

    try {
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

            <View className="mt-4 gap-3">
              <View className="flex-row items-center justify-between">
                <Text style={{ fontSize: 11, color: theme.textSecondary }}>
                  {loadingOnline
                    ? "Loading translation/audio from API..."
                    : "Arabic: Offline  |  Translation + Audio: API"}
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                <TouchableOpacity
                  onPress={() => setShowLanguageModal(true)}
                  className="rounded-full px-4 py-2 border"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.cardBackground,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      color: theme.text,
                    }}
                  >
                    {loadingTranslation ? "Loading..." : selectedLanguageLabel}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={togglePlayAudio}
                  disabled={!onlineAudioUrls[currentAyah?.id]}
                  className="rounded-full px-4 py-2"
                  style={{
                    backgroundColor: onlineAudioUrls[currentAyah?.id]
                      ? theme.accent
                      : theme.border,
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 11, fontWeight: "700" }}
                  >
                    {isPlayingAudio && audioAyahId === currentAyah?.id
                      ? "Pause"
                      : "Play"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={stopAudio}
                  disabled={!sound}
                  className="rounded-full px-4 py-2"
                  style={{
                    backgroundColor: sound ? "#b91c1c" : theme.border,
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 11, fontWeight: "700" }}
                  >
                    Stop
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={{ fontSize: 11, color: theme.textSecondary }}>
                {currentAyah
                  ? `Ayah ${currentAyah.surahNumber}:${currentAyah.ayahNumber}`
                  : ""}
              </Text>
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
                      color: active ? "#fff" : theme.accent,
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
