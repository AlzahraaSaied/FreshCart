/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,tsx,ts}',
    './index.html'
  ],
  theme: {
    extend: {
      '.row': {

        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: '-0.5rem',
        marginRight: '-0.5rem',
      },
      '.col-md-6':{
        paddingLeft: '0.5rem',
          paddingRight: '0.5rem',

      }


    },
  },
  plugins: [],
}

