module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      gradientColorStops: theme => ({
        'primary': '#4F46E5',
        'secondary': '#7C3AED',
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
