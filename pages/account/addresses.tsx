import dynamic from 'next/dynamic';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import IndexStoreWrapper from '../../redux/store.redux';
import TemplateToShow from '../../templates/template-to-show.templates';
import { getServerSidePropsCommon } from '../../utils/page.utils';

const AccountAddressesPageTemplateOne = dynamic(import('../../templates/one/account/addresses.one.templates'));

const templateList = [AccountAddressesPageTemplateOne];

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async (ctx) => {
  try {
    const { redirect } = await getServerSidePropsCommon(ctx, true, {
      getAllAddress: true,
    });
    if (redirect) return redirect;

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer'])),
        templateNumber: 0,
      },
    };
  } catch (error) {
    console.error(error);
  }
});

function Account({ templateNumber }: any) {
  return (
    <TemplateToShow
      templateList={templateList}
      templateNumber={templateNumber}
      pageContainer={{
        showFooter: false,
      }}
    />
  );
}

export default Account;
