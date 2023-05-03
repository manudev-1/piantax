/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'cocoGoose': "cocoGoose",
        'calibri': 'calibri'
      },
      colors: {
        'backG': '#B7E5B7',
        'title': '#3F542D',
        'text': '#3C582A',
        'backSmoked': 'rgba(0, 0, 0, .5)'
      }
    },
  },
  plugins: [],
}

