export interface INodeApiHttpReservationRequestData {
  countryCode: string;
  phone: string;
  description: string;
  date_time: string;
  email: string;
  guests_count: string;
  name: string;
  shop_id: number;
}

export interface INodeApiHttpReservationResponseData {
  result: boolean;
}
