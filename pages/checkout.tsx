import dynamic from 'next/dynamic';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import IndexStoreWrapper from '../redux/store.redux';
import TemplateToShow from '../templates/template-to-show.templates';
import { getServerSidePropsCommon } from '../utils/page.utils';

const CheckoutPageTemplateOne = dynamic(import('../templates/one/checkout.one.templates'));

const templateList = [CheckoutPageTemplateOne];

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async (ctx) => {
  try {
    const requiresLogin = false;
    const { redirect, responseIndex } = await getServerSidePropsCommon(ctx, requiresLogin, {
      orderHistory: true,
      getAllAddress: true,
    });

    if (redirect) return redirect;

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, [
          'header',
          'footer',
          'add-address',
          'login',
          'page-checkout',
          'page-menu-id',
          'common-ordertype',
        ])),
        templateNumber: 0,
        meta: responseIndex?.meta,
      },
    };
  } catch (error) {
    throw error;
  }
});

function Checkout({ templateNumber, meta }: any) {
  return <TemplateToShow meta={meta} templateList={templateList} templateNumber={templateNumber} />;
}

export default Checkout;
