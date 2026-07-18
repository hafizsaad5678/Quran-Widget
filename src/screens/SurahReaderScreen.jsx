import {
  ScheherazadeNew_400Regular,
  useFonts,
} from "@expo-google-fonts/scheherazade-new";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Network from "expo-network";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AyahItem from "../components/quran/AyahItem";
import SurahHeader from "../components/quran/SurahHeader";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import { useSession } from "../context/SessionContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { useAyahInteraction } from "../hooks/useAyahInteraction";
import { useSurah } from "../hooks/useSurah";

const LANGUAGE_OPTIONS = [
  { key: "offline-en", label: "English (Offline)", edition: null },
  { key: "ur.jalandhry", label: "Urdu", edition: "ur.jalandhry" },
  { key: "hi.hindi", label: "Hindi", edition: "hi.hindi" },
  { key: "it.piccardo", label: "Italian", edition: "it.piccardo" },
  { key: "de.bubenheim", label: "German", edition: "de.bubenheim" },
  { key: "fr.hamidullah", label: "French", edition: "fr.hamidullah" },
];

export default function SurahReaderScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [fontLoaded] = useFonts({ ScheherazadeNew_400Regular });
  const params = useLocalSearchParams();
  const rawSurah = Array.isArray(params?.number)
    ? params.number[0]
    : Array.isArray(params?.id)
      ? params.id[0]
      : Array.isArray(params?.surah)
        ? params.surah[0]
        : (params?.number ?? params?.id ?? params?.surah);
  const parsedSurah = Number.parseInt(String(rawSurah ?? ""), 10);
  const surahNumber =
    Number.isFinite(parsedSurah) && parsedSurah >= 1 && parsedSurah <= 114
      ? parsedSurah
      : 1;

  const { ayahs, meta } = useSurah(surahNumber);
  const {
    onAyahTap,
    activeAyahId,
    isPlaying,
    pauseAyah,
    resumeAyah,
    stopAyah,
  } = useAyahInteraction();
  const { session, formatted, pauseSession, resumeSession, abandonSession } =
    useSession();
  const { show } = useToast();

  const [selectedId, setSelectedId] = useState(null);
  const [showTranslation, setShowTranslation] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("offline-en");
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [translationMap, setTranslationMap] = useState({});
  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const listRef = useRef(null);
  const translationCacheRef = useRef({});

  const selectedLanguageLabel = useMemo(() => {
    return (
      LANGUAGE_OPTIONS.find((opt) => opt.key === selectedLanguage)?.label ||
      "English (Offline)"
    );
  }, [selectedLanguage]);

  useEffect(() => {
    let active = true;

    const loadTranslation = async () => {
      const option = LANGUAGE_OPTIONS.find(
        (item) => item.key === selectedLanguage,
      );
      if (!option?.edition) {
        if (active) setTranslationMap({});
        return;
      }

      const cacheKey = `${surahNumber}:${option.edition}`;
      const cached = translationCacheRef.current[cacheKey];
      if (cached) {
        if (active) setTranslationMap(cached);
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

        const response = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}/${option.edition}`,
        );
        if (!response.ok) {
          throw new Error("Could not load selected translation.");
        }

        const payload = await response.json();
        const remoteAyahs = payload?.data?.ayahs ?? [];
        const map = {};
        remoteAyahs.forEach((item) => {
          map[item.numberInSurah] = item.text;
        });

        translationCacheRef.current[cacheKey] = map;
        if (active) setTranslationMap(map);
      } catch (err) {
        if (active) {
          setTranslationMap({});
          setSelectedLanguage("offline-en");
          show({
            type: "error",
            message: err?.message || "Could not load translation.",
          });
        }
      } finally {
        if (active) setLoadingTranslation(false);
      }
    };

    void loadTranslation();

    return () => {
      active = false;
    };
  }, [selectedLanguage, show, surahNumber]);

  const displayAyahs = useMemo(() => {
    if (selectedLanguage === "offline-en") return ayahs;

    return ayahs.map((ayah) => ({
      ...ayah,
      translation: translationMap[ayah.ayahNumber] || ayah.translation,
    }));
  }, [ayahs, selectedLanguage, translationMap]);

  const handleAyahPress = useCallback(
    async (ayah) => {
      setSelectedId(ayah.id);
      const result = await onAyahTap(ayah, displayAyahs);
      if (!result?.ok) {
        show({
          type: "error",
          message: result?.message || "No internet connection.",
        });
      }
    },
    [displayAyahs, onAyahTap, show],
  );

  const handlePlayPause = useCallback(
    async (ayah) => {
      if (!ayah) return;

      if (activeAyahId === ayah.id) {
        const result = isPlaying
          ? await pauseAyah(ayah.id)
          : await resumeAyah(ayah.id);
        if (!result?.ok) {
          show({
            type: "error",
            message: result?.message || "Could not control playback.",
          });
        }
        return;
      }

      const result = await onAyahTap(ayah, displayAyahs);
      if (!result?.ok) {
        show({
          type: "error",
          message: result?.message || "No internet connection.",
        });
      }
    },
    [
      activeAyahId,
      displayAyahs,
      isPlaying,
      onAyahTap,
      pauseAyah,
      resumeAyah,
      show,
    ],
  );

  const handleStop = useCallback(
    async (ayah) => {
      if (!ayah) return;
      const result = await stopAyah(ayah.id);
      if (!result?.ok && activeAyahId === ayah.id) {
        show({
          type: "error",
          message: result?.message || "Could not stop playback.",
        });
      }
    },
    [activeAyahId, show, stopAyah],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <AyahItem
        ayah={item}
        isSelected={selectedId === item.id}
        showTranslation={showTranslation}
        onPress={handleAyahPress}
        onPlayPause={handlePlayPause}
        onStop={handleStop}
        isAudioActive={activeAyahId === item.id}
        isAudioPlaying={activeAyahId === item.id && isPlaying}
        fontLoaded={fontLoaded}
      />
    ),
    [
      selectedId,
      showTranslation,
      handleAyahPress,
      handlePlayPause,
      handleStop,
      activeAyahId,
      isPlaying,
      fontLoaded,
    ],
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <SwipeBackContainer>
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
      >
        {/* Top bar */}
        <View
          className="flex-row items-center justify-between px-4 py-3 border-b"
          style={{
            borderBottomColor: theme.border,
            backgroundColor: theme.background,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full items-center justify-center border"
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
            className="flex-1 text-center font-bold text-base mx-3"
            numberOfLines={1}
            style={{ color: theme.text }}
          >
            {meta?.name ?? "Loading..."}
          </Text>

          <TouchableOpacity
            onPress={() => setShowTranslation((v) => !v)}
            className="w-10 h-10 rounded-full items-center justify-center border"
            style={{
              borderColor: showTranslation ? theme.accent : theme.border,
              backgroundColor: showTranslation
                ? theme.softAccent
                : theme.cardBackground,
            }}
          >
            <MaterialCommunityIcons
              name="translate"
              size={18}
              color={showTranslation ? theme.accent : theme.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowLanguageModal(true)}
            className="h-10 rounded-full items-center justify-center border ml-2 px-3"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.cardBackground,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ fontSize: 10, fontWeight: "700", color: theme.text }}
            >
              {loadingTranslation ? "Loading..." : selectedLanguageLabel}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Session timer strip */}
        {session && !session.abandoned && !session.completed && (
          <View
            className="mx-4 mt-2 flex-row items-center rounded-2xl px-4 py-2"
            style={{
              backgroundColor: theme.softAccent,
              borderWidth: 1,
              borderColor: theme.accent + "40",
            }}
          >
            <MaterialCommunityIcons
              name="timer-outline"
              size={15}
              color={theme.accent}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: theme.accent,
                marginLeft: 6,
                letterSpacing: 1,
              }}
            >
              {formatted}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: theme.textSecondary,
                marginLeft: 6,
                flex: 1,
              }}
              numberOfLines={1}
            >
              · {session.surahName || meta?.name}
            </Text>
            <TouchableOpacity
              onPress={session.running ? pauseSession : resumeSession}
              style={{ marginRight: 10 }}
            >
              <MaterialCommunityIcons
                name={
                  session.running
                    ? "pause-circle-outline"
                    : "play-circle-outline"
                }
                size={20}
                color={theme.accent}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                show({
                  type: "warning",
                  title: "Session Ended Early",
                  message:
                    "Streak not counted — complete the full session to earn your streak.",
                });
                abandonSession();
              }}
            >
              <MaterialCommunityIcons
                name="stop-circle-outline"
                size={20}
                color="#f44336"
              />
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          ref={listRef}
          data={displayAyahs}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={
            <SurahHeader
              meta={meta}
              ayahCount={displayAyahs.length}
              fontLoaded={fontLoaded}
            />
          }
          ListFooterComponent={<View style={{ height: 120 }} />}
          showsVerticalScrollIndicator={false}
          initialNumToRender={15}
          maxToRenderPerBatch={20}
          windowSize={10}
          removeClippedSubviews
          getItemLayout={(_, index) => ({
            length: showTranslation ? 140 : 100,
            offset: (showTranslation ? 140 : 100) * index,
            index,
          })}
        />

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
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
