/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // KoinX-inspired palette
        ink: '#1B1E27',
        slate: {
          850: '#1F2430',
        },
        brand: {
          50: '#EFF1FF',
          100: '#E1E4FF',
          200: '#C3C9FF',
          400: '#7B83EB',
          500: '#5B5FEF',
          600: '#4548D6',
          700: '#3A3CB0',
        },
        gain: {
          green: '#1AA760',
          greenBg: '#E9F9F1',
          red: '#E5484D',
          redBg: '#FDEEEF',
          gray: '#8A8F9C',
          grayBg: '#F2F3F6',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F7F8FA',
          border: '#E7E9EF',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)',
        cardHover: '0 4px 12px rgba(16, 24, 40, 0.08)',
        dropdown: '0 8px 24px rgba(16, 24, 40, 0.12)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-out',
        shimmer: 'shimmer 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
