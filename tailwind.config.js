/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d8efff',
          200: '#b6e0ff',
          300: '#84c9ff',
          400: '#4ba7ff',
          500: '#1d84ff',
          600: '#005fe0',
          700: '#0049b3',
          800: '#003a8a',
          900: '#012f6d',
        },
      },
    },
  },
  plugins: [],
}

