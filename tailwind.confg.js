/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
         primary: 'var(--color-primary)',
         bg: 'var(--color-bg)',
         card: 'var(--color-card)',
         accent: 'var(--color-accent)',
        },
      },
    },
    plugins: [],
}
  