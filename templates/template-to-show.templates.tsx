import { NextSeo } from 'next-seo';
import React, { ComponentType, FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import PageContainer, { IPropsPageContainer } from '../components/templateOne/common/page-container.commom.templateOne.components';
import GlobalStyle from '../constants/global-style.constants';
import { THEME_ONE, THEME_TWO } from '../constants/theme.constants';
import { IMeta } from '../interfaces/common/metea.common.interfaces';
import { useAppSelector } from '../redux/hooks.redux';
import { selectLanguageCode } from '../redux/slices/configuration.slices.redux';
import { selectImages, selectShop } from '../redux/slices/index.slices.redux';

export interface IPropsTemplateToShow {
  templateList: Array<ComponentType>;
  templateNumber: number;
  pageContainer?: IPropsPageContainer;
  meta?: IMeta
}

const themes = [THEME_ONE, THEME_TWO];

const TemplateToShow: FunctionComponent<IPropsTemplateToShow> = ({ meta, templateList, templateNumber, pageContainer }) => {
  const languageCode = useAppSelector(selectLanguageCode)
  const shop = useAppSelector(selectShop);
  const images = useAppSelector(selectImages)

  const imagesForSeo = images.map(i => ({ url: i }))
  if (meta?.image) {
    imagesForSeo.unshift({ url: meta.image })
  }

  const ViewTemplate = templateList[templateNumber];
  return (
    <ThemeProvider theme={themes[isNaN(Number(shop?.website_template)) ? 1 : Number(shop?.website_template)]}>
      <NextSeo
        title={meta?.title}
        description={meta?.description}
        openGraph={{
          title: meta?.title,
          description: meta?.description,
          images: imagesForSeo,
          site_name: shop?.name,
          locale: languageCode
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <GlobalStyle />
      <PageContainer {...pageContainer}>
        <ViewTemplate />
      </PageContainer>
    </ThemeProvider>
  );
};

export default TemplateToShow;
