/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'orange-set': '#FFC83A',
        'deafult-color': '#EDEDED'
      },
      fontFamily: {
        'Rounded-font': ['M PLUS Rounded 1c', 'system-ui', 'sans-serif'],
      },
      textColor: {
        'orange-set': '#FFC83A',
      },
      fontWeight: {
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
        '900': '900',
      },
    },
  },
  plugins: [],
}

