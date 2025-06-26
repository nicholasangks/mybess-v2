import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1728px",
      },
      fontFamily: {
        clashDisplay: ["var(--kanit)"],
      },
      fontSize: {
        sm: "0.94rem", // Example: override text-sm
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "accent-a": "var(--accent-a)",
        "accent-b": "var(--accent-b)",
        "accent-c": "var(--accent-c)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        critical: "var(--critical)",
        major: "var(--major)",
        warning: "var(--warning)",
        border: "var(--border)", // "#d1d5db", '#333333'
      },
    },
  },
  plugins: [],
};
export default config;
