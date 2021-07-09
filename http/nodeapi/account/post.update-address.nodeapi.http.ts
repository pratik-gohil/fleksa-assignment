import {
  INodeApiHttpPostUpdateAddressRequestData,
  INodeApiHttpPostUpdateAddressResponseData,
} from '../../../interfaces/http/nodeapi/account/post.update-address.nodeapi.http';
import { ApiHttpCommon } from '../../base.http';
import NetNodeApi from '../net.nodeapi.http';

export default class NodeApiHttpPostUpdateAddressRequest extends ApiHttpCommon {
  public async post({ customer_address_id, updating_values }: INodeApiHttpPostUpdateAddressRequestData) {
    try {
      const response = await new NetNodeApi(this.configuration, this.bearerToken).post<INodeApiHttpPostUpdateAddressResponseData>({
        path: 'customer/update/address',
        body: {
          customer_address_id,
          updating_values: {
            ...updating_values,
          },
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
