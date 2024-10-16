/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundColor: {
        light: "rgba(255, 255, 255, 0.87)",
        darker: "#242424",
        dark: "#3E4145",
        evildarker: "#2f1c1c",
      },
      textColor: {
        light: "rgba(255, 255, 255, 0.87)",
        active: "#ee996b",
        darker: "#242424",
        dark: "#3E4145",
        good: "#00c896",
        evil: "#dd3333"
      },
      borderColor: {
        evil: "#dd3333"
      }
    },
  },
  plugins: [],
}

