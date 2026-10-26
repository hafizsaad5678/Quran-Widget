import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import { useAppStore } from "../store/useAppStore";
import { COLORS } from "../constants/theme";

const ThemeContext = createContext();

export const lightTheme = {
  background: COLORS.light.background,
  cardBackground: COLORS.light.card,
  cardAlternative: "rgba(0, 0, 0, 0.03)", // Jelly dark tint
  text: COLORS.light.text,
  textSecondary: COLORS.light.textSecondary,
  textDisabled: "rgba(0, 0, 0, 0.2)",
  accent: COLORS.light.accent,
  onAccent: COLORS.light.onAccent,
  secondary: "rgba(0, 0, 0, 0.05)",
  softAccent: COLORS.light.softAccent,
  border: COLORS.light.border,
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
  background: COLORS.dark.background,
  cardBackground: COLORS.dark.card,
  cardAlternative: "rgba(255, 255, 255, 0.04)",
  text: COLORS.dark.text,
  textSecondary: COLORS.dark.textSecondary,
  textDisabled: "rgba(255, 255, 255, 0.2)",
  accent: COLORS.dark.accent,
  onAccent: COLORS.dark.onAccent,
  secondary: "rgba(255, 255, 255, 0.08)",
  softAccent: COLORS.dark.softAccent,
  border: COLORS.dark.border,
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
