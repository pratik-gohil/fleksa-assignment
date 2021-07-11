import { ICheckoutOrderTypes } from "../../../../redux/slices/checkout.slices.redux";
import { ILanguageData } from "../../../common/language-data.common.interfaces";
import { IMakeOrderProducts } from "../../nodeapi/order/post.order.nodeapi.http";

export interface IPyApiHttpPostOffersPostRequestData {
  code: string
  orderType: ICheckoutOrderTypes
  products: Array<IMakeOrderProducts>
  shopId: number
  subTotalAmount: number
  token: string
}

type IOfferValidationFalse = {
  result: false
  explanation: string
  message: ILanguageData
}

type IOfferValidationTrue = {
  result: true
  description_json: null
  details: {
    min_amount: number
    offer_type_: string
    order_type_: string
    provided: number
    sub_total_amount: number
    value: number
  }
  explanation: string
  message: ILanguageData
  english: string
  german: string
  token: string
  total_amount: number
}

export type IPyApiHttpPostOffersPostResponse = IOfferValidationFalse | IOfferValidationTrue