/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        '0.5': '0.5px'},
      colors: {
        'custom-black':'#111827',
        'custom-purple': '#4727eb',}
    },
  },
  plugins: [],
};
  