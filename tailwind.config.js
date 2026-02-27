/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f5efe6',
        gold: { DEFAULT: '#c9a962', dark: '#b8860b' },
        rose: '#cd5c5c',
        choco: { DEFAULT: '#2b2118', 2: '#4a3728', 3: '#7a5c48' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'aurora-drift': 'aurora-drift 20s ease-in-out infinite alternate',
        'shimmer': 'shimmer 4s linear infinite',
        'shimmer-gold': 'shimmer 3s linear infinite',
        'heart-float': 'heart-float 7s ease-in infinite',
        'spark': 'spark 3s ease-in-out infinite',
        'heart-pulse': 'heart-pulse 2s ease-in-out infinite',
        'moving-border': 'moving-border 4s linear infinite',
        'loader-up': 'loader-up 0.9s ease 0.3s forwards',
        'ldr-sub': 'loader-up 0.8s ease 0.9s forwards',
        'ldr-bar': 'loader-up 0.6s ease 1.2s forwards',
        'ldr-pct': 'loader-up 0.5s ease 1.4s forwards',
        'ldr-hh': 'loader-up 0.5s ease 1.7s forwards',
        'ldr-shim': 'shimmer 3.5s linear 1.2s infinite',
        'beat': 'beat 1.5s ease-in-out infinite',
      },
      keyframes: {
        'aurora-drift': {
          from: { transform: 'translate(0,0) scale(1)' },
          to: { transform: 'translate(3vw,4vh) scale(1.1)' },
        },
        shimmer: {
          from: { backgroundPosition: '300% center' },
          to: { backgroundPosition: '-300% center' },
        },
        'heart-float': {
          '0%': { opacity: 0, transform: 'translateY(0) scale(.4) rotate(-8deg)' },
          '15%': { opacity: .55 },
          '80%': { opacity: .12 },
          '100%': { opacity: 0, transform: 'translateY(-120px) scale(1.3) rotate(8deg)' },
        },
        spark: {
          '0%, 100%': { opacity: 0, transform: 'scale(0)' },
          '50%': { opacity: .8, transform: 'scale(1)' },
        },
        'heart-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.09)' },
        },
        'moving-border': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'loader-up': {
          from: { opacity: 0, transform: 'translateY(22px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        beat: {
          '0%, 100%': { transform: 'scale(1)', opacity: .45 },
          '50%': { transform: 'scale(1.35)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
