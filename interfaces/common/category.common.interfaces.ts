import { ICheckoutOrderTypes } from '../../redux/slices/checkout.slices.redux';
import { ILanguageData } from './language-data.common.interfaces';
import { IType } from './types.common.interfaces';

export interface ICategoryProductSideProducts {
  name_json: ILanguageData;
  option_ids: Array<number>;
  type_: IType;
}

export interface ICategoryProductChoiceOptions {
  name_json: ILanguageData;
  price: number;
}

export interface ICategorySingleProductChoice {
  has_products: boolean;
  name_json: ILanguageData;
  options: Array<ICategoryProductChoiceOptions> | undefined;
  type_: IType;
}

export interface ICategoryMultipleProductChoice {
  choice: Array<number>;
  has_products: boolean;
  name_json: ILanguageData;
  type_: IType;
}

export interface ICategoryProduct {
  choice: Array<ICategorySingleProductChoice | ICategoryMultipleProductChoice> | null;
  description_json: ILanguageData;
  discount: null;
  id: number;
  image: string | null;
  in_stock: boolean;
  is_popular: boolean;
  is_veg: number;
  name_json: ILanguageData;
  price: number;
  side_products_json: Array<ICategoryProductSideProducts> | null;
  sku: string;
  type_: IType;
  _metaSeachText: Record<string, string>;
}

export interface ICategory {
  availability: {
    always: boolean;

    order_type_?: Array<ICheckoutOrderTypes>;
  };
  description_json: ILanguageData;
  image: string;
  name_json: ILanguageData;
  products: Array<ICategoryProduct>;
}
