const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa');

module.exports = withPWA({
  generateEtags: false,
  pwa: {
    dest: 'public',
    disable: process.env.REACT_APP_PAYPAL === 'development',
    register: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  i18n,
  images: {
    domains: ['fleksa-cdn.s3.eu-central-1.amazonaws.com', 'fleksa-image.s3.eu-central-1.amazonaws.com', 'fleksa.s3.eu-central-1.amazonaws.com'],
    disableStaticImages: true,
  },
});
