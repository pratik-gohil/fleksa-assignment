import {
  INodeApiHttpPostCreateNewAddressRequestData,
  INodeApiHttpPostCreateNewAddressResponseData,
} from '../../../interfaces/http/nodeapi/account/post.create-address.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpPostCreateNewAddressRequest extends ApiHttpCommon {
  public async post({ floor, address, address_type, city, country, postal_code, state }: INodeApiHttpPostCreateNewAddressRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).post<INodeApiHttpPostCreateNewAddressResponseData>({
        path: 'customer/create/address',
        body: {
          floor: floor || '',
          address,
          address_type,
          city,
          country: country || '',
          postal_code,
          state: state || '',
        },
      });
      return response;
    } catch (e) {
      console.error(e);
      return {
        result: false,
      };
    }
  }
}
