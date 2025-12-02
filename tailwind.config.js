/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#4ade80',
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
        secondary: {
          light: '#86efac',
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        accent: '#34d399',
        surface: {
          light: '#f0fdf4',
          dark: '#000000',
        },
        glass: 'rgba(255, 255, 255, 0.75)',
        glassDark: 'rgba(0, 0, 0, 0.7)',
      },
      boxShadow: {
        glass: '0 20px 45px -20px rgba(34, 197, 94, 0.25)',
        'glass-lg': '0 25px 60px -25px rgba(34, 197, 94, 0.3)',
        'neon': '0 0 20px rgba(34, 197, 94, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
