/**
 * OnboardingScreen
 * Shown to unauthenticated users. Displays app feature cards
 * then prompts sign up / sign in.
 */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

const FEATURES = [
  {
    icon: "book-open-variant",
    title: "Daily Ayah",
    desc: "Start every day with a handpicked verse from the Quran, delivered fresh each morning.",
    color: "#b0926a",
  },
  {
    icon: "compass-outline",
    title: "Instant Guidance",
    desc: "Feeling stressed, fearful, or lost? Get focused ayahs and reflections for your exact situation.",
    color: "#7a9e7e",
  },
  {
    icon: "bookmark-multiple-outline",
    title: "Collections",
    desc: "Save your favourite ayahs into themed collections like Sabr, Shukr, and more.",
    color: "#8e7ab5",
  },
  {
    icon: "fire",
    title: "Streak Tracking",
    desc: "Build a daily reading habit and watch your streak grow. Your journey, visualised.",
    color: "#e07b54",
  },
  {
    icon: "cloud-sync-outline",
    title: "Cloud Sync",
    desc: "Your favorites, notes, and progress sync across devices when you sign in.",
    color: "#4a9eca",
  },
];

const FeatureSlide = ({ item, theme }) => (
  <View style={{ width }} className="px-8 items-center justify-center">
    <View
      className="w-24 h-24 rounded-[32px] items-center justify-center mb-8"
      style={{ backgroundColor: `${item.color}20` }}
    >
      <MaterialCommunityIcons name={item.icon} size={44} color={item.color} />
    </View>
    <Text
      className="text-3xl font-serif font-bold text-center mb-4"
      style={{ color: theme.text }}
    >
      {item.title}
    </Text>
    <Text
      className="text-base text-center leading-7"
      style={{ color: theme.textSecondary }}
    >
      {item.desc}
    </Text>
  </View>
);

export default function OnboardingScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const onScroll = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(idx);
  };

  const goNext = () => {
    if (activeIndex < FEATURES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
    }
  };

  const isLast = activeIndex === FEATURES.length - 1;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Logo / brand */}
      <View className="items-center pt-10 pb-4">
        <Text className="text-[10px] font-bold uppercase tracking-[4px]" style={{ color: theme.textSecondary }}>
          Ayah Connect
        </Text>
        <Text className="text-2xl font-serif font-bold mt-1" style={{ color: theme.text }}>
          Digital Sanctuary
        </Text>
      </View>

      {/* Feature slides */}
      <FlatList
        ref={flatListRef}
        data={FEATURES}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => <FeatureSlide item={item} theme={theme} />}
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: "center" }}
      />

      {/* Dot indicators */}
      <View className="flex-row justify-center gap-2 mb-6">
        {FEATURES.map((_, i) => (
          <View
            key={i}
            className="rounded-full"
            style={{
              width: i === activeIndex ? 20 : 6,
              height: 6,
              backgroundColor: i === activeIndex ? theme.accent : theme.border,
            }}
          />
        ))}
      </View>

      {/* CTA buttons */}
      <View className="px-6 pb-10 gap-3">
        {isLast ? (
          <>
            <TouchableOpacity
              onPress={() => router.replace("/auth")}
              className="rounded-2xl py-4 items-center"
              style={{ backgroundColor: theme.accent }}
            >
              <Text className="text-base font-bold" style={{ color: "#fff" }}>
                Create Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.replace("/auth?mode=signin")}
              className="rounded-2xl py-4 items-center border"
              style={{ borderColor: theme.border, backgroundColor: theme.cardBackground }}
            >
              <Text className="text-base font-bold" style={{ color: theme.text }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={goNext}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: theme.accent }}
          >
            <Text className="text-base font-bold text-white">Next</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="items-center py-2"
        >
          <Text className="text-sm" style={{ color: theme.textSecondary }}>
            Skip for now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
