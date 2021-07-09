import Cookies from "cookies";
import { COOKIE_BEARER_TOKEN, COOKIE_SELECTED_MENU_ID } from "../constants/keys-cookies.constants";
import { updateBearerToken } from "../redux/slices/user.slices.redux";

async function logout(ctx: any, cookie: Cookies) {
  ctx.store.dispatch(updateBearerToken(null))
  cookie.set(COOKIE_BEARER_TOKEN, undefined)
  cookie.set(COOKIE_SELECTED_MENU_ID, undefined)
}

export {
  logout
}