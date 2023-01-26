/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'montserrat': ['"Montserrat"', "sans-serif"],
      'nunito': ['"Nunito"', "sans-serif"],
      'permanentmarker': ['"Permanent Marker"', "sans-serif"],
    },
    extend: {
      backgroundImage: {
        'imgAvocado': "url('./src/assets/kawaii/avocado.png')",
        'imgPiedra':  "url('./src/assets/kawaii/piedra.png')",
        'imgPapel':   "url('./src/assets/kawaii/papel.png')",
        'imgTijeras': "url('./src/assets/kawaii/tijeras.png')"
	    },
      backgroundColor: theme =>({
          'primary': '#242424',
          'terciary': '#09A65A'
        }),
      },
  },
  plugins: [],
}



