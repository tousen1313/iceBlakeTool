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
        ice: {
          pink: "#FF6B9D",
          orange: "#FF9F43",
          yellow: "#FFEAA7",
          green: "#00B894",
          blue: "#74B9FF",
          purple: "#A29BFE",
          cyan: "#00CEC9",
        },
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        "pulse-fast": "pulse 1s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
