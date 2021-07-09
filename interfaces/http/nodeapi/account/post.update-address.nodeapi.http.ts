import { IParticularAddress } from '../../../common/customer.common.interfaces';

export interface INodeApiHttpPostUpdateAddressRequestData {
  customer_address_id: number;
  updating_values: {
    floor?: string;
    address?: string;
    area?: string;
    city?: string;
    postal_code?: string;
    address_type?: string;
    state?: string;
    country?: string;
  };
}

export interface INodeApiHttpPostUpdateAddressResponseData {
  result: boolean;
  message?: string;
  data?: {
    address: IParticularAddress;
  };
}
