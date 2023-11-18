import { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import headlessUi from '@headlessui/tailwindcss';
import patterns from 'tailwindcss-patterns';

type TwColor = keyof typeof colors;
type TwColorValue = (typeof colors)[TwColor];

const addDefault = (color: TwColorValue) => {
  // if color is an object we can destructure:
  if (typeof color === 'object') return { ...color, DEFAULT: color[500] };
  // there is no default color, so we can just return the color
  return color;
};

// For each key, set it as colors[value] and add default
/**
 * Generate colors object, by using the colors from tailwindcss/colors, and setting the default color to the 500 value.
 * @param colorsMap - Object with the colors to use
 * @returns Object with the colors
 */
const getColors = (colorsMap: Record<string, TwColor>) => {
  return Object.keys(colorsMap).reduce((acc, key) => {
    const value = colorsMap[key];
    return { ...acc, [key]: addDefault(colors[value]) };
  }, {});
};

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: getColors({
        success: 'green',
        warning: 'yellow',
        danger: 'red',
        info: 'blue',
        default: 'gray',
      }),
    },
  },
  plugins: [headlessUi, patterns],
};

export default config;
