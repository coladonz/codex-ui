/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      antialiased: "antialiased",
      colors: {
        "root-purple": {
          // 100: "#FF2C2C",
          // 200: "#EA3D3D",
          // 300: "#C52E2E",
          100: "#B680FD",
          200: "#C690FD",
          300: "#D6A0FD",
        },
        midnight: {
          100: "#191D27",
          200: "#0A0A0C",
        },
        daytime: {
          100: "#FFFFFF",
          200: "#FCFCFC",
        },
      },
      keyframes: {
        "fade-in-out": {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in-out": "fade-in-out 1.5s ease-in-out infinite",
      },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
  },
  darkMode: "class",
  plugins: [],
};
