/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a7ea4',
        secondary: '#4CAF50',
        danger: '#EF4444',
        warning: '#F59E0B',
        success: '#22C55E',
        dark: '#1f2937',
        light: '#f3f4f6',
      },
    },
  },
  plugins: [],
}
