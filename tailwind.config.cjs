/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'ads': '0px 0px 12px 5px rgba(0, 0, 0, 0.25)',
      }
    },
    colors: {
      transparent: 'transparent',
      'white': '#fff',
      'black': '#1E0C0C',
      'purple': '#703098',
      'place': '#ABA4A4',
      'green': '#024E27',
      'blue': '#1954AC',
      'tint-pink': '#FFF5F5',
      'tint-green': '#F5FFF6',
      'red': '#CB1717',
      'good-green': '#08f26e',
      'input-bg': 'rgba(63, 31, 31, 0.05)',
      'red': '#CB1717',
      'p-text': '#857B7B',
      'profile-bg': '#021C0E',
      'blur': 'rgba(255, 255, 255, 0.19)',
      'grey': '#D9D9D9',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
