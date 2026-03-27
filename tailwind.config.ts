import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    darkMode: false,
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple_main: "#5247EC",
        red_main: "#FF2243",
        pink_main: "#E9E8FF"
      },
      fontFamily: {
        gotham: ["var(--font-gotham)", "sans-serif"],
        motel: ["var(--font-motel)", "sans-serif"],
        gotham_bold: ["var(--font-gotham-bold)", "sans-serif"]
      },
    },
  },
  plugins: [],
} satisfies Config;
