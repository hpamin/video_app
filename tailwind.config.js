/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default:'#202124',
          100: "#3C3C3E",
          200: "#242526",
          300: "#2A2A2C",
        },
        secondary: '#3C4043',
        third: '#0FF1CE',
      },
      fontFamily: {
        Poppins: ["Poppins"],
        PoppinsLight: ["Poppins-Light"],
        PoppinsBold: ["Poppins-Bold"],
      }
    },
  },
  plugins: [],
}

