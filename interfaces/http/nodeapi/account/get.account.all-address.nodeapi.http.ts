import { IParticularAddress } from '../../../common/customer.common.interfaces';

export interface INodeApiHttpGetUserAllAddressRequestData {}

export interface INodeApiHttpGetUserAllAddressResponse {
  result: boolean;
  data: {
    customer_address: Array<IParticularAddress>;
  };
}
