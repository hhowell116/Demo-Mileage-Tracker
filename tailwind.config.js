/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#915EFF',
        'primary-light': '#a87bff',
        'primary-dark': '#7a4de0',
        surface: '#1a1a2e',
        'surface-light': '#232340',
        'surface-lighter': '#2d2d50',
      },
    },
  },
  plugins: [],
};
