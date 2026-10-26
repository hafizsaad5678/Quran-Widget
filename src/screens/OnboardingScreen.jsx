/**
 * OnboardingScreen
 * Shown to unauthenticated users. Displays app feature cards
 * then prompts sign up / sign in.
 */
import {
  ScheherazadeNew_400Regular,
  useFonts,
} from "@expo-google-fonts/scheherazade-new";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

const FEATURES = [
  {
    type: "widget",
    icon: "widgets-outline",
    title: "Random Ayah Widget",
    desc: "Show a beautiful home widget with a random ayah that refreshes and keeps Quran close all day.",
    color: "#7a9e7e",
  },
  {
    type: "audio",
    icon: "book-open-page-variant",
    title: "16-Line Quran + Audio",
    desc: "Read in 16-line Mushaf style and listen with recitation audio by Mishary Rashid Alafasy.",
    color: "#b0926a",
  },
  {
    type: "language",
    icon: "google-translate",
    title: "Multi-Language Translation",
    desc: "Choose your translation language anytime.",
    languages: ["English", "Urdu", "Italian", "German", "French"],
    color: "#5f8fd6",
  },
];

const FeatureSlide = ({ item, theme }) => {
  const [fontLoaded] = useFonts({ ScheherazadeNew_400Regular });
  return (
    <View style={{ width }} className="px-8 items-center justify-center">
      <View
        className="w-24 h-24 rounded-[32px] items-center justify-center mb-8"
        style={{ backgroundColor: `${item.color}20` }}
      >
        <MaterialCommunityIcons name={item.icon} size={44} color={item.color} />
      </View>

      {item.type === "widget" ? (
        <View
          className="w-full h-56 rounded-3xl border p-5 mb-5 justify-between"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.cardBackground,
          }}
        >
          <Text
            className="text-[10px] font-bold mb-2"
            style={{ color: item.color, letterSpacing: 1.4 }}
          >
            RANDOM AYAH WIDGET
          </Text>
          <Text
            className="text-right"
            style={{
              color: theme.text,
              fontSize: 28,
              lineHeight: 46,
              fontFamily: fontLoaded ? "ScheherazadeNew_400Regular" : "serif",
            }}
          >
            وَذَكِّرْ فَإِنَّ الذِّكْرَى تَنْفَعُ الْمُؤْمِنِينَ
          </Text>
          <Text
            className="text-sm mt-3"
            style={{ color: theme.textSecondary, fontStyle: "italic" }}
          >
            &quot;Remind, for reminder benefits the believers.&quot;
          </Text>
        </View>
      ) : null}

      {item.type === "audio" ? (
        <View className="items-center mb-5">
          <Text
            className="text-[11px] font-bold tracking-[2px]"
            style={{ color: item.color }}
          >
            RECITATION VOICE
          </Text>
          <Text
            className="text-3xl font-bold mt-1 text-center"
            style={{ color: theme.text, letterSpacing: 1 }}
          >
            RASHID ALAFASY
          </Text>
        </View>
      ) : null}

      {item.type === "language" ? (
        <View className="w-full mb-4">
          {item.languages?.map((lang) => (
            <View
              key={lang}
              className="flex-row items-center justify-center mb-2"
            >
              <View
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <Text
                className="text-sm font-semibold"
                style={{ color: theme.text }}
              >
                {lang}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

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
};

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
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  // COMMENTED OUT: Login/Signup disabled - always go to home
  const completeOnboarding = async (mode = "signup") => {
    await AsyncStorage.setItem("onboardingComplete", "true");
    // Always go to home, no auth needed
    router.replace("/(tabs)/");
    // if (!isSupabaseConfigured) {
    //   router.replace("/(tabs)/");
    //   return;
    // }
    // if (mode === "signin") {
    //   router.replace("/auth?mode=signin");
    //   return;
    // }
    // router.replace("/auth");
  };

  const isLast = activeIndex === FEATURES.length - 1;

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      {/* Logo / brand */}
      <View className="items-center pt-10 pb-4">
        <Text
          className="text-[10px] font-bold uppercase tracking-[4px]"
          style={{ color: theme.textSecondary }}
        >
          Ayah Connect
        </Text>
        <Text
          className="text-2xl font-serif font-bold mt-1"
          style={{ color: theme.text }}
        >
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

      {/* CTA buttons - MODIFIED: Direct home without auth */}
      <View className="px-6 pb-10 gap-3">
        {isLast ? (
          <>
            <TouchableOpacity
              onPress={() => void completeOnboarding("direct")}
              className="rounded-2xl py-4 items-center"
              style={{ backgroundColor: theme.accent }}
            >
              <Text className="text-base font-bold" style={{ color: theme.onAccent }}>
                Get Started
              </Text>
            </TouchableOpacity>
            {/* COMMENTED OUT: Login/Signup buttons disabled
            <TouchableOpacity
              onPress={() => void completeOnboarding("signin")}
              className="rounded-2xl py-4 items-center border"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.cardBackground,
              }}
            >
              <Text
                className="text-base font-bold"
                style={{ color: theme.text }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
            */}
          </>
        ) : (
          <TouchableOpacity
            onPress={goNext}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: theme.accent }}
          >
            <Text className="text-base font-bold" style={{ color: theme.onAccent }}>Next</Text>
          </TouchableOpacity>
        )}

        {/* COMMENTED OUT: Skip to login link disabled
        <TouchableOpacity
          onPress={() => void completeOnboarding("auth")}
          className="items-center py-2"
        >
          <Text className="text-sm" style={{ color: theme.textSecondary }}>
            Skip to Login / Signup
          </Text>
        </TouchableOpacity>
        */}
      </View>
    </SafeAreaView>
  );
}
