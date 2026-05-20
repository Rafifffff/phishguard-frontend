/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "collection-1-background": "var(--collection-1-background)",
        "collection-1-black":      "var(--collection-1-black)",
        "collection-1-grey":       "var(--collection-1-grey)",
        "collection-1-primary":    "var(--collection-1-primary)",
        "collection-1-secondary":  "var(--collection-1-secondary)",
        "collection-1-white":      "var(--collection-1-white)",
        "colors-accents-blue":     "var(--colors-accents-blue)",
        "colors-accents-green":    "var(--colors-accents-green)",
        "colors-accents-orange":   "var(--colors-accents-orange)",
      },
    },
  },
  plugins: [],
};
