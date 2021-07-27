import { GetServerSideProps } from 'next';
import path from 'path';
import { GetPathsFromBuildFolder, GetPathsFromManifest, GetSitemapXml, ReadManifestFile, Url } from '../utils/sitemap.util';

// Default export to prevent next.js errors
const SiteMap = () => <div />;
export default SiteMap;

const excludedRoutes: Array<string> = ['/sitemap', '/404'];

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const basePath: string = process.cwd();
  const routes_manifest: object = ReadManifestFile(basePath);
  const host: string = req.headers?.host || '';

  let routes: Array<Url> = GetPathsFromManifest(routes_manifest, host);
  const pagesPath = path.join(basePath + '/.next/server/pages/');

  routes = routes.concat(GetPathsFromBuildFolder(pagesPath, [], host, pagesPath));
  routes = routes.filter((el) => !excludedRoutes.includes(el.route));

  const staticRoutes: Array<Url> = [
    {
      host,
      route: '/',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 1.0,
    },
    {
      host,
      route: '/en',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.8,
    },
    {
      host,
      route: '/de',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.8,
    },
    {
      host,
      route: '/en/reservation',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.8,
    },
    {
      host,
      route: '/en/gallery',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.8,
    },
    {
      host,
      route: '/en/contact-us',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.8,
    },
    {
      host,
      route: '/en/privacy-policy',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.8,
    },
    {
      host,
      route: '/en/imprint',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.8,
    },
    {
      host,
      route: '/en/menu',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.64,
    },
    {
      host,
      route: '/de/reservation',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.8,
    },
    {
      host,
      route: '/de/gallery',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.8,
    },
    {
      host,
      route: '/de/contact-us',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.8,
    },
    {
      host,
      route: '/de/privacy-policy',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.8,
    },
    {
      host,
      route: '/de/imprint',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.8,
    },
    {
      host,
      route: '/de/menu',
      date: new Date('2021-07-23T06:00:23+00:00'),
      priority: 0.64,
    },
  ];

  const sitemap: string = GetSitemapXml(routes.concat(staticRoutes));

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return { props: {} };
};
