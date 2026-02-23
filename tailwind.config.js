/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 40px rgba(212,175,55,0.25)',
          },
          '50%': {
            boxShadow: '0 0 80px rgba(212,175,55,0.45)',
          },
        },
      },
      animation: {
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};