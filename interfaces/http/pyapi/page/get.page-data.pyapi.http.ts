interface IAppLinks {
  links: {
    android: string;
    ios: string;
  }
}

export interface IPyApiHttpGetAppLinksResponse {
  shop: {
    application_json: IAppLinks;
  };
}
