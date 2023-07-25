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
        'imgAvocado': "url('./assets/kawaii/avocado.png')",
        'imgPiedra':  "url('./assets/kawaii/piedra.png')",
        'imgPapel':   "url('./assets/kawaii/papel.png')",
        'imgTijeras': "url('./assets/kawaii/tijeras.png')",
        'imgQuestion': "url('./assets/kawaii/question-svgrepo-com.png')"
	    },
      backgroundColor: theme =>({
          'primary': '#242424',
          'terciary': '#09A65A'
        }),
      },
  },
  plugins: [],
}



