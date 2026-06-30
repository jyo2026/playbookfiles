/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        legal: {
          50:  '#f8fafd',
          100: '#e8f0f7',
          200: '#d4e4f0',
          300: '#b5d4e8',
          400: '#7fb3d5',
          500: '#4a90c2',
          600: '#2e5a8c',
          700: '#1e3a56',
          800: '#152a42',
          900: '#0f1f2e',
        },
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
