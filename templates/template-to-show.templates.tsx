import { NextSeo } from 'next-seo';
import React, { ComponentType, FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import PageContainer, { IPropsPageContainer } from '../components/templateOne/common/page-container.commom.templateOne.components';
import GlobalStyle from '../constants/global-style.constants';
import { THEME_ONE, THEME_TWO } from '../constants/theme.constants';
import { useAppSelector } from '../redux/hooks.redux';
import { selectLanguage, selectLanguageCode } from '../redux/slices/configuration.slices.redux';
import { selectImages, selectShop } from '../redux/slices/index.slices.redux';

export interface IPropsTemplateToShow {
  templateList: Array<ComponentType>;
  templateNumber: number;
  pageContainer?: IPropsPageContainer;
}

const themes = [THEME_ONE, THEME_TWO];

const TemplateToShow: FunctionComponent<IPropsTemplateToShow> = ({ templateList, templateNumber, pageContainer }) => {
  const languageCode = useAppSelector(selectLanguageCode)
  const shop = useAppSelector(selectShop);
  const images = useAppSelector(selectImages)
  const language = useAppSelector(selectLanguage)

  const ViewTemplate = templateList[templateNumber];
  return (
    <ThemeProvider theme={themes[isNaN(Number(shop?.website_template)) ? 1 : Number(shop?.website_template)]}>
      <NextSeo
        title={shop?.name}
        description={`${shop?.description_text_json[language]}`}
        // canonical={`${shop?.urlpath}`}
        openGraph={{
          // url: 'https://www.url.ie/a',
          title: shop?.name,
          description: shop?.description_text_json[language],
          images: images.map(i => ({ url: i })),
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
