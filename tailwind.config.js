/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx, ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#996DFF",
        secondary: "#FBA94C",
        "green-700": "#00875F",
        "green-500": "#00B37E",
        "green-300": "#04D361",
        "gray-700": "#121214",
        "gray-600": "#202024",
        "gray-500": "#29292E",
        "gray-400": "#323238",
        "gray-300": "#7C7C8A",
        "gray-200": "#C4C4CC",
        "gray-100": "#E1E1E6",
        white: "#FFFFFF",
      },
    },
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif']
    }
  },
  plugins: [],
};
