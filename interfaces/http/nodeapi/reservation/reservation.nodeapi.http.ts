export interface INodeApiHttpReservationRequestData {
  countryCode: string;
  phone: string;
  description: string;
  date_time: string;
  email: string;
  guests_count: string;
  name: string;
  shop_id: number;
  shop: {
    is_multi: boolean;
    id: number | null;
  };
}

export interface INodeApiHttpReservationResponseData {
  result: boolean;
  message?: string;
}
