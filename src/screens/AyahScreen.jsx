import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AyahDisplay } from "../components/AyahDisplay";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";
import { useTheme } from "../context/ThemeContext";
import { useAyatLibrary } from "../hooks/useAyatLibrary";
import {
    getAyahNote,
    markReadToday,
    saveAyahNote,
    saveAyahToHistory,
} from "../services/userService";

export default function AyahScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  const selectedSurah = Number(params?.surah);
  const selectedAyah = Number(params?.ayah);

  const { ayat, favorites } = useAyatLibrary();

  const [query, setQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [current, setCurrent] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (!ayat.length) return;
    let initial = ayat[0];
    if (selectedSurah && selectedAyah) {
      const found = ayat.find(
        (item) =>
          Number(item.surahNumber) === selectedSurah &&
          Number(item.ayahNumber) === selectedAyah,
      );
      if (found) initial = found;
    }
    void chooseAyah(initial);
  }, [ayat, selectedSurah, selectedAyah]);

  const filteredAyat = useMemo(() => {
    const text = query.trim().toLowerCase();
    return ayat.filter((item) => {
      const matchesQuery =
        !text ||
        item.surah.toLowerCase().includes(text) ||
        item.translation.toLowerCase().includes(text);
      const matchesFavorite = showFavoritesOnly
        ? favorites.includes(item.id)
        : true;
      return matchesQuery && matchesFavorite;
    });
  }, [ayat, favorites, query, showFavoritesOnly]);

  const chooseAyah = async (item) => {
    if (!item) return;
    setCurrent(item);
    await Promise.all([saveAyahToHistory(item), markReadToday()]);
    const note = await getAyahNote(item.id);
    setNoteText(note || "");
  };

  const saveNote = async () => {
    if (!current) return;
    await saveAyahNote(current.id, noteText);
    setShowNoteModal(false);
    Alert.alert("Saved", "Reflection updated successfully.");
  };

  return (
    <SwipeBackContainer>
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
      >
        <TopBar
          title="Ayah Library"
          onLeftPress={() => router.back()}
          leftIcon="chevron-left"
        />

        <View className="px-5 pb-3">
          <View className="relative">
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={theme.textSecondary}
              style={{ position: "absolute", left: 16, top: 14, zIndex: 1 }}
            />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search surah or translation"
              placeholderTextColor={theme.textSecondary}
              className="rounded-2xl border pl-11 pr-4 py-3.5"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.cardBackground,
                color: theme.text,
              }}
            />
          </View>

          <View className="mt-4 flex-row gap-2">
            <TouchableOpacity
              className="rounded-full px-6 py-2.5 shadow-sm"
              style={{
                backgroundColor: !showFavoritesOnly
                  ? theme.accent
                  : theme.cardBackground,
                borderColor: theme.border,
                borderWidth: !showFavoritesOnly ? 0 : 1,
              }}
              onPress={() => setShowFavoritesOnly(false)}
            >
              <Text
                className="text-xs font-bold uppercase tracking-wider"
                style={{
                  color: !showFavoritesOnly ? "#fff" : theme.textSecondary,
                }}
              >
                All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="rounded-full px-6 py-2.5 shadow-sm"
              style={{
                backgroundColor: showFavoritesOnly
                  ? theme.accent
                  : theme.cardBackground,
                borderColor: theme.border,
                borderWidth: showFavoritesOnly ? 0 : 1,
              }}
              onPress={() => setShowFavoritesOnly(true)}
            >
              <Text
                className="text-xs font-bold uppercase tracking-wider"
                style={{
                  color: showFavoritesOnly ? "#fff" : theme.textSecondary,
                }}
              >
                Favorites
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={filteredAyat}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 120, // Enough space for tab bar
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View>
              <View className="items-center pt-2 pb-10">
                <Text
                  className="text-[10px] font-bold uppercase tracking-[4px]"
                  style={{ color: theme.textSecondary }}
                >
                  Restoring Stillness
                </Text>
                <View
                  className="h-[1px] w-8 mt-2"
                  style={{ backgroundColor: theme.border }}
                />

                <View className="w-full mt-10 mb-6">
                  <AyahDisplay ayah={current} showShare />
                </View>

                <View className="flex-row items-center justify-center gap-2 mb-10">
                  <View
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: theme.textSecondary,
                      opacity: 0.2,
                    }}
                  />
                  <View
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <View
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: theme.textSecondary,
                      opacity: 0.2,
                    }}
                  />
                </View>
              </View>

              <Text
                className="mb-3 text-[10px] font-bold uppercase tracking-[2px] px-1"
                style={{ color: theme.textSecondary }}
              >
                {showFavoritesOnly ? "Favorite Ayat" : "Curated Ayat"}
              </Text>
            </View>
          )}
          renderItem={({ item }) => {
            const isSelected = current?.id === item.id;
            return (
              <TouchableOpacity
                onPress={() => chooseAyah(item)}
                activeOpacity={0.6}
                className="mb-3 flex-row items-center rounded-2xl border px-4 py-4"
                style={{
                  borderColor: isSelected ? theme.accent : theme.border,
                  backgroundColor: isSelected
                    ? theme.softAccent + "40"
                    : theme.cardBackground, // +40 for opacity if nativewind doesn't handle it
                }}
              >
                <View
                  className="w-12 items-center justify-center border-r pr-3 mr-4"
                  style={{ borderRightColor: theme.border }}
                >
                  <Text
                    className="text-[10px] font-bold"
                    style={{ color: theme.accent }}
                  >
                    {item.surahNumber}:{item.ayahNumber}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    numberOfLines={1}
                    className="text-sm font-bold"
                    style={{ color: theme.text }}
                  >
                    {item.surah}
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-xs italic mt-0.5"
                    style={{ color: theme.textSecondary }}
                  >
                    {item.translation}
                  </Text>
                </View>
                {favorites.includes(item.id) ? (
                  <MaterialCommunityIcons
                    name="heart"
                    size={16}
                    color={theme.accent}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={16}
                    color={theme.textSecondary}
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />

        <Modal visible={showNoteModal} transparent animationType="slide">
          <View className="flex-1 justify-end bg-black/40 px-4 pb-10">
            <View className="rounded-[40px] border border-sanctuary-border/40 bg-sanctuary-background p-8 dark:border-sanctuary-border-dark/40 dark:bg-sanctuary-background-dark shadow-2xl">
              <Text className="text-xl font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
                Personal Reflection
              </Text>
              <Text className="text-sm italic text-sanctuary-text-muted leading-5">
                &quot;{current?.translation}&quot;
              </Text>
              <Text className="text-xs italic text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark mb-4">
                Capture your thoughts on this verse
              </Text>

              <TextInput
                multiline
                value={noteText}
                onChangeText={setNoteText}
                placeholder="Write your reflection here..."
                placeholderTextColor="#7c7769"
                className="h-40 rounded-3xl border border-sanctuary-border/30 bg-white/40 px-5 py-4 text-sanctuary-text dark:border-sanctuary-border-dark/30 dark:bg-white/5 dark:text-sanctuary-text-dark"
                textAlignVertical="top"
              />

              <View className="mt-6 flex-row gap-3">
                <TouchableOpacity
                  onPress={() => setShowNoteModal(false)}
                  className="flex-1 rounded-full border border-sanctuary-border/60 py-4"
                >
                  <Text className="text-center font-bold text-sanctuary-text/60">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={saveNote}
                  className="flex-1 rounded-full bg-sanctuary-accent py-4 shadow-sm shadow-sanctuary-accent/30"
                >
                  <Text className="text-center font-bold text-white">
                    Save Reflection
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
