import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.redux';

const SLICE_NAME = 'seo';

export interface ISeoSliceState {
    seo_tags_json: {
      "additionRobotsProps": string, 
      "additionalLinkTags": string, 
      "additionalMetaTags": string, 
      "canonical": string, 
      "defaultTitle": string, 
      "description": string, 
      "facebook.appId": string, 
      "languageAlternates": string, 
      "mobileAlternate.href": string, 
      "mobileAlternate.media": string, 
      "nofollow": string, 
      "noindex": string, 
      "openGraph.article.authors": string, 
      "openGraph.article.expirationTime": string, 
      "openGraph.article.modifiedTime": string, 
      "openGraph.article.publishedTime": string, 
      "openGraph.article.section": string, 
      "openGraph.article.tags": string, 
      "openGraph.book.authors": string, 
      "openGraph.book.isbn": string, 
      "openGraph.book.releaseDate": string, 
      "openGraph.book.tags": string, 
      "openGraph.description": string, 
      "openGraph.images": string, 
      "openGraph.locale": string, 
      "openGraph.profile.firstName": string, 
      "openGraph.profile.gender": string, 
      "openGraph.profile.lastName": string, 
      "openGraph.profile.username": string, 
      "openGraph.site_name": string, 
      "openGraph.title": string, 
      "openGraph.type": string, 
      "openGraph.url": string, 
      "openGraph.videos": string, 
      "title": string, 
      "titleTemplate": string, 
      "twitter.cardType": string, 
      "twitter.handle": string, 
      "twitter.site": string
    }
}

const initialState: ISeoSliceState = {
    seo_tags_json: {
      "additionRobotsProps": "", 
      "additionalLinkTags": "", 
      "additionalMetaTags": "", 
      "canonical": "", 
      "defaultTitle": "", 
      "description": "", 
      "facebook.appId": "", 
      "languageAlternates": "", 
      "mobileAlternate.href": "", 
      "mobileAlternate.media": "", 
      "nofollow": "", 
      "noindex": "", 
      "openGraph.article.authors": "", 
      "openGraph.article.expirationTime": "", 
      "openGraph.article.modifiedTime": "", 
      "openGraph.article.publishedTime": "", 
      "openGraph.article.section": "", 
      "openGraph.article.tags": "", 
      "openGraph.book.authors": "", 
      "openGraph.book.isbn": "", 
      "openGraph.book.releaseDate": "", 
      "openGraph.book.tags": "", 
      "openGraph.description": "", 
      "openGraph.images": "", 
      "openGraph.locale": "", 
      "openGraph.profile.firstName": "", 
      "openGraph.profile.gender": "", 
      "openGraph.profile.lastName": "", 
      "openGraph.profile.username": "", 
      "openGraph.site_name": "", 
      "openGraph.title": "", 
      "openGraph.type": "", 
      "openGraph.url": "", 
      "openGraph.videos": "", 
      "title": "", 
      "titleTemplate": "", 
      "twitter.cardType": "", 
      "twitter.handle": "", 
      "twitter.site": ""
    }
};

export const SeoSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateSeo: (state, action) => {
      state.seo_tags_json = action.payload
    },
  },
});

export const {
  updateSeo
} = SeoSlice.actions;

export const selectSeo = (state: RootState) => state.seo.seo_tags_json;