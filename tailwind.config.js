/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkcl: "#27272a",
        lightcl: "#FAF0E6",
        highlightcl: "#B9B4C7",
        headcl: "#5C5470",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
