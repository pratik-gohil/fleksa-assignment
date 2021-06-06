import { ILanguageData } from "./language-data.common.interfaces";

interface IProductChoiceOption {
  name_json: ILanguageData
  price: number
}

export interface IProductChoice {
  has_products: boolean
  name_json: ILanguageData
  options: Array<IProductChoiceOption>
  type_: string
}

export interface IProduct {
  choice: Array<IProductChoice>
  description_json: ILanguageData
  discount: null
  id: number
  image: string
  is_veg: number
  name_json: ILanguageData
  price: number
  side_products_json: null
  sku: string
}