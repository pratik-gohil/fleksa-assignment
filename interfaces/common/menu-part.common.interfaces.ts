import { ICategoryProductSideProducts } from "./category.common.interfaces";
import { ILanguageData } from "./language-data.common.interfaces";
import { IProductChoice } from "./product.common.interfaces";

export interface IMenuPart {
  choice: Array<IProductChoice>|null
  description_json: ILanguageData
  discount: null
  id: number
  image: string|null
  is_veg: null
  name_json: ILanguageData
  price: number
  side_products_json: Array<ICategoryProductSideProducts>
}