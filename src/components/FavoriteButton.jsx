import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

const FavoriteButton = ({ isFavorite, onPress, className }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-2.5 bg-white/90 dark:bg-white/10 rounded-full shadow-sm items-center justify-center ${className}`}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons
        name={isFavorite ? "heart" : "heart-outline"}
        size={22}
        color={isFavorite ? "#b0926a" : "#b0926a"}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;
