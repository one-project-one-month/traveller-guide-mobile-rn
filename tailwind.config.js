/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppin: ["Poppin"],
        poppinBold: ["PoppinBold"],
        Pacifico: ['Pacifico']
      },
      colors: {
        orange: {
          50: '#fff2e6',
          100: '#ffd6b0',
          200: '#ffc28a',
          300: '#ffa654',
          400: '#ff9533',
          500: '#ff7a00',
          600: '#e86f00',
          700: '#b55700',
          800: '#8c4300',
          900: '#6b3300',
        },
        blue: {
          50: '#e6f3ff',
          100: '#b0d9ff',
          200: '#8ac7ff',
          300: '#54adff',
          400: '#339dff',
          500: '#0085ff',
          600: '#0079e8',
          700: '#005eb5',
          800: '#00498c',
          900: '#00386b',
        },
        red: '#FF4D4F'
      },
    },
  },
  plugins: [],
}
