import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(97.5% 0 0)",
        foreground: "oklch(20% 0.02 80)",
        card: "oklch(97.5% 0 0)",
        "card-foreground": "oklch(20% 0.02 80)",
        popover: "oklch(97.5% 0 0)",
        "popover-foreground": "oklch(20% 0.02 80)",
        primary: "oklch(82% 0.2 90)",
        secondary: "oklch(70% 0.1 100)",
        muted: "oklch(70% 0.1 100)",
        accent: "oklch(70% 0.1 100)",
        destructive: "oklch(50% 0.3 30)",
        border: "oklch(80% 0.02 70)", // Fixes `border-border`
        input: "oklch(80% 0.02 70)",
        ring: "oklch(85% 0.02 90)",
        sidebar: "oklch(82% 0.2 90)",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;