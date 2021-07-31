import { ILanguageData } from './language-data.common.interfaces';

export interface IShop {
  category_json: ILanguageData;
  cover: string;
  cover_json: {
    images: Array<string>;
    updated_at: string;
  };
  description_text_json: ILanguageData;
  description_title_json: ILanguageData;
  id: number;
  is_pureveg: null;
  logo: string;
  name: string;
  paypal_available: boolean;
  place: string;
  social: null | {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  stripe_available: boolean;
  uis: string;
  urlpath: string;
  website_options: null;
  website_template: string;
}

interface ITimingsOpenClose {
  close: string;
  open: string;
}

export interface ITimingsDay {
  available?: boolean;
  delivery: ITimeObject;
  shop: ITimeObject;
  updated_at?: string;
}

export interface ITimeObject {
  availability: boolean;
  timings: Array<ITimingsOpenClose> | undefined;
}

export interface ITimingsHoliday {
  dates: Array<string>;
  delivery: {
    availability: boolean;
    timings: Array<ITimingsOpenClose> | undefined;
  };
  shop: {
    availability: boolean;
    timings: Array<ITimingsOpenClose> | undefined;
  };
}

export interface ITimingsMonth {
  end: number;
  start: number;
}

export type ITimings = Record<string, ITimingsDay | Array<ITimingsHoliday> | ITimingsMonth>;
