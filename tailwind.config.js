/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        founder: {
          bg: '#3d5a3e',
          active: '#4e7250',
        },
        investor: {
          bg: '#3d3d3d',
          active: '#555555',
        },
        risk: {
          critical: '#ef4444',
          high: '#f97316',
          medium: '#3b82f6',
          low: '#22c55e',
        },
        ink: {
          900: '#111827',
          700: '#374151',
          500: '#6b7280',
          400: '#9ca3af',
          200: '#e5e7eb',
          100: '#f9fafb',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
