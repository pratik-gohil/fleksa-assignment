import dynamic from 'next/dynamic';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import IndexStoreWrapper from '../redux/store.redux';
import TemplateToShow from '../templates/template-to-show.templates';
import { getServerSidePropsCommon } from '../utils/page.utils';

const TermsPageTemplateOne = dynamic(import('../templates/one/terms.one.templates'));

const templateList = [TermsPageTemplateOne];

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async (ctx) => {
  try {
    const { redirect } = await getServerSidePropsCommon(ctx, false);
    if (redirect) return redirect;

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer', 'page-terms'])),
        templateNumber: 0,
      },
    };
  } catch (error) {
    console.error(error);
  }
});

function Terms({ templateNumber }: any) {
  return <TemplateToShow templateList={templateList} templateNumber={templateNumber} />;
}

export default Terms;
