/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '320px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
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
        'gradient-x': 'gradient-x 5s ease infinite',
        'astronaut': 'astronaut 20s infinite linear',
        'moon-spin': 'moon-spin 20s infinite linear',
        'moon-glow': 'moon-glow 1s infinite alternate',
      },
      keyframes: { 
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        astronaut: {
          '0%': { transform: 'translate(10vw, 20vh)' },
          '25%': { transform: 'translate(30vw, 20vh)' },
          '50%': { transform: 'translate(40vw, 35vh)' },
          '75%': { transform: 'translate(10vw, 50vh)' },
          '100%': { transform: 'translate(23vw, 0)' }
        },
        'moon-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'moon-glow': {
          '0%': { boxShadow: '0 0 10px #fff' },
          '100%': { boxShadow: '0 0 20px #fff, 0 0 30px #fff' }
        },
        'gradient-x': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
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
        'hero-pattern-3': "url('./src/assets/bg-img.jpeg')",
        'hero-pattern-4': "url('./src/assets/bg-dark.jpeg')",
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

