/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#006878",
        secondary: "#dc0054",
      },
      spacing: {
        navbar: "4rem",
      },
      screens: {
        "-md": { max: "767px" },
        // => @media (max-width: 767px) { ... }
      },
    },
  },
  plugins: [],
};
