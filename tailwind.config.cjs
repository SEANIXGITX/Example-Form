/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true
    },
    colors: {
      primary: "#bef264",
      secondary: "#fb923c",
      white: "#ffffff",
      black: "#000",
      gray: "#6b7280",
      red: "#dc2626"
    },
    extend: {},
  },
  plugins: [],
}
