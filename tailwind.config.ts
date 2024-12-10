import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      themes: {
        light: {
          layout: {},
          colors: {
            background: "#111827", // Deep slate
            foreground: "#48CFCB", // Soft teal
            primary: "#3BA3A0", // Calming teal
            secondary: "#1F2937", // Dark charcoal grey
            content1: "#E5E7EB", // Light cool grey (for general text)
            content2: "#94A3B8", // Cool blue-grey
            content3: "#A7F3D0", // Muted mint (for headers/accent text)
            content4: "#6EE7B7", // Light mint green
          },
        },
        dark: {
          layout: {},
          colors: {
            background: "#111827", // Deep slate
            foreground: "#48CFCB", // Soft teal
            primary: "#3BA3A0", // Calming teal
            secondary: "#1F2937", // Dark charcoal grey
            content1: "#E5E7EB", // Light cool grey (for general text)
            content2: "#94A3B8", // Cool blue-grey
            content3: "#A7F3D0", // Muted mint (for headers/accent text)
            content4: "#6EE7B7", // Light mint green
          },
        },
      },
    }),
  ],
} satisfies Config;
