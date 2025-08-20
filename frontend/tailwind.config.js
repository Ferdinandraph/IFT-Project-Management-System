/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        futoGreen: '#10B981',
        futoWhite: '#F3F4F6',
      },
    },
  },
  plugins: [],
};