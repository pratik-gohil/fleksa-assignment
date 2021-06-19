import dynamic from "next/dynamic";
import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import IndexStoreWrapper from "../redux/store.redux";
import TemplateToShow from "../templates/template-to-show.templates";
import { updateCategories, updateParts, updateSides } from "../redux/slices/menu.slices.redux";
import PyApiHttpGetMenu from "../http/pyapi/menu/get.menu.index.pyapi.http";
import { getServerSidePropsCommon } from "../utils/page.utils";

const MenuPageTemplateOne = dynamic(import("../templates/one/menu.one.templates"))

const templateList = [
  MenuPageTemplateOne
]

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const { redirect, responseIndex, configuration } = await getServerSidePropsCommon(ctx, false)
    if (redirect) return redirect

    if (!responseIndex?.shop.id) throw new Error("Shop id not found")
    const responseMenu = await new PyApiHttpGetMenu(configuration).get({ shopId: responseIndex?.shop.id })
    ctx.store.dispatch(updateCategories(responseMenu?.categories))
    ctx.store.dispatch(updateSides(responseMenu?.sides))
    ctx.store.dispatch(updateParts(responseMenu?.parts))

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer'])),
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