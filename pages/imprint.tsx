import dynamic from 'next/dynamic';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import IndexStoreWrapper from '../redux/store.redux';
import TemplateToShow from '../templates/template-to-show.templates';
import { getServerSidePropsCommon } from '../utils/page.utils';

const ImprintPageTemplateOne = dynamic(import('../templates/one/imprint.one.templates'));

const templateList = [ImprintPageTemplateOne];

export const getServerSideProps = IndexStoreWrapper.getStaticProps(async (ctx) => {
  try {
    const { redirect, responseIndex } = await getServerSidePropsCommon(ctx, false);
    if (redirect) return redirect;

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer', 'page-imprint', 'login'])),
        templateNumber: 0,
        meta: responseIndex?.meta,
      },
    };
  } catch (error) {
    console.error(error);
  }
});

function Terms({ templateNumber, meta }: any) {
  return <TemplateToShow meta={meta} templateList={templateList} templateNumber={templateNumber} />;
}

export default Terms;
