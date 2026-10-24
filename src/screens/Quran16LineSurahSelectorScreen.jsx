import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllSurahs } from "../constants/quranCurated";
import { useTheme } from "../context/ThemeContext";

export default function Quran16LineSurahSelectorScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const surahs = useMemo(() => getAllSurahs(), []);

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
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
        <View className="flex-1">
          <Text style={{ color: theme.accent, fontSize: 17, fontWeight: "700" }}>
            16 Line Quran Reading
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
            Select a Surah to start Tajweed Mushaf
          </Text>
        </View>
      </View>

      <FlatList
        data={surahs}
        keyExtractor={(item) => String(item.number)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingTop: 10,
          paddingBottom: 24,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/quran-page-reader",
                params: { surah: item.number },
              })
            }
            className="rounded-2xl border px-4 py-3 mb-2 flex-row items-center"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.cardBackground,
            }}
          >
            <View
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: theme.softAccent }}
            >
              <Text
                style={{ color: theme.accent, fontSize: 12, fontWeight: "700" }}
              >
                {item.number}
              </Text>
            </View>
            <View className="flex-1">
              <Text
                style={{ color: theme.accent, fontSize: 14, fontWeight: "700" }}
              >
                {item.nameArabic}
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
                {item.name} · {item.totalVerses} ayahs
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
