/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}", // Include all component and file types used in your project
    "./public/index.html",],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
  
}

