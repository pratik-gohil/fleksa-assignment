export interface INodeApiHttpPostLoginRequestData {
  countryCode: number
  phone: string
  shopId: number
}

export interface INodeApiHttpPostLoginResponse {
  result: boolean
  message: string
  is_new: boolean
  customer_id: number
}