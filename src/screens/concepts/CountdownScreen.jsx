import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeBackContainer from "../../components/ui/SwipeBackContainer";
import TopBar from "../../components/ui/TopBar";

export default function CountdownScreen() {
  const router = useRouter();

  return (
    <SwipeBackContainer>
      <View className="flex-1 bg-[#13171a]">
        {/* Background Gradient Simulation */}
        <View className="absolute inset-0 bg-gradient-to-b from-[#1c2226] to-[#0a0c0e] opacity-80" />

        <SafeAreaView className="flex-1">
          <TopBar
            title="Countdown"
            onLeftPress={() => router.back()}
            leftIcon="chevron-left"
          />

          {/* Header Countdown */}
          <View className="items-center py-10">
            <Text className="text-[10px] font-bold uppercase tracking-[4px] text-white/40">
              Auto-closing in 45s
            </Text>
            <View className="h-[1px] w-8 bg-white/10 mt-2" />
          </View>

          {/* Immersive Center Content */}
          <View className="flex-1 items-center justify-center px-8">
            {/* Circular Glow Effect */}
            <View className="relative w-80 h-80 items-center justify-center">
              <View className="absolute w-full h-full rounded-full border border-white/5" />
              <View className="absolute w-[85%] h-[85%] rounded-full border border-white/10" />
              <View className="absolute w-[70%] h-[70%] rounded-full border border-white/5" />

              <View className="items-center justify-center">
                <MaterialCommunityIcons
                  name="sparkles"
                  size={40}
                  color="#b0926a"
                  style={{ opacity: 0.6 }}
                />
              </View>
            </View>

            {/* Verse Content */}
            <View className="mt-16 items-center">
              <Text className="text-center text-4xl leading-[60px] text-white font-bold mb-8">
                فَإِنَّ مَعَ الْعُسْرِ يُسْرًا
              </Text>
              <Text className="text-center text-xl font-serif italic text-white/80 leading-8 px-4">
                &quot;For indeed, with hardship [will be] ease.&quot;
              </Text>
            </View>
          </View>

          {/* Footer Swipe Action */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center pb-12"
          >
            <MaterialCommunityIcons
              name="chevron-double-down"
              size={24}
              color="white"
              style={{ opacity: 0.3 }}
            />
            <Text className="text-[10px] font-bold uppercase tracking-[4px] text-white/30 mt-4">
              Swipe down to close
            </Text>
            <View className="h-[1px] w-8 bg-white/10 mt-6" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </SwipeBackContainer>
  );
}
