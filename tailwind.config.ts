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
        "color-background": "#FFFFFF",
        // "color-background-dark": "#171717",
        "color-background-dark": "#212121",
        "color-foreground": "#000000",
        "color-foreground-dark": "#ffffff",
        "color-foreground-light": "#5f5f5f",
        "color-foreground-light-dark": "#b7b7b7",
        "color-border": "#d1d5db",
        // "color-border-dark": "#676767",
        "color-border-dark": "#333333",
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
        "color-fifth-dark": "#b7b7b7",
        "color-six": "#e39300", // orange
        "color-six-dark": "#f29d00",
        "color-temp-rgba": "rgba(1, 103, 252, .5)",
        primary: "#009439",
        secondary: "#f7f7f7",
        "secondary-d": "#333333",
        background: "#FFFFFF",
        "background-d": "#212121",
        border: "#d1d5db",
        "border-d": "#333333",
        gray: "#7f7f7f",
        "gray-d": "#b7b7b7",
        muted: "#F7F7F7",
        "muted-d": "#333333",
        "muted-foreground": "#7f7f7f",
        "muted-foreground-d": "#b7b7b7",
        critical: "#FF4714",
        major: "#FFA500",
        warning: "#C5A0FB",
      },
    },
  },
  plugins: [],
};
export default config;
