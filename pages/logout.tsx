import React from "react";
import Cookies from "cookies";
import IndexStoreWrapper from "../redux/store.redux";
import { logout } from "../utils/logout";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import TemplateToShow from "../templates/template-to-show.templates";
import { FunctionComponent } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppDispatch } from "../redux/hooks.redux";
import { updateClearCart } from "../redux/slices/cart.slices.redux";

const Template: FunctionComponent = () => <></>

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async ctx => {
  try {
    const cookies = new Cookies(ctx.req, ctx.res)
    await logout(ctx, cookies)
    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer'])),
        templateNumber: 0
      }
    }
  } catch (error) {
    throw error
  }
})

function Logout({ templateNumber }: any) {
  const router = useRouter()
  const dispach = useAppDispatch()

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispach(updateClearCart())
      setTimeout(() => {
        router.push("/")
      }, 300);
    }
  }, [ router ])

  return <TemplateToShow templateList={[Template]} templateNumber={templateNumber} pageContainer={{ showFooter: false }} />
}

export default Logout