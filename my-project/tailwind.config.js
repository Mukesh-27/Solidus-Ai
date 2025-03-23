/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
        'display': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
        'fira': ['Fira Code', 'monospace'],
      },
      colors: {
        'editor-bg': '#1E1E1E',
        'editor-text': '#D4D4D4',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 
