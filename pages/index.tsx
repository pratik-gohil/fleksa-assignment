import dynamic from "next/dynamic";
import React from "react";
import HttpGetIndex from "../http/index/get.index.http";
import { updateAddress, updateProducts, updateShop } from "../redux/slices/index.slices.redux";
import IndexStoreWrapper from "../redux/store.redux";
import IndexPageTemplateOne from "../templates/one/index.one.templates";
import TemplateToShow from "../templates/template-to-show.templates";

const PageContainer = dynamic(import("../components/templateOne/common/page-container.commom.templateOne.components"))

const templateList = [
  PageContainer
]

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const response = await new HttpGetIndex().get()

    console.log(response)
    // console.log(JSON.stringify(response, null, 2))
    await ctx.store.dispatch(updateAddress(response?.address))
    await ctx.store.dispatch(updateShop(response?.shop))
    await ctx.store.dispatch(updateProducts(response?.products))

    return {
      props: {
        templateNumber: 0
      },
    }
  } catch (error) {
    console.error(error)
  }
})

function Home({ templateNumber }: any) {
  return <TemplateToShow templateList={templateList} templateNumber={templateNumber}>
    <IndexPageTemplateOne />
  </TemplateToShow>
}

export default Home
