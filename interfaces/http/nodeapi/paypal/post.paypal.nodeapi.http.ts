export interface INodeApiHttpPostPaypalRequestData {
  paypalOrderId: string;
}

export interface INodeApiHttpPostPaypalResponse {
  result: boolean;
  message?: string;
}
