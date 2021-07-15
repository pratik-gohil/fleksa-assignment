import NodeApiHttpGetManifest from '../../http/nodeapi/manifest/get.manifest.nodeapi.http';
import IndexStoreWrapper from '../../redux/store.redux';
import { getServerSidePropsCommon } from '../../utils/page.utils';

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async (ctx) => {
  try {
    const { redirect, configuration, responseIndex } = await getServerSidePropsCommon(ctx, false);
    if (redirect) return redirect;

    if (!responseIndex?.shop.id) {
      return {
        err: {
          statusCode: 404
        }
      }
    }

    const manifest = await new NodeApiHttpGetManifest(configuration).get({
      shopId: responseIndex?.shop.id
    })

    ctx.res.setHeader('Content-Type', 'text/json')
    ctx.res.write(JSON.stringify(manifest));
    ctx.res.end();

    return { };
  } catch (error) {
    console.error(error);
  }
});

function Reservation({ }: any) {
  return <></>
}

export default Reservation;
