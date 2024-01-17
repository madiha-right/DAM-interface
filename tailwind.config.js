/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontSize: {
      "2xs": "0.625rem", // 10px
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
    },
    container: {
      center: true,
      screens: {
        DEFAULT: "1115px",
      },
    },
    extend: {
      colors: {
        destructive: "#F85149",
        constructive: "#3FB950",
        border: "#E2E8F0",
        hover: "#E2E8F0",
        background: "#FFFFFF",
        foreground: "#020617",
        muted: {
          foreground: "#64748B",
        },
        mantle: {
          pale: "#008F6A",
          teal: "#65B3AE",
          mint: "#C5E6E3",
        },
      },
      borderWidth: {
        md: "2px",
        sm: "1px",
      },
      borderRadius: {
        xl: "10px",
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
