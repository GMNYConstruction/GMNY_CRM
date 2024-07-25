/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx, ts, jsx, js}"],
  theme: {
    extend: {
      colors: {
        primarygrey: "#5E5E5E",
        primaryred: "#EB4342",
      },
      screens: {
        "sm-max": { max: "639px" },
        "xs-max": { max: "460px" },
      },
    },
  },
  plugins: [],
};