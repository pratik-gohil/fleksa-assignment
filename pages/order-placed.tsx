import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import IndexStoreWrapper from "../redux/store.redux";
import TemplateToShow from "../templates/template-to-show.templates";
import { getServerSidePropsCommon } from "../utils/page.utils";
import { useRouter } from "next/dist/client/router";
import { useAppDispatch } from "../redux/hooks.redux";
import { updateClearCart } from "../redux/slices/cart.slices.redux";

const OrderPlacedPageTemplateOne = dynamic(import("../templates/one/order-placed.one.templates"))

const templateList = [
  OrderPlacedPageTemplateOne
]

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const { redirect } = await getServerSidePropsCommon(ctx, true)
    if (redirect) return redirect

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

function Checkout({ templateNumber }: any) {
  const router = useRouter()
  const dispach = useAppDispatch()

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispach(updateClearCart())
    }
  }, [ router ])
  return <TemplateToShow  templateList={templateList} templateNumber={templateNumber} pageContainer={{ showFooter: false }} />
}

export default Checkout