import { ILanguageData } from "./language-data.common.interfaces";

export interface ISibling {
  address: {
    address: string
    area: string
    city: string
    floor: string
    postal_code: string
    lat: number
    lon: number
  }
  name: string
  category_json: ILanguageData
  id: number
  logo: string
  urlpath: string
}