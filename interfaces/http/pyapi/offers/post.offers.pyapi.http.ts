import { ICheckoutOrderTypes, ICheckoutPaymentMethods } from '../../../../redux/slices/checkout.slices.redux';
import { ILanguageData } from '../../../common/language-data.common.interfaces';
import { IMakeOrderProducts } from '../../nodeapi/order/post.order.nodeapi.http';

export interface IPyApiHttpPostOffersPostRequestData {
  code: string;
  orderType: ICheckoutOrderTypes;
  products: Array<IMakeOrderProducts>;
  shopId: number;
  token?: string;
  payment_method?: ICheckoutPaymentMethods;
}

type IOfferValidationFalse = {
  result: false;
  explanation: string;
  message: ILanguageData;
};

type IOfferValidationTrue = {
  result: true;
  description_json: null;
  details: {
    amount: {
      absolute: number;
      discount_total: number;
      sub_total: number;
      value: number;
    };
    offers: {
      min_amount: number;
      offer_type_: string;
      order_type_: string;
      provided: number;
    };
  };
  explanation: string;
  message: ILanguageData;
  token: string;
  resultant: Record<string, { is_applicable: boolean }>;
};

export type IPyApiHttpPostOffersPostResponse = IOfferValidationFalse | IOfferValidationTrue;
