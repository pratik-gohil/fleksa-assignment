import dynamic from 'next/dynamic';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import IndexStoreWrapper from '../redux/store.redux';
import TemplateToShow from '../templates/template-to-show.templates';
import { getServerSidePropsCommon } from '../utils/page.utils';

const ContactUsPageTemplateOne = dynamic(import('../templates/one/contact-us.one.templates'));

const templateList = [ContactUsPageTemplateOne];

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async (ctx) => {
  try {
    const { redirect } = await getServerSidePropsCommon(ctx, false);
    if (redirect) return redirect;

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer', 'contact-us'])),
        templateNumber: 0,
      },
    };
  } catch (error) {
    console.error(error);
  }
});

function ContactUs({ templateNumber }: any) {
  return <TemplateToShow templateList={templateList} templateNumber={templateNumber} />;
}

export default ContactUs;
