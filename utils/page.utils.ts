import Cookies from "cookies";
import { IConfiguration, updateConfiguration, updateLanguage } from "../redux/slices/configuration.slices.redux";
import { COOKIE_BEARER_TOKEN } from "../constants/keys-cookies.constants";
import { updateBearerToken } from "../redux/slices/user.slices.redux";
import PyApiHttpGetIndex from "../http/pyapi/index/get.index.pyapi.http";
import { updateAddress, updateShop } from "../redux/slices/index.slices.redux";

export async function getServerSidePropsCommon(ctx: any, requiresLogin: boolean) {
  try {
    const cookies = new Cookies(ctx.req, ctx.res)
    const bearerToken = cookies.get(COOKIE_BEARER_TOKEN)

    ctx.store.dispatch(updateLanguage((ctx as any).locale))
    const configuration: IConfiguration = {
      host: ctx.req.headers.host,
      baseUrlPyApi: 'https://myqa.fleksa.com',
      baseUrlNodeApi: 'https://orderqa.fleksa.com',
    }
    ctx.store.dispatch(updateConfiguration(configuration))

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
            destination: "/login",
          }
        },
        configuration,
      }
    } else if (bearerToken) {
      ctx.store.dispatch(updateBearerToken(bearerToken))
    }

    const responseIndex = await new PyApiHttpGetIndex(configuration).get()
    if (!responseIndex?.shop.id) throw new Error("Shop id not found")
    
    ctx.store.dispatch(updateAddress(responseIndex?.address))
    ctx.store.dispatch(updateShop(responseIndex?.shop))

    return {
      bearerToken,
      responseIndex,
      configuration,
    }
  } catch (error) {
    throw error
  }
}