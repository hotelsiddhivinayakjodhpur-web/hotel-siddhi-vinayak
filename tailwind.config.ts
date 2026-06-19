import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury palette — Deep Espresso / Luxury Gold / Royal Bronze /
        // Warm Champagne / Soft Ivory / Rich Gold (CTA hover).
        gold: {
          DEFAULT: "#C8A56A", // Luxury Gold (secondary)
          light: "#E8D8B5",   // Warm Champagne (highlight)
          dark: "#8B5E34",    // Royal Bronze (accent)
          rich: "#D4AF37",    // Rich Gold (CTA hover)
        },
        bronze: "#8B5E34",
        champagne: "#E8D8B5",
        espresso: "#1F1611",
        ink: "#1F1611",       // Deep Espresso (primary)
        sand: "#F8F4EE",      // Soft Ivory (background)
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.35em",
      },
      boxShadow: {
        luxe: "0 12px 40px -16px rgba(31,22,17,0.28)",
        "luxe-lg": "0 28px 60px -22px rgba(31,22,17,0.42)",
        gold: "0 10px 28px -10px rgba(200,165,106,0.55)",
        "gold-hover": "0 16px 36px -10px rgba(212,175,55,0.62)",
      },
      backgroundImage: {
        "gold-cta": "linear-gradient(135deg, #C8A56A 0%, #D4AF37 100%)",
        "gold-sheen": "linear-gradient(120deg, #E8D8B5 0%, #C8A56A 45%, #8B5E34 100%)",
      },
      keyframes: {
        shine: {
          "0%": { left: "-120%" },
          "100%": { left: "140%" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        floaty: "floaty 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
