import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log('============= ', ctx.req.headers.host, ' ============= ');

  const fields = [
    {
      loc: ctx.req.headers?.host || '', // Absolute url
      lastmod: new Date().toISOString(),
    },
  ];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
