/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#020b1a',
          800: '#071428',
          700: '#0a1c38',
        },
        gold: {
          DEFAULT: '#f5c518',
          light: '#ffd700',
          dark: '#c9a227',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
