import dynamic from "next/dynamic";
import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import IndexStoreWrapper from "../redux/store.redux";
import TemplateToShow from "../templates/template-to-show.templates";
import { getServerSidePropsCommon } from "../utils/page.utils";
import { updateSiblings } from "../redux/slices/index.slices.redux";

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

    ctx.store.dispatch(updateSiblings(responseIndex?.siblings))
    
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
  return <TemplateToShow templateList={templateList} templateNumber={templateNumber} pageContainer={{ showFooter: false }} />
}

export default Menu