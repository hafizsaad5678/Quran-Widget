/**
 * CollectionsScreen
 * Browse and manage saved ayah collections (Sabr, Shukr, etc.)
 * Ayahs are added from the Ayah Library screen.
 */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AyahDisplay } from "../components/AyahDisplay";
import GlassCard from "../components/ui/GlassCard";
import SwipeBackContainer from "../components/ui/SwipeBackContainer";
import TopBar from "../components/ui/TopBar";
import { useTheme } from "../context/ThemeContext";
import { useAyatLibrary } from "../hooks/useAyatLibrary";
import { useAppStore } from "../store/useAppStore";

export default function CollectionsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { ayat } = useAyatLibrary();

  const collections = useAppStore((s) => s.collections);
  const toggleAyahInCollection = useAppStore((s) => s.toggleAyahInCollection);

  const [activeId, setActiveId] = useState(collections[0]?.id || null);
  const [previewAyah, setPreviewAyah] = useState(null);

  const activeCollection = collections.find((c) => c.id === activeId) || null;
  const collectionAyat = activeCollection
    ? ayat.filter((a) => activeCollection.ayahIds.includes(a.id))
    : [];

  return (
    <SwipeBackContainer>
      <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
        <TopBar
          title="My Collections"
        leftIcon="chevron-left"
        onLeftPress={() => router.back()}
      />

      {/* Collection tabs */}
      <View className="mt-4 px-5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingRight: 20 }}
        >
          {collections.map((c) => {
            const isActive = c.id === activeId;
            return (
              <TouchableOpacity
                key={c.id}
                onPress={() => { setActiveId(c.id); setPreviewAyah(null); }}
                className="flex-row items-center rounded-full px-4 py-2 border"
                style={{
                  backgroundColor: isActive ? theme.accent : theme.cardBackground,
                  borderColor: isActive ? theme.accent : theme.border,
                }}
              >
                <MaterialCommunityIcons
                  name={c.icon || "bookmark-outline"}
                  size={15}
                  color={isActive ? theme.onAccent : theme.accent}
                />
                <Text
                  className="ml-2 text-xs font-bold"
                  style={{ color: isActive ? theme.onAccent : theme.text }}
                >
                  {c.name}
                </Text>
                <View
                  className="ml-2 w-5 h-5 rounded-full items-center justify-center"
                  style={{ backgroundColor: isActive ? "rgba(255,255,255,0.25)" : theme.softAccent }}
                >
                  <Text className="text-[9px] font-bold" style={{ color: isActive ? theme.onAccent : theme.accent }}>
                    {c.ayahIds.length}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Active collection header */}
      {activeCollection && (
        <View className="px-5 mt-5 mb-2 flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-serif font-bold" style={{ color: theme.accent }}>
              {activeCollection.name}
            </Text>
            <Text className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>
              {collectionAyat.length} {collectionAyat.length === 1 ? "ayah" : "ayahs"} saved
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/ayah")}
            className="flex-row items-center rounded-full px-4 py-2"
            style={{ backgroundColor: theme.softAccent }}
          >
            <MaterialCommunityIcons name="plus" size={16} color={theme.accent} />
            <Text className="ml-1 text-xs font-bold" style={{ color: theme.accent }}>
              Add Ayah
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Ayah preview */}
      {previewAyah && (
        <GlassCard
          className="mx-5 mb-3 rounded-[28px] p-5"
          style={{ backgroundColor: theme.cardBackground }}
        >
          <AyahDisplay ayah={previewAyah} showShare />
          <TouchableOpacity onPress={() => setPreviewAyah(null)} className="mt-3 items-center">
            <Text className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
              Close
            </Text>
          </TouchableOpacity>
        </GlassCard>
      )}

      {/* Ayah list */}
      <FlatList
        data={collectionAyat}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="items-center py-16 px-8">
            <MaterialCommunityIcons
              name="bookmark-plus-outline"
              size={52}
              color={theme.textSecondary}
              style={{ opacity: 0.35 }}
            />
            <Text className="mt-4 text-base font-bold text-center" style={{ color: theme.accent }}>
              This collection is empty
            </Text>
            <Text className="mt-2 text-sm text-center leading-6" style={{ color: theme.textSecondary }}>
              Go to the Ayah Library, open an ayah, and tap the bookmark icon to save it here.
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/ayah")}
              className="mt-6 rounded-full px-6 py-3"
              style={{ backgroundColor: theme.accent }}
            >
              <Text className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.onAccent }}>
                Browse Ayah Library
              </Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setPreviewAyah(previewAyah?.id === item.id ? null : item)}
            className="flex-row items-center rounded-2xl border p-4 mb-3"
            style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}
          >
            <View
              className="w-11 h-11 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: theme.softAccent }}
            >
              <Text className="text-[10px] font-bold" style={{ color: theme.accent }}>
                {item.surahNumber}:{item.ayahNumber}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold" numberOfLines={1} style={{ color: theme.accent }}>
                {item.surahName}
              </Text>
              <Text className="text-xs mt-0.5 italic" numberOfLines={1} style={{ color: theme.textSecondary }}>
                {item.translation}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                toggleAyahInCollection(activeId, item.id);
                if (previewAyah?.id === item.id) setPreviewAyah(null);
              }}
              className="w-8 h-8 rounded-full items-center justify-center ml-2"
              style={{ backgroundColor: "rgba(180,60,60,0.08)" }}
              accessibilityLabel="Remove from collection"
            >
              <MaterialCommunityIcons name="close" size={15} color="#b44" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
    </SwipeBackContainer>
  );
}
