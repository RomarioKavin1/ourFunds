import { encode } from "punycode";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "first":"#021526",
        "second":"#03346E",
        "third":"#6EACDA",
        "fourth":"#E2E2B6",
      },
      fontFamily: {
        'encode': ['Encode Sans', 'sans-serif'],
      },
      fontWeight: {
        'encode-thin': '100',
        'encode-extraLight': '200',
        'encode-light': '300',
        "encode-regular": '400',
        'encode-medium': '500',
        'encode-semibold': '600',
        'encode-bold': '700',
        'encode-extraBold': '800',
        'encode-black': '900',
      },
    },
  },
  plugins: [],
};
export default config;
