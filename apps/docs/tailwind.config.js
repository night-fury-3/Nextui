const { nextui } = require("@nextui-org/theme/dist/plugin");

// get tailwindcss default config
const defaultConfig = require("tailwindcss/defaultConfig");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/core/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", ...defaultConfig.theme.fontFamily.sans],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes:{
      heartbeat: {
        '0%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.2)' },
        '100%': { transform: 'scale(1)' },
      },
      levitate: {
        "0%": {
          transform: "translateY(0)",
        },
        "30%": {
          transform: "translateY(-10px)",
        },
        "50%": {
          transform: "translateY(4px)",
        },
        "70%": {
          transform: "translateY(-15px)",
        },
        "100%": {
          transform: "translateY(0)",
        },
      }
    },
    animation: {
      'heartbeat': 'heartbeat 1s ease-in-out infinite',
      'levitate': 'levitate 5s ease infinite',
    }
  },
  plugins: [nextui()],
};
