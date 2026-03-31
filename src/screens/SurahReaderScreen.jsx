import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AyahItem from "../components/quran/AyahItem";
import SurahHeader from "../components/quran/SurahHeader";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import { useSession } from "../context/SessionContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { useAyahInteraction } from "../hooks/useAyahInteraction";
import { useSurah } from "../hooks/useSurah";
import { useAppStore } from "../store/useAppStore";

export default function SurahReaderScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  const surahNumber = Number(params?.number ?? params?.surah ?? 1);

  const { ayahs, meta } = useSurah(surahNumber);
  const { onAyahTap } = useAyahInteraction();
  const favorites = useAppStore((s) => s.favorites);
  const { session, formatted, pauseSession, resumeSession, abandonSession } = useSession();
  const { show } = useToast();

  const [selectedId, setSelectedId] = useState(null);
  const [showTranslation, setShowTranslation] = useState(true);
  const listRef = useRef(null);

  const handleAyahPress = useCallback((ayah) => {
    setSelectedId(ayah.id);
    onAyahTap(ayah);
  }, [onAyahTap]);

  const renderItem = useCallback(({ item }) => (
    <AyahItem
      ayah={item}
      isSelected={selectedId === item.id}
      showTranslation={showTranslation}
      onPress={handleAyahPress}
    />
  ), [selectedId, showTranslation, handleAyahPress]);

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <SwipeBackContainer>
      <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
        {/* Top bar */}
        <View
          className="flex-row items-center justify-between px-4 py-3 border-b"
          style={{ borderBottomColor: theme.border, backgroundColor: theme.background }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full items-center justify-center border"
            style={{ borderColor: theme.border, backgroundColor: theme.cardBackground }}
          >
            <MaterialCommunityIcons name="chevron-left" size={22} color={theme.accent} />
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
              backgroundColor: showTranslation ? theme.softAccent : theme.cardBackground,
            }}
          >
            <MaterialCommunityIcons
              name="translate"
              size={18}
              color={showTranslation ? theme.accent : theme.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Session timer strip */}
        {session && !session.abandoned && !session.completed && (
          <View
            className="mx-4 mt-2 flex-row items-center rounded-2xl px-4 py-2"
            style={{ backgroundColor: theme.softAccent, borderWidth: 1, borderColor: theme.accent + "40" }}
          >
            <MaterialCommunityIcons name="timer-outline" size={15} color={theme.accent} />
            <Text style={{ fontSize: 14, fontWeight: "700", color: theme.accent, marginLeft: 6, letterSpacing: 1 }}>
              {formatted}
            </Text>
            <Text style={{ fontSize: 11, color: theme.textSecondary, marginLeft: 6, flex: 1 }} numberOfLines={1}>
              · {session.surahName || meta?.name}
            </Text>
            <TouchableOpacity onPress={session.running ? pauseSession : resumeSession} style={{ marginRight: 10 }}>
              <MaterialCommunityIcons
                name={session.running ? "pause-circle-outline" : "play-circle-outline"}
                size={20}
                color={theme.accent}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              show({ type: "warning", title: "Session Ended Early", message: "Streak not counted — complete the full session to earn your streak." });
              abandonSession();
            }}>
              <MaterialCommunityIcons name="stop-circle-outline" size={20} color="#f44336" />
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          ref={listRef}
          data={ayahs}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={<SurahHeader meta={meta} ayahCount={ayahs.length} />}
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
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
