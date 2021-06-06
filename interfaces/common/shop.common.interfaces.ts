import { ILanguageData } from "./language-data.common.interfaces";

export interface IShop {
  category_json: ILanguageData
  cover: string
  description_text_json: ILanguageData
  description_title_json: ILanguageData
  id: number
  is_pureveg: null,
  logo: string
  name: 'Restaurant Nidda',
  paypal_available: boolean,
  place: string
  social: null,
  stripe_available: boolean,
  uis: string,
  urlpath: string,
  website_options: null,
  website_template: string
}