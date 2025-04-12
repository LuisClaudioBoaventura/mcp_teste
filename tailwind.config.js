/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lilac: {
          100: '#f0e6ff',
          200: '#d9b3ff',
          300: '#c280ff',
          400: '#ab4dff',
          500: '#9333ea',
          600: '#7e22ce',
          700: '#6b21a8',
          800: '#581c87',
          900: '#3b0764',
        }
      }
    }
  },
  plugins: [],
}