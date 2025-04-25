/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1692px',
      },
      maxWidth: {
        '8xl': '82.5rem',
        '9xl': '103.75rem',
      },
      borderRadius: {
        circle: '50%',
      },
      fontFamily: {
        'zen-dots': `'Zen Dots', cursive`,
        'bebas-neue': `'Bebas Neue', sans-serif`,
        oxanium: `'Oxanium', cursive`,
        'tti-regular': `'TTInterfaces-Regular', sans-serif`,
        'tti-medium': `'TTInterfaces-Medium', sans-serif`,
        'tti-demi-bold': `'TTInterfaces-DemiBold', sans-serif`,
        'tti-bold': `'TTInterfaces-Bold', sans-serif`,
      },
      animation: {
        'text-gradient': 'text-gradient 5s ease infinite',
      },
      keyframes: {
        'text-gradient': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      colors: {
        brand: {
          black: {
            1: 'rgba(34, 34, 34, 1)', // black/black 100%
            5: 'rgba(243, 243, 243, 1)',
            10: 'rgba(232, 232, 233, 1)',
            20: 'rgba(207, 208, 209, 1)',
            30: 'rgba(184, 185, 187, 1)',
            40: 'rgba(160, 161, 164, 1)',
            50: 'rgba(135, 137, 140, 1)',
            60: 'rgba(112, 115, 118, 1)',
            70: 'rgba(89, 92, 96, 1)',
            80: 'rgba(65, 68, 73, 1)',
            90: 'rgba(41, 45, 50, 1)',
            100: 'rgba(17, 21, 27, 1)',
            110: 'rgba(22, 27, 34, 1)',
            120: 'rgba(20, 23, 28, 1)',
            130: 'rgba(13, 17, 21, 1)',
          },
          primary: {
            'color-light': 'rgba(235, 221, 208, 1)', // Brand Color/Color
            'color-1': 'rgba(241, 99, 52, 1)',
            'color-2': 'rgba(12, 12, 12, 1)',
            'shade-1': 'rgba(254, 240, 235, 1)',
            'shade-2': 'rgba(231, 231, 231, 1)',
          },
          blue: {
            350: 'rgba(52, 128, 241, 1)',
            550: 'rgba(63, 160, 251, 1)',
          },
          purple: {
            550: 'rgba(169, 48, 254, 1)',
          },
          violet: {
            550: 'rgba(108, 93, 211, 1)',
          },
          yellow: {
            550: 'rgba(249, 188, 82, 1)',
            750: 'rgba(250, 167, 64, 1)',
            810: 'rgba(252, 180, 67, 1)',
            850: 'rgba(255, 149, 72, 1)',
          },
          orange: {
            110: 'rgba(245, 130, 57, 1)',
            120: 'rgba(241, 101, 52, 1)',
          },
          green: {
            850: 'rgba(117, 221, 59, 1)',
          },
          red: {
            550: 'rgba(241, 52, 52, 1)',
          },
        },
      },
      backgroundImage: {
        'fading-theme-gradient-25':
          'linear-gradient(var(--angle,90deg),  theme(colors.brand.primary.color-1 / 0) 0%, theme(colors.brand.primary.color-1 / 0.25) 50%, theme(colors.brand.primary.color-1 / 0) 100%)',
        'fading-theme-gradient-top-to-bottom':
          'linear-gradient(theme(colors.brand.primary.color-1 / 0.16) 0%, theme(colors.white / 0) 100%)',
        'fading-theme-gradient-light-to-deep':
          'linear-gradient(134deg, theme(colors.brand.primary.color-light) -70%, theme(colors.brand.primary.color-1) 100%)',
        'gradient-bordered-deep':
          'linear-gradient(92deg,theme(colors.brand.yellow.810/.6) 4%,theme(colors.brand.orange.120/.6) 96%)',
        'gradient-bordered-light':
          'linear-gradient(92deg,theme(colors.brand.yellow.810/.2) 4%,theme(colors.brand.orange.120/.2) 96%)',
        'multi-gradient-1':
          'linear-gradient(152deg,theme(colors.brand.yellow.750/1) 0%,theme(colors.brand.yellow.750/.05) .01%,theme(colors.brand.orange.110/0) 47.92%,theme(colors.brand.primary.color-1/.05) 100%)',
      },
    },
  },
  plugins: [],
};
