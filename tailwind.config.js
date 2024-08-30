/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
  content: ['index.html', './**/*.{html,js,tsx,jsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: "#24273a", //App background
        overlay: "#363a4f", // Front backgrounds
        surface: "#5b6078", // Element color
        text: "#dfe6ff",

        primary: "#98e20d",
        secondary: "#1e66f5",
        accent: "#179299",

        markdown: {
          heading: "#eff1f5",
          bold: "#6fc4e4",
          italics: "#a6da7d",
          link: "#8aadf4"
        }
      },
      boxShadow: {
        'inner-active': "inset -15px -15px 30px -20px rgba(0, 0, 0, 1)",
        'inner-unactive': "inset -15px -15px 40px -40px rgba(0, 0, 0, 1)"
      }
    },
  },
  plugins: [],
}

