module.exports = {
  siteUrl: 'http://localhost:3000',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      'http://localhost:3000/server-sitemap.xml', // <==== Add here
    ],
  },
};
