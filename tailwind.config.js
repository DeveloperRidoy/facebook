const colors = require('tailwindcss/colors');

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", //  'media' or 'class'
  theme: {
    colors,
    extend: {
      colors: {
        secondary: {
          DEFAULT: "#F0F2F5",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#F0F2F5",
          600: "#D1D7E1",
          700: "#B3BDCC",
          800: "#94A2B8",
          900: "#7688A3",
        },
        dark: {
          DEFAULT: "#242526",
          50: "#95989B",
          100: "#888B8E",
          200: "#6E7275",
          300: "#56585A",
          400: "#3D3F40",
          500: "#242526",
          600: "#0B0B0C",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
        darker: {
          DEFAULT: "#18191A",
          50: "#878C90",
          100: "#7A7F84",
          200: "#61666A",
          300: "#494C4F",
          400: "#303335",
          500: "#18191A",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
      },
      screens: {
        lmd: "865px",
      },
      textColor: {
        transparent: "rgba(0, 0, 0, 0)",
      },
      fontFamily: {
        segoe: ["Segoe ui historic", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
