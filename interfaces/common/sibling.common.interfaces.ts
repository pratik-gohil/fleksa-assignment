import { ILanguageData } from "./language-data.common.interfaces";

export interface ISibling {
  name: string
  category_json: ILanguageData
  id: number
  logo: string
  urlpath: string
}