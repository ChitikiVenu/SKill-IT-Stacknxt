/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1D2A44',
        muted: '#64748B',
        royal: '#2864EA',
        sky: '#45A4F3',
        mint: '#0DC289',
        mist: '#F3F8FF',
        paleMint: '#E8FBF5',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(32, 86, 180, 0.12)',
        card: '0 14px 35px rgba(31, 72, 145, 0.14)',
        lift: '0 22px 48px rgba(32, 86, 180, 0.2)',
      },
      fontFamily: {
        display: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'blue-mint': 'linear-gradient(135deg, #3475EF 0%, #64B7E9 48%, #BDF0DD 100%)',
        'blue-green': 'linear-gradient(135deg, #2864EA 0%, #1590BE 51%, #0CC583 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        drift: 'drift 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
