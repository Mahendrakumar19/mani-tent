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
        charcoal: "#191714",
        gold: {
          DEFAULT: "#C6A66B",
          muted: "#9C8050",
          light: "#E5D4B2",
        },
        ivory: "#F7F3EB",
        beige: "#E8DFD0",
        brown: "#40352C",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        noto: ["var(--font-noto)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;