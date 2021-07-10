export type AllowedOrderType = 'FIRST' | 'PICKUP' | 'DINE_IN' | 'DELIVERY';
export type AllowedOfferType = 'PERCENTAGE' | 'AMOUNT';

export interface IOffer {
  code: string;
  description_json?: string;
  min_amount: number;
  offer_type: AllowedOfferType;
  order_type_: AllowedOrderType;
  provided: number;
}
