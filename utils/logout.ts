import Cookies from "cookies";
import { COOKIE_BEARER_TOKEN } from "../constants/keys-cookies.constants";
import { updateBearerToken } from "../redux/slices/user.slices.redux";

async function logout(ctx: any, cookie: Cookies) {
  ctx.store.dispatch(updateBearerToken(null))
  cookie.set(COOKIE_BEARER_TOKEN, undefined)
}

export {
  logout
}