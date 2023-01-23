/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1.5deg)' },
          '50%': { transform: 'rotate(1.5deg)' }
        }
      },
      animation: {
        wiggle: 'wiggle 200ms ease-in-out'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
