/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plex)", "sans-serif"],
        serif: ["var(--font-fraunces)", "serif"],
      },
    },
  },
  plugins: [],
};
