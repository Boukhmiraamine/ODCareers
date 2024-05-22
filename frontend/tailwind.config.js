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
      colors: {
        primary: {
          light: '#FFB74D', // light orange
          DEFAULT: '#FF9800', // orange
          dark: '#F57C00', // dark orange
        },
        secondary: {
          light: '#B0BEC5', // light gray
          DEFAULT: '#607D8B', // gray
          dark: '#455A64', // dark gray
        },
        black: {
          light: '#757575', // light black (gray)
          DEFAULT: '#212121', // black
          dark: '#000000', // pure black
        }
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

