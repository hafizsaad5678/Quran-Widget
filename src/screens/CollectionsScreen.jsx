/**
 * CollectionsScreen
 * Browse and manage saved ayah collections (Sabr, Shukr, etc.)
 * Ayahs are added from the Ayah Library screen.
 */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const addCollection = useAppStore((s) => s.addCollection);
  const removeCollection = useAppStore((s) => s.removeCollection);

  const activeCollection = collections.find((c) => c.id === activeId) || null;
  const collectionAyat = activeCollection
    ? ayat.filter((a) => activeCollection.ayahIds.includes(a.id))
    : [];

  const handleDelete = (collection) => {
    removeCollection(collection.id);
    if (collection.id === activeId) {
      const next = collections.find((c) => c.id !== collection.id);
      setActiveId(next?.id || null);
      setPreviewAyah(null);
    }
  };

  const createCollection = () => {
    const name = newCollectionName.trim();
    if (!name) return;
    const id = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    addCollection({ id, name, ayahIds: [], color: theme.accent, icon: "bookmark-outline" });
    setActiveId(id);
    setNewCollectionName("");
    setShowCreateModal(false);
  };

  return (
    <SwipeBackContainer>
      <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
        <TopBar
          title="My Collections"
        leftIcon="chevron-left"
        onLeftPress={() => router.back()}
      />

      {/* Collection carousel */}
      <View className="mt-4 px-5">
        <Text
          className="mb-2 text-[10px] font-bold uppercase tracking-[2px]"
          style={{ color: theme.textSecondary }}
        >
          Your collections
        </Text>
        <View className="flex-row items-center">
        <ScrollView
          horizontal
          className="flex-1"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingRight: 8 }}
        >
          {collections.map((c) => {
            const isActive = c.id === activeId;
            return (
              <TouchableOpacity
                key={c.id}
                onPress={() => { setActiveId(c.id); setPreviewAyah(null); }}
                className="rounded-2xl border px-4 py-3"
                style={{
                  backgroundColor: isActive ? theme.accent : theme.cardBackground,
                  borderColor: isActive ? theme.accent : theme.border,
                  minWidth: 132,
                }}
              >
                <View className="flex-row items-center justify-between">
                  <MaterialCommunityIcons
                    name={c.icon || "bookmark-outline"}
                    size={17}
                    color={isActive ? theme.onAccent : theme.accent}
                  />
                  <View className="flex-row items-center">
                    <View
                      className="h-6 min-w-6 items-center justify-center rounded-full px-1"
                      style={{ backgroundColor: isActive ? "rgba(255,255,255,0.25)" : theme.softAccent }}
                    >
                      <Text className="text-[9px] font-bold" style={{ color: isActive ? theme.onAccent : theme.accent }}>
                        {c.ayahIds.length}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDelete(c)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      className="ml-2"
                      accessibilityRole="button"
                      accessibilityLabel={`Delete ${c.name}`}
                    >
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={13}
                        color={isActive ? theme.onAccent : theme.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text
                  className="mt-2 text-xs font-bold"
                  numberOfLines={1}
                  style={{ color: isActive ? theme.onAccent : theme.text }}
                >
                  {c.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        </View>
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

      {/* Floating round button (bottom right): new collection */}
      <TouchableOpacity
        onPress={() => setShowCreateModal(true)}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Create new collection"
        className="items-center justify-center rounded-full"
        style={{
          position: "absolute",
          right: 20,
          bottom: 28,
          width: 56,
          height: 56,
          backgroundColor: theme.accent,
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
        }}
      >
        <MaterialCommunityIcons name="plus" size={28} color={theme.onAccent} />
      </TouchableOpacity>

      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <KeyboardAvoidingView
          className="flex-1 justify-end bg-black/50 px-4"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
        >
          <View className="mb-4 rounded-[32px] border p-6" style={{ backgroundColor: theme.background, borderColor: theme.border }}>
            <Text className="text-lg font-bold" style={{ color: theme.accent }}>Create Collection</Text>
            <Text className="text-xs mt-1 mb-4" style={{ color: theme.textSecondary }}>
              Give your saved ayahs a meaningful place.
            </Text>
            <TextInput
              autoFocus
              value={newCollectionName}
              onChangeText={setNewCollectionName}
              placeholder="Collection name"
              placeholderTextColor={theme.textSecondary}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                createCollection();
              }}
              className="rounded-2xl border px-4 py-3"
              style={{ color: theme.text, borderColor: theme.border, backgroundColor: theme.cardBackground }}
            />
            <View className="flex-row gap-3 mt-4">
              <TouchableOpacity onPress={() => setShowCreateModal(false)} className="flex-1 items-center rounded-2xl border py-3" style={{ borderColor: theme.border }}>
                <Text className="font-bold" style={{ color: theme.textSecondary }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { Keyboard.dismiss(); createCollection(); }} disabled={!newCollectionName.trim()} className="flex-1 items-center rounded-2xl py-3" style={{ backgroundColor: newCollectionName.trim() ? theme.accent : theme.cardAlternative }}>
                <Text className="font-bold" style={{ color: newCollectionName.trim() ? theme.onAccent : theme.textSecondary }}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
    </SwipeBackContainer>
  );
}
