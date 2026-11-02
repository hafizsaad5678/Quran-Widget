import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

export default function TabsLayout() {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.accent,
                tabBarInactiveTintColor: theme.textSecondary,
                 tabBarShowLabel: true,
                 tabBarLabelStyle: { fontSize: 10, fontWeight: "700" },
                 tabBarStyle: {
                     backgroundColor: "transparent",
                    borderTopWidth: 0,
                    height: 60 + insets.bottom,
                    paddingTop: 10,
                    paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -10 },
                    shadowOpacity: 0.05,
                    shadowRadius: 15,
                     elevation: 20,
                     overflow: "hidden",
                 },
                 tabBarBackground: () => (
                     <BlurView
                         intensity={75}
                         tint={theme.background === "#000000" ? "dark" : "light"}
                         style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                     />
                 ),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarAccessibilityLabel: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <View className={`w-12 h-12 rounded-full items-center justify-center ${focused ? "bg-sanctuary-accent/10" : ""}`}>
                            <MaterialCommunityIcons name={focused ? "home-variant" : "home-variant-outline"} color={color} size={24} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="situations"
                options={{
                    title: "Guidance",
                    tabBarAccessibilityLabel: "Instant guidance",
                    tabBarIcon: ({ color, focused }) => (
                        <View className={`w-12 h-12 rounded-full items-center justify-center ${focused ? "bg-sanctuary-accent/10" : ""}`}>
                            <MaterialCommunityIcons name={focused ? "compass" : "compass-outline"} color={color} size={24} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="ayah"
                options={{
                    title: "Ayahs",
                    tabBarAccessibilityLabel: "Ayah library",
                    tabBarIcon: ({ color, focused }) => (
                        <View className={`w-12 h-12 rounded-full items-center justify-center ${focused ? "bg-sanctuary-accent/10" : ""}`}>
                            <MaterialCommunityIcons name={focused ? "widgets" : "widgets-outline"} color={color} size={24} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    title: "Stats",
                    tabBarAccessibilityLabel: "Reading statistics",
                    tabBarIcon: ({ color, focused }) => (
                        <View className={`w-12 h-12 rounded-full items-center justify-center ${focused ? "bg-sanctuary-accent/10" : ""}`}>
                            <MaterialCommunityIcons name={focused ? "chart-box" : "chart-box-outline"} color={color} size={24} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
