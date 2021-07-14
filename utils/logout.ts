import Cookies from "cookies";
import { COOKIE_BEARER_TOKEN, COOKIE_SELECTED_MENU_ID, COOKIE_SELECTED_MENU_URLPATH } from "../constants/keys-cookies.constants";
import { updateBearerToken } from "../redux/slices/user.slices.redux";

async function logout(ctx: any, cookie: Cookies) {
  ctx.store.dispatch(updateBearerToken(null))
  cookie.set(COOKIE_BEARER_TOKEN, undefined, {
    sameSite: "lax"
  })
  cookie.set(COOKIE_SELECTED_MENU_ID, undefined, {
    sameSite: "lax"
  })
  cookie.set(COOKIE_SELECTED_MENU_URLPATH, undefined, {
    sameSite: "lax"
  })
}

export {
  logout
}