export type Allowed_verification_type = 'email' | 'sms';

export interface INodeApiHttpPostVerifyEmailPhoneRequestData {
  method: Allowed_verification_type;
  email?: string;
  country_code?: string;
  phone?: string;
}

export interface INodeApiHttpPostVerifyEmailPhoneResponseData {
  result: boolean;
  message?: string;
}
