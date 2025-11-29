import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teleton: {
          red: "#D6001C",     // Rojo 
          dark: "#333333",    // Texto oscuro
          light: "#F4F4F4",   // Fondo gris 
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;