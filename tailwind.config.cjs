/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00AEEF",
        secondary: "#F01849",
        tertiary: "#F0E318",
        complement: "#F07C00",
        light: "#EEEEEE",
        dark: "#333333",
      },
    },
  },
  plugins: [],
};
