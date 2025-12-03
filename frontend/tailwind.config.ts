import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.emerald[600],
        "primary-500": colors.emerald[500],
        "primary-700": colors.emerald[700],
        "muted-50": colors.slate[50],
        "muted-100": colors.slate[100],
        "muted-200": colors.slate[200],
        "muted-300": colors.slate[300],
        "muted-400": colors.slate[400],
        "muted-500": colors.slate[500],
        "muted-600": colors.slate[600],
        "muted-800": colors.slate[800]
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 40px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
