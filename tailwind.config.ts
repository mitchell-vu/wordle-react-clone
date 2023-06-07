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
    },
  },
  plugins: [],
} satisfies Config;
