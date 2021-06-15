export interface INodeApiHttpPostVerifyRequestData {
  otp: string
  shopId: number
  customerId: number
}

export interface INodeApiHttpPostVerifyResponse {
  result: boolean
  message: string
  token: string
}