/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './apps/**/*!(*.stories|*.spec).{js,ts,jsx,tsx}',
    './libs/**/*!(*.stories|*.spec).{js,ts,jsx,tsx}',
    './{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3366ff',
          50: '#f0f4ff',
          100: '#f0f4ff',
          200: '#d9e2ff',
          300: '#a6c1ff',
          400: '#598bff',
          500: '#3366ff',
          600: '#274bdb',
          700: '#1a34b8',
          800: '#102694',
          900: '#091c7a',
        },
      },
      spacing: {
        0: '0px',
        '0px': '0px',
        '0.5px': '0.5px',
        '1px': '1px'
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  }
};
