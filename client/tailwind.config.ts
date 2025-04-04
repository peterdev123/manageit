import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563eb',    // Blue
          secondary: '#64748b',  // Slate
          accent: '#22c55e',     // Green
        },
        background: {
          light: '#ffffff',
          dark: '#f8fafc',
        },
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 4px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}

export default config