import dynamic from "next/dynamic";
import React from "react";
import Cookies from "cookies";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PyApiHttpGetIndex from "../http/pyapi/index/get.index.pyapi.http";
import { updateAddress, updateShop } from "../redux/slices/index.slices.redux";
import IndexStoreWrapper from "../redux/store.redux";
import TemplateToShow from "../templates/template-to-show.templates";
import { updateLanguage } from "../redux/slices/configuration.slices.redux";
import { COOKIE_BEARER_TOKEN } from "../constants/keys-cookies.constants";
import { updateBearerToken } from "../redux/slices/user.slices.redux";

const LoginPageTemplateOne = dynamic(import("../templates/one/login.one.templates"))

const templateList = [
  LoginPageTemplateOne
]

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const cookies = new Cookies(ctx.req, ctx.res)
    const bearerToken = cookies.get(COOKIE_BEARER_TOKEN)
    if (bearerToken) await ctx.store.dispatch(updateBearerToken(bearerToken))

    const response = await new PyApiHttpGetIndex().get()
    await ctx.store.dispatch(updateLanguage((ctx as any).locale))
    await ctx.store.dispatch(updateAddress(response?.address))
    await ctx.store.dispatch(updateShop(response?.shop))

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer', 'page-index'])),
        templateNumber: 0
      },
    }
  } catch (error) {
    console.error(error)
  }
})

function Login({ templateNumber }: any) {
  return <TemplateToShow templateList={templateList} templateNumber={templateNumber} pageContainer={{ showFooter: false }} />
}

export default Login