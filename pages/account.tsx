import dynamic from "next/dynamic"
import React from "react"
import Cookies from "cookies"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PyApiHttpGetIndex from "../http/pyapi/index/get.index.pyapi.http"
import { updateAddress, updateShop } from "../redux/slices/index.slices.redux"
import IndexStoreWrapper from "../redux/store.redux"
import TemplateToShow from "../templates/template-to-show.templates"
import { updateLanguage } from "../redux/slices/configuration.slices.redux"
import { COOKIE_BEARER_TOKEN } from "../constants/keys-cookies.constants"
import { updateBearerToken, updateCustomer } from "../redux/slices/user.slices.redux"
import NodeApiHttpGetUser from "../http/nodeapi/user/get.user.nodeapi.http"

const AccountPageTemplateOne = dynamic(import("../templates/one/account.one.templates"))

const templateList = [
  AccountPageTemplateOne
]

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const cookies = new Cookies(ctx.req, ctx.res)
    const bearerToken = cookies.get(COOKIE_BEARER_TOKEN)
    if (bearerToken) {
      ctx.store.dispatch(updateBearerToken(bearerToken))
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      }
    }

    const response = await new PyApiHttpGetIndex().get()
    ctx.store.dispatch(updateLanguage((ctx as any).locale))
    ctx.store.dispatch(updateAddress(response?.address))
    ctx.store.dispatch(updateShop(response?.shop))

    const userData = await new NodeApiHttpGetUser(bearerToken).get({ })
    ctx.store.dispatch(updateCustomer(userData?.data.customer))

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer'])),
        templateNumber: 0
      },
    }
  } catch (error) {
    console.error(error)
  }
})

function Account({ templateNumber }: any) {
  return <TemplateToShow templateList={templateList} templateNumber={templateNumber} />
}

export default Account
