/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ogre: "#B78624",
        ogre2: '#998901'
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(0deg)" },
          "30%": { transform: "rotate(0deg)" },
          "35%": { transform: "rotate(2deg)" },
          "45%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
