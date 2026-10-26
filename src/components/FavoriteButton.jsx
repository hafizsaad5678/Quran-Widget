import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";

const FavoriteButton = ({ isFavorite, onPress, className }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`p-2.5 bg-white/90 dark:bg-white/10 rounded-full shadow-sm items-center justify-center ${className}`}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons
        name={isFavorite ? "heart" : "heart-outline"}
        size={22}
        color={theme.accent}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;
