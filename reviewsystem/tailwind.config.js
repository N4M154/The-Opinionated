// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <-- this is correct now
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
