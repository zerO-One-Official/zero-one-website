/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: "#000",
          light: "#ffffff",
        },
        blue: {
          DEFAULT: "#24ACFF",
          light: "#98e8fc",
        },
        golden: {
          DEFAULT: "#FFED79",
          light: "#FFA776",
        },
      }
    },
    screens: {
      'm2xl': { min: '1500px' },

      '2xl': { max: '1500px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { max: '1200px' },
      // => @media (max-width: 1200px) { ... }

      '2lg': { max: '1024px' },
      // => @media (max-width: 1024px) { ... }

      'm2lg': { min: '1024px' },

      'lg': { max: '900px' },
      // => @media (max-width: 1023px) { ... }

      'md': { max: '768px' },
      // => @media (max-width: 767px) { ... }

      'sm': { max: '600px' },
      // => @media (max-width: 639px) { ... }

      'xs': { max: '450px' },
      // => @media (max-width: 450px) { ... }
    },
  },
  plugins: [],
}
