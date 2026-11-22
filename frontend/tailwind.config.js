/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#937661',      // Golden Sandalwood
        secondary: '#462321',    // Plum Wine
        accent: '#E7D4B8',       // Almond Light
        dark: '#292821',         // Green Velvet
        powder: '#191211',       // Carbon Powder
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
