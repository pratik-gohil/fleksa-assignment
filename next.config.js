module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config
  },
  images: {
    domains: [
      'fleksa-cdn.s3.eu-central-1.amazonaws.com',
      'fleksa-image.s3.eu-central-1.amazonaws.com',
      'fleksa.s3.eu-central-1.amazonaws.com',
    ],
  },
}