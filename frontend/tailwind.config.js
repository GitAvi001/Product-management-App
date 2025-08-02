import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */


export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: { // Themes need for frontend from daisyui  
    themes: [
      "pastel",
      "retro",
      "coffee",
      "forest",
      "cyberpunk",
      "synthwave",
      "luxury",
      "autumn",
      "valentine",
      "aqua",
      "business",
      "night",
      "dracula",
    ],
  },
}

