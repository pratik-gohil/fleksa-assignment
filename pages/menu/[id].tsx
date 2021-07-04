import dynamic from "next/dynamic";
import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import IndexStoreWrapper from "../../redux/store.redux";
import TemplateToShow from "../../templates/template-to-show.templates";
import { updateCategories, updateParts, updateSides } from "../../redux/slices/menu.slices.redux";
import PyApiHttpGetMenu from "../../http/pyapi/menu/get.menu.index.pyapi.http";
import { getServerSidePropsCommon } from "../../utils/page.utils";
import Cookies from "cookies";
import { COOKIE_SELECTED_MENU_ID } from "../../constants/keys-cookies.constants";

const MenuByIdPageTemplateOne = dynamic(import("../../templates/one/menu/menu-by-id.menu.one.templates"))

const templateList = [
  MenuByIdPageTemplateOne
]

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const { redirect, configuration } = await getServerSidePropsCommon(ctx, false)
    if (redirect) return redirect

    const cookies = new Cookies(ctx.req, ctx.res)
    cookies.set(COOKIE_SELECTED_MENU_ID, ctx.query.id as string, {
      httpOnly: true,
      maxAge: 365*24*60*60*1000,
      sameSite: "strict"
    })

    const shopId = Number(ctx.query.id)

    if (isNaN(shopId)) throw new Error("Shop id not found")
    const responseMenu = await new PyApiHttpGetMenu(configuration).get({ shopId })
    ctx.store.dispatch(updateCategories(responseMenu?.categories))
    ctx.store.dispatch(updateSides(responseMenu?.sides))
    ctx.store.dispatch(updateParts(responseMenu?.parts))

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer', 'add-address'])),
        templateNumber: 0,
      },
    }
  } catch (error) {
    throw error
  }
})

function Menu({ templateNumber }: any) {
  return <TemplateToShow templateList={templateList} templateNumber={templateNumber} />
}

export default Menu