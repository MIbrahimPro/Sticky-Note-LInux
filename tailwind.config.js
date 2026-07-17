/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgba(0, 0, 0, 0.4)',
        surface: 'rgba(30, 30, 30, 0.6)',
      }
    },
  },
  plugins: [],
}
