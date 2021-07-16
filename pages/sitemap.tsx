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
  console.log('============= ', host, ' ============= ');

  let routes: Array<Url> = GetPathsFromManifest(routes_manifest, host);
  const pagesPath = path.join(basePath + '/.next/server/pages/');
  routes = routes.concat(GetPathsFromBuildFolder(pagesPath, [], host, pagesPath));

  routes = routes.filter((el) => !excludedRoutes.includes(el.route));
  const sitemap: string = GetSitemapXml(routes);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return { props: {} };
};
