import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Domus Pacis brand palette — warm gold + deep burgundy + ivory
        gold: {
          50:  '#fdf9ec',
          100: '#faf0cc',
          200: '#f5de95',
          300: '#efc85a',
          400: '#e8b830',
          500: '#d4a017',
          600: '#b8800f',
          700: '#925f10',
          800: '#784c14',
          900: '#653f16',
        },
        burgundy: {
          50:  '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d8',
          300: '#f4a9b8',
          400: '#ec7590',
          500: '#de4a6e',
          600: '#c92c52',
          700: '#a92042',
          800: '#7e1b38',
          900: '#5c1a31',
          950: '#3b0a1c',
        },
        ivory: {
          50:  '#fefdf8',
          100: '#fdf9ec',
          200: '#faf2d3',
          300: '#f4e6a8',
          400: '#ecd575',
          500: '#e2c04a',
        },
        stone: {
          850: '#1c1917',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern':    "url('/images/hero-pattern.svg')",
      },
      animation: {
        'fade-in':      'fadeIn 0.5s ease-out',
        'slide-up':     'slideUp 0.6s ease-out',
        'slide-in-right':'slideInRight 0.5s ease-out',
        'shimmer':      'shimmer 1.5s infinite',
        'float':        'float 3s ease-in-out infinite',
        'pulse-slow':   'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:       { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:      { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { from: { opacity: '0', transform: 'translateX(20px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        shimmer:      { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float:        { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      boxShadow: {
        'gold':   '0 4px 24px rgba(212, 160, 23, 0.25)',
        'card':   '0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        'modal':  '0 24px 64px rgba(0,0,0,0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}

export default config
