/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
      fill: {
        red: '#dc2626', // Tailwind's red-600
        teal: '#0d9488', // Tailwind's teal-600
      },
      stroke: {
        red: '#dc2626',
        teal: '#0d9488',
      },
      colors: {
        customColor: {
          base: '#3ca4ac',     // Base color
          loginsubmitdark: '#338d94',        // Dimmer version
          loginsubmitlight: '#4abdc5',       // Brighter version
          landingbackground: '#A6E2D6',
          landingfooter: '#4F9A83',
          landingverydark: '#387A79',
          otherpagesbackground: '#EAEAEA',
          rmcardbackground: '#D9D9D9',
        },
      },
    },
    plugins: [
      require('tailwind-scrollbar')({ nocompatible: true}),
      ],
},
}

