import ReservationSuccessPageTemplateOne from '../templates/one/reservation-success.one.templates';
import IndexStoreWrapper from '../redux/store.redux';
import TemplateToShow from '../templates/template-to-show.templates';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getServerSidePropsCommon } from '../utils/page.utils';

const templateList = [ReservationSuccessPageTemplateOne];

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async (ctx) => {
  try {
    const { redirect } = await getServerSidePropsCommon(ctx, true, false);
    if (redirect) return redirect;

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, ['header', 'footer'])),
        templateNumber: 0,
      },
    };
  } catch (error) {
    throw error;
  }
});

function ReservationSuccess({ templateNumber }: any) {
  return <TemplateToShow templateList={templateList} templateNumber={templateNumber} pageContainer={{ showFooter: false }} />;
}

export default ReservationSuccess;
