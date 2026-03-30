import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",
        success: "#27AE60",
        energy: "#F5A623",
        prestige: "#9B59B6",
        gold: "#FFD700",
        warm: "#FFF8F0",
        danger: "#E74C3C",
        "app-text": "#2C3E50",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      maxWidth: {
        mobile: "430px",
      },
    },
  },
  plugins: [],
};
export default config;
