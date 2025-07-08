/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      letterSpacing: {
        wider: '.05em',
        widest: '.1em'
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Georgia', 'serif']
      },
      colors: {
        primary: {
          DEFAULT: '#E63946', // vibrant red
          hover: '#C81D2A'
        },
        secondary: {
          DEFAULT: '#457B9D', // deep blue
          hover: '#2C5282'
        },
        accent: {
          DEFAULT: '#F4A261', // warm orange
          hover: '#E76F51'
        },
        cave: {
          blue: '#1D4ED8',
          red: '#DC2626',
          orange: '#EA580C'
        }
      }
    },
  },
  plugins: [],
};
