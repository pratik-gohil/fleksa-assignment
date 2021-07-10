export interface IOffer {
  code: string;
  description_json?: string;
  min_amount: number;
  offer_type: AllowedOfferType;
  order_type_: AllowedOrderType;
  provided: number;
}

type AllowedOrderType = 'FIRST' | 'PICKUP' | 'DINE_IN' | 'DELIVERY';
type AllowedOfferType = 'PERCENTAGE' | 'AMOUNT';
