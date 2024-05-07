/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.ts'],
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['Helvetica', 'Arial', 'sans-serif'], // Example custom font stack
        'heading': ['Georgia', 'serif'], // Example custom font stack for headings
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

