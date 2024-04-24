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
        "3xl": "1920px",
      },
      fontFamily: {
        clashDisplay: ["var(--kanit)"],
      },
      colors: {
        "color-background": "#FFFFFF",
        // "color-background-dark": "#171717",
        "color-background-dark": "#212121",
        "color-foreground": "#000000",
        "color-foreground-dark": "#ffffff",
        "color-foreground-light": "#5f5f5f",
        "color-foreground-light-dark": "#b7b7b7",
        "color-border": "#d1d5db",
        "color-border-dark": "#676767",
        "color-primary": "#f7f7f7",
        // "color-primary-dark": "var(--color-primary-dark)",
        "color-primary-dark": "#333333",
        "color-second": "#e4e4e4",
        "color-second-dark": "#494949",
        "color-third": "#00943A",
        "color-third-dark": "#1FCB4F",
        "color-fourth": "#FA4515",
        "color-fourth-dark": "#FA4515",
        "color-fifth": "#7f7f7f",
        "color-fifth-dark": "#b7b7b7", // 838383
        "color-temp-rgba": "rgba(1, 103, 252, .5)",
      },
    },
  },
  plugins: [],
};
export default config;
