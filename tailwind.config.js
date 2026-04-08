/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'on-tertiary-container':'#572f00','surface-variant':'#dee3e8',
        'outline-variant':'#bdc8d1','secondary-fixed-dim':'#a3cce8',
        'surface-container-lowest':'#ffffff','surface-container-low':'#eff4fa',
        'surface-dim':'#d6dae0','on-surface-variant':'#3e4850',
        'surface-container-high':'#e4e9ee','surface-container':'#eaeef4',
        error:'#ba1a1a','on-secondary-fixed':'#001e2d','surface-tint':'#00658d',
        background:'#f5faff','on-primary-fixed-variant':'#004c6b',surface:'#f5faff',
        'on-error-container':'#93000a','on-primary-container':'#003e58',
        'tertiary-container':'#ea8c21','surface-bright':'#f5faff',
        'inverse-primary':'#82cfff','surface-container-highest':'#dee3e8',
        'error-container':'#ffdad6','on-surface':'#171c20',
        'primary-fixed-dim':'#82cfff','primary-fixed':'#c6e7ff',
        'tertiary-fixed':'#ffdcc0','on-primary':'#ffffff',outline:'#6e7881',
        'inverse-on-surface':'#ecf1f7','primary-container':'#00aeef',
        'secondary-fixed':'#c6e7ff','on-secondary-fixed-variant':'#204b63',
        'on-secondary':'#ffffff','on-error':'#ffffff',primary:'#00658d',
        tertiary:'#8d4f00','on-tertiary':'#ffffff','on-primary-fixed':'#001e2d',
        'on-tertiary-fixed-variant':'#6b3b00','on-secondary-container':'#3d657e',
        'on-tertiary-fixed':'#2d1600','inverse-surface':'#2c3135',secondary:'#3a637c',
        'tertiary-fixed-dim':'#ffb876','secondary-container':'#b9e2ff','on-background':'#171c20',
      },
      fontFamily: {
        headline: ['"Plus Jakarta Sans"','Cairo','sans-serif'],
        body:     ['"Plus Jakarta Sans"','Cairo','sans-serif'],
        label:    ['Manrope','sans-serif'],
        arabic:   ['Cairo','sans-serif'],
      },
      borderRadius: { DEFAULT:'0.125rem',lg:'0.25rem',xl:'0.5rem','2xl':'1rem','3xl':'2rem',full:'9999px' },
    },
  },
  plugins: [],
};
