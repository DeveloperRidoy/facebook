const colors = require('tailwindcss/colors');

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // or 'media' or 'class'
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
        'dark': {  DEFAULT: '#363738',  '50': '#A8AAAB',  '100': '#9B9D9F',  '200': '#818486',  '300': '#686A6C',  '400': '#4F5152',  '500': '#363738',  '600': '#1D1E1E',  '700': '#040404',  '800': '#000000',  '900': '#000000'},
        'darker': {  DEFAULT: '#242526',  '50': '#95989B',  '100': '#888B8E',  '200': '#6E7275',  '300': '#56585A',  '400': '#3D3F40',  '500': '#242526',  '600': '#0B0B0C',  '700': '#000000',  '800': '#000000',  '900': '#000000'},
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
