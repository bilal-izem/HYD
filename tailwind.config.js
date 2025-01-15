/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}","./node_modules/tw-elements/js/**/*.js",'node_modules/preline/dist/*.js',"./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {

    },
  },
  plugins: [require('daisyui'),require("tw-elements/plugin.cjs"),require('flowbite/plugin'),require('tailwind-scrollbar')],
}

