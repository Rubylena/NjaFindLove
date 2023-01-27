/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      'white': '#fff',
      'black': '#000',
      'purple': '#703098',
      'place': '#ABA4A4',
      'green': '#024E27',
      'blue': '#1954AC',
      'tint-pink': '#FFF5F5',
      'red': 'red',
      'good-green': '#08f26e',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
