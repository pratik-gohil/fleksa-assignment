import dynamic from 'next/dynamic';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import IndexStoreWrapper from '../redux/store.redux';
import TemplateToShow from '../templates/template-to-show.templates';
import { getServerSidePropsCommon } from '../utils/page.utils';
import NodeApiHttpGetUserAllAddress from '../http/nodeapi/account/get.account.all-address.nodeapi.http';
import { updateLoadAddressesList } from '../redux/slices/user.slices.redux';
import { COOKIE_SELECTED_MENU_ID, COOKIE_SELECTED_MENU_URLPATH } from '../constants/keys-cookies.constants';
import { updateSelectedMenu, updateSelectedMenuUrlpath } from '../redux/slices/configuration.slices.redux';

const CheckoutPageTemplateOne = dynamic(import('../templates/one/checkout.one.templates'));

const templateList = [CheckoutPageTemplateOne];

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async (ctx) => {
  try {
    const { redirect, configuration, bearerToken, responseIndex, cookies } = await getServerSidePropsCommon(ctx, true);
    if (redirect) return redirect;

    ctx.store.dispatch(updateSelectedMenu(cookies?.get(COOKIE_SELECTED_MENU_ID)));
    ctx.store.dispatch(updateSelectedMenuUrlpath(cookies?.get(COOKIE_SELECTED_MENU_URLPATH)))

    const addressResponse = await new NodeApiHttpGetUserAllAddress(configuration, bearerToken).get({})
    ctx.store.dispatch(updateLoadAddressesList(addressResponse?.data.customer_address))

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer', 'add-address'])),
        templateNumber: 0,
        meta: responseIndex?.meta
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
