/** @type {import('tailwindcss').Config} */


import { withUt } from "uploadthing/tw";


export default withUt({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        btn: '4px 6px -1px var(--tw-shadow-colored),-4px -6px -1px rgba(255,255,255,0.5)',
        cus: '17px 20px 40px var(--tw-shadow-colored)'
      },
      colors: {
        accent: {
          DEFAULT: '#FF3333',
          light: '#FF3366'
        },
        primary: {
          DEFAULT: "#000",
          light: "#fff",
        }
      }
    },
    screens: {

      '3xl': { max: '1800px' },

      'm2xl': { min: '1500px' },

      '2xl': { max: '1500px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { max: '1200px' },
      // => @media (max-width: 1200px) { ... }

      '2lg': { max: '1024px' },
      // => @media (max-width: 1024px) { ... }

      'm2lg': { min: '1024px' },

      'lg': { max: '920px' },
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
})
