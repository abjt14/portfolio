/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "neutral-50": "rgb(250 249 247)",
        "neutral-100": "rgb(245 244 242)",
        "neutral-150": "rgb(237 236 234)",
        "neutral-200": "rgb(229 228 226)",
        "neutral-250": "rgb(221 220 218)",
        "neutral-300": "rgb(212 211 209)",
        "neutral-350": "rgb(188 187 185)",
        "neutral-400": "rgb(163 162 160)",
        "neutral-450": "rgb(139 138 136)",
        "neutral-500": "rgb(115 114 112)",
        "neutral-600": "rgb(82 81 79)",
        "neutral-700": "rgb(64 63 61)",
        "neutral-750": "rgb(51 50 48)",
        "neutral-800": "rgb(38 37 36)",
        "neutral-850": "rgb(30 29 27)",
        "neutral-900": "rgb(23 22 20)",
        "neutral-925": "rgb(19 18 16)",
        "neutral-950": "rgb(10 9 7)",
      },
      fontFamily: {
        geistsans: ["var(--font-geist-sans)"],
        geistmono: ["var(--font-geist-mono)"],
      },
      animation: {
        "fade-in-75": "fadeIn 75ms ease-out forwards",
        "fade-in-150": "fadeIn 150ms ease-out forwards",
        "fade-in-300": "fadeIn 300ms ease-out forwards",
        "fade-in-500": "fadeIn 500ms ease-out forwards",
        "fade-in-1000": "fadeIn 1000ms ease-out forwards",
        "fade-out-150": "fadeOut 150ms ease-out forwards",
        "fade-out-300": "fadeOut 300ms ease-out forwards",
        "fade-out-500": "fadeOut 500ms ease-out forwards",
        "fade-out-1000": "fadeOut 1000ms ease-out forwards",
        "fade-zoom-in-150":
          "fadeZoomIn 150ms cubic-bezier(0.45, 0, 0.55, 1) forwards",
        "fade-zoom-in-300":
          "fadeZoomIn 300ms cubic-bezier(0.45, 0, 0.55, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeZoomIn: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      height: {
        30: "7.5rem",
      },
      width: {
        30: "7.5rem",
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: {
            0: "0ms",
            50: "50ms",
            100: "100ms",
            150: "150ms",
            200: "200ms",
            250: "250ms",
            300: "300ms",
            350: "350ms",
            400: "400ms",
            500: "500ms",
            1000: "1000ms",
          },
        }
      );
    }),
  ],
  darkMode: "class",
};
