import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CollectionCard from "../../components/ui/CollectionCard";
import TopBar from "../../components/ui/TopBar";

export default function CollectionsScreen() {
  const router = useRouter();

  const collections = [
    {
      key: "sabr",
      title: "Sabr",
      subtitle: "Indeed, Allah is with the patient.",
      tag: "24 Ayahs",
      icon: "timer-sand",
      color: "#fdf8f0",
    },
    {
      key: "shukr",
      title: "Shukr",
      subtitle: "If you are grateful, I will surely...",
      tag: "Updated Today",
      icon: "heart",
      color: "#fef1f1",
    },
    {
      key: "hope",
      title: "Hope",
      subtitle: "Finding light in the darkest of moments through His mercy.",
      count: "12 AYAH COLLECTION",
      icon: "white-balance-sunny",
      color: "#fef9ec",
    },
    {
      key: "tawakkul",
      title: "Tawakkul",
      subtitle: "Surrendering to the Divine decree with complete heart.",
      count: "8 REFLECTIONS",
      icon: "anchor",
      color: "#f9f6f1",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-sanctuary-background dark:bg-sanctuary-background-dark">
      <TopBar
        title="Digital Sanctuary"
        onLeftPress={() => router.back()}
        leftIcon="chevron-left"
      />

      <ScrollView
        className="px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="mt-8 mb-10">
          <Text className="text-5xl font-serif font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
            My Reflections
          </Text>
          <Text className="mt-2 text-base text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
            Curated wisdom from your spiritual journey
          </Text>
        </View>

        {collections.map((item) => (
          <CollectionCard
            key={item.key}
            title={item.title}
            subtitle={item.subtitle}
            tag={item.tag}
            count={item.count}
            icon={item.icon}
            color={item.color}
            onPress={() => {}}
          />
        ))}

        <CollectionCard type="empty" onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
}
