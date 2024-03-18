/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        2: "8px", // add padding-2
      },
      fontFamily: {
        helvetica: ["Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};

