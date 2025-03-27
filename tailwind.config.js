/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pokemon: ['Pokemon GB', 'monospace'],
      },
      colors: {
        'pokemon': {
          'blue': {
            light: '#9DB7F5',
            DEFAULT: '#104068',
            dark: '#001030'
          },
          'green': {
            light: '#A8E0A8',
            DEFAULT: '#2C6C30',
            dark: '#003000'
          }
        }
      },
      keyframes: {
        cursor: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(4px)' }
        },
        slideIn: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        cursor: 'cursor 1s infinite',
        slideIn: 'slideIn 0.5s ease-out forwards',
        'scroll': 'scroll 20s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 