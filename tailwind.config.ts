import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        square: "0px 0px 4px 1px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "#e0e0e1",
        primary: "#145790",
      },
      screens: {
        xs: "480px",
        "0_5xl": "1140px",
      },
      fontFamily: {
        bitter: ["var(--font-bitter)"],
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
