/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        primary: {
          DEFAULT: '#2563eb', // blue-600
          light: '#3b82f6', // blue-500
          dark: '#1d4ed8', // blue-700
        },
        secondary: {
          DEFAULT: '#7c3aed', // violet-600
          light: '#8b5cf6', // violet-500
          dark: '#6d28d9', // violet-700
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Default font stack
        mono: ['Fira Code', 'monospace'], // For code snippets
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // For rich text formatting
    require('@tailwindcss/forms'), // For better form element styling
    require('tailwind-scrollbar'), // For custom scrollbars
  ],
}