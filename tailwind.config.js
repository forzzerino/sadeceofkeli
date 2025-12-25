/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'text-nitro-blue',
    'text-race-red',
    'bg-nitro-blue',
    'bg-race-red',
    'border-nitro-blue',
    'border-race-red',
    'via-nitro-blue',
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00ffff',
        'neon-magenta': '#ff00ff',
        'nitro-blue': '#00a8ff',
        'race-red': '#ff0000',
        'asphalt': '#1a1a1a',
      },
      fontFamily: {
        sans: ['Geist Sans', 'sans-serif'],
        racing: ['Geist Sans', 'sans-serif'],
        chakra: ['Geist Sans', 'sans-serif'],
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        }
      },
      animation: {
        bounce: 'bounce 1s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
