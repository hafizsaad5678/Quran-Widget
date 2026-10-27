import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import { useTheme } from "../context/ThemeContext";
import { useSurahList } from "../hooks/useSurah";
import { useAppStore } from "../store/useAppStore";

const SurahRow = React.memo(({ surah, onPress, theme }) => (
  <TouchableOpacity
    onPress={() => onPress(surah.number)}
    activeOpacity={0.7}
    className="flex-row items-center px-5 py-4 border-b"
    style={{ borderBottomColor: theme.border }}
  >
    {/* Number badge */}
    <View
      className="w-10 h-10 rounded-full items-center justify-center mr-4"
      style={{ backgroundColor: theme.softAccent }}
    >
      <Text style={{ fontSize: 11, fontWeight: "700", color: theme.accent }}>
        {surah.number}
      </Text>
    </View>

    {/* Names */}
    <View className="flex-1">
      <Text style={{ fontSize: 15, fontWeight: "700", color: theme.accent }}>
        {surah.name}
      </Text>
      <Text style={{ fontSize: 12, color: theme.textSecondary, marginTop: 1 }}>
        {surah.totalVerses} ayahs ·{" "}
        {surah.revelationType === "Meccan" ? "Makkiyah" : "Madaniyah"}
      </Text>
    </View>

    {/* Arabic name */}
    <Text style={{ fontSize: 20, color: theme.accent, fontWeight: "600" }}>
      {surah.nameArabic}
    </Text>
  </TouchableOpacity>
));

SurahRow.displayName = "SurahRow";

export default function SurahListScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const surahs = useSurahList();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return surahs;
    return surahs.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.nameArabic.includes(q) ||
        String(s.number).includes(q),
    );
  }, [surahs, query]);

  const openSurah = (number) => {
    router.push(`/surah/${number}`);
  };

  const lastRead = useAppStore((st) => st.lastRead);
  const bookmarks = useAppStore((st) => st.bookmarks);
  const removeBookmark = useAppStore((st) => st.removeBookmark);

  const openPlace = (place) => {
    if (place.type === "page") {
      router.push({
        pathname: "/quran-page-reader",
        params: { page: place.page },
      });
    } else {
      router.push({
        pathname: `/surah/${place.surah}`,
        params: place.ayah ? { ayah: place.ayah } : {},
      });
    }
  };

  return (
    <SwipeBackContainer>
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
      >
        {/* Header */}
        <View
          className="flex-row items-center px-4 py-3 border-b"
          style={{ borderBottomColor: theme.border }}
        >
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
          <Text
            className="text-xl font-bold flex-1"
            style={{ color: theme.accent }}
          >
            Quran
          </Text>
          <Text style={{ fontSize: 12, color: theme.textSecondary }}>
            114 Surahs
          </Text>
        </View>

        {/* Search */}
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
              value={query}
              onChangeText={setQuery}
              placeholder="Search surah name or number..."
              placeholderTextColor={theme.textSecondary}
              className="flex-1 ml-2 text-sm"
              style={{ color: theme.text }}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={16}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={() => router.push("/quran-page")}
            className="mt-3 rounded-2xl border px-4 py-3 flex-row items-center"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            }}
          >
            <View
              className="w-9 h-9 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: theme.softAccent }}
            >
              <MaterialCommunityIcons
                name="book-open-page-variant"
                size={18}
                color={theme.accent}
              />
            </View>
            <View className="flex-1">
              <Text
                style={{ fontSize: 12, fontWeight: "700", color: theme.accent }}
              >
                16 Line Quran Reading
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: theme.textSecondary,
                  marginTop: 1,
                }}
              >
                Shift by page with Previous / Next
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={theme.textSecondary}
            />
          </TouchableOpacity>

          {/* Continue + bookmarks: only shown when something is saved */}
          {lastRead || bookmarks.length > 0 ? (
            <View className="mt-3">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {lastRead ? (
                  <TouchableOpacity
                    onPress={() => openPlace(lastRead)}
                    className="flex-row items-center rounded-full px-4 py-2"
                    style={{ backgroundColor: theme.accent }}
                  >
                    <MaterialCommunityIcons
                      name="play-circle-outline"
                      size={16}
                      color={theme.onAccent}
                    />
                    <Text
                      className="ml-2 text-xs font-bold"
                      style={{ color: theme.onAccent }}
                    >
                      Continue ·{" "}
                      {lastRead.type === "page"
                        ? `${lastRead.surahName} p.${lastRead.page}`
                        : `${lastRead.surahName}${lastRead.ayah ? `:${lastRead.ayah}` : ""}`}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {bookmarks.map((b) => (
                  <TouchableOpacity
                    key={b.id}
                    onPress={() => openPlace(b)}
                    onLongPress={() => removeBookmark(b.id)}
                    className="flex-row items-center rounded-full border px-4 py-2"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.cardBackground,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="bookmark"
                      size={14}
                      color={theme.accent}
                    />
                    <Text
                      className="ml-2 text-xs font-bold"
                      style={{ color: theme.accent }}
                    >
                      {b.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {bookmarks.length > 0 ? (
                <Text
                  className="mt-2 text-[10px]"
                  style={{ color: theme.textSecondary }}
                >
                  Press and hold a bookmark to remove it.
                </Text>
              ) : null}
            </View>
          ) : null}
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.number)}
          renderItem={({ item }) => (
            <SurahRow surah={item} onPress={openSurah} theme={theme} />
          )}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          maxToRenderPerBatch={30}
          windowSize={10}
          removeClippedSubviews
          getItemLayout={(_, index) => ({
            length: 68,
            offset: 68 * index,
            index,
          })}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
