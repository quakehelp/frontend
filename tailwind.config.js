/** @type {import('tailwindcss').Config} */
import daisy from "daisyui"
import theme from 'daisyui/src/theming/themes'
import colors from 'tailwindcss/colors'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  important: true,
  theme: {
    extend: {
      
    },
    colors:{
      ...colors,
      primary: "#D33838",
      secondary:"#000000",
      
    }
  },
  plugins: [daisy],
  daisyui: {
    themes: [
      {
        light: {
          ...theme["[data-theme=light]"],
          "primary": "#D33838",
          "primary-focus": "#e07373",
        },
      },
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}

