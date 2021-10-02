import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store.redux';

/**
 * This slice used for all kind of errors in one place
 * We just needs to add the <Snackbar /> Component at the root level of the page and
 * update the state of error
 */
const SLICE_NAME = 'common';

type ISnackbarType = 'warning' | 'error' | 'info' | 'success';

export interface ICommonSliceState {
  error: {
    message: string;
    severity: ISnackbarType;
    show: boolean;
    duration?: number;
  };
  seo_tags_json: {
    additionRobotsProps: string;
    additionalLinkTags: string;
    additionalMetaTags: string;
    canonical: string;
    defaultTitle: string;
    description: string;
    'facebook.appId': string;
    languageAlternates: string;
    'mobileAlternate.href': string;
    'mobileAlternate.media': string;
    nofollow: string;
    noindex: string;
    'openGraph.article.authors': string;
    'openGraph.article.expirationTime': string;
    'openGraph.article.modifiedTime': string;
    'openGraph.article.publishedTime': string;
    'openGraph.article.section': string;
    'openGraph.article.tags': string;
    'openGraph.book.authors': string;
    'openGraph.book.isbn': string;
    'openGraph.book.releaseDate': string;
    'openGraph.book.tags': string;
    'openGraph.description': string;
    'openGraph.images': string;
    'openGraph.locale': string;
    'openGraph.profile.firstName': string;
    'openGraph.profile.gender': string;
    'openGraph.profile.lastName': string;
    'openGraph.profile.username': string;
    'openGraph.site_name': string;
    'openGraph.title': string;
    'openGraph.type': string;
    'openGraph.url': string;
    'openGraph.videos': string;
    title: string;
    titleTemplate: string;
    'twitter.cardType': string;
    'twitter.handle': string;
    'twitter.site': string;
  };
  app_links: {
    android: string;
    ios: string
  }
}

const initialState: ICommonSliceState = {
  error: {
    message: 'test error message',
    severity: 'info',
    show: false,
    duration: 3000,
  },
  seo_tags_json: {
    additionRobotsProps: '',
    additionalLinkTags: '',
    additionalMetaTags: '',
    canonical: '',
    defaultTitle: '',
    description: '',
    'facebook.appId': '',
    languageAlternates: '',
    'mobileAlternate.href': '',
    'mobileAlternate.media': '',
    nofollow: '',
    noindex: '',
    'openGraph.article.authors': '',
    'openGraph.article.expirationTime': '',
    'openGraph.article.modifiedTime': '',
    'openGraph.article.publishedTime': '',
    'openGraph.article.section': '',
    'openGraph.article.tags': '',
    'openGraph.book.authors': '',
    'openGraph.book.isbn': '',
    'openGraph.book.releaseDate': '',
    'openGraph.book.tags': '',
    'openGraph.description': '',
    'openGraph.images': '',
    'openGraph.locale': '',
    'openGraph.profile.firstName': '',
    'openGraph.profile.gender': '',
    'openGraph.profile.lastName': '',
    'openGraph.profile.username': '',
    'openGraph.site_name': '',
    'openGraph.title': '',
    'openGraph.type': '',
    'openGraph.url': '',
    'openGraph.videos': '',
    title: '',
    titleTemplate: '',
    'twitter.cardType': '',
    'twitter.handle': '',
    'twitter.site': '',
  },
  app_links: {
    android: '',
    ios: ''
  }
};

export const CommonSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateError: (state, action) => {
      state.error = { ...state.error, ...action.payload };
    },
    updateSeoTagJson: (state, action) => {
      state.seo_tags_json = action.payload;
    },
    updateAppLinks: (state, action) => {
      state.app_links = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload[SLICE_NAME],
      };
    },
  },
});

export const { updateError, updateSeoTagJson, updateAppLinks } = CommonSlice.actions;

export const selectError = (state: RootState) => state.common.error;
export const selectSeoTagJson = (state: RootState) => state.common.seo_tags_json;
export const selectAppLinks = (state: RootState) => state.common.app_links;
