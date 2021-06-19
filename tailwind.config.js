const colors = require('tailwindcss/colors');

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
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
      },
      screens: {
        'lmd': '865px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
