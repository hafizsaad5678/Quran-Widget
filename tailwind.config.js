/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sanctuary: {
          background: {
            DEFAULT: require("./src/constants/theme").COLORS.light.background,
            dark: require("./src/constants/theme").COLORS.dark.background,
          },
          card: {
            DEFAULT: require("./src/constants/theme").COLORS.light.card,
            dark: require("./src/constants/theme").COLORS.dark.card,
          },
          accent: {
            DEFAULT: require("./src/constants/theme").COLORS.light.accent,
            soft: "#f5e1a7",
          },
          text: {
            DEFAULT: require("./src/constants/theme").COLORS.light.text,
            dark: require("./src/constants/theme").COLORS.dark.text,
            muted: require("./src/constants/theme").COLORS.light.textSecondary,
            mutedDark: require("./src/constants/theme").COLORS.dark.textSecondary,
          },
          border: {
            DEFAULT: "#cdc6b6",
            dark: "#363430",
          },
        },
      },
      fontFamily: {
        headline: ["Noto Serif"],
        body: ["Inter"],
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
