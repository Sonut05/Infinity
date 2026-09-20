/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#063A58',
          'navy-dark': '#04273c',
          'navy-light': '#0c4e75',
          dark: '#07151D',
          'dark-surface': '#0d222e',
          'dark-elevated': '#122c3b',
          blue: '#1479D1',
          'blue-hover': '#1064b0',
          'blue-soft': '#edf5fc',
          slate: '#F1F4F6',
          'slate-light': '#f8fafc',
          'slate-border': '#e2e8f0',
          'slate-muted': '#64748b',
          accent: '#F4C542',
          'accent-hover': '#e4b635',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.02em',
        architectural: '0.18em',
        widecaps: '0.25em',
      }
    },
  },
  plugins: [],
}
