import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Lora", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        surface: {
          DEFAULT: "#ffffff",
          dark: "#111111",
        },
        background: {
          DEFAULT: "#fafafa",
          dark: "#0a0a0a",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
