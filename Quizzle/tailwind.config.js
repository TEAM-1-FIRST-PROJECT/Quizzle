/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    zIndex: {
      '1030': 1030,
    },
    
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      montserrat: ['Montserrat', 'sans-serif'],
      nova: ['Nova Square', 'square'],
      vina: ['Vina sans', 'sans'],
    },
    extend: {
      animation: { 
        'fade-in': 'fadeIn 5s',
        'gradient': 'gradient 5s ease infinite',
      },
      keyframes: { 
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'gradient': {
          '0%': { color: '' },
          '40%': { color: 'indigo-[400]', },
          '100%': { color: 'fuchsia-[500]', },
        }
      },
      backgroundImage: {
        'hero-pattern': "url('./src/assets/backgroung.jpeg')",
        'hero-pattern-2': "url('./src/assets/Home.jpg')",
      },
      
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

