import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors (Agricultural Theme)
        "cashew-green": "#34A853",
        "cashew-dark-green": "#1E7E34",
        "cashew-brown": "#8B6914",
        "earth-brown": "#6B4423",
        "cashew-tan": "#D4A76A",

        // Secondary Colors
        "zambia-copper": "#CC7722",
        "growth-lime": "#A4D65E",
        "sky-blue": "#4A90E2",

        // Glass effect colors
        "glass-white": "rgba(255, 255, 255, 0.1)",
        "glass-white-border": "rgba(255, 255, 255, 0.18)",
      },
      backdropBlur: {
        xs: "2px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "glass-shimmer": "glassShimmer 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glassShimmer: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-lg": "0 12px 40px 0 rgba(31, 38, 135, 0.45)",
        "nav": "0 4px 20px -2px rgba(0, 0, 0, 0.1)",
        "nav-lg": "0 8px 30px -4px rgba(0, 0, 0, 0.15)",
      },
      dropShadow: {
        "hero": [
          "0 2px 4px rgba(0, 0, 0, 0.5)",
          "0 4px 12px rgba(0, 0, 0, 0.4)",
        ],
        "hero-lg": [
          "0 4px 8px rgba(0, 0, 0, 0.6)",
          "0 8px 24px rgba(0, 0, 0, 0.4)",
        ],
        "text": "0 2px 4px rgba(0, 0, 0, 0.5)",
        "text-lg": "0 4px 8px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
