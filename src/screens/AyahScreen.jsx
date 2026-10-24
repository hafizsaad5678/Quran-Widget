import {
  ScheherazadeNew_400Regular,
  useFonts,
} from "@expo-google-fonts/scheherazade-new";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { useAyatLibrary } from "../hooks/useAyatLibrary";
import {
  getAyahNote,
  markReadToday,
  saveAyahNote,
  saveAyahToHistory,
} from "../services/userService";

// ─── Selected Ayah Card ───────────────────────────────────────────────────────
function AyahCard({ ayah, isFav, onFav, onNote, theme, fontLoaded }) {
  if (!ayah) return null;

  const handleShare = () =>
    Share.share({
      message: `"${ayah.translation}"\n\n— ${ayah.surahName} ${ayah.surahNumber}:${ayah.ayahNumber}`,
    });

  return (
    <View
      className="mx-4 mt-3 mb-2 rounded-[32px] p-6 border"
      style={{
        backgroundColor: theme.cardBackground,
        borderColor: theme.border,
      }}
    >
      {/* Meta row */}
      <View className="flex-row items-center justify-between mb-4">
        <View
          className="rounded-full px-3 py-1"
          style={{ backgroundColor: theme.softAccent }}
        >
          <Text
            style={{ fontSize: 11, fontWeight: "700", color: theme.accent }}
          >
            {ayah.surahName} {ayah.surahNumber}:{ayah.ayahNumber}
          </Text>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={onFav}
            className="w-9 h-9 rounded-full items-center justify-center"
            style={{
              backgroundColor: isFav ? theme.softAccent : theme.cardBackground,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <MaterialCommunityIcons
              name={isFav ? "heart" : "heart-outline"}
              size={17}
              color={isFav ? "#e05" : theme.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onNote}
            className="w-9 h-9 rounded-full items-center justify-center"
            style={{
              backgroundColor: theme.cardBackground,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={17}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            className="w-9 h-9 rounded-full items-center justify-center"
            style={{
              backgroundColor: theme.cardBackground,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <MaterialCommunityIcons
              name="share-variant-outline"
              size={17}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Arabic */}
      <Text
        style={{
          fontSize: 26,
          lineHeight: 48,
          textAlign: "right",
          color: theme.text,
          fontFamily: fontLoaded ? "ScheherazadeNew_400Regular" : undefined,
          marginBottom: 16,
        }}
      >
        {ayah.arabic}
      </Text>

      {/* Divider */}
      <View
        style={{ height: 1, backgroundColor: theme.border, marginBottom: 14 }}
      />

      {/* Translation */}
      <Text
        style={{
          fontSize: 14,
          lineHeight: 22,
          color: theme.textSecondary,
          fontStyle: "italic",
        }}
      >
        &quot;{ayah.translation || "Translation unavailable offline."}&quot;
      </Text>
    </View>
  );
}

// ─── Ayah List Row ────────────────────────────────────────────────────────────
function AyahRow({ item, isSelected, isFav, onPress, theme, fontLoaded }) {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.7}
      className="mx-4 mb-2 rounded-[20px] border overflow-hidden"
      style={{
        borderColor: isSelected ? theme.accent : theme.border,
        backgroundColor: isSelected ? theme.softAccent : theme.cardBackground,
      }}
    >
      <View className="flex-row items-stretch">
        {/* Left accent bar when selected */}
        <View
          style={{
            width: 4,
            backgroundColor: isSelected ? theme.accent : "transparent",
            borderRadius: 4,
          }}
        />

        <View className="flex-1 px-4 py-3">
          {/* Top row: surah name + number badge */}
          <View className="flex-row items-center justify-between mb-2">
            <Text
              className="text-sm font-bold"
              style={{ color: isSelected ? theme.accent : theme.text }}
            >
              {item.surahName || item.surah}
            </Text>
            <View className="flex-row items-center gap-2">
              {isFav && (
                <MaterialCommunityIcons name="heart" size={12} color="#e05" />
              )}
              <View
                className="rounded-full px-2 py-0.5"
                style={{
                  backgroundColor: isSelected ? theme.accent : theme.softAccent,
                }}
              >
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: "700",
                    color: isSelected ? theme.onAccent : theme.accent,
                  }}
                >
                  {item.surahNumber}:{item.ayahNumber}
                </Text>
              </View>
            </View>
          </View>

          {/* Arabic snippet */}
          <Text
            numberOfLines={1}
            style={{
              fontSize: 15,
              textAlign: "right",
              color: theme.text,
              fontFamily: fontLoaded ? "ScheherazadeNew_400Regular" : undefined,
              marginBottom: 4,
              opacity: 0.85,
            }}
          >
            {item.arabic}
          </Text>

          {/* Translation */}
          <Text
            numberOfLines={1}
            className="text-xs italic"
            style={{ color: theme.textSecondary }}
          >
            {item.translation}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function AyahScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [fontLoaded] = useFonts({ ScheherazadeNew_400Regular });
  const { show } = useToast();
  const params = useLocalSearchParams();
  const selectedSurah = Number(params?.surah);
  const selectedAyah = Number(params?.ayah);

  const { ayat, favorites, toggleFavorite } = useAyatLibrary();

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [current, setCurrent] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const listRef = React.useRef(null);

  useEffect(() => {
    if (!ayat.length) return;
    let initial = ayat[0];
    if (selectedSurah && selectedAyah) {
      const found = ayat.find(
        (a) =>
          Number(a.surahNumber) === selectedSurah &&
          Number(a.ayahNumber) === selectedAyah,
      );
      if (found) initial = found;
    }
    void chooseAyah(initial);
  }, [ayat, selectedSurah, selectedAyah]);

  const filteredAyat = useMemo(() => {
    return ayat.filter((item) =>
      showFavoritesOnly ? favorites.includes(item.id) : true,
    );
  }, [ayat, favorites, showFavoritesOnly]);

  const chooseAyah = async (item) => {
    if (!item) return;
    setCurrent(item);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
    await Promise.all([saveAyahToHistory(item), markReadToday()]);
    const note = await getAyahNote(item.id);
    setNoteText(note || "");
  };

  const saveNote = async () => {
    if (!current) return;
    await saveAyahNote(current.id, noteText);
    setShowNoteModal(false);
    show({ type: "success", message: "Reflection saved." });
  };

  return (
    <SwipeBackContainer>
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
      >
        <TopBar
          title="Ayah Library"
          leftIcon="chevron-left"
          onLeftPress={() => router.back()}
        />

        <FlatList
          ref={listRef}
          data={filteredAyat}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          ListHeaderComponent={() => (
            <View>
              <View className="px-4 mt-3 mb-3">
                <TouchableOpacity
                  onPress={() => router.push("/quran")}
                  className="rounded-[22px] p-4 border"
                  style={{
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.border,
                  }}
                >
                  <View className="flex-row items-center">
                    <View
                      className="w-10 h-10 rounded-full items-center justify-center"
                      style={{ backgroundColor: theme.softAccent }}
                    >
                      <MaterialCommunityIcons
                        name="book-open-page-variant"
                        size={20}
                        color={theme.accent}
                      />
                    </View>
                    <View className="ml-3 flex-1">
                      <Text
                        className="text-xs font-bold"
                        style={{ color: theme.accent }}
                      >
                        16 Line Quran Reading
                      </Text>
                      <Text
                        className="text-[10px] mt-0.5"
                        style={{ color: theme.textSecondary }}
                      >
                        Mushaf-style page view (1-604)
                      </Text>
                    </View>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={20}
                      color={theme.textSecondary}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              {/* Selected ayah card */}
              <AyahCard
                ayah={current}
                isFav={favorites.includes(current?.id)}
                onFav={() => current && toggleFavorite(current.id)}
                onNote={() => setShowNoteModal(true)}
                theme={theme}
                fontLoaded={fontLoaded}
              />

              {/* Filter */}
              <View className="px-4 mt-3 mb-2">
                <View className="flex-row items-center gap-2">
                  {[
                    { label: "All", value: false },
                    { label: "Favorites", value: true },
                  ].map((opt) => {
                    const active = showFavoritesOnly === opt.value;
                    return (
                      <TouchableOpacity
                        key={opt.label}
                        onPress={() => setShowFavoritesOnly(opt.value)}
                        className="rounded-full px-4 py-2 border"
                        style={{
                          backgroundColor: active
                            ? theme.accent
                            : theme.cardBackground,
                          borderColor: active ? theme.accent : theme.border,
                        }}
                      >
                        <Text
                          className="text-xs font-bold"
                          style={{
                            color: active ? theme.onAccent : theme.textSecondary,
                          }}
                        >
                          {opt.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                  <Text
                    className="ml-auto text-xs"
                    style={{ color: theme.textSecondary }}
                  >
                    {filteredAyat.length} ayahs
                  </Text>
                </View>
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <AyahRow
              item={item}
              isSelected={current?.id === item.id}
              isFav={favorites.includes(item.id)}
              onPress={chooseAyah}
              theme={theme}
              fontLoaded={fontLoaded}
            />
          )}
        />

        {/* Reflection modal */}
        <Modal visible={showNoteModal} transparent animationType="slide">
          <View className="flex-1 justify-end bg-black/50 px-4 pb-8">
            <View
              className="rounded-[32px] p-6 border"
              style={{
                backgroundColor: theme.background,
                borderColor: theme.border,
              }}
            >
              <Text
                className="text-lg font-bold mb-1"
                style={{ color: theme.accent }}
              >
                Personal Reflection
              </Text>
              <Text
                className="text-xs italic mb-4"
                numberOfLines={2}
                style={{ color: theme.textSecondary }}
              >
                &quot;{current?.translation}&quot;
              </Text>
              <TextInput
                multiline
                value={noteText}
                onChangeText={setNoteText}
                placeholder="Write your reflection here..."
                placeholderTextColor={theme.textSecondary}
                style={{
                  height: 120,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: theme.border,
                  backgroundColor: theme.cardBackground,
                  color: theme.text,
                  padding: 14,
                  textAlignVertical: "top",
                }}
              />
              <View className="flex-row gap-3 mt-4">
                <TouchableOpacity
                  onPress={() => setShowNoteModal(false)}
                  className="flex-1 rounded-2xl py-3 items-center border"
                  style={{ borderColor: theme.border }}
                >
                  <Text
                    className="font-bold"
                    style={{ color: theme.textSecondary }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={saveNote}
                  className="flex-1 rounded-2xl py-3 items-center"
                  style={{ backgroundColor: theme.accent }}
                >
                  <Text className="font-bold" style={{ color: theme.onAccent }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
