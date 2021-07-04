const { i18n } = require('./next-i18next.config')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const prod = process.env.NODE_ENV === 'production'


module.exports = withPWA({
  generateEtags: false,
  pwa: {
    dest: "public",
    disable: prod ? false : true
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config
  },
  i18n,
  images: {
    domains: [
      'fleksa-cdn.s3.eu-central-1.amazonaws.com',
      'fleksa-image.s3.eu-central-1.amazonaws.com',
      'fleksa.s3.eu-central-1.amazonaws.com',
    ],
    disableStaticImages: true
  },
})