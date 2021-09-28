const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  generateEtags: false,
  pwa: {
    dest: 'public',
    runtimeCaching,
    register: true,
    skipWaiting: true,
    disable: process.env.REACT_APP_PAYPAL === 'development',
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  i18n,
  images: {
    domains: ['fleksa-cdn.s3.eu-central-1.amazonaws.com'],
    disableStaticImages: true,
  },
});
