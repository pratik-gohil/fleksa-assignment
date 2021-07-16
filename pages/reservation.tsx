import dynamic from 'next/dynamic';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import IndexStoreWrapper from '../redux/store.redux';
import TemplateToShow from '../templates/template-to-show.templates';
import { getServerSidePropsCommon } from '../utils/page.utils';

const ReservationPageTemplateOne = dynamic(import('../templates/one/reservation.one.templates'));

const templateList = [ReservationPageTemplateOne];

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async (ctx) => {
  try {
    const { redirect, responseIndex } = await getServerSidePropsCommon(ctx, false);
    if (redirect) return redirect;

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer', 'reservation', 'login'])),
        templateNumber: 0,
        meta: responseIndex?.meta,
      },
    };
  } catch (error) {
    console.error(error);
  }
});

function Reservation({ templateNumber, meta }: any) {
  return <TemplateToShow meta={meta} templateList={templateList} templateNumber={templateNumber} pageContainer={{ showFooter: true }} />;
}

export default Reservation;
