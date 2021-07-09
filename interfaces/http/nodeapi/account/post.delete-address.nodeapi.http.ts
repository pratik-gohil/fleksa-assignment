export interface INodeApiHttpPostDeleteAddressRequestData {
  customer_address_id: number;
  updating_values: {
    is_active: boolean;
  };
}

export interface INodeApiHttpPostDeleteAddressResponseData {
  result: boolean;
  message?: string;
}
