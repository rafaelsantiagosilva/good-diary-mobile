/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        lemon: ["Lemon_400Regular"],
        poppins: ["Poppins_400Regular"],
        "poppins-bold": ["Poppins_700Bold"]
      }
    },
  },
  plugins: [],
}

