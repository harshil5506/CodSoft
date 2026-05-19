/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        muted: '#f5f5f5',
        'muted-foreground': '#666666',
        border: '#e5e5e5',
        card: '#fafafa',
        primary: '#000000',
        'primary-foreground': '#ffffff',
        secondary: '#f0f0f0',
        'secondary-foreground': '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  safelist: [
    { pattern: /bg-.*/ },
    { pattern: /text-.*/ },
  ],
  plugins: [],
}
