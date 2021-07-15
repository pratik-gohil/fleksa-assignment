export interface INodeApiHttpPostVerifyCodeRequestData {
  otp: string;
}

export interface INodeApiHttpPostVerifyCodeResponseData {
  result: boolean;
  message?: string;
}
