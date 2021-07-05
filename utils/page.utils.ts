import Cookies from 'cookies';
import { IConfiguration, updateConfiguration, updateLanguage } from '../redux/slices/configuration.slices.redux';
import { COOKIE_BEARER_TOKEN, COOKIE_SELECTED_RESTAURANT_NAME } from '../constants/keys-cookies.constants';
import { updateBearerToken, updateCustomer } from '../redux/slices/user.slices.redux';
import PyApiHttpGetIndex from '../http/pyapi/index/get.index.pyapi.http';
import { updateAddress, updateShop, updateTimings } from '../redux/slices/index.slices.redux';
import NodeApiHttpGetUser from '../http/nodeapi/user/get.user.nodeapi.http';

export async function getServerSidePropsCommon(ctx: any, requiresLogin: boolean) {
  try {
    const cookies = new Cookies(ctx.req, ctx.res);
    const bearerToken = cookies.get(COOKIE_BEARER_TOKEN);
    const restaurantName = cookies.get(COOKIE_SELECTED_RESTAURANT_NAME);

    console.log("host headers", ctx.req.headers, ctx.req.headers.host)

    /**
     * If hostname is localhost:3000 or newqa.felksa.de use the restaurant name given by the cookie otherwise use the actual host.
     * If above constraints are met but no restaurant name found in cookie, use roma.fleksa.com
     * If restauant name includes ".fleksa." it will use production API's otherwise use testing API's
     */
    const host: string = ctx.req.headers.host === 'localhost:3000' || 'newqa.fleksa.de' ? restaurantName || 'roma.fleksa.com' : ctx.req.headers.host;
    const baseUrlPyApi = host.includes('.fleksa.') ? 'https://myqa.fleksa.com' : 'https://my.fleksa.com';
    const baseUrlNodeApi = host.includes('.fleksa.') ? 'https://orderqa.fleksa.com' : 'https://order.fleksa.com';

    ctx.store.dispatch(updateLanguage((ctx as any).locale));
    const configuration: IConfiguration = {
      host,
      baseUrlPyApi,
      baseUrlNodeApi,
    };
    ctx.store.dispatch(updateConfiguration(configuration));

    /**
     * If page requires login but bearer token is not present
     * rediect to login page
     *
     * If login is not required but bearer token is present,
     * save the bearer token in store
     */
    if (requiresLogin && !bearerToken) {
      return {
        redirect: {
          redirect: {
            permanent: false,
            destination: '/login',
          },
        },
        configuration,
      };
    } else if (bearerToken) {
      ctx.store.dispatch(updateBearerToken(bearerToken));
      const userData = await new NodeApiHttpGetUser(configuration, bearerToken).get({});
      ctx.store.dispatch(updateCustomer(userData?.data.customer));
    }

    const responseIndex = await new PyApiHttpGetIndex(configuration).get();
    if (!responseIndex?.shop.id) throw new Error('Shop id not found');

    ctx.store.dispatch(updateAddress(responseIndex?.address));
    ctx.store.dispatch(updateShop(responseIndex?.shop));
    ctx.store.dispatch(updateTimings(responseIndex?.timings));

    return {
      bearerToken,
      responseIndex,
      configuration,
    };
  } catch (error) {
    throw error;
  }
}
