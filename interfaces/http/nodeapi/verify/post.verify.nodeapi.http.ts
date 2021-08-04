export interface INodeApiHttpPostVerifyRequestData {
  otp: string;
  shopId: number;
  customerId: number;
  languageCode?: string;
}

export interface INodeApiHttpPostVerifyResponse {
  result: boolean;
  message: string;
  token: string;
}
