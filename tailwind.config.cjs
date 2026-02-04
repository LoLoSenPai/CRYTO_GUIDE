/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        night: {
          900: "#0B0F14",
          800: "#0F141B",
          700: "#151B25",
          600: "#1B2230"
        },
        sand: {
          200: "#F4F0EA",
          300: "#E7DFCF",
          400: "#D7C9B6"
        },
        teal: {
          300: "#5CE0D8",
          400: "#34CBBF",
          500: "#17A9A0"
        },
        amber: {
          300: "#FFD27D",
          400: "#F7B955",
          500: "#E79A1C"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.05), 0 12px 40px rgba(0,0,0,0.45)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.04)"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};
