import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem' },
    },
    extend: {
      fontFamily: {
        'karnak-condensed': ['Karnak Condensed Bold', ...defaultTheme.fontFamily.sans],
        karnak: ['Karnak', ...defaultTheme.fontFamily.sans],
        franklin: ['Libre Franklin', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        neutral: {
          50: '#f6f7f8',
          100: '#edeff1',
          200: '#d3d6da',
          300: '#d8d8d8',
          400: '#939598',
          500: '#787c7e',
          600: '#565758',
          700: '#3a3a3c',
          800: '#272729',
          900: '#1a1a1b',
          950: '#121213',
        },
        green: { 500: '#6aaa64', 600: '#538d4e' },
        yellow: { 500: '#c9b458', 600: '#b59f3b' },
        orange: { 500: '#f5793a' },
        blue: { 400: '#85c0f9', 500: '#4f85e5', 600: '#477aaa' },
      },
    },
  },
  plugins: [],
} satisfies Config;
