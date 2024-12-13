import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "#e0e0e1",
        primary: "#145790",
      },
      screens: {
        xs: "480px",
      },
      fontFamily: {
        geist: ["--font-geist-mono"],
      },
    },
  },
  plugins: [],
} satisfies Config;
