export type AllowedContentTypes = 'JSON' | 'PDF';

export interface IContent {
  description: string;
  image?: string;
  title: string;
  type_: AllowedContentTypes;
}

export interface IShopAvailablity {
  availability: boolean;
  isClosed: boolean;
  next?: {
    day: string;
    time: string;
    dayNumber?: string;
  };
}
