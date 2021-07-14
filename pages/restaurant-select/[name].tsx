import React from "react";
import Cookies from "cookies";
import IndexStoreWrapper from "../../redux/store.redux";
import { COOKIE_SELECTED_RESTAURANT_DOMAIN } from "../../constants/keys-cookies.constants";

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const cookies = new Cookies(ctx.req, ctx.res)
    cookies.set(COOKIE_SELECTED_RESTAURANT_DOMAIN, ctx.query.name as string, {
      path: "/",
      httpOnly: false,
      maxAge: 365*24*60*60*1000,
      sameSite: "lax"
    })

    return {
      redirect: {
        permanent: false,
        destination: "/logout",
      }
    }
  } catch (error) {
    throw error
  }
})

function RestaurantSelectName({ }: any) {
  return <></>
}

export default RestaurantSelectName