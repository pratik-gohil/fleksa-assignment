import dynamic from 'next/dynamic';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { updateProducts, updateReviews } from '../redux/slices/index.slices.redux';
import IndexStoreWrapper from '../redux/store.redux';
import TemplateToShow from '../templates/template-to-show.templates';
import { getServerSidePropsCommon } from '../utils/page.utils';

const IndexPageTemplateOne = dynamic(import('../templates/one/index.one.templates'));

const templateList = [IndexPageTemplateOne];

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async (ctx) => {
  try {
    const { redirect, responseIndex } = await getServerSidePropsCommon(ctx, false);
    if (redirect) return redirect;

    ctx.store.dispatch(updateProducts(responseIndex?.products));
    ctx.store.dispatch(updateReviews(responseIndex?.reviews));

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer', 'page-index', 'login'])),
        templateNumber: 0,
        meta: responseIndex?.meta,
      },
    };
  } catch (error) {
    console.error(error);
  }
});

function Home({ templateNumber, meta }: any) {
  return <TemplateToShow meta={meta} templateList={templateList} templateNumber={templateNumber} />;
}

export default Home;
