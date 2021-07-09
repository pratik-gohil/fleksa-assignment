import { IParticularAddress } from '../../../common/customer.common.interfaces';

export interface INodeApiHttpPostUpdateAddressRequestData {
  customer_address_id: number;
  updating_values: IParticularAddress;
}

export interface INodeApiHttpPostUpdateAddressResponseData {
  result: boolean;
  message?: string;
  data?: {
    address: IParticularAddress;
  };
}
