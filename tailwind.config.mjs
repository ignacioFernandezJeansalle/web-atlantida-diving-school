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
        header: "4rem",
      },
    },
  },
  plugins: [],
};
