import dynamic from "next/dynamic"
import React from "react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import IndexStoreWrapper from "../redux/store.redux"
import TemplateToShow from "../templates/template-to-show.templates"
import { updateCustomer } from "../redux/slices/user.slices.redux"
import NodeApiHttpGetUser from "../http/nodeapi/user/get.user.nodeapi.http"
import { getServerSidePropsCommon } from "../utils/page.utils"

const AccountPageTemplateOne = dynamic(import("../templates/one/account.one.templates"))

const templateList = [
  AccountPageTemplateOne
]

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const { bearerToken, redirect, configuration } = await getServerSidePropsCommon(ctx, true)
    if (redirect) return redirect

    const userData = await new NodeApiHttpGetUser(configuration, bearerToken).get({ })
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
