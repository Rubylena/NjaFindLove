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
      'black': '#1E0C0C',
      'purple': '#703098',
      'place': '#ABA4A4',
      'green': '#024E27',
      'blue': '#1954AC',
      'tint-pink': '#FFF5F5',
      'red': 'red',
      'good-green': '#08f26e',
      'input-bg': 'rgba(63, 31, 31, 0.05)',
      'red': '#CB1717',
      'p-text': '#857B7B',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
