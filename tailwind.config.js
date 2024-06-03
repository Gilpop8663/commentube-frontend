/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        monoton: ["Monoton", "sans-serif"],
      },
      backgroundColor: {
        brand: "#f1f1f1",
      },
    },
  },
  plugins: [],
};
