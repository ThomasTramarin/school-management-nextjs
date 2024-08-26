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
        "primary-text": "#1F4E79",
        "secondary-text": "#333333",
        "tertiary-text": "#444444",
        "link-text": "#2874A6",
        "error-text": "#8B0000",
        "success-text": "#005B09",
        "primary-bg": "#E4EEFD",
        "secondary-bg": "#579aff",
        "button-bg": "#2874A6",
        "button-bg-hover": "#1F4E79",
        "focus-bg": "#C9DEFF",
        "focus-bg-error": "#FFECEC",
      }
    },
  },
  plugins: [],
};
export default config;
