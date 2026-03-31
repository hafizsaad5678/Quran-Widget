import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeBackContainer from "../../components/ui/SwipeBackContainer";
import TopBar from "../../components/ui/TopBar";

export default function PauseModeScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(300);
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 2400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 2400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [pulse]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeLabel = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <SwipeBackContainer>
      <SafeAreaView className="flex-1 bg-[#050505]">
        <TopBar
          title="1-Minute Pause"
          onLeftPress={() => router.back()}
          leftIcon="chevron-left"
        />

        <View className="flex-1 items-center justify-center px-6">
          <View className="absolute inset-0 bg-[#0a0a0a]" />

          <Animated.View
            style={{ transform: [{ scale: pulse }] }}
            className="absolute h-80 w-80 rounded-full bg-[#f6d56f]/10"
          />
          <Animated.View
            style={{ transform: [{ scale: pulse }] }}
            className="absolute h-64 w-64 rounded-full border border-[#f6d56f]/20 bg-[#f6d56f]/5"
          />

          <Text className="text-center text-2xl font-semibold text-white">
            You are safe here
          </Text>
          <Text className="mt-2 text-center text-base leading-7 text-white/70">
            Inhale calm. Exhale worry. Let your heart return to remembrance.
          </Text>

          <View className="mt-8 items-center rounded-3xl border border-white/20 bg-white/10 px-10 py-7">
            <Text className="text-5xl font-bold text-[#f6d56f]">
              {timeLabel}
            </Text>
            <Text className="mt-2 text-xs uppercase tracking-[2px] text-white/50">
              Focus timer
            </Text>
          </View>

          <TouchableOpacity
            className="mt-7 rounded-2xl bg-[#f6d56f] px-7 py-3"
            onPress={() => setSeconds(300)}
            activeOpacity={0.85}
          >
            <Text className="text-sm font-bold uppercase tracking-[1.6px] text-[#3a2b00]">
              Reset Session
            </Text>
          </TouchableOpacity>

          <View className="mt-8 max-w-[320px] rounded-2xl border border-white/15 bg-white/5 p-4">
            <Text className="text-center text-sm leading-6 text-white/70">
              Prayer keeps us rooted. Reflection keeps us open. Silence lets
              both settle.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </SwipeBackContainer>
  );
}
