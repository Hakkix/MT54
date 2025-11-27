/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Sans"', 'system-ui', 'sans-serif']
      },
      colors: {
        midnight: '#0b1021'
      },
      backgroundImage: {
        aurora: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.1), transparent 35%), linear-gradient(120deg, #1b1f3a 0%, #121826 35%, #0b1021 70%, #0f172a 100%)'
      }
    }
  },
  plugins: []
};
