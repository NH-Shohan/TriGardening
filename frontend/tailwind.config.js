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
        "text-light": "#696969",
      },
    },
  },
  plugins: [],
};
