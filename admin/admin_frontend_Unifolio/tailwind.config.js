/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    require('tailwindcss'),
    // require("/node_modules/flowbite/plugin.js"),
  ],
  daisyui: {
    themes: [],
  },
}


