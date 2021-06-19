import { ICheckoutPaymentMethods } from "../../../../redux/slices/checkout.slices.redux"
import { ILanguageData } from "../../../common/language-data.common.interfaces"

export type IOrderType = "PICKUP" | "DELIVERY" | "DINE_IN"

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
    discount_token?: string,
    coupon_token?: string,
    description?: string,
    order_type: IOrderType
  }
}

export interface INodeApiHttpPostOrderResponse {
  
}