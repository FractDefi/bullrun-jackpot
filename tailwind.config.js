/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bullrun: "#B78624",
        bullrun2: '#998901',
        bullrunLightgray: 'lightgray'
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
