/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        petrol: {
          DEFAULT: '#1B4B4F',
          dark: '#153D40',
          deeper: '#121F21',
          light: '#2A5F63'
        },
        cream: {
          DEFAULT: '#FAF0EB',
          dark: '#E8DDD8'
        },
        copper: {
          DEFAULT: '#C0894E',
          light: '#D4A574',
          dark: '#A07040'
        },
        sage: '#8B9A7B',
        warm: {
          gray: '#D4C5B8',
          brown: '#6B4226'
        }
      }
    }
  },
  plugins: []
}
