import React from "react";
import Cookies from "cookies";
import IndexStoreWrapper from "../redux/store.redux";
import { logout } from "../utils/logout";


export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const cookies = new Cookies(ctx.req, ctx.res)
    await logout(ctx, cookies)

    return {
      redirect: {
        permanent: false,
        destination: "/",
      }
    }
  } catch (error) {
    throw error
  }
})

function Logout({ }: any) {
  return <></>
}

export default Logout