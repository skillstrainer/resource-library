module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    darkMode: false, // or 'media' or 'class'
    extend: {
      colors: {
        orange: {
          light: "#FFEAD9",
          DEFAULT: "#E76F51",
          dark: "#E27550",
        },
        japanese_indigo: {
          light: "#EDF6F9",
          DEFAULT: "#264653",
        },
        jungle_green: {
          DEFAULT: "#2A9D8F",
        },
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
