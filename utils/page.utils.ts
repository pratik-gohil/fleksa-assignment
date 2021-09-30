import Cookies from 'cookies';
import {
  IConfiguration,
  updateConfiguration,
  updateLanguage,
  updateSelectedMenu,
  updateSelectedMenuUrlpath,
} from '../redux/slices/configuration.slices.redux';
import {
  COOKIE_BEARER_TOKEN,
  COOKIE_SELECTED_MENU_ID,
  COOKIE_SELECTED_MENU_URLPATH,
  COOKIE_SELECTED_RESTAURANT_DOMAIN,
} from '../constants/keys-cookies.constants';
import {
  updateBearerToken,
  updateCustomer,
  updateCustomerCurrentOrder,
  updateCustomerOrderHistory,
  updateLoadAddressesList,
} from '../redux/slices/user.slices.redux';
import PyApiHttpGetIndex from '../http/pyapi/index/get.index.pyapi.http';
import PyApiHttpGetSEO from '../http/pyapi/seo/get.seo.pyapi.http';
import { updateIndex } from '../redux/slices/index.slices.redux';
import NodeApiHttpGetUser from '../http/nodeapi/user/get.user.nodeapi.http';
import NodeApiHttpGetUserOrderHistory from '../http/nodeapi/account/get.account.order-history.nodeapi.http';
import NodeApiHttpGetUserParticularOrder from '../http/nodeapi/account/get.order-view-by-id.nodeapi.http';
import NodeApiHttpGetUserAllAddress from '../http/nodeapi/account/get.account.all-address.nodeapi.http';
import { updateSeoTagJson } from '../redux/slices/common.slices.redux';

const multiRestaurantHosts = ['127.0.0.1:3000', 'localhost:3000', 'newqa.fleksa.de', 'localhost:3214', '192.168.1.14:3000'];

const localMode = true;

const testingHosts = [
  'roma.fleksa.com',
  'nidda.fleksa.com',
  'spiceofindia.fleksa.com',
  'bockenheim.fleksa.com',
  'crazypizza.fleksa.com',
  'foodworld.fleksa.com',
  'asiadinhau.fleksa.com',
  'maincurry.fleksa.com',
  'smartpizzas.fleksa.com',
];

export async function getServerSidePropsCommon(
  ctx: any,
  requiresLogin: boolean,
  options?: {
    orderHistory?: boolean;
    particularOrder?: boolean;
    getAllAddress?: boolean;
  },
) {
  try {
    const cookies = new Cookies(ctx.req, ctx.res);

    const bearerToken = await cookies.get(COOKIE_BEARER_TOKEN);
    const restaurantDomain = await cookies.get(COOKIE_SELECTED_RESTAURANT_DOMAIN);
    const selectedMenu = await cookies.get(COOKIE_SELECTED_MENU_ID);
    const selectedUrlPath = await cookies?.get(COOKIE_SELECTED_MENU_URLPATH);

    /**
     * If hostname is localhost:3000 or newqa.felksa.de use the restaurant name given by the cookie otherwise use the actual host.
     * If above constraints are met but no restaurant name found in cookie, use roma.fleksa.com
     * If restauant name includes ".fleksa." it will use production API's otherwise use testing API's
     */
    const isMultiRestaurantHost = multiRestaurantHosts.includes(ctx.req.headers.host);
    const host: string = isMultiRestaurantHost ? restaurantDomain || 'roma.fleksa.com' : ctx.req.headers.host;
    const testHost = testingHosts.includes(host);

    // ? Setting base url of api services
    const baseUrlPyApi = testHost ? 'https://myqa.fleksa.com' : 'https://my.fleksa.com';
    const baseUrlNodeApi = testHost ? (localMode ? 'http://localhost:4000' : 'https://apiqa.fleksa.com') : 'https://api.fleksa.com';

    const configuration: IConfiguration = {
      host,
      baseUrlPyApi,
      baseUrlNodeApi,
    };
    await ctx.store.dispatch(updateConfiguration(configuration));
    await ctx.store.dispatch(updateLanguage((ctx as any).locale));
    await ctx.store.dispatch(updateBearerToken(bearerToken || null));

    if (!selectedMenu && ctx.req.url === '/checkout') {
      return {
        redirect: {
          redirect: {
            permanent: false,
            destination: '/menu',
          },
        },
        configuration,
      };
    }

    const responseIndex = await new PyApiHttpGetIndex(configuration).get();
    if (!responseIndex?.shop.id) throw new Error('Shop id not found');

    // ??get seo tags
    const responseSEO = await new PyApiHttpGetSEO(configuration).get(responseIndex?.shop.id, ctx.req.url);

    if (responseSEO) await ctx.store.dispatch(updateSeoTagJson(responseSEO?.shop.seo_tags_json));

    /**
     * Update current restarurnat menu id and url if it's not present
     */
    // ? Default one
    if (!selectedMenu) await ctx.store.dispatch(updateSelectedMenu(responseIndex.shop.id));
    // ? already selected one
    else await ctx.store.dispatch(updateSelectedMenu(+selectedMenu));

    // ? Default one
    if (!selectedUrlPath) await ctx.store.dispatch(updateSelectedMenuUrlpath(responseIndex.shop.urlpath));
    // ? already selected one
    else await ctx.store.dispatch(updateSelectedMenuUrlpath(selectedUrlPath));

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
      // * Make page addition request if it's needed

      const userData = await new NodeApiHttpGetUser(configuration, bearerToken).get({});

      // ?? Update basic login information of user
      await ctx.store.dispatch(updateCustomer(userData?.data.customer));

      // TODO: Request order order history page
      if (options?.orderHistory) {
        const orderHistory = await new NodeApiHttpGetUserOrderHistory(configuration, bearerToken).get({ shop_id: responseIndex?.shop.id });

        if (orderHistory?.result)
          await ctx.store.dispatch(updateCustomerOrderHistory(orderHistory.data.orders?.sort((a, b) => b.id - a.id)));
        else await ctx.store.dispatch(updateCustomerOrderHistory([]));
      }

      // TODO: Request for particular order page
      if (options?.particularOrder) {
        const particularOrder = await new NodeApiHttpGetUserParticularOrder(configuration, bearerToken).get({
          order_id: ctx.query.id,
        });
        await ctx.store.dispatch(updateCustomerCurrentOrder(particularOrder?.data?.order));
      }

      // TODO: Request for all address order page
      if (options?.getAllAddress) {
        const response = await new NodeApiHttpGetUserAllAddress(configuration, bearerToken).get({});
        await ctx.store.dispatch(updateLoadAddressesList(response?.data.customer_address ?? []));
      }
    }

    await ctx.store.dispatch(updateIndex(responseIndex));

    return {
      cookies,
      bearerToken,
      responseIndex,
      configuration,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
