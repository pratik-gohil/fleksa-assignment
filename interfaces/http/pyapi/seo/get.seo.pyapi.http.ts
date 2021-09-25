interface ISEO {
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
}

export interface IPyApiHttpGetSeoResponse {
  shop: {
    seo_tags_json: ISEO;
  };
}
