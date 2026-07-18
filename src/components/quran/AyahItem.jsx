import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

/**
 * AyahItem — single ayah row for SurahReaderScreen.
 * Shows ayah number badge, Arabic text, and optional translation.
 * Animates a highlight on tap.
 */
const AyahItem = React.memo(
  ({
    ayah,
    isSelected,
    showTranslation = true,
    onPress,
    onPlayPause,
    onStop,
    isAudioActive = false,
    isAudioPlaying = false,
    fontLoaded = false,
  }) => {
    const { theme } = useTheme();
    const highlight = useRef(new Animated.Value(0)).current;

    const handlePress = useCallback(() => {
      // Flash highlight animation
      Animated.sequence([
        Animated.timing(highlight, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(highlight, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }),
      ]).start();
      onPress?.(ayah);
    }, [ayah, onPress, highlight]);

    const bgColor = highlight.interpolate({
      inputRange: [0, 1],
      outputRange: ["transparent", theme.softAccent],
    });

    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
        <Animated.View
          style={{
            backgroundColor: isSelected ? theme.softAccent : bgColor,
            borderLeftWidth: isSelected ? 3 : 0,
            borderLeftColor: theme.accent,
            paddingHorizontal: 20,
            paddingVertical: 18,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
          }}
        >
          {/* Ayah number badge */}
          <View className="flex-row items-center justify-between mb-3">
            <View
              className="w-8 h-8 rounded-full items-center justify-center"
              style={{
                backgroundColor: isSelected ? theme.accent : theme.softAccent,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: isSelected ? "#fff" : theme.accent,
                }}
              >
                {ayah.ayahNumber}
              </Text>
            </View>

            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => onPlayPause?.(ayah)}
                className="w-8 h-8 rounded-full items-center justify-center mr-2"
                style={{
                  backgroundColor: theme.cardBackground,
                  borderWidth: 1,
                  borderColor: theme.border,
                }}
              >
                <MaterialCommunityIcons
                  name={
                    isAudioActive ? (isAudioPlaying ? "pause" : "play") : "play"
                  }
                  size={16}
                  color={theme.accent}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onStop?.(ayah)}
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{
                  backgroundColor: theme.cardBackground,
                  borderWidth: 1,
                  borderColor: theme.border,
                }}
              >
                <MaterialCommunityIcons
                  name="stop"
                  size={14}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Arabic text */}
          <Text
            style={{
              fontSize: 24,
              lineHeight: 44,
              textAlign: "right",
              color: theme.text,
              fontFamily: fontLoaded ? "ScheherazadeNew_400Regular" : undefined,
              marginBottom: showTranslation ? 12 : 0,
            }}
          >
            {ayah.arabic}
          </Text>

          {/* Translation */}
          {showTranslation && (
            <View style={{ minHeight: 46, paddingTop: 6, paddingBottom: 2 }}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 30,
                  color: theme.textSecondary,
                  fontStyle: "italic",
                  includeFontPadding: true,
                  textAlignVertical: "center",
                }}
              >
                {ayah.translation || "Translation unavailable offline."}
              </Text>
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  },
);

AyahItem.displayName = "AyahItem";
export default AyahItem;
