import dynamic from "next/dynamic";
import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HttpGetIndex from "../http/index/get.index.http";
import { updateAddress, updateShop } from "../redux/slices/index.slices.redux";
import IndexStoreWrapper from "../redux/store.redux";
import TemplateToShow from "../templates/template-to-show.templates";
import { updateLanguage } from "../redux/slices/configuration.slices.redux";
import HttpGetMenu from "../http/menu/menu.index.http";
import { updateCategories, updateParts, updateSides } from "../redux/slices/menu.slices.redux";

const MenuPageTemplateOne = dynamic(import("../templates/one/menu.one.templates"))

const templateList = [
  MenuPageTemplateOne
]

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const responseIndex = await new HttpGetIndex().get()

    // If shop id is not available throw error
    if (!responseIndex?.shop.id) throw new Error("Shop id not found")

    const responseMenu = await new HttpGetMenu().get({ shopId: responseIndex?.shop.id })
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
        responseMenu: await new HttpGetMenu().get({ shopId: responseIndex?.shop.id })
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