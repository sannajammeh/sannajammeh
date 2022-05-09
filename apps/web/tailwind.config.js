module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    require("radix-colors-for-tailwind")({
      colors: ["slate", "blue"],
    }),
    require("@tailwindcss/typography"),
  ],
};
