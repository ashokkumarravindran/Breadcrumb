import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FCFBF8',
        card: '#F8F6F1',
        ink: '#1D1C19',
        soft: '#6B6458'
      },
      boxShadow: {
        soft: '0 4px 12px rgba(15, 23, 42, 0.06)'
      }
    }
  },
  plugins: [],
};

export default config;
