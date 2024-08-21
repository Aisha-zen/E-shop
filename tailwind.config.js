module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#030406', // Dark blue
        secondary: '#3B82F6', // Light blue
        accent: '#34D399', // Green
        background: '#F9FAFB', // Light gray
        text: '#1F2937', // Dark gray
        'deep-navy-blue': '#1B263B',
        'gold': '#D4AF37',
        'soft-gray': '#A9A9A9',
        'light-ivory': '#F7F7F7',
        'charcoal-gray': '#333333',
        'emerald-green': '#2ECC71',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
}
