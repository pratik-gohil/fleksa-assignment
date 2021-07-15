import { ICheckoutOrderTypes, ICheckoutPaymentMethods } from "../../../../redux/slices/checkout.slices.redux"
import { ILanguageData } from "../../../common/language-data.common.interfaces"

export interface IMakeOrderProducts {
  id: number
  quantity: number
  has_choice: boolean
  main_name: ILanguageData,
  choice: Array<{
    top_index: number
    product_index: number
  }>|null,
  type: "SINGLE"|"PART"
  has_sides: boolean,
  side_product_json: Array<{ id: number }>|null
}

export interface INodeApiHttpPostOrderRequestData {
  order: {
    shop_id: number
    name: string
    email: string,
    phone: string,
    country_code: string,
    is_delivery: boolean,
    customer_address_id?: number,
    want_at: string,
    products: Array<IMakeOrderProducts>
    payment_method: ICheckoutPaymentMethods,
    tip?: number,
    offer: {
      is_applicable: boolean
      token: string
    }
    description?: string,
    order_type: ICheckoutOrderTypes
  }
}

export interface IOrderResponseCash {
  _paymentMethod: "CASH"
  result: boolean
  data: {
    order_id: number
  }
}

export interface IOrderResponsePaypal {
  _paymentMethod: "PAYPAL"
  result: boolean
  paypal_order_id: string
  order_id: number
  amount: number
  merchant_id: string
}

export interface IOrderResponseStripe {
  _paymentMethod: "STRIPE"
  result: boolean
  client_secret: string
  amount: number
  merchant_id: string
}

export type INodeApiHttpPostOrderResponse = IOrderResponseCash | IOrderResponsePaypal | IOrderResponseStripe