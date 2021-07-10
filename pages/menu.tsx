import dynamic from "next/dynamic";
import Cookies from "cookies";
import React, { useEffect } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import IndexStoreWrapper from "../redux/store.redux";
import TemplateToShow from "../templates/template-to-show.templates";
import { getServerSidePropsCommon } from "../utils/page.utils";
import { updateSiblings } from "../redux/slices/index.slices.redux";
import { updateClearCart } from "../redux/slices/cart.slices.redux";
import { updateClearCheckout } from "../redux/slices/checkout.slices.redux";
import { useAppDispatch } from "../redux/hooks.redux";
import { updateSelectedMenu } from "../redux/slices/configuration.slices.redux";
import { COOKIE_SELECTED_MENU_ID, COOKIE_SELECTED_MENU_URLPATH } from "../constants/keys-cookies.constants";

const MenuPageTemplateOne = dynamic(import("../templates/one/menu.one.templates"))

const templateList = [
  MenuPageTemplateOne
]

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const { redirect, responseIndex } = await getServerSidePropsCommon(ctx, false)
    if (redirect) return redirect

    if (responseIndex?.siblings.length === 0) {
      return {
        redirect: {
          permanent: false,
          destination: `/menu/${responseIndex?.shop.id}`,
        }
      }
    }

    const cookies = new Cookies(ctx.req, ctx.res)
    cookies.set(COOKIE_SELECTED_MENU_ID, undefined, {
      httpOnly: true,
      maxAge: 365*24*60*60*1000,
      sameSite: "strict"
    })
    cookies.set(COOKIE_SELECTED_MENU_URLPATH, undefined, {
      httpOnly: true,
      maxAge: 365*24*60*60*1000,
      sameSite: "strict"
    })
    ctx.store.dispatch(updateSelectedMenu(null))
    ctx.store.dispatch(updateSiblings(responseIndex?.siblings))

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer', 'add-address'])),
        templateNumber: 0,
        meta: responseIndex?.meta
      },
    }
  } catch (error) {
    throw error
  }
})

function Menu({ templateNumber, meta }: any) {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(updateClearCart())
      dispatch(updateClearCheckout())
    }
  }, [ ])

  return <TemplateToShow meta={meta} templateList={templateList} templateNumber={templateNumber} pageContainer={{ showFooter: false }} />
}

export default Menu
