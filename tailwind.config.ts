import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "heroui", // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      themes: {
        light: {
          layout: {},
          colors: {
            background: "#FDF6E3", // Light cream background
            foreground: "#3B82F6", // Bright blue
            primary: "#F43F5E", // Vibrant pink-red
            secondary: "#FACC15", // Sunny yellow
            content1: "#111827", // Deep slate for text
            content2: "#6EE7B7", // Soft mint green
            content3: "#A78BFA", // Soft purple
            content4: "#34D399", // Bright green
          },
        },
        dark: {
          layout: {},
          colors: {
            background: "#1E293B", // Dark slate blue
            foreground: "#3B82F6", // Bright blue
            primary: "#F43F5E", // Vibrant pink-red
            secondary: "#FACC15", // Sunny yellow
            content1: "#E5E7EB", // Light grey for text
            content2: "#6EE7B7", // Soft mint green
            content3: "#A78BFA", // Soft purple
            content4: "#34D399", // Bright green
          },
        },
      },
    }),
  ],
} satisfies Config;
