import { IParticularAddress } from '../../../common/customer.common.interfaces';

export type Allowed_address_type = 'OTHER' | 'HOME' | 'WORK';

export interface INodeApiHttpPostCreateNewAddressRequestData {
  floor?: string;
  address: string;
  city: string;
  state?: string;
  country?: string;
  postal_code: string;
  address_type: Allowed_address_type;
  proximity?: string;
}

export interface INodeApiHttpPostCreateNewAddressResponseData {
  result: boolean;
  message?: string;
  data?: {
    address: IParticularAddress;
  };
}
