import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HttpGetIndex from "../http/index/get.index.http";
import { updateAddress, updateImages, updateProducts, updateReviews, updateShop } from "../redux/slices/index.slices.redux";
import IndexStoreWrapper from "../redux/store.redux";
import IndexPageTemplateOne from "../templates/one/index.one.templates";
import TemplateToShow from "../templates/template-to-show.templates";
import { updateLanguage } from "../redux/slices/configuration.slices.redux";

const PageContainer = dynamic(import("../components/templateOne/common/page-container.commom.templateOne.components"))

const templateList = [
  PageContainer
]

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const response = await new HttpGetIndex().get()

    await ctx.store.dispatch(updateLanguage((ctx as any).locale))
    await ctx.store.dispatch(updateAddress(response?.address))
    await ctx.store.dispatch(updateShop(response?.shop))
    await ctx.store.dispatch(updateProducts(response?.products))
    await ctx.store.dispatch(updateReviews(response?.reviews))
    await ctx.store.dispatch(updateImages(response?.images))

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

function Menu({ templateNumber }: any) {
  return <TemplateToShow templateList={templateList} templateNumber={templateNumber}>
    <IndexPageTemplateOne />
  </TemplateToShow>
}

export default Menu