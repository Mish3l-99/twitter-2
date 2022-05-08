module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        twitter: '#4B0082',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
