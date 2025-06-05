import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      blue: colors.blue,
      indigo: colors.indigo,
      gray: colors.gray,
    },
  },
};
export const plugins = [];
