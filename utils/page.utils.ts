import Cookies from 'cookies';
import { IConfiguration, updateConfiguration, updateLanguage, updateSelectedMenu } from '../redux/slices/configuration.slices.redux';
import { COOKIE_BEARER_TOKEN, COOKIE_SELECTED_MENU_ID, COOKIE_SELECTED_RESTAURANT_DOMAIN } from '../constants/keys-cookies.constants';
import { updateBearerToken, updateCustomer } from '../redux/slices/user.slices.redux';
import PyApiHttpGetIndex from '../http/pyapi/index/get.index.pyapi.http';
import { updateIndex } from '../redux/slices/index.slices.redux';
import NodeApiHttpGetUser from '../http/nodeapi/user/get.user.nodeapi.http';
import NodeApiHttpGetUserOrderHistory from '../http/nodeapi/account/get.account.order-history.nodeapi.http';
import NodeApiHttpGetUserParticularOrder from '../http/nodeapi/account/get.order-view-by-id.nodeapi.http';
import NodeApiHttpGetUserAllAddress from '../http/nodeapi/account/get.account.all-address.nodeapi.http';

const multiRestaurantHosts = [
  '127.0.0.1:3000',
  'localhost:3000',
  'newqa.fleksa.de',
  'localhost:3214',
  '192.168.43.24:3000'
];

const testingHosts = [
  'roma.fleksa.com',
  'nidda.fleksa.com',
  'spiceofindia.fleksa.com',
  'bockenheim.fleksa.com',
  'crazypizza.fleksa.com',
  'foodworld.fleksa.com',
  'asiadinhau.fleksa.com',
  'maincurry.fleksa.com',
]

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
    const bearerToken = cookies.get(COOKIE_BEARER_TOKEN);
    const restaurantDomain = cookies.get(COOKIE_SELECTED_RESTAURANT_DOMAIN);
    const selectedMenu = cookies.get(COOKIE_SELECTED_MENU_ID);
    ctx.store.dispatch(updateSelectedMenu(selectedMenu || null));

    /**
     * If hostname is localhost:3000 or newqa.felksa.de use the restaurant name given by the cookie otherwise use the actual host.
     * If above constraints are met but no restaurant name found in cookie, use roma.fleksa.com
     * If restauant name includes ".fleksa." it will use production API's otherwise use testing API's
     */
    const isMultiRestaurantHost = multiRestaurantHosts.includes(ctx.req.headers.host)
    console.log("isMultiRestaurantHost", isMultiRestaurantHost, ctx.req.headers.host)
    const host: string = isMultiRestaurantHost ? restaurantDomain || 'roma.fleksa.com' : ctx.req.headers.host;
    console.log("isMultiRestaurantHost host", host)
    const testHost = testingHosts.includes(host)
    console.log("isMultiRestaurantHost test host", testHost)
    const baseUrlPyApi = testHost ? 'https://myqa.fleksa.com' : 'https://my.fleksa.com';
    console.log("isMultiRestaurantHost host baseUrlPyApi", baseUrlPyApi)
    const baseUrlNodeApi = testHost ? 'https://orderqa.fleksa.com' : 'https://order.fleksa.com';

    ctx.store.dispatch(updateLanguage((ctx as any).locale));
    const configuration: IConfiguration = {
      host,
      baseUrlPyApi,
      baseUrlNodeApi,
    };
    ctx.store.dispatch(updateConfiguration(configuration));

    const responseIndex = await new PyApiHttpGetIndex(configuration).get();
    if (!responseIndex?.shop.id) throw new Error('Shop id not found');

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

      // * Make page addition request if it's needed

      // TODO: Request order order history page
      if (options?.orderHistory && bearerToken) {
        const orderHistory = await new NodeApiHttpGetUserOrderHistory(configuration, bearerToken).get({ shop_id: responseIndex?.shop.id });

        if (orderHistory?.result) {
          ctx.store.dispatch(updateCustomer({ ...userData?.data.customer, orders: orderHistory.data.orders?.sort((a, b) => b.id - a.id) }));
        } else ctx.store.dispatch(updateCustomer({ ...userData?.data.customer, orders: [] }));
      }

      // TODO: Request for particular order page
      if (options?.particularOrder && bearerToken) {
        const particularOrder = await new NodeApiHttpGetUserParticularOrder(configuration, bearerToken).get({
          order_id: ctx.query.id,
        });
        ctx.store.dispatch(updateCustomer({ ...userData?.data.customer, current_order: particularOrder?.data.order }));
      }

      // TODO: Request for all address order page
      if (options?.getAllAddress && bearerToken) {
        const response = await new NodeApiHttpGetUserAllAddress(configuration, bearerToken).get({});
        ctx.store.dispatch(updateCustomer({ ...userData?.data.customer, all_address: response?.data.customer_address }));
      }
    }

    ctx.store.dispatch(updateIndex(responseIndex));

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
