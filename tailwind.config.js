/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        steam: {
          bg: '#1b2838',        // Main background
          dark: '#171a21',      // Darker headers
          panel: '#101822',     // Dark panel bg
          blue: '#66c0f4',      // Steam light blue accent
          lightBlue: '#2a475e', // Gradient/button blue
          green: '#a4d007',     // Positive green
          text: '#c7d5e0',      // Default text color
          muted: '#8f98a0',     // Muted text
        }
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      }
    },
  },
  plugins: [],
}
