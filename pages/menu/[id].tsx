import dynamic from 'next/dynamic';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import IndexStoreWrapper from '../../redux/store.redux';
import TemplateToShow from '../../templates/template-to-show.templates';
import { updateCategories, updateParts, updateSides } from '../../redux/slices/menu.slices.redux';
import PyApiHttpGetMenu from '../../http/pyapi/menu/get.menu.index.pyapi.http';
import { getServerSidePropsCommon } from '../../utils/page.utils';
import Cookies from 'cookies';
import { COOKIE_SELECTED_MENU_URLPATH } from '../../constants/keys-cookies.constants';
import { updateSelectedMenu, updateSelectedMenuUrlpath } from '../../redux/slices/configuration.slices.redux';
import { updateSiblings } from '../../redux/slices/index.slices.redux';
import NodeApiHttpGetUserAllAddress from '../../http/nodeapi/account/get.account.all-address.nodeapi.http';
import { updateLoadAddressesList } from '../../redux/slices/user.slices.redux';

const MenuByIdPageTemplateOne = dynamic(import('../../templates/one/menu/menu-by-id.menu.one.templates'));

const templateList = [MenuByIdPageTemplateOne];

export const getServerSideProps = IndexStoreWrapper.getServerSideProps(async (ctx) => {
  try {
    const shopId = Number(ctx.query.id);

    if (isNaN(shopId)) throw new Error('Shop id not found');

    const { redirect, configuration, responseIndex, bearerToken } = await getServerSidePropsCommon(ctx, false);
    if (redirect) return redirect;

    const cookies = new Cookies(ctx.req, ctx.res);

    let urlPath: string | undefined;
    let menuId: number | undefined;

    if (responseIndex?.siblings.length) {
      const siblingData = responseIndex?.siblings.find((i) => i.id == Number(ctx.query.id));
      urlPath = siblingData?.urlpath;
      menuId = siblingData?.id;

      // TODO: If that menu id is not exist redirect it root as default one
      if (!menuId)
        return {
          redirect: {
            permanent: false,
            destination: `/menu/${responseIndex?.shop.id}`,
          },
        };
    } else if (Number(ctx.query.id) === responseIndex?.shop.id) {
      urlPath = responseIndex?.shop.urlpath;
      menuId = responseIndex?.shop.id;
    } else {
      /**
       * In case customer try to visit different restaurant menu redirect them to correspond restaurant
       * location.
       */
      return {
        redirect: {
          permanent: false,
          destination: `/menu/${responseIndex?.shop.id}`,
        },
      };
    }

    cookies.set(COOKIE_SELECTED_MENU_URLPATH, urlPath as string, {
      path: '/',
      httpOnly: false,
      maxAge: 365 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });
    ctx.store.dispatch(updateSelectedMenu(menuId));
    ctx.store.dispatch(updateSelectedMenuUrlpath(urlPath));
    ctx.store.dispatch(updateSiblings(responseIndex?.siblings));

    const responseMenu = await new PyApiHttpGetMenu(configuration).get({ shopId: menuId || shopId });
    ctx.store.dispatch(updateCategories(responseMenu?.categories));
    ctx.store.dispatch(updateSides(responseMenu?.sides));
    ctx.store.dispatch(updateParts(responseMenu?.parts));

    if (bearerToken) {
      const addressResponse = await new NodeApiHttpGetUserAllAddress(configuration, bearerToken).get({});
      ctx.store.dispatch(updateLoadAddressesList(addressResponse?.data.customer_address));
    }

    return {
      props: {
        ...(await serverSideTranslations((ctx as any).locale, [
          'header',
          'footer',
          'add-address',
          'disclaimer',
          'login',
          'common-ordertype',
          'page-menu-id',
        ])),
        templateNumber: 0,
        meta: responseIndex?.meta,
      },
    };
  } catch (error) {
    throw error;
  }
});

function Menu({ templateNumber, meta }: any) {
  return <TemplateToShow meta={meta} templateList={templateList} templateNumber={templateNumber} />;
}

export default Menu;
