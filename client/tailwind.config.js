/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(150%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        
        slideOutRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(150%)", opacity: "0" },
        },

        popIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },

        popOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.8)", opacity: "0" },
        },
      },

      animation: {
        slideInRight: "slideInRight 0.4s ease-out",
        slideOutRight: "slideOutRight 0.4s ease-in",

        popIn: "popIn 0.25s ease-out",
        popOut: "popOut 0.25s ease-in",
      },
    },
  },
  plugins: [],
};