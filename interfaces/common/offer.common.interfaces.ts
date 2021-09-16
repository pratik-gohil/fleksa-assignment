import { ILanguageData } from './language-data.common.interfaces';

export type AllowedOrderType = 'FIRST' | 'PICKUP' | 'DINE_IN' | 'DELIVERY';
export type AllowedOfferType = 'PERCENTAGE' | 'AMOUNT';

export interface IOffer {
  code: string;
  description_json?: ILanguageData;
  min_amount: number;
  offer_type_: AllowedOfferType;
  order_type_: AllowedOrderType;
  provided: number;
}
