/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "special-blue": "#323d61",
        "light-white": "rgba(255,255,255,0.17)",
        "orange": "#F95B3D",
      }
    },
  },
  plugins: [],
}

