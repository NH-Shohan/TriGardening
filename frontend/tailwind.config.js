/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007700",
        secondary: "#D9FF9D",
        dark: "#003600",
        light: "#F0FFF0",
        white: "#FBFBFB",
        black: "#363636",
        gray: "#696969",
        red: "#EE2B2B",
        "red-light": "#FFCCCC"
      },
    },
  },
  plugins: [],
};
