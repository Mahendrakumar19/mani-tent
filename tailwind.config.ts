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
        charcoal: {
          DEFAULT: "#191714",
          light: "#282420",
          dark: "#0F0E0C",
        },
        gold: {
          DEFAULT: "#C6A66B",
          muted: "#9C8050",
          light: "#E5D4B2",
          dark: "#A48248",
          glow: "#DFBA7C",
        },
        ivory: "#F7F3EB",
        beige: "#E8DFD0",
        brown: "#40352C",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        noto: ["var(--font-noto)", "sans-serif"],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-delay': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both',
        'fade-in-delay-2': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
        'fade-in-delay-3': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both',
        'fade-in-delay-4': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;