export interface INodeApiHttpPostContactUsRequestData {
  shop_id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface INodeApiHttpPostContactUsResponse {
  result: boolean;
  message?: string;
}
