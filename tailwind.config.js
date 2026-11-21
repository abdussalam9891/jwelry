/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jost)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
      },
    },
  },
  plugins: [],
};
