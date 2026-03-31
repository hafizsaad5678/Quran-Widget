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
            DEFAULT: "#fff8f2",
            dark: "#161513",
          },
          card: {
            DEFAULT: "#fffcf9",
            dark: "#21201d",
          },
          accent: {
            DEFAULT: "#b0926a",
            soft: "#f5e1a7",
          },
          text: {
            DEFAULT: "#231a08",
            dark: "#e3c196",
            muted: "#7c7769",
            mutedDark: "#9a9483",
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
