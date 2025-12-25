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
        'mono': {
          0: '#fafafa',   // Zinc-50
          50: '#f4f4f5',  // Zinc-100
          100: '#e4e4e7', // Zinc-200
          200: '#d4d4d8', // Zinc-300
          300: '#a1a1aa', // Zinc-400
          400: '#71717a', // Zinc-500
          500: '#52525b', // Zinc-600
          600: '#3f3f46', // Zinc-700
          700: '#27272a', // Zinc-800
          800: '#050505', // Zinc-900
          900: '#020203', // Zinc-950 (Deepest)
          1000: '#000000',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      }, fontSize: {
        'hero': ['5rem', '1.1'],
        'h1': ['3rem', '1.2'],
        'h2': ['2rem', '1.3'],
        'h3': ['1.5rem', '1.4'],
        'body': ['1rem', '1.6'],
        'small': ['0.875rem', '1.5'],
        'xs': ['0.75rem', '1.4'],
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
