import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import { useAppStore } from "../store/useAppStore";

const ThemeContext = createContext();

export const lightTheme = {
  background: "#F0F0F5", // Very light cool gray (Apple-style minimum)
  cardBackground: "rgba(255, 255, 255, 0.6)", // Jelly glass
  cardAlternative: "rgba(0, 0, 0, 0.03)", // Jelly dark tint
  text: "#000000",
  textSecondary: "rgba(0, 0, 0, 0.5)",
  textDisabled: "rgba(0, 0, 0, 0.2)",
  accent: "#8A6A12", // Deep gold for readability on light backgrounds
  onAccent: "#FFFFFF", // text/icons placed on top of the accent color
  secondary: "rgba(0, 0, 0, 0.05)",
  softAccent: "rgba(138, 106, 18, 0.15)",
  border: "rgba(0, 0, 0, 0.05)", // Almost invisible
  ultraLight: "rgba(255, 255, 255, 0.8)",
  error: "#FF3B30",
  headerBackground: "rgba(255, 255, 255, 0.5)", // Jelly header
  headerText: "#000000",
  buttonBackground: "#000000", // Minimalist solid buttons
  buttonText: "#FFFFFF",
  headerShadow: 0,
  headerTopAccent: "transparent",
};

export const darkTheme = {
  background: "#000000", // Pure OLED black
  cardBackground: "rgba(255, 255, 255, 0.08)", // Jelly glass overlay
  cardAlternative: "rgba(255, 255, 255, 0.04)",
  text: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.5)",
  textDisabled: "rgba(255, 255, 255, 0.2)",
  accent: "#E6CA72", // Single elegant Gold
  onAccent: "#1A1405", // dark text on the light gold (readable)
  secondary: "rgba(255, 255, 255, 0.08)",
  softAccent: "rgba(230, 202, 114, 0.15)",
  border: "rgba(255, 255, 255, 0.1)", // Glass border effect
  ultraLight: "rgba(255, 255, 255, 0.02)",
  error: "#FF453A",
  headerBackground: "rgba(255, 255, 255, 0.08)", // Jelly header
  headerText: "#FFFFFF",
  buttonBackground: "#FFFFFF",
  buttonText: "#000000",
  headerShadow: 0,
  headerTopAccent: "transparent",
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useSystemColorScheme();
  const { setColorScheme } = useNativeWindColorScheme();
  const themeMode = useAppStore((state) => state.settings.themeMode || "auto");
  const updateSettings = useAppStore((state) => state.updateSettings);

  const isDarkMode =
    themeMode === "auto" ? systemColorScheme === "dark" : themeMode === "dark";

  const toggleTheme = () => {
    const nextMode = isDarkMode ? "light" : "dark";
    updateSettings({ themeMode: nextMode });
  };

  const setThemeMode = (mode) => {
    updateSettings({ themeMode: mode });
  };

  useEffect(() => {
    if (themeMode === "auto") {
      setColorScheme("system");
      return;
    }
    setColorScheme(themeMode === "dark" ? "dark" : "light");
  }, [themeMode, setColorScheme]);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, themeMode, toggleTheme, setThemeMode, theme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
