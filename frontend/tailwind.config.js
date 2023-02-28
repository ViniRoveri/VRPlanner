/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      title: 'Kalam, cursive',
      text: 'Patrick Hand SC, cursive'
    },
    screens:{
      sm: '426px',
      md: '769px',
      lg: '1025px',
      xl: '1280px'
    },
    extend: {
      colors:{
        default:{
          blue:'#205295',
          white:'#F8F4EA',
          lightBeige:'#ECE8DD',
          beige:'#E1D7C6',
          brown:'#3C2A21',
          darkBrown:'#1A120B',
          black: '#111'
        },
        marker: {
          red: '#ff1616',
          orange: '#ff9316',
          yellow: '#ffdc17',
          green: '#26ff17',
          cyan: '#17fff0',
          blue: '#175dff',
          purple: '#9a17ff'
       }
      }
    }
  },
  plugins: [],
}
