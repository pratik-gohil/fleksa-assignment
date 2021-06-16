import dynamic from "next/dynamic";
import React from "react";
import Cookies from "cookies";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PyApiHttpGetIndex from "../http/pyapi/index/get.index.pyapi.http";
import { updateAddress, updateShop } from "../redux/slices/index.slices.redux";
import IndexStoreWrapper from "../redux/store.redux";
import TemplateToShow from "../templates/template-to-show.templates";
import { updateLanguage } from "../redux/slices/configuration.slices.redux";
import { updateCategories, updateParts, updateSides } from "../redux/slices/menu.slices.redux";
import PyApiHttpGetMenu from "../http/pyapi/menu/get.menu.index.pyapi.http";
import { COOKIE_BEARER_TOKEN } from "../constants/keys-cookies.constants";
import { updateBearerToken } from "../redux/slices/user.slices.redux";

const MenuPageTemplateOne = dynamic(import("../templates/one/menu.one.templates"))

const templateList = [
  MenuPageTemplateOne
]

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const cookies = new Cookies(ctx.req, ctx.res)
    const bearerToken = cookies.get(COOKIE_BEARER_TOKEN)
    if (bearerToken) await ctx.store.dispatch(updateBearerToken(bearerToken))

    const responseIndex = await new PyApiHttpGetIndex().get()

    // If shop id is not available throw error
    if (!responseIndex?.shop.id) throw new Error("Shop id not found")

    const responseMenu = await new PyApiHttpGetMenu().get({ shopId: responseIndex?.shop.id })
    await ctx.store.dispatch(updateCategories(responseMenu?.categories))
    await ctx.store.dispatch(updateSides(responseMenu?.sides))
    await ctx.store.dispatch(updateParts(responseMenu?.parts))

    await ctx.store.dispatch(updateLanguage((ctx as any).locale))
    await ctx.store.dispatch(updateAddress(responseIndex?.address))
    await ctx.store.dispatch(updateShop(responseIndex?.shop))

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer'])),
        templateNumber: 0,
        responseMenu: await new PyApiHttpGetMenu().get({ shopId: responseIndex?.shop.id })
      },
    }
  } catch (error) {
    throw error
  }
})

function Menu({
  templateNumber,
  // responseMenu
}: any) {
  // console.log(responseMenu)
  return <TemplateToShow templateList={templateList} templateNumber={templateNumber} />
}

export default Menu