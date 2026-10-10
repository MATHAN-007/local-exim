/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0B2415',
          800: '#113320',
        },
        brandGreen: {
          800: '#14532D',
          700: '#1B5E20',
          600: '#23782C',
        },
        lime: {
          500: '#6DB33F',
        },
        gold: {
          300: '#E6C75A',
          400: '#DDBB45',
          500: '#D4AF37',
          600: '#B89324',
        },
        cream: {
          DEFAULT: '#FAF8F3',
          50: '#FCFBF7',
          100: '#FAF8F3',
          200: '#F3EFE4',
          300: '#EBE5D3',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          muted: '#4A4A4A',
          light: '#71717A',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['"Noto Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 36, 21, 0.06), 0 2px 6px -1px rgba(11, 36, 21, 0.04)',
        'card': '0 10px 30px -5px rgba(11, 36, 21, 0.08), 0 4px 10px -2px rgba(11, 36, 21, 0.04)',
        'nav': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
