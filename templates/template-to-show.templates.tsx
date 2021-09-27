import { NextSeo } from 'next-seo';
import React, { ComponentType, FunctionComponent, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import PageContainer, { IPropsPageContainer } from '../components/templateOne/common/page-container.commom.templateOne.components';
import { PwaMeta } from '../components/templateOne/common/pwa/pwa.common.templateOne.components';
import { Snackbar } from '../components/templateOne/common/snackbar/snackbar.error.pages.templateOne.components';
import GlobalStyle from '../constants/global-style.constants';
import { THEME_ONE, THEME_TWO } from '../constants/theme.constants';
import { IMeta } from '../interfaces/common/metea.common.interfaces';
import { useAppSelector } from '../redux/hooks.redux';
import { selectLanguageCode } from '../redux/slices/configuration.slices.redux';
import { selectImages, selectShop } from '../redux/slices/index.slices.redux';
import { selectSeoTagJson } from '../redux/slices/common.slices.redux';

declare const window: any;

export interface IPropsTemplateToShow {
  templateList: Array<ComponentType>;
  templateNumber: number;
  pageContainer?: IPropsPageContainer;
  meta?: IMeta;
}

const themes = [THEME_ONE, THEME_TWO];

const TemplateToShow: FunctionComponent<IPropsTemplateToShow> = ({ meta, templateList, templateNumber, pageContainer }) => {
  const languageCode = useAppSelector(selectLanguageCode);
  const shop = useAppSelector(selectShop);
  const images = useAppSelector(selectImages);
  const seoTagsJson = useAppSelector(selectSeoTagJson);

  const imagesForSeo = images.map((i) => ({ url: i }));
  if (meta?.image) {
    imagesForSeo.unshift({ url: meta.image });
  }
  if (seoTagsJson?.['openGraph.url']) imagesForSeo.unshift({ url: seoTagsJson['openGraph.url'] });

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      const wb = window.workbox as any;
      const promptNewVersionAvailable = () => {
        wb.messageSkipWaiting();
      };

      wb.addEventListener('waiting', promptNewVersionAvailable);

      // never forget to call register as auto register is turned off in next.config.js
      wb.register();
    }
  }, []);

  const ViewTemplate = templateList[templateNumber];
  return (
    <ThemeProvider theme={themes[isNaN(Number(shop?.website_template)) ? 1 : Number(shop?.website_template)]}>
      <PwaMeta />
      <NextSeo
        // robotsProps={
        //   {
        //     nosnippet: seoTagsJson?.additionRobotsProps.nosnippet,
        //     notranslate: seoTagsJson?.additionRobotsProps.notranslate,
        //     noimageindex: seoTagsJson?.additionRobotsProps.noimageindex,
        //     noarchive: seoTagsJson?.additionRobotsProps.noarchive,
        //     maxSnippet: seoTagsJson?.additionRobotsProps.maxSnippet,
        //     maxImagePreview: seoTagsJson?.additionRobotsProps.maxImagePreview,
        //     maxVideoPreview: seoTagsJson?.additionRobotsProps.maxVideoPreview,
        //     unavailableAfter: seoTagsJson?.additionRobotsProps.unavailableAfter,
        //   }
        // }
        canonical={seoTagsJson?.canonical}
        mobileAlternate={{
          media: seoTagsJson?.['mobileAlternate.media'],
          href: seoTagsJson?.['mobileAlternate.href'],
        }}
        // languageAlternates={[
        //   {
        //     hrefLang: seoTagsJson?.languageAlternates.hrefLang,
        //     href: seoTagsJson?.languageAlternates.href,
        //   },
        // ]}
        // additionalMetaTags={[
        //   {
        //     content: seoTagsJson?.additionalMetaTags.content,
        //     keyOverride: seoTagsJson?.additionalMetaTags.keyOverride,
        //     property: seoTagsJson?.additionalMetaTags.property,
        //     name: seoTagsJson?.additionalMetaTags.name,
        //     httpEquiv: seoTagsJson?.additionalMetaTags.httpEquiv,
        //   },
        // ]}
        // additionalLinkTags={[
        //   {
        //     rel: seoTagsJson?.additionalMetaTags.rel,
        //     href: seoTagsJson?.additionalMetaTags.href,
        //     sizes: seoTagsJson?.additionalMetaTags.sizes,
        //     type: seoTagsJson?.additionalMetaTags.type,
        //     color: seoTagsJson?.additionalMetaTags.color,
        //     keyOverride: seoTagsJson?.additionalMetaTags.keyOverride,
        //   },
        // ]}
        defaultTitle={seoTagsJson?.defaultTitle}
        titleTemplate={seoTagsJson?.titleTemplate}
        // noindex={seoTagsJson?.noindex}
        // nofollow={seoTagsJson?.nofollow}
        title={seoTagsJson?.title || meta?.title}
        description={seoTagsJson?.description || meta?.description}
        // keywords={meta?.keywords}
        openGraph={{
          title: seoTagsJson?.['openGraph.title'] || meta?.title,
          description: seoTagsJson?.['openGraph.description'] || meta?.description,
          type: seoTagsJson?.['openGraph.type'] || meta?.og_type_,
          images: imagesForSeo,
          // videos: [
          //     url: seoTagsJson?.['openGraph.videos'],
          // ],
          site_name: seoTagsJson?.['openGraph.site_name'] || shop?.name,
          locale: seoTagsJson?.['openGraph.locale'] || languageCode,
          url: seoTagsJson?.['openGraph.url'],
          profile: {
            firstName: seoTagsJson?.['openGraph.profile.firstName'],
            lastName: seoTagsJson?.['openGraph.profile.lastName'],
            username: seoTagsJson?.['openGraph.profile.username'],
            gender: seoTagsJson?.['openGraph.profile.gender'],
          },
          // book: {
          //   authors: seoTagsJson?.['openGraph.book.authors'],
          //   isbn: seoTagsJson?.['openGraph.book.isbn'],
          //   releaseDate: seoTagsJson?.['openGraph.book.releaseDate'],
          //   tags: seoTagsJson?.['openGraph.book.tags'],
          // },
          // article: {
          //   publishedTime: seoTagsJson?.['openGraph.article.publishedTime'],
          //   modifiedTime: seoTagsJson?.['openGraph.article.modifiedTime'],
          //   expirationTime: seoTagsJson?.['openGraph.article.expirationTime'],
          //   authors: seoTagsJson?.['openGraph.article.authors'],
          //   section: seoTagsJson?.['openGraph.article.section'],
          //   tags: seoTagsJson?.['openGraph.article.tags'],
          // },
        }}
        // facebook={seoTagsJson?.['facebook.appId']}
        twitter={{
          cardType: seoTagsJson?.['twitter.cardType'] || 'summary_large_image',
          handle: seoTagsJson?.['twitter.handle'],
          site: seoTagsJson?.['twitter.site'],
        }}
      />
      <GlobalStyle />
      <PageContainer {...pageContainer}>
        <ViewTemplate />
      </PageContainer>
      <Snackbar />
    </ThemeProvider>
  );
};

export default TemplateToShow;
